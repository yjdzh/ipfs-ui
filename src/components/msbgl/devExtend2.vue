<style scoped>
	.expand-row {
		margin-bottom: 16px;
	}
</style>
<template>
	<div>

		<Row>
			<Col span="8">
			<span class="expand-key">生产厂商：</span>
			<span class="expand-value" v-text="(!row.mfrs)?'暂无数据':row.mfrs"></span>
			</Col>
			<Col span="8">
			<span class="expand-key">出厂日期：</span>
			<span class="expand-value" v-text="(!row.factoryDate)?'暂无数据':row.factoryDate"></span>
			</Col>
			<Col span="8">
			<span class="expand-key">所属流水号：</span>
			<span class="expand-value" v-text="(!row.inboundNum)?'暂无数据':row.inboundNum"></span>
			</Col>
			<Col span="8">
			<span class="expand-key">系统启动时间：</span>
			<span class="expand-value" v-text="startTime"></span>
			</Col>
			<Col span="8">
			<span class="expand-key">内存使用：</span>
			<span class="expand-value" v-text="nc"></span>
			</Col>
			<Col span="8">
			<span class="expand-key">硬盘使用：</span>
			<span class="expand-value" v-text="yp"></span>
			</Col>
			<Col span="8">
			<span class="expand-key">CPU使用：</span>
			<span class="expand-value" v-text="cpu"></span>
			</Col>
			<Col span="8">
			<span class="expand-key">当前挖矿类型：</span>
			<span class="expand-value" v-text="wklx"></span>
			</Col>
		</Row>
	</div>
</template>
<script>
	export default {
		props: {
			row: Object
		},
		data() {
			return {
				startTime: '0',
				nc: '0/0 GB',
				yp: ' ',
				cpu: ' ',
				wklx: '无',
			}
		},
		methods: {
			creat() {
				this.Global.ajax(
					this, "get", {
						base: "/mdev",
						other: '/cfg/' + this.row.id + '?',
						access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token'))
					}, {},
					function(res, that) {
						if (res.data.status == 1) {

							let map = res.data.data;
							let uptime = map["rt116"];
							if (typeof(uptime) == "undefined") {
								that.startTime = '暂无信息';
							} else {
								that.startTime = uptime;
							}


							let rt106 = map["rt106"];
							let rt107 = map["rt107"];

							if (typeof(rt106) =="undefined") {
								rt106 = 0;
							} else {
								rt106 = parseInt(rt106);
							}

							if (typeof(rt107) == "undefined") {
								rt107 = 0;
							} else {
								rt107 = parseInt(rt107);
							}
							that.nc = (rt106 / 1048576).toFixed(2) + '/' + (rt107 / 1048576).toFixed(2) + ' GB';


							let rt105 = map["rt105"];
							if (typeof(rt105) == "undefined") {
								that.yp = '暂无信息';
							} else {
								that.yp = rt105;
							}

							debugger
							let rt108 = map["rt108"];
							if (typeof(rt108) == "undefined") {
								that.cpu = '暂无信息';
							} else {
								that.cpu = rt108;
							}

							let wkfss="";
							let ipfs038 = map["ipfs038"];
							if (typeof(ipfs038) == "undefined" || ipfs038==='0') {

							} else {
								wkfss = '，ipfs';
							}

							let ipfs034 = map["ipfs034"];
							if (typeof(ipfs034) == "undefined" || ipfs034==='0') {

							} else {
								wkfss=wkfss + '，xmr';
							}
							if(wkfss===''){
								that.wklx = '暂无信息';
							}else{
								that.wklx = wkfss.substr(1);
							}
						}
					}
				);
			},
		},
		created() {
			this.creat();
		}
	};
</script>
