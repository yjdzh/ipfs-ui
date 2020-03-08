<style scoped>
    .expand-row {
        margin-bottom: 16px;
    }
</style>
<template>
    <div>

        <Row>
            <Col span="24">
                <span class="expand-key">已下信息的上报时间：</span>
                <span class="expand-value" v-text="this.Global.getDate(row.urateTime)"></span>
            </Col>


            <Col span="24">
                <span class="expand-key">&nbsp;</span>
                <span class="expand-value" v-text=" "></span>
            </Col>

            <Col span="8">
                <span class="expand-key">系统启动时间：</span>
                <span class="expand-value" v-text="startTime"></span>
            </Col>

            <Col span="8">
                <span class="expand-key">CPU负载：</span>
                <span class="expand-value" v-text="cpu"></span>
            </Col>

            <Col span="8">
                <span class="expand-key">内存使用：</span>
                <span class="expand-value" v-text="nc"></span>
            </Col>

            <Col span="8">
                <span class="expand-key">硬盘使用：</span>
                <span class="expand-value" v-text="yp"></span>
            </Col>

            <Col span="16">
                <span class="expand-key">上报IP：</span>
                <span class="expand-value" v-text="ip"></span>
            </Col>


            <Col span="24">
                <span class="expand-key">&nbsp;</span>
                <span class="expand-value" v-text=" "></span>
            </Col>

            <!-- f2pool挖矿-->
           <!-- <Col span="24">
                <span class="expand-key">f2pool挖矿状态：</span>
            </Col> -->


            <Col span="6">
                <span class="expand-key">类型：</span>
                <span class="expand-value" >xmr(cpu)</span>
            </Col>

            <Col span="18">
                <span class="expand-key">当前状态：</span>
                <span class="expand-value" v-text="f2poolState"></span>
            </Col>


            <Col span="24">
                <span class="expand-key">钱包地址：</span>
                <span class="expand-value" v-text="f2poolUrl"></span>
            </Col>

           <!-- <Col span="6">
                <span class="expand-key">&nbsp;</span>
                <span class="expand-value" v-text=" "></span>
            </Col> -->
           <!-- <Col span="6">
                <span class="expand-key">矿机总数：</span>
                <span class="expand-value" v-text="f2poolTotall"></span>
            </Col>
            <Col span="6">
                <span class="expand-key">在线数量：</span>
                <span class="expand-value" v-text="f2poolLine"></span>
            </Col>
            <Col span="6">
                <span class="expand-key">当前矿机名称：</span>
                <span class="expand-value" v-text="f2poolName"></span>
            </Col>
 -->
            <Col span="6">
                <span class="expand-key">&nbsp;</span>
                <span class="expand-value" v-text=" "></span>
            </Col>
            <Col span="6">
                <span class="expand-key">总收益：</span>
                <span class="expand-value" v-text="f2poolZsy"></span>
            </Col>
            <Col span="6">
                <span class="expand-key">过去24小时收益：</span>
                <span class="expand-value" v-text="f2poolGqsy"></span>
            </Col>
            <Col span="6">
                <span class="expand-key">过去1小时算力：</span>
                <span class="expand-value" v-text="f2poolSl"></span>
            </Col>
            <!-- end  f2pool挖矿-->



            <Col span="24">
                <span class="expand-key">&nbsp;</span>
                <span class="expand-value" v-text=" "></span>
            </Col>



            <!-- minergate-->
            <!-- <Col span="24">
                <span class="expand-key">minergate挖矿状态：</span>
            </Col> -->

            <Col span="6">
                <span class="expand-key">类型：</span>
                <span class="expand-value" >filecoin</span>
            </Col>
			<Col span="6">
			    <span class="expand-key">当前状态：</span>
			    <span class="expand-value" v-text="minergateState"></span>
			</Col>

			<Col span="12">
			    <span class="expand-key">收益：</span>
			    <span class="expand-value" >0</span>
			</Col>

            <Col span="24">
                <span class="expand-key">钱包地址：</span>
                <span class="expand-value" v-text="minergateUrl"></span>
            </Col>

            <!-- end  minergate-->


            <Col span="24">
                <span class="expand-key">&nbsp;</span>
                <span class="expand-value" v-text=" "></span>
            </Col>
            <!-- ipfs-->
            <!-- <Col span="24">
                <span class="expand-key">ipfs挖矿状态：</span>
            </Col> -->

            <Col span="6">
                <span class="expand-key">类型：</span>
                <span class="expand-value" >filenet</span>
            </Col>

            <Col span="6">
                <span class="expand-key">当前状态：</span>
                <span class="expand-value" v-text="ipfsState"></span>
            </Col>
			 <Col span="12">
			    <span class="expand-key">收益：</span>
			    <span class="expand-value" >0</span>
			</Col>
            <Col span="24">
                <span class="expand-key">钱包地址：</span>
                <span class="expand-value" v-text="ipfsUrl"></span>
            </Col>
            <!-- end ipfs-->


            <Col span="24">
                <span class="expand-key">&nbsp;</span>
                <span class="expand-value" v-text=" "></span>
            </Col>


            <Col span="8">
                <span class="expand-key">出厂日期：</span>
                <span class="expand-value" v-text="(!row.factoryDate)?'暂无数据':row.factoryDate"></span>
            </Col>


            <Col span="8">
                <span class="expand-key">生产厂商：</span>
                <span class="expand-value" v-text="(!row.mfrs)?'暂无数据':row.mfrs"></span>
            </Col>

            <Col span="8">
                <span class="expand-key">所属流水号：</span>
                <span class="expand-value" v-text="(!row.inboundNum)?'暂无数据':row.inboundNum"></span>
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
                ip: '暂无信息',


                f2poolType: '暂无信息',
                f2poolUrl: '暂无信息',
                f2poolState: '暂无信息',
                f2poolTotall: '暂无信息',
                f2poolLine: '暂无信息',
                f2poolZsy: '暂无信息',
                f2poolName: '暂无信息',
                f2poolGqsy: '暂无信息',
                f2poolSl: '暂无信息',

                minergateType: '暂无信息',
                minergateUrl: '暂无信息',
                minergateState: '暂无信息',


                ipfsType: 'filenet',
                ipfsUrl: '暂无信息',
                ipfsState: '暂无信息',

            }
        },
        methods: {
            getDuration: function(my_time) {
                var days = my_time / 60 / 60 / 24;
                var daysRound = Math.floor(days);
                var hours = my_time / 60 / 60 - (24 * daysRound);
                var hoursRound = Math.floor(hours);
                var minutes = my_time / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
                var minutesRound = Math.floor(minutes);
                var seconds = my_time - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
                var time = daysRound + '天' + hoursRound + '时' + minutesRound + '分' + seconds + '秒';
                return time;
            },

            ypjs: function(my_time) {
                var str = my_time.split(';');
                var totalRL = 0;
                var usedRL = 0;
                for (var i = 0; i < str.length; i++) {
                    var childStr = str[i].split(' ');
                    totalRL += parseInt(childStr[1].split('=')[1].replace("MB"));
                    usedRL += parseInt(childStr[2].split('=')[1].replace("MB"));
                }
                return (usedRL / 1024).toFixed(2) + '/' + (totalRL / 1024).toFixed(2) + 'GB（使用率：' + ((usedRL / totalRL)* 100).toFixed(
                    2)  + '%)';
					return my_time;
            },
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
                                that.startTime = that.getDuration(uptime);
                            }

                            let rt106 = map["rt106"];
                            let rt107 = map["rt107"];

							if (typeof(rt107) == "undefined") {
                                rt107 = 0;
                            } else {
                                rt107 = parseInt(rt107);
                            }

                            if (typeof(rt106) == "undefined") {
                                rt106 = 0;
                            } else {
                                rt106 = rt107-parseInt(rt106);
                            }


                            that.nc = (rt106/ 1048576).toFixed(2) + '/' + (rt107 / 1048576).toFixed(2) + 'GB（使用率：' + (((rt106/1024) / (rt107/1024))* 100).toFixed(2)  + '%)';


                            let rt105 = map["rt105"];
                            if (typeof(rt105) == "undefined") {
                                that.yp = '暂无信息';
                            } else {
                                that.yp = that.ypjs(rt105);
                            }


                            let rt108 = map["rt108"];
                            if (typeof(rt108) == "undefined") {
                                that.cpu = '暂无信息';
                            } else {
                                that.cpu = rt108;
                            }


                            let rt117 = map["rt117"];
                            if (typeof(rt117) == "undefined") {
                                rt117 = 0;
                            } else {
                                // rt117解析
                                var rtll7Array = rt117.split(';');


                                for (var i = 0; i < rtll7Array.length; i++) {
                                    var itemStr = rtll7Array[i];
                                    if (itemStr.indexOf('filenet=') != -1) {
                                        var ipfsarray = itemStr.replace('filenet=', '').split(",");
                                        that.ipfsUrl = ipfsarray[0];
                                        that.ipfsState = ipfsarray[1] === "1" ? "开启" : "关闭";
                                    } else if (itemStr.indexOf('minergate=') != -1) {
                                        var minergatearray = itemStr.replace('minergate=', '').split(",");
                                        that.minergateType = minergatearray[0];
                                        that.minergateUrl = minergatearray[1];
                                        that.minergateState = minergatearray[2] === "1" ? "开启" : "关闭";
                                    } else if (itemStr.indexOf('f2pool=') != -1) {
                                        var f2poolarray = itemStr.replace('f2pool=', '').split(",");
                                        that.f2poolName = f2poolarray[0]+that.row.mac;
                                        that.f2poolType = f2poolarray[1] + "(" + f2poolarray[2] + ")";
                                        that.f2poolUrl = f2poolarray[3];
                                        that.f2poolState = f2poolarray[4] === "1" ? "开启" : "关闭";
                                        that.f2poolTotall = f2poolarray[5];
                                        that.f2poolLine = f2poolarray[6];
                                        that.f2poolZsy = f2poolarray[7];
                                        that.f2poolGqsy = f2poolarray[8];
                                        that.f2poolSl = f2poolarray[9];
                                    }
                                    else if (itemStr.indexOf('ip=') != -1) {
                                        that.ip = itemStr.replace('ip=', '');
                                    }
                                }
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
