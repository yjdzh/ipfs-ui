<template>
	<EVpageForm :pageTitle="pageTitle+title" :model="formValidate" :rules="infoChangeRules" :labelWidth="120"
	 :doSubmitBefor="doSubmitBefor" :submitUrl="submitUrl" :submitType="submitType" :doReset="creat" :doCancal="doCancal"
	 :pageload="pageload">
		<div slot="form">



			<Row>
				<EVitemContainer label="类型" prop="type" :span="24">
					<Input v-model.trim="formValidate.type" placeholder="请输入类型"></Input>
				</EVitemContainer>
			</Row>

			<Row>
				<EVitemContainer label="内容" prop="content" :span="24">
					<Input type="textarea" :autosize="{minRows: 4,maxRows: 10}" v-model="formValidate.content" placeholder="请输入内容"></Input>
				</EVitemContainer>
			</Row>


		</div>
	</EVpageForm>
</template>

<script>
	export default {
		name: "mad",
		data() {
			var _this = this

			return {
				api: {
					base: '/mad',
					access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),

				},

				pageTitle: '公告管理-',
				pageload: true,
				search: '111',
				current: 1,
				openType: -1,


				formValidate: {
					content: '',
					type: '',
				},

				infoChangeRules: {
					type: [{
						required: true,
						message: '类型不能为空',
						trigger: "blur"
					}, {
						type: 'string',
						max: 50,
						message: '输入字符不得多于50个',
						trigger: 'change'
					}],
					content: [{
						required: true,
						message: "内容不能为空",
						trigger: "blur"
					},{
						type: 'string',
						max: 1000,
						message: '输入字符不得多于1000个',
						trigger: 'change'
					}]
				},

			}
		},

		computed: {
			doCancal() {
				debugger
				return {
					name: 'mbzgl-mad',
					query: {
						search: this.search,
						current: this.current,
					}
				}

			},
			title() {
				return Number(this.openType) === -1 ? '新增' : '编辑'
			},
			submitType() {
				return this.openType
			},
			submitUrl() {
				return this.openType === -1 ? this.api.base + '?' : this.api.base + '/' + this.openType + '?'
			},


		},
		methods: {
			doSubmitBefor: function(data, e) {

			},
			creat() {
				if (this.openType === -1 || this.openType === '-1') {
					this.pageload = false
				} else {
					this.Global.fun(this, 'get', {
							base: this.api.base,
							other: '/' + this.openType + '?',
							access_token: this.api.access_token,
						}, {},
						function(res, that) {
							const st = res.data.status
							if (st === 1) {
								debugger
								for (var key in res.data.data) {
									if (res.data.data[key] === null) {
										res.data.data[key] = ''
									}else if(key==='type'){
										res.data.data[key]=res.data.data[key]+'';
									}
								}

								var back = res.data.data;
								Object.keys(that.formValidate).forEach(function(key) {
									that.formValidate[key] = back[key];
								});
							} else {
								that.$Message.destroy();
								that.$Message.info(res.data.msg);
							}
							that.pageload = false;
						})
				}
			}
		},
		created() {
			this.openType = parseInt(this.$route.query.id)
			this.current = parseInt(this.$route.query.current)
			this.search = this.$route.query.search
			this.creat();
		}
	}
</script>

<style scoped>

</style>
