<template>
	<EVpageForm :pageTitle="pageTitle+title" :model="formValidate" :rules="ruleValidate" :labelWidth="120" :doSubmitBefor="doSubmitBefor"
	 :submitUrl="submitUrl" :submitType="submitType" :doReset="creat" :doCancal="doCancal" :pageload="pageload">
		<div slot="form">
			<Row>
				<EVitemContainer label="所属产品" prop="productId" :span="24">
					<Select v-model="formValidate.productId">
						<Option :value="option.id" v-text="option.name" v-for="option in options" :key="option.index"></Option>
					</Select>
				</EVitemContainer>
			</Row>
			<Row>

				<EVitemContainer label="mac" prop="mac" :span="12">
					<Input v-model="formValidate.mac" placeholder="请输入mac"></Input>
				</EVitemContainer>
				<EVitemContainer label="SN" prop="sn" :span="12">
					<Input v-model="formValidate.sn" placeholder="请输入SN"></Input>
				</EVitemContainer>

			</Row>
			<Row>
				<EVitemContainer label="生成厂商" prop="mfrs" :span="12">
					<Input v-model="formValidate.mfrs" placeholder="请输入生成厂商"></Input>
				</EVitemContainer>
				<EVitemContainer label="出厂日期" prop="factoryDate" :span="12">
					<DatePicker type="date" placeholder="请选择出厂日期" @on-change="change" v-model="formValidate.factoryDate" :editable="false"
					 format="yyyy-MM-dd"></DatePicker>
				</EVitemContainer>
			</Row>

			<Row>
				<EVitemContainer label="销售类型" prop="saleState" :span="12">
					<RadioGroup v-model="formValidate.saleState" type="button">
						<Radio label="0">自维</Radio>
						<Radio label="1">托管</Radio>
					</RadioGroup>
				</EVitemContainer>
				<EVitemContainer label="业务状态" prop="bussState" :span="12">
					<RadioGroup v-model="formValidate.bussState" type="button">
						<Radio label="0">库存</Radio>
						<!-- <Radio label="6">测试</Radio> -->
					</RadioGroup>
				</EVitemContainer>
			</Row>

			<!-- <Row v-if="formValidate.saleState!=0"> -->
            <Row>
				<EVitemContainer label="数据中心" prop="zoneId" :span="12">

					<Select v-model="formValidate.zoneId">
						<Option :value="zoneOption.id" v-text="zoneOption.name" v-for="zoneOption in zoneOptions" :key="zoneOption.index"></Option>
					</Select>
				</EVitemContainer>

				<EVitemContainer label="IP" prop="ip" :span="12">
					<Input v-model="formValidate.ip" placeholder="请输入ip"></Input>
				</EVitemContainer>
			</Row>

		</div>
	</EVpageForm>
</template>

<script>
	export default {
		name: "msetups",
		data() {
			var _this = this

			const codermac = function(mac, oldValue, callback) {
				if (oldValue === '') {
					callback(new Error('请输入设备mac'));
				} else {
					let newValue=oldValue.replace(/:/g, "").replace(/：/g, "").replace(/-/g, "").replace(/_/g, "");
					if (newValue.length !== 12) {
						callback(new Error('有效的mac地址为12位'));
					} else if (!newValue.match(/[A-Fa-f0-9]{12}/)) {
						callback(new Error('请输入正确mac地址'));
					} else {
						_this.Global.ajax(
							_this,
							'get', {
								base: _this.api.base,
								other: '/existByMac?',
								access_token: _this.api.access_token
							},
							function() {
								if (_this.openType !== -1) {
									return {
										mac: newValue,
										id: _this.openType
									}
								} else {
									return {
										mac: newValue,
									}
								}
							}(), aa
						)

						function aa(a, b) {
							if (a.data.status === 0) {
								return callback(new Error('该mac地址已存在'));
							} else {
								_this.formValidate.mac=newValue;
								return callback()
							}
						}
					}
				}
			};

			return {
				api: {
					base: '/mstocks',
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


				zoneOptions: [ //下拉选项

				],
				formValidate: {
					productId: '',
					zoneId:'',
					sn: '',
					mac: '',
					mfrs: '',
					saleState: '',
					bussState: '',
					factoryDate: '',
					ip:'',
				},
				ruleValidate: {
					productId: [{
						type: 'number',
						required: true,
						message: '请选择所属产品',
						trigger: 'change'
					}],
					sn: [{
						required: true,
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
							max: 30,
							message: '输入字符不得多于30个',
							trigger: 'change'
						}
					],
					mfrs: [{
							required: true,
							message: '请输入生产厂商',
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
						},
						{
							type: 'string',
							max: 50,
							message: '输入字符不得多于50个',
							trigger: 'change'
						}
					],
					bussState: [{
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
					factoryDate: [{
						required: true,
						type: 'date',
						message: '请选择出厂日期',
						trigger: 'change'
					}],
					ip: [
						{
							type: 'string',
							max: 20,
							message: '输入字符不得多于20个',
							trigger: 'change'
						}
					],
                    zoneId: [
                        {
                            type: 'number',
                            required: true,
                            message: '请选择数据中心',
                            trigger: 'change'
                        }
                    ],

				},
				factoryDate2: ''

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
			}

		},
		methods: {
			change(e) {
				this.factoryDate2 = e
			},

			doSubmitBefor: function(data, e) {
				data.factoryDate = this.factoryDate2
				data.bussState = this.formValidate.bussState.toString()

				// if(data.saleState==='1' && data.zoneId===''){
				// 	 e.$Message.destroy();
				// 	 e.$Message.info('请选择托管设备所属数据中心');
				// 	return;
				// }
				//alert(data.zoneId+","+data.bussState)
			},
			creat() {
				this.Global.fun(this, 'get', {
						base: '/mproduct',
						other: '/all?',
						access_token: this.api.access_token,
					}, {},
					function(res, that) {
						if (res.data.status == 1) {
							that.$Message.destroy();
							that.options = res.data.data
						} else {
							that.$Message.destroy();
							that.$Message.error(res.data.msg);
						}

				})
				this.Global.fun(this, 'get', {
							base: '/mzone',
							other: '/all?',
							access_token: this.api.access_token,
						}, {},
						function(res, that) {
							if (res.data.status == 1) {
								that.$Message.destroy();
								that.zoneOptions = res.data.data
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
