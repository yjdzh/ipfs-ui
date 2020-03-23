<template>
	<EVpageForm :pageTitle="pageTitle+title" :model="formValidate" :rules="infoChangeRules" :labelWidth="120"
	 :doSubmitBefor="doSubmitBefor" :submitUrl="submitUrl" :submitType="submitType" :doReset="creat" :doCancal="doCancal"
	 :pageload="pageload" :readonly="seetype">
		<div slot="form">

			<Row>
				<EVitemContainer label="钱包" prop="walletId" :span="12">
					<Select v-model="formValidate.walletId" :disabled="openType!=-1">
						<Option :value="walletOption.id" :label="walletOption.allName" v-for="walletOption in walletOptions" :key="walletOption.index"></Option>
					</Select>
				</EVitemContainer>

				<EVitemContainer label="奖励时间" prop="playTime" :span="12">
<!--                    {{formValidate.playTime}}-->
<!--					<Input v-model.trim="formValidate.playTime" placeholder="请输入奖励时间"></Input>-->
                    <DatePicker type="datetime" v-model="formValidate.playTime" :options="options3"  format="yyyy-MM-dd HH:mm:ss" placeholder="请输入奖励时间" style="width: 200px"></DatePicker>
				</EVitemContainer>

			</Row>
			<Row>
				<EVitemContainer label="奖励总数" prop="playMoney" :span="12">
					<EVinputNumber v-model="formValidate.playMoney" :min="-100000" :max="100000" :precision="0" placeholder="请输入奖励总数"></EVinputNumber>
				</EVitemContainer>
				<EVitemContainer label="奖励方式" prop="playType" :span="12">
					<RadioGroup v-model="formValidate.playType" type="button">
						<Radio :label="0">所有客户平均分配</Radio>
						<Radio :label="1">指定客户</Radio>
					</RadioGroup>
				</EVitemContainer>
			</Row>


			<Row >
				<EVitemContainer label="奖励客户" prop="puserId" :span="12" v-if="formValidate.playType==1">
                    <Select v-model="formValidate.puserId" filterable>
                        <Option :value="item.id" :label="item.name" v-for="item in mpuserOptions" :key="item.index"></Option>
                    </Select>
				</EVitemContainer>

                <EVitemContainer label="奖励说明" prop="remark" :span="12">
                        <Input v-model.trim="formValidate.remark" placeholder="请输入奖励说明"></Input>
                    </EVitemContainer>
                </Row>

			</Row>
		</div>
	</EVpageForm>
</template>

<script>
	export default {
		name: "mplayrule",
		data() {
			var _this = this
			return {
                seetype:false,
                options3: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() ;
                        // return date && date.valueOf() < Date.now() - 86400000;
                        // 时间选择器过滤
                    }
                },
				api: {
					base: '/mplayrule',
					access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),
				},
				pageTitle: '活动奖励-',
				pageload: true,
				search: '111',
				current: 1,
				openType: -1,
				walletOptions: [ //下拉选项

				],

				formValidate: {
					walletId: '',
					playType: 0,
					playMoney: '',
					playTime: '',
					puserId:'',
                    remark:''
				},

				infoChangeRules: {
                    walletId: [{
						type: 'number',
                        required: true,
						message: '请选择数据中心钱包',
						trigger: 'change'
					}],
					playMoney: [{
						type: 'number',
						required: true,
						message: '请输入奖励总数',
						trigger: 'blur'
					}],
					playType: [{
                        type:'number',
						required: true,
						message: '请选择奖励方式',
						trigger: 'blur'
					}],
					playTime: [{
					    type:'date',
						required: true,
						message: '请输入奖励时间',
						trigger: 'blur'
					}],
                    puserId: [{
                        type:'number',
                        required: true,
                        message: '请选择奖励客户',
                        trigger: 'blur'
                    }],
                    remark: [
                        {
                            type: 'string',
                            max: 512,
                            message: '输入字符不得多于512个',
                            trigger: 'change'
                        }
                    ],

				},
                mpuserOptions:[],
			}
		},

		computed: {
			doCancal() {
				return {
					name: 'msygl-mplayrule',
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
		    getmpuser(){
                this.Global.fun(this, 'get', {
                        base: '/mpuser',
                        other: '/all?',
                        access_token: this.api.access_token,
                    }, {},
                    function(res, that) {
                        if (res.data.status == 1) {
                            that.$Message.destroy();
                            that.mpuserOptions = res.data.data
                        } else {
                            that.$Message.destroy();
                            that.$Message.error(res.data.msg);
                        }

                    })
            },
			doSubmitBefor: function(data, e) {

                data.playTime= Date.parse(data.playTime)

			},
			creat() {
				this.Global.fun(this, 'get', {
						base: '/mwallet',
						other: '/all?',
						access_token: this.api.access_token,
					}, {},
					function(res, that) {
						if (res.data.status == 1) {
							that.$Message.destroy();
							that.walletOptions = res.data.data
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
                                res.data.data.playTime=new Date(res.data.data.playTime)
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
            this.getmpuser()
			this.creat()


            // console.log(new Date(1563811200000))
		}
	}
</script>

<style scoped>

</style>
