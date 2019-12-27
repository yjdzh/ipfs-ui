<template>
    <EVpageForm :pageTitle="pageTitle+title" :model="formValidate" :rules="infoChangeRules"
                :labelWidth="120" :doSubmitBefor="doSubmitBefor"
                :submitUrl="submitUrl" :submitType="submitType" :doReset="creat" :doCancal="doCancal"
                :pageload="pageload">
        <div slot="form">
            <Row>
                <EVitemContainer label="用户名称" prop="name" :span="12">
                    <Input v-model.trim="formValidate.name" placeholder="请输入用户名称"></Input>
                </EVitemContainer>
                <EVitemContainer label="登录账号" prop="username" :span="12">
                    <Input v-model.trim="formValidate.username" placeholder="请输入登录账号"
                           :disabled="this.openType==-1?false:true"></Input>
                </EVitemContainer>
            </Row>
            <Row>

                <EVitemContainer label="管理数据中心" prop="zoneId" :span="12">

                    <Select v-model="formValidate.zoneId" :disabled="formValidate.isAdmin == 1 ? true : false">
                        <Option :value="zoneOption.id" :label="zoneOption.name" v-text="zoneOption.name"
                                v-for="zoneOption in zoneOptions" :key="zoneOption.index"></Option>
                    </Select>
                </EVitemContainer>

                <EVitemContainer label="手机号码" prop="phone" :span="12">
                    <Input v-model.trim="formValidate.phone"
                           placeholder="请输入手机号码"></Input>
                </EVitemContainer>
            </Row>


        </div>
    </EVpageForm>
</template>

<script>
    export default {
        name: "musers",
        data() {
            var _this = this

            const phoneRule = (rule, value, callback) => {
                if (!value || value === '') {
                    callback(new Error('手机号码不能为空'))
                } else if (!this.Regex.regexlist.phone.test(this.formValidate.phone) && this.formValidate.phone !== '') {
                    callback(new Error('手机号码格式错误'))
                } else {
                    _this.Global.ajax(
                        _this,
                        'get', {
                            base: '/musers',
                            other: '/existByPhone?',
                            access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),
                        }, function () {
                            if (_this.openType !== -1) {
                                return {
                                    phone: _this.formValidate.phone,
                                    id: _this.openType
                                }
                            } else {
                                return {
                                    phone: _this.formValidate.phone,

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
            const usernameRule = (rule, value, callback) => {
                if (!value || value === '') {
                    callback(new Error('登录帐号不能为空'))
                } else {
                    _this.Global.ajax(
                        _this,
                        'get', {
                            base: '/musers',
                            other: '/existByUsername?',
                            access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),
                        }, function () {
                            if (_this.openType !== -1) {
                                return {
                                    username: _this.formValidate.username,
                                    id: _this.openType
                                }
                            } else {
                                return {
                                    username: _this.formValidate.username,

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
            return {
                api: {
                    base: '/musers',
                    access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),

                },

                pageTitle: '运维用户-',
                pageload: true,
                search: '111',
                current: 1,
                openType: -1,
                type: ['img', 'png', 'jpg'],

                formValidate: {
                    name: '',
                    username: '',
                    phone: '',
                    zoneId: '',
                    isAdmin: '0'

                },

                infoChangeRules: {
                    username: [{required: true, validator: usernameRule, trigger: "blur"},
                        {
                            min: 2,
                            max: 20,
                            pattern: /^[A-Za-z0-9|_]+$/,
                            message: '仅支持2-20位数字、字母、下划线',
                            trigger: 'blur'
                        }],
                    name: [{required: true, message: "用户名不能为空", trigger: "blur"},
                        {
                            min: 2,
                            max: 20,
                            pattern:  /^(([a-zA-Z+\.?\·?a-zA-Z+]{2,30}$)|([\u4e00-\u9fa5+\·?\u4e00-\u9fa5+]{2,30}$))/,
                            message: '请输入正确的中文或英文姓名',
                            trigger: 'blur'
                        }],
                    phone: [{required: true, validator: phoneRule, trigger: "blur"}]
                },
                zoneOptions: [ //下拉选项

                ],
            }
        },

        computed: {
            doCancal() {
                return {
                    name: 'myhgl-musers',
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
            doAfterUpload(e) {
                console.log(e)
                this.formValidate.img = e.data.data.url
                console.log(this.img)

            },
            doSubmitBefor: function (data, e) {
                debugger
            },
            creat() {
                this.Global.fun(this, 'get', {
                        base: '/mzone',
                        other: '/all?',
                        access_token: this.api.access_token,
                    }, {},
                    function (res, that) {
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
