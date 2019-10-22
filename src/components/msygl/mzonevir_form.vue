<template>
    <EVpageForm :pageTitle="pageTitle+title" :model="formValidate" :rules="infoChangeRules"
                :labelWidth="120" :doSubmitBefor="doSubmitBefor"
                :submitUrl="submitUrl" :submitType="submitType" :doReset="creat" :doCancal="doCancal"
                :pageload="pageload">
        <div slot="form">

            <Row>
				<EVitemContainer label="云池" prop="zoneId" :span="12" >
					<Select v-model="formValidate.zoneId" :disabled="this.openType!=-1">
						<Option :value="zoneOption.id" :label="zoneOption.name" v-for="zoneOption in zoneOptions" :key="zoneOption.index"></Option>
					</Select>
				</EVitemContainer>

                <EVitemContainer label="币种" prop="virId" :span="12" >
                   <Select v-model="formValidate.virId" :disabled="this.openType!=-1">
						<Option :value="virOption.id" :label="virOption.name" v-for="virOption in virOptions" :key="virOption.index"></Option>
					</Select>
                </EVitemContainer>
            </Row>
            <Row>
				<EVitemContainer label="钱包地址" prop="realMoneyUrl" :span="12">
                    <Input v-model="formValidate.realMoneyUrl"     placeholder="请输入钱包地址"></Input>
                </EVitemContainer>

				<EVitemContainer label="收益获取时间" prop="cycleTime" :span="12">

<!--					 <Input v-model="formValidate.cycleTime"  placeholder="请输入收益获取时间(HH:mm:ss)"></Input>-->
                    <TimePicker :value="formValidate.cycleTime" @on-change=ochange    format="HH:mm:ss" placeholder="请输入收益获取时间" style="width: 168px"></TimePicker>

                </EVitemContainer>
            </Row>

			<Row>
				<EVitemContainer label="最小提币额度" prop="minQuota" :span="12">
                    <EVinputNumber v-model="formValidate.minQuota" :min="1" :max="10000" placeholder="请输入最小提币额度"></EVinputNumber>
				</EVitemContainer>

				<EVitemContainer label="办结时长(小时)" prop="transact" :span="12">
					<EVinputNumber v-model="formValidate.transact" :min="1" :max="168" placeholder="请输入办结时长(小时)"></EVinputNumber>
				</EVitemContainer>
            </Row>


        </div>
    </EVpageForm>
</template>

<script>
    export default {
        name: "mzonevir",
        data () {
            var _this = this
            const zoneId = function(coder, value, callback) {
                if (value === '') {
                    callback(new Error('请选择所属云池'));
                } else {


                    if (_this.formValidate.zoneId.length >= 12) {
                        callback(new Error('输入过长'));
                    } else {

                        _this.Global.ajax(
                            _this,
                            'get', {
                                base: '/mzonevir/',
                                other: '/exist?',
                                access_token: _this.api.access_token
                            },
                            function() {
                                if (_this.openType !== -1) {
                                    return {
                                        zoneId: _this.formValidate.zoneId,
                                        id: _this.openType
                                    }
                                } else {
                                    return {
                                        zoneId: _this.formValidate.zoneId,

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
            const virId = function(coder, value, callback) {
                if (value === '') {
                    callback(new Error('请选择所属币种'));
                } else {


                    if (_this.formValidate.virId.length >= 12) {
                        callback(new Error('输入过长'));
                    } else {

                        _this.Global.ajax(
                            _this,
                            'get', {
                                base: '/mvirdict',
                                other: '/exist?',
                                access_token: _this.api.access_token
                            },
                            function() {
                                if (_this.openType !== -1) {
                                    return {
                                        virId: _this.formValidate.virId,
                                        id: _this.openType
                                    }
                                } else {
                                    return {
                                        virId: _this.formValidate.virId,

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
                    base: '/mzonevir',
                    access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),
                },

                pageTitle: '云池钱包-',
                pageload: true,
                search: '111',
                current: 1,
                openType: -1,

				zoneOptions: [ //下拉选项

				],

				virOptions: [ //下拉选项

				],


                formValidate: {
                    zoneId: '',
                    virId: '',
                    realMoneyUrl: '',
                    cycleTime: '',
					minQuota:'',
					transact:'',
                },

                infoChangeRules: {
					zoneId: [{
						type: 'number',
						required: true,
						message: '请选择所属云池',
                        // validator: zoneId,
						trigger: 'change'
					}],
					virId: [{
						type: 'number',
						required: true,
                        // validator: virId,
						message: '请选择所属币种',
						trigger: 'change'
					}],
					realMoneyUrl: [{
							required: true,
							message: '请输入钱包地址',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 100,
							message: '输入字符不得多于100个',
							trigger: 'change'
						}
					],
					cycleTime: [{

						required: true,
						message: '请输入收益获取时间',
						trigger: 'blur'
					}],
					minQuota: [{
						type: 'number',
						required: true,
						message: '请输入最小提币额度',
						trigger: 'blur'
					}],
					transact: [{
						type: 'number',
						required: true,
						message: '请输入办结时长',
						trigger: 'blur'
					}],
                },
            }
        },

        computed: {
            doCancal() {
                return{
                    name: 'msygl-mzonevir',
                    query: {
                        search: this.search,
                        current: this.current,
                    }
                }

            },
            title () {
                return Number(this.openType) === -1 ? '新增' : '编辑'
            },
            submitType () {
                return this.openType
            },
            submitUrl () {
                return this.openType === -1 ? this.api.base + '?' : this.api.base + '/' + this.openType + '?'
            },


        },
        methods: {
            ochange(e){

                this.formValidate.cycleTime=e
            },
            doSubmitBefor: function (data, e) {

            },
            creat () {
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


				  this.Global.fun(this, 'get', {
							base: '/mvirdict',
							other: '/all?',
							access_token: this.api.access_token,
						}, {},
						function(res, that) {
							if (res.data.status == 1) {
								that.$Message.destroy();
								that.virOptions = res.data.data
							} else {
								that.$Message.destroy();
								that.$Message.error(res.data.msg);
							}

				})
                if (this.openType === -1 || this.openType === '-1') {
                    this.pageload = false
                }
                else {
                    this.Global.fun(this, 'get', {
                            base: this.api.base,
                            other: '/' + this.openType + '?',
                            access_token: this.api.access_token,
                        },
                        {},
                        function (res, that) {
                            const st = res.data.status
                            if (st === 1) {
                                for (var key in res.data.data) {
                                    if (res.data.data[key] === null) {
                                        res.data.data[key] = ''
                                    }
                                }

                                var back = res.data.data;

                                Object.keys(that.formValidate).forEach(function (key) {
                                        that.formValidate[key] = back[key];

                                });


                            }
                            else {
                                that.$Message.destroy();
                                that.$Message.info(res.data.msg);
                            }
                            that.pageload = false;


                        })
                }
            }
        },
        created () {
            this.openType = parseInt(this.$route.query.id)
            this.current = parseInt(this.$route.query.current)
            this.search = this.$route.query.search
            this.creat()

        }
    }
</script>

<style scoped>

</style>
