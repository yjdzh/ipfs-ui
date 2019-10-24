<template>
    <EVpageForm :pageTitle="pageTitle+title" :model="formValidate" :rules="infoChangeRules"
                :labelWidth="120" :doSubmitBefor="doSubmitBefor"
                :submitUrl="submitUrl" :submitType="submitType" :doReset="creat" :doCancal="doCancal"
                :pageload="pageload">
        <div slot="form">


            <Row>
                <EVitemContainer label="数据中心名称" prop="name" :span="12">
                    <Input v-model="formValidate.name" placeholder="请输入数据中心名称"></Input>
                </EVitemContainer>
                <EVitemContainer label="数据中心地址" prop="addr" :span="12">
                    <Input v-model="formValidate.addr" placeholder="请输入数据中心地址" :disabled="this.openType==-1?false:true"></Input>
                </EVitemContainer>
            </Row>
            <Row>
				<EVitemContainer label="联系人" prop="contactor" :span="12">
                    <Input v-model="formValidate.contactor"
                           placeholder="请输入联系人"></Input>
                </EVitemContainer>
                <EVitemContainer label="手机号码" prop="tel" :span="12">
                    <Input v-model="formValidate.tel"
                           placeholder="请输入手机号码"></Input>
                </EVitemContainer>
            </Row>


        </div>
    </EVpageForm>
</template>

<script>
    export default {
        name: "mzone",
        data () {
            var _this = this

            const telRule = (rule, value, callback) => {
                if (!value || value === '') {
                    callback(new Error('联系电话不能为空'))
                }else if (!this.Regex.regexlist.phone.test(this.formValidate.tel) && this.formValidate.tel !== '') {
                    callback(new Error('联系电话格式错误'))
                } else{
					return callback()
				}
            }

            return {
                api: {
                    base: '/mzone',
                    access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),

                },

                pageTitle: '数据中心管理-',
                pageload: true,
                search: '111',
                current: 1,
                openType: -1,


                formValidate: {
                    name: '',
                    addr: '',
                    contactor: '',
                    tel: '',
                },

                infoChangeRules: {
					name: [{
							required: true,
							message: '请输入数据中心名称',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 25,
							message: '输入字符不得多于25个',
							trigger: 'change'
						}
					],

					addr: [{
							required: true,
							message: '请输入数据中心地址',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 30,
							message: '输入字符不得多于30个',
							trigger: 'change'
						}
					],
					contactor:[{
							required: true,
							message: '请输入联系人',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 20,
							message: '输入字符不得多于20个',
							trigger: 'change'
						}
					],
					tel: [{
						required: true,
						validator: telRule,
						trigger: "blur",
						}
					]
                },
            }
        },

        computed: {
            doCancal() {
                return{
                    name: 'mkcgl-mzone',
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
            doSubmitBefor: function (data, e) {

            },
            creat () {
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
