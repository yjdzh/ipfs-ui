<template>
	<EVpageForm :pageTitle="pageTitle+title" :model="formValidate" :rules="infoChangeRules" :labelWidth="120"
	 :doSubmitBefor="doSubmitBefor" :submitUrl="submitUrl" :submitType="submitType" :doReset="creat" :doCancal="doCancal"
	 :pageload="pageload">
		<div slot="form">

			<Row>
				<EVitemContainer label="类型" prop="type" :span="12">
					<RadioGroup v-model="formValidate.type" type="button">
						<Radio label="0">新手问题</Radio>
						<Radio label="1">星际特工问题</Radio>
					</RadioGroup>
				</EVitemContainer>

			</Row>

			<Row>
				<EVitemContainer label="问题" prop="ques" :span="24">
					<Input v-model="formValidate.ques" placeholder="请输入问题"></Input>
				</EVitemContainer>
			</Row>

			<Row>
				<EVitemContainer label="回答" prop="replay" :span="24">
					<Input type="textarea" :autosize="{minRows: 4,maxRows: 10}" v-model="formValidate.replay" placeholder="请输入回答"></Input>
				</EVitemContainer>
			</Row>


		</div>
	</EVpageForm>
</template>

<script>
	export default {
		name: "mquestions",
		data() {
			var _this = this

			return {
				api: {
					base: '/mquestion',
					access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),

				},

				pageTitle: '帮助管理-',
				pageload: true,
				search: '111',
				current: 1,
				openType: -1,


				formValidate: {
					ques: '',
					replay: '',
					type: '',
				},

				infoChangeRules: {
					ques: [{
						required: true,
						message: '问题不能为空',
						trigger: "blur"
					}, {
						type: 'string',
						max: 50,
						message: '输入字符不得多于50个',
						trigger: 'change'
					}],
					replay: [{
						required: true,
						message: "回答不能为空",
						trigger: "blur"
					}],
					type: [{
							required: true,
							message: '请选择类型',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 50,
							message: '输入字符不得多于50个',
							trigger: 'change'
						}
					]
				},

			}
		},

		computed: {
			doCancal() {
				debugger
				return {
					name: 'mbzgl-mquestion',
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
