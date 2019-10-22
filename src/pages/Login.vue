<style lang="less">
    .wrap_log-in {
        overflow: hidden;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: relative;
    }

    .extra {
        position: static;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: distribute;
        justify-content: space-around;
        padding: 0;
        margin-bottom: 20px;
        width: 100%;
        a {
            flex: 1;
            font-size: 14px;
            color: #999;
            background: 0 0;
            text-decoration: none;
            outline: 0;
            cursor: pointer;
            transition: color .2s ease;
            text-align: center;
            padding-bottom: 5px;
            border-bottom: 1px solid #eee;
        }
        a.cur {
            color: #333;
            border:none;
            font-size: 18px;
        }
    }

    .login-card .ivu-card-body {
        padding: 33px 16px 16px 16px;
        .ivu-input-group {
            border-radius: 5px;
            border: 1px solid #999;
            div,input{
                border:none;
                background-color: transparent !important;
            }
            .ivu-input-group-prepend{
                background-color: transparent;
            }
            .ivu-input-group-prepend i {
                display: inline-block;
                width: 20px;
                height: 20px;
                &:before{
                    display: none;
                }
            }

            .ivu-input-group-prepend i.ivu-icon-person{ background: url("../assets/icon1.png") no-repeat center ;background-size:  auto 100%;}
            .ivu-input-group-prepend i.ivu-icon-locked{ background: url("../assets/icon2.png") no-repeat center;background-size:  auto 100%;}
            .ivu-input-group-prepend i.ivu-icon-ios-barcode{ background: url("../assets/icon3.png") no-repeat center;background-size:  auto 100%;}





        }
    }

    .login-form {
        margin-top: 5px;
        padding: 0 85px;
        .ivu-form-item {
            margin-bottom: 22px;
        }
    }

    .login-card {

        position: absolute;
        right: 220px;
        top: 16%;
        width: 480px;
        .ivu-card {

            box-shadow: 0 1px 6px rgba(0, 0, 0, 0);
            border-color: #eee;
            background: transparent;
        }
        .ivu-form-item-content {
            display: flex;
            img {

                    margin-top: 1px;
                    margin-left: 15px;
                    height: 34px;
                    min-width: 80px;
                    max-width: 100px;
                    border-radius: 5px;
                    border: 1px solid #999;

            }
            .ivu-input-group-prepend {
                background-color: #f4f4f4;
                border-radius: 2px;
                padding: 0;
                width: 34px;
            }
            .ivu-icon {
                color: #ccc;
            }
        }
        .ivu-input-group-append {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 40px;
            padding: 0;
            border: none;
            background-color: transparent;
            z-index: 2;
            button {
                width: 100%;
                padding: 0;
                margin: 0;
                line-height: 31px;
                box-shadow: none;
                font-size: 16px;
                color: #999;
            }
        }
        .ivu-input {
            border-top-right-radius: 2px;
            border-bottom-right-radius: 2px;
        }
        .ivu-input {
            &:focus {
                box-shadow: none;
            }
        }
    }

    .login-form {
        margin-top: 5px;
    }

    .forgot-password {
        cursor: pointer;
        text-align: right;
        font-size: 12px;
        margin-top: -10px;
        position: relative;
        display: inline-block;
        float: right;
        a {
            color: #aaa;
            &:hover {
                color: #2d8cf0;
            }
        }
    }

    .ivu-card-extra {
        position: static;
        display: flex;
        justify-content: space-around;
        padding: 16px;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
        a {
            font-size: 14px;
            color: #999;
            &:hover {
                color: #57a3f3;
            }
        }
        .cur {
            color: #2d8cf0;
        }
    }

    .codeBtn {
        height: 30px;
        margin-top: 2px;
        margin-left: 10px;
        line-height: 16px;
        box-shadow: none !important;
    }

    .captchas-img {
        background: url("../assets/img_loading.gif") no-repeat center;
    }

    .psw-change {
        .ivu-modal-body {
            padding-bottom: 0;
        }
        .ivu-input-group-prepend {
            width: 6em;
        }
    }

    .psw-back-form {
        .ivu-form-item-content {
            display: flex;
        }
    }

    .login_logo {
        display: block;
        margin: 3% auto 0 auto;
        width: 26%;
    }

    .box_login-wrap {
        width: 920px;
        height: 452px;
        background: url("../assets/login_2.png") center no-repeat;
        background-size: auto 380px;
        position: absolute;
        top: 50%;
        margin-top: -190px;
        left: 50%;
        margin-left: -460px;
        .phone_size {
            padding: 0 2.5px;
        }
    }

    .bq_botm-wri {
        position: absolute;
        width: 100%;
        font-size: 14px;
        text-align: center;
        color: #fff;
        bottom: 30px;
    }

    .yzm_box-wrap {
        .ivu-input-wrapper {
            width: auto;
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            flex: 1;
        }
    }

    .phone_int-box {
        .ivu-input-wrapper {
            width: auto;
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            flex: 1;
        }
    }
</style>

<template>
    <div class="wrap wrap_log-in" :style="'background-image:url(' + defaults.bg + ');'">
        <Modal v-model="modal2" width="360">
            <p slot="header" style="text-align:center;font-weight:normal">
                <span>登录提示</span>
            </p>
            <div style="text-align:center">
                {{loginmsg}}
            </div>
            <div slot="footer">
                <Button size="large" type="primary" long @click="elogin('Enter')">确定登录</Button>
            </div>
        </Modal>
<!--        <img class="login_logo" src="static/img/login_3.png"></img>-->
        <div class="box_login-wrap">
            <div class="login-card">
                <Card :bordered='false' dis-hover>
                    <div class="extra">
                        <a class="cur" href="javascript:void(0);"
                           @click="handleLoginMode('password')">IPFS星际特工全球云数据监测登录系统</a>

                    </div>
                    <div class="login-form" @keydown.enter="handleSubmit">
                        <Form ref="loginForm" :model="form" :rules="rules">
                            <FormItem prop="userName">
                                <Input type="text" placeholder="请输入用户名或请输入手机号"
                                       v-model="form.userName">
                                    <Icon slot="prepend" :size="20" class="phone_size"
                                          type="person"></Icon>
                                </Input>
                            </FormItem>
                            <FormItem>
                                <Input :type="defaults.showPassword ? 'text' : 'password'" placeholder="请输入密码"
                                       v-model="form.password">
                                    <Icon slot="prepend" :size="16" type="locked"></Icon>
                                    <Icon slot="append" style="line-height: 32px;font-size: 16px;"
                                          :type="defaults.showPassword ? 'eye' : 'eye-disabled'"
                                            @click="handleShowPassword"></Icon>
                                </Input>
                            </FormItem>
                            <!--<FormItem prop="password" >-->
                            <!--<Input type="password" placeholder="请输入密码" v-model="form.password">-->
                            <!--<Icon slot="prepend" :size="16" type="locked"></Icon>-->
                            <!--<Button slot="append" icon="eye"-->
                            <!--@click="handleShowPassword"></Button>-->
                            <!--</Input>-->
                            <!--</FormItem>-->

                            <FormItem prop="captchas" class="yzm_box-wrap">
                                <Input type="text" placeholder="请输入验证码" v-model="form.captchas">
                                    <Icon slot="prepend" :size="18" type="ios-barcode"></Icon>
                                </Input>
                                <img class="captchas-img"
                                     :src="defaults.captchas.imgStr ? 'data:image/png;base64,' + defaults.captchas.imgStr : ''"
                                     alt=""
                                     @click="handleCaptchas">
                            </FormItem>

                            <FormItem>
                                <Button @click="handleSubmit" :loading="loading" type="primary" long style="background-color: #014b83;
    border: none;">登录</Button>
                            </FormItem>
                        </Form>
                        <!--<p class="forgot-password"><a @click="handlePswBack">找回密码</a></p>-->
                    </div>
                </Card>
            </div>
        </div>
        <Modal v-model="defaults.pswBackShow" width="400" :mask-closable="false" class="psw-change">
            <p slot="header">
                <Icon type="help-buoy"></Icon>
                <span>找回密码</span>
            </p>
            <Form class="psw-back-form" ref="pswForm" :model="pswBackForm" :rules="pswBackRules">
                <FormItem prop="phone">
                    <Input placeholder="请输入手机号" type="text" v-model="pswBackForm.phone">
                        <span slot="prepend">手机号码</span>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input placeholder="请输入新密码" type="password" v-model="pswBackForm.password">
                        <span slot="prepend">新密码</span>
                    </Input>
                </FormItem>
                <FormItem prop="confirmPsw">
                    <Input placeholder="请确认密码" type="password" v-model="pswBackForm.confirmPsw">
                        <span slot="prepend">确认密码</span>
                    </Input>
                </FormItem>
                <FormItem prop="captcha">
                    <Input placeholder="请输入验证码" type="text" v-model="pswBackForm.captcha">
                        <span slot="prepend">验证码</span>
                    </Input>
                    <Button class="codeBtn" :type="defaults.pswCodeState === 0 ? 'success' : 'default'"
                            :loading="defaults.pswCodeState === 1" :disabled="defaults.pswCodeState !== 0"
                            @click="handlePswCode">
                        <span v-text="defaults.pswCodeTxt"></span>
                    </Button>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" size="large" long @click="handlePswSubmit" >确定</Button>
            </div>
        </Modal>
        <p class="bq_botm-wri"><!-- 版权所有 --></p>

    </div>
</template>

<script>
    import api from '../common/api'
    import Util from "../common/util"

    export default {
        name: 'Login',
        data () {
            const userNameRule = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('用户名不能为空'))
                } else {
                    callback()
                }
            }
            const pswRule = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码不能为空'))
                } else {
                    callback()
                }
            }
            const phoneRule = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('手机号不能为空'))
                } else {
                    if (!this.Regex.regexlist.phone.test(this.pswBackForm.phone)) {
                        callback(new Error('手机号格式错误'))
                    } else {
                        callback()
                    }
                }
            }
            const pswConfirmRule = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('确认密码不能为空'))
                }
                else if (!this.Regex.regexlist.password.test(this.pswBackForm.confirmPsw)) {
                    callback(new Error('密码应同时包含数字小写字母大写字母3种'))
                } else if (this.pswBackForm.password !== this.pswBackForm.confirmPsw) {
                    callback(new Error('两次密码不一致'))
                } else {
                    callback()
                }

            }
            return {
                loading: false,
                modal2: false,
                loginmsg: '',
                defaults: {
                    bg: '../../static/img/login_1.png',
                    showPassword: false,
                    codeTxt: '获取验证码',
                    codeState: 0,
                    captchas: {},
                    pswBackShow: false,
                    pswCodeTxt: '获取验证码',
                    pswCodeState: 0
                },
                pswBackForm: {
                    phone: '',
                    password: '',
                    confirmPsw: '',
                    captcha: ''
                },
                form: {
                    userName: '',
                    password: '',
                    captchas: ''
                },
                rules: {
                    userName: [
                        {validator: userNameRule, trigger: 'blur'}
                    ],
                    password: [
                        {validator: pswRule, trigger: 'blur'}
                    ],
                    captchas: [
                        {required: true, message: '验证码不能为空', trigger: 'blur'}
                    ]
                },
                pswBackRules: {
                    phone: [
                        {validator: phoneRule, trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '新密码不能为空', trigger: 'blur'},
                        {min: 6, message: '请输入最少6位'},
                        {max: 20, message: '请输入最多20位'},
                        {type: 'string', pattern: Util.reg.password, message: '密码应同时包含数字小写字母大写字母3种', trigger: 'blur'}

                    ],
                    confirmPsw: [
                        {validator: pswConfirmRule, trigger: 'blur'}
                    ],
                    captcha: [
                        {required: true, message: '验证码不能为空', trigger: 'blur'}
                    ]
                }
            }
        },

        methods: {
            elogin (b) {
                var _this = this
                api.login(_this, b)
                _this.$Modal.remove()
            },
            handleLoginMode (value) {
                this.form = {
                    userName: '',
                    password: '',
                    grantType: value,
                    captchas: ''
                }
                this.$refs.loginForm.resetFields()
            },
            handleSubmit () {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        api.checkCaptchas(this)
                    }
                })
            },
            handleShowPassword () {
                this.defaults.showPassword = !this.defaults.showPassword
            },
            handleCode () {
                api.validPhone(this, this.form.userName, 120)
            },
            handleCaptchas () {
                api.getCaptchas(this)
            },
            handleCaptchasOption () {
                return {
                    fontSize: 20,
                    bgColor: '255,255,255',
                    fontColor: Util.randomColor()
                }
            },
            handlePswCode () {
                api.validPswPhone(this, this.pswBackForm.phone, 120)
            },
            handlePswSubmit () {
                this.$refs.pswForm.validate((valid) => {
                    if (valid) {
                        api.getPswBack(this)
                        this.defaults.pswBackShow = false
                    }
                })
            },
            handlePswBack (name) {
                this.defaults.pswBackShow = true
                this.$refs.loginForm.resetFields()
                this.$refs.pswForm.resetFields()
            }
        },
        created: function () {
            api.getCaptchas(this)
        },
        mounted: function () {
        }
    }
</script>
