<template>
	<EVpageForm :pageTitle="pageTitle+title" :model="formValidate" :rules="infoChangeRules" :labelWidth="120"
	 :doSubmitBefor="doSubmitBefor" :submitUrl="submitUrl" :submitType="submitType" :doReset="creat" :doCancal="doCancal"
	 :pageload="pageload">
		<div slot="form">

			<Row>
				<EVitemContainer label="云池钱包" prop="zoneVirId" :span="12">
					<Select v-model="formValidate.zoneVirId" :disabled="this.openType!=-1">
						<Option :value="zoneVirOption.id" :label="zoneVirOption.allName"  v-for="zoneVirOption in zoneVirOptions" :key="zoneVirOption.index"></Option>
					</Select>
				</EVitemContainer>

				<EVitemContainer label="记提比例" prop="accrue" :span="12">
					<EVinputNumber v-model="formValidate.accrue" :min="1" :max="99" placeholder="请输入记提比例(%)"></EVinputNumber>
				</EVitemContainer>

			</Row>
			<Row>

				<EVitemContainer label="分配方式" prop="alloteType" :span="12">
					<RadioGroup v-model="formValidate.alloteType" type="button">
						<Radio :label="0">客户在线矿机数量</Radio>
						<Radio :label="1">客户矿机总数</Radio>
					</RadioGroup>
				</EVitemContainer>
			</Row>

		</div>
	</EVpageForm>
</template>

<script>
	export default {
		name: "malloter",
		data() {
			var _this = this
			return {
				api: {
					base: '/malloter',
					access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),
				},

				pageTitle: '收益分配-',
				pageload: true,
				search: '111',
				current: 1,
				openType: -1,

				zoneVirOptions: [ //下拉选项

				],
				formValidate: {
					zoneVirId: '',
					alloteType: '',
					accrue: '',
				},

				infoChangeRules: {
					zoneVirId: [{
						type: 'number',
						required: true,
						message: '请选择云池钱包',
						trigger: 'change'
					}],

					accrue: [{
						type: 'number',
						required: true,
						message: '请输入记提比例',
						trigger: 'blur'
					}],
					alloteType: [{
                        type: 'number',
						required: true,
						message: '请选择分配方式',
						trigger: 'blur'
					}],

				},
			}
		},

		computed: {
			doCancal() {
				return {
					name: 'msygl-malloter',
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
				this.Global.fun(this, 'get', {
						base: '/mzonevir',
						other: '/all?',
						access_token: this.api.access_token,
					}, {},
					function(res, that) {
						if (res.data.status == 1) {
							that.$Message.destroy();
							that.zoneVirOptions = res.data.data
						} else {
							that.$Message.destroy();
							that.$Message.error(res.data.msg);
						}

					})



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
								for (var key in res.data.data) {
									if (res.data.data[key] === null) {
										res.data.data[key] = ''
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
			this.creat()
		}
	}
</script>

<style scoped>

</style>
