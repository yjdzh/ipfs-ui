<template>
	<EVpageForm :pageTitle="pageTitle+title" :model="formValidate" :rules="ruleValidate" :labelWidth="120" :doSubmitBefor="doSubmitBefor"
	 :submitUrl="submitUrl" :submitType="submitType" :doReset="creat" :doCancal="doCancal" :pageload="pageload">
		<div slot="form">

			<EVdivider orientation="left">基础信息</EVdivider>
			<Row>
				<EVitemContainer label="产品名称" prop="name" :span="12">
					<Input v-model.trim="formValidate.name" placeholder="请输入产品名称"></Input>
				</EVitemContainer>
				<EVitemContainer label="产品型号" prop="model" :span="12">
					<Input v-model.trim="formValidate.model" :disabled="this.openType===-1?false:true" placeholder="请输入产品型号,该项提交保存后,不可修改"></Input>
				</EVitemContainer>
			</Row>
			<Row>
				<EVitemContainer label="功耗" prop="powerInfo" :span="12">
					<Input v-model.trim="formValidate.powerInfo" placeholder="请输入功耗"></Input>
				</EVitemContainer>
				<EVitemContainer label="硬件配置" prop="hardInfo" :span="12">
					<Input v-model.trim="formValidate.hardInfo" placeholder="请输入配置信息"></Input>
				</EVitemContainer>

			</Row>

			<Row>
				<EVitemContainer label="物联网ProductKey" prop="productKey" :span="12">
					<Input v-model.trim="formValidate.productKey" placeholder="请输入阿里云物联网Key"></Input>
				</EVitemContainer>
			</Row>


			<EVdivider orientation="left">相关价格</EVdivider>

			<Row>
				<EVitemContainer label="自维价格" prop="maintainPrice" :span="12">
					<EVinputNumber v-model="formValidate.maintainPrice" :min="1" :max="100000"  :precision="2"  placeholder="请输入自维价格"></EVinputNumber>
				</EVitemContainer>
				<EVitemContainer label="自维折扣" prop="maintainDiscount" :span="12">
					<EVinputNumber v-model="formValidate.maintainDiscount" :min="0" :max="1"  :precision="2" placeholder="请输入自维折扣"></EVinputNumber>
				</EVitemContainer>

			</Row>
			<Row>
				<EVitemContainer label="托管价格" prop="trusteePrice" :span="12">
					<EVinputNumber v-model="formValidate.trusteePrice" :formatter="value => `${value} 元/月`" :min="1" :max="100000" :precision="2"
					 placeholder="请输入托管价格 (单位'元/月')"></EVinputNumber>
				</EVitemContainer>
				<EVitemContainer label="托管折扣" prop="trusteeDiscount" :span="12">
					<EVinputNumber v-model="formValidate.trusteeDiscount" :min="0" :max="1" :precision="2"  placeholder="请输入托管默认折扣"></EVinputNumber>
				</EVitemContainer>


			</Row>
			<Row>

				<EVitemContainer label="最低托管时长" prop="trusteeMin" :span="12">
					<EVinputNumber v-model="formValidate.trusteeMin" :formatter="value => `${value} 月`" :min="1" :max="100"
					 placeholder="请输入最低托管时长 (单位'月')" :precision="0"></EVinputNumber>
				</EVitemContainer>
			</Row>


			<EVdivider orientation="left">相关配置</EVdivider>
			<Row>
				<EVitemContainer label="上传设备图片" :span="12">
					<EVupload2 :actionUrl="actionUrl" :doAfterUpload="doAfterUpload" :type="type" :autoUpload="autoUpload" :tiptxt="tiptxt"></EVupload2>
				</EVitemContainer>


			</Row>
			<Row>
				<span v-if="showpic">
					<span class="fileName">文件名称：{{fileName}}</span>
					<img style="max-width: 400px;max-height: 400px" :src="'http://47.92.51.100/ipfs'+this.formValidate.img" alt="">
				</span>
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
			const codername = function(coder, value, callback) {
				if (value === '') {
					callback(new Error('请输入产品名称'));
				} else {

					if (!_this.formValidate.name.match(_this.Regex.regexlist.chennum_)) {
						callback(new Error('只能输入中文、英文或数字'));
					} else if (_this.formValidate.name.length < 2) {
						callback(new Error('请至少输入2个字'));
					} else if (_this.formValidate.name.length > 50) {
						callback(new Error('最多只能输入50个字'));
					} else {

						_this.Global.ajax(
							_this,
							'get', {
								base: _this.api.base,
								other: '/existByName?',
								access_token: _this.api.access_token
							},
							function() {
								if (_this.openType !== -1) {
									return {
										name: _this.formValidate.name,
										id: _this.openType
									}
								} else {
									return {
										name: _this.formValidate.name,

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
			const codermodel = function(coder, value, callback) {
				if (value === '') {
					callback(new Error('请输入产品型号'));
				} else {

					if (!_this.formValidate.model.match(_this.Regex.regexlist.chennum_)) {
						callback(new Error('只能输入中文、英文或数字'));
					} else if (_this.formValidate.model.length < 2) {
						callback(new Error('请至少输入2个字'));
					} else if (_this.formValidate.model.length > 50) {
						callback(new Error('最多只能输入50个字'));
					} else {
						_this.Global.ajax(
							_this,
							'get', {
								base: _this.api.base,
								other: '/existByModel?',
								access_token: _this.api.access_token
							},
							function() {
								if (_this.openType !== -1) {
									return {
										model: _this.formValidate.model,
										id: _this.openType
									}
								} else {
									return {
										model: _this.formValidate.model,

									}
								}
							}(),
							aa)

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
					base: '/mproduct',
					access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),

				},
				tiptxt: '最佳尺寸：512像素x384像素；最佳大小：1M',
				pageTitle: '产品管理-',
				pageload: true,
				openType: -1,
				type: ['img', 'png', 'jpg'],
				doCancal: {
					name: 'mcpgl-mproduct',
				},
				fileName: '',
				formValidate: {
					hardInfo: '',
					img: '',
					maintainDiscount: '',
					maintainPrice: '',
					maintainStock: '',
					model: '',
					name: '',
					powerInfo: '',
					trusteeDiscount: '',
					trusteeMin: '',
					trusteePrice: '',
					trusteeStock: '',
					productKey: '',

				},
				autoUpload: true,
				ruleValidate: {
					hardInfo: [
                        {
                            type: 'string',
                            max: 50,
                            message: '输入字符不得多于50个',
                            trigger: 'change'
                        },
                    ],
					img: [],
					maintainDiscount: [{
						type: 'number',
						required: true,
						message: '请输入自维折扣',
						trigger: 'blur'
					}],
					maintainPrice: [{
						type: 'number',
						required: true,
						message: '请输入自维价格',
						trigger: 'blur'
					}],
					maintainStock: [],
					model: [{
						required: true,
						validator: codermodel,
						trigger: 'blur'
					}, ],
					name: [{
							required: true,
							validator: codername,
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 20,
							message: '输入字符不得多于20个',
							trigger: 'change'
						},
					],
					productKey: [{
							required: true,
							message: '请输入物联网ProductKey',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 50,
							message: '输入字符不得多于50个',
							trigger: 'change'
						},
					],

					powerInfo: [{
						type: 'string',
						max: 50,
						message: '输入字符不得多于50个',
						trigger: 'blur'
					}],
					trusteeDiscount: [{
						type: 'number',
						required: true,
						message: '请输入托管折扣',
						trigger: 'blur'
					}],
					trusteeMin: [{
						type: 'number',
						required: true,
						message: '请输入最低托管时长',
						trigger: 'blur'
					}],
					trusteePrice: [{
						type: 'number',
						required: true,
						message: '请输入托管价格',
						trigger: 'blur'
					}],
					trusteeStock: [],
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
				return '/mproduct/upload?' + this.api.access_token
			},
			showpic() {
				if (this.formValidate.img) {
					return true
				} else {
					return false
				}

			}

		},
		methods: {
			doAfterUpload(e) {
				console.log(e)
				this.formValidate.img = e.data.data.url
				this.fileName = e.data.data.fileName
				console.log(this.img)

			},
			doSubmitBefor: function(data, e) {},
			creat() {
				if (this.openType === -1 || this.openType === '-1') {

					this.formValidate.hardInfo = '',
						this.formValidate.img = '',
						this.formValidate.maintainDiscount = '',
						this.formValidate.maintainPrice = '',
						this.formValidate.maintainStock = '',
						this.formValidate.model = '',
						this.formValidate.name = '',
						this.formValidate.powerInfo = '',
						this.formValidate.trusteeDiscount = '',
						this.formValidate.trusteeMin = '',
						this.formValidate.trusteePrice = '',
						this.formValidate.trusteeStock = '',
						this.autoUpload = false,

						this.autoUpload = true,
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

									if (that.formValidate[key] == null) {
										that.formValidate[key] = '暂无数据';
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
	.fileName {
		max-width: 150px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: inline-block;
		float: left;
		margin-right: 10px;
	}
</style>
