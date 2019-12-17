<template>
	<EVpageForm :pageTitle="pageTitle+title" :model="formValidate" :rules="ruleValidate" :labelWidth="120" :doSubmitBefor="doSubmitBefor"
	 :submitUrl="submitUrl" :submitType="submitType" :doReset="creat" :doCancal="doCancal" :pageload="pageload">
		<div slot="form">
			<Row>
				<EVitemContainer label="所属产品名称" prop="productId" :span="12">
					<Select v-model="formValidate.productId">
						<Option :value="option.id" v-text="option.name" v-for="option in options" :key="option.index"></Option>
					</Select>
				</EVitemContainer>
				<EVitemContainer label="SN" prop="left" :span="12">
					<Input v-model="formValidate.left" placeholder="请输入SN"></Input>
				</EVitemContainer>
			</Row>
			<Row>
				<EVitemContainer label="mac" prop="mac" :span="12">
					<Input v-model="formValidate.mac" placeholder="请输入mac"></Input>
				</EVitemContainer>

			</Row>
			<Row>
				<EVitemContainer label="生产厂商" prop="mfrs" :span="12">
					<Input v-model="formValidate.mfrs" placeholder="请输入生产厂商"></Input>
				</EVitemContainer>
				<EVitemContainer label="销售类型" prop="saleState" :span="12">
					<RadioGroup v-model="formValidate.saleState" type="button">
						<Radio label="1">自维</Radio>
						<Radio label="0">托管</Radio>
					</RadioGroup>
				</EVitemContainer>
			</Row>

			<Row>
				<EVitemContainer label="业务状态" prop="orderaudit" :span="12">
					<RadioGroup v-model="formValidate.orderaudit" type="button">
						<Radio label="0">库存</Radio>
						<!--<Radio label="1" >预销售</Radio>-->
						<!--<Radio label="2" >销售</Radio>-->
						<!--<Radio label="3" >到期</Radio>-->
						<!--<Radio label="4" >报废</Radio>-->
						<!--<Radio label="5" >退货</Radio>-->
						<Radio label="6">测试</Radio>

					</RadioGroup>
				</EVitemContainer>
				<!--<EVitemContainer label="出厂日期" prop="factoryDate" :span="12">-->
				<!--<DatePicker type="date"  placeholder="请选择出厂日期"-->
				<!--@on-change="change"-->
				<!--v-model="formValidate.factoryDate" :editable="false" format="yyyy-MM-dd"></DatePicker>-->
				<!--</EVitemContainer>-->
			</Row>


		</div>
	</EVpageForm>
</template>

<script>
	export default {
		name: "msetups",
		data() {
			var _this = this

			// const isJsonString = function (str) {
			//
			//     if (typeof str == 'string') {
			//         try {
			//             var obj = JSON.parse(str);
			//             if (typeof obj == 'object' && obj) {
			//                 return true;
			//             } else {
			//                 return false;
			//             }
			//
			//         } catch (e) {
			//
			//             return false;
			//         }
			//     }
			//
			// }


			// const coderhardInfo = function (coder, value, callback) {
			//
			//     if ((_this.formValidate.hardInfo !== '')) {
			//         const str =_this.formValidate.hardInfo
			//         if (typeof str == 'string') {
			//             try {
			//                 var obj = JSON.parse(str);
			//                 if (typeof obj == 'object' && obj) {
			//                     callback();
			//                 } else {
			//                     callback(new Error('JSON格式异常'));
			//                 }
			//
			//             } catch (e) {
			//
			//                 callback(new Error('JSON格式异常'));
			//             }
			//         }
			//
			//     }
			//
			// }
			const codermac = function(coder, value, callback) {
				if (value === '') {
					callback(new Error('请输入mac'));
				} else {


					if (_this.formValidate.mac.length !== 12) {
						callback(new Error('请至少输入12个字'));
					} else {

						_this.Global.ajax(
							_this,
							'get', {
								base: '/mstocks',
								other: '/existByMac?',
								access_token: _this.api.access_token
							},
							function() {
								if (_this.openType !== -1) {
									return {
										mac: _this.formValidate.mac,
										id: _this.openType
									}
								} else {
									return {
										mac: _this.formValidate.mac,

									}
								}
							}(), aa
						)

						function aa(a, b) {
							if (a.data.status === 0) {
								return callback(new Error(a.data.msg));
							} else {
								return callback()
							}
						}
					}
				}
			};

			return {
				api: {
					base: '/mdev',
					access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),

				},

				pageTitle: '库存管理-',
				pageload: true,
				openType: -1,
				type: ['img', 'png', 'jpg'],
				doCancal: {
					name: 'msbgl-mstocks',
				},
				options: [ //下拉选项

				],
				formValidate: {
					productId: '',
					left: '',
					mac: '',
					mfrs: '',
					saleState: '',
					orderaudit: '',

				},
				ruleValidate: {
					productId: [{
						type: 'number',
						required: true,
						message: '请选择所属产品名称',
						trigger: 'change'
					}],
					left: [{
						type: 'string',
						max: 50,
						message: '输入字符不得多于50个',
						trigger: 'change'
					}],

					mac: [{
							required: true,
							validator: codermac,
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 12,
							message: '输入字符不得多于12个',
							trigger: 'change'
						}
					],
					mfrs: [{
							required: true,
							message: '请选择生产厂商',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 50,
							message: '输入字符不得多于50个',
							trigger: 'change'
						}
					],
					saleState: [{
							required: true,
							message: '请选择销售类型',
							trigger: 'blur'
						}
					],
					orderaudit: [{
							required: true,
							message: '请选择业务状态',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 50,
							message: '输入字符不得多于50个',
							trigger: 'change'
						}
					],


				},
			}
		},

		computed: {
			title() {
				return Number(this.openType) === -1 ? '新增' : '编辑'
			},
			submitType() {
				return this.openType
			},
			submitUrl() {
				return this.openType === -1 ? this.api.base + '?' : this.api.base + '/' + this.openType + '?'
			},
			actionUrl() {
				return '/mproduct/upload/' + this.openType + this.api.access_token
			}

		},
		methods: {
			doAfterUpload(e) {
				this.switch = e

			},
			doSubmitBefor: function(data, e) {},
			creat() {
				this.Global.fun(this, 'get', {
						base: '/mproduct',
						other: '/all?',
						access_token: this.api.access_token,
					}, {},
					function(res, that) {
						if (res.data.status == 1) {
							that.options = res.data.data
						} else {
							that.$Message.destroy();
							that.$Message.info(res.data.msg);
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
										res.data.data[key] = '暂无数据'
									}
								}

								var back = res.data.data;
								Object.keys(that.formValidate).forEach(function(key) {


									if (that.formValidate[key] == null) {
										that.formValidate[key] = '';
									} else {
										that.formValidate[key] = back[key];
									}
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
			this.creat()
		}
	}
</script>

<style scoped>

</style>
