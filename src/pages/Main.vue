<style lang="less">
    .ivu-modal-footer {
        border-top: 0px solid #e9eaec !important;

    }
    /*新菜单使用样式*/
    .ant-theme {
        min-height: 450px;
    }

    .ivu-layout {
        width: 100%;
        .layout-nav {
            width: 100%;
            height: 100%;
        }
    }

    .evancilck {
        padding-left: 15px;
        margin: 4px 0;
    }

    ul.ivu-menu.ivu-menu-light.ivu-menu-vertical {
        height: auto !important;
    }

    .layout-con {
        height: 100%;
        width: 100%;
    }

    .menu-item span {
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }

    .menu-item i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }

    .evanoverbox {
        height: 100%;
        padding-bottom: 48px;
        position: relative;
    }

    .evanover {
        height: 100%;
        background: #fff;
        overflow: auto;
        &:after {
            content: "";
            display: block;
            width: 1px;
            height: 100%;
            background: #dddee1;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            z-index: 1;
        }
    }

    .sider-name {
        padding: 8px 0px;
        position: absolute;
        align-items: center;
        height: 64px;
        line-height: 64px;
        text-align: center;
        background-color: #495060;
        overflow: hidden;
        color: #fff;
        z-index: 990;
        width: 320px;
        &.hide {
            h1 {
                opacity: 0;

            }
            i {
                display: block;
            }
        }
        h1 {
            overflow: hidden;
            white-space: nowrap;
            -webkit-transition: width 0.2s ease 0.2s;
            transition: width 0.2s ease 0.2s;
            opacity: 1;
            font-size: 20px;
            display: inline-block;
            line-height: 48px;
            .ivu-avatar-large {
                width: 48px;
                height: 48px;
                line-height: 48px;
                border-radius: 20px;
            }
            img {
                height: 48px;
                display: inline-block;
                width: 48px;
                margin-top: -3px;
            }
        }
        i {
            display: inline-block;
            width: 30px;
            margin-left: -13px;
            margin-right: 20px;
            -webkit-transform: translateX(0);
            transform: translateX(0);
            -webkit-transition: font-size 0.2s ease 0.2s,
            -webkit-transform 0.2s ease 0.2s;
            transition: font-size 0.2s ease 0.2s, -webkit-transform 0.2s ease 0.2s;
            transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
            transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s,
            -webkit-transform 0.2s ease 0.2s;
            font-size: 26px;
        }
        .tb_icon-becom {
            font-size: 24px;
        }
    }

    .layout-nav .ivu-menu {
        background-color: #495060;

        > li {
            float: right;
        }
        .ivu-menu-item {
            color: #fff;
            position: relative;

            &:hover {
                color: #2d8cf0 !important;
                border: none !important;

            }
        }
    }

    .layout-nav .ivu-menu .evannoborder {
        background-color: #495060;
        .ivu-menu-item {
            color: #fff;
            border-bottom: 0px solid #495060 !important;
            padding: 0;
            p {
                padding: 7px 16px 8px;
                width: 100%;
            }
            &:hover {
                color: #2d8cf0 !important;
                border-bottom: 0px solid #2d8cf0 !important;
            }
        }
    }

    .menuLayout {
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        width: auto;
        height: 100%;
        min-height: 344px;
        display: flex;
        padding-top: 64px;
        .ivu-menu-item > i {
            margin-right: 8px;
        }
    }

    .overdiv {
        overflow: auto;
    }

    .menu-item {
        height: auto;
        width: auto !important;
    }

    .collapsed-menu span {
        width: 0px;
        transition: width .2s ease;
    }

    .collapsed-menu i {
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }

    .collapsed-menu ul, .collapsed-menu .ivu-menu-submenu-title-icon {
        display: none;
    }

    .collapsed-menu .ivu-menu-submenu-title {
        padding: 14px 24px;
        text-align: center;
    }

    .layout-nav .ivu-select-dropdown {
        background-color: #495060;
    }

    .ivu-menu-submenu .ivu-menu-item {
        padding: 0px !important;
        .layout-text {
            padding: 14px 24px 14px 64px;
        }
    }
</style>
<template>
    <div class="wrap ant-theme">
        <Layout style="height: 100%;">
            <div class="lay">

                <div class="sider-name">


                    <h1>
                        <Avatar src="static/img/LOG1.png" size="large"/>
                        币码翁分布式云数据监测系统
                    </h1>
                    <!--<h1>这里 <Avatar icon="person" size="large" />是logo 这里是标题</h1>-->

                </div>
                <div class="menuLayout">


                    <div class="evanoverbox">
                        <div class="evanover newEvan">
                            <Sider collapsible :collapsed-width="78" v-model="isCollapsed">

                                <Menu :active-name="selected" theme="light" ref="menu" :class="menuitemClasses"
                                      :open-names="openname">

                                    <template v-for="module in defaults.menu">
                                        <template v-if="!module.hidden && module.modules">

                                            <Submenu :name="module.ename"
                                                     v-if="defaults.rights[module.ename]&& [defaults.rights[module.ename]].toString().indexOf('r')!==-1">

                                                <template slot="title">
                                                    <Icon type="document-text"></Icon>
                                                    <span v-text="module.name"></span>
                                                </template>
                                                <template v-for="it in module.modules">
                                                    <MenuItem :name="module.ename+'-'+it.ename"
                                                              v-if="!it.hidden && [it.opera].toString().indexOf('r')!==-1&& defaults.rights[it.ename]&& [defaults.rights[it.ename]].toString().indexOf('r')!==-1">
                                                        <div class="layout-text"
                                                             @click="selectClick(module.ename , it.ename)">
                                                            <span v-text="it.name"></span>
                                                        </div>
                                                    </MenuItem>


                                                </template>
                                            </Submenu>
                                        </template>
                                        <template
                                            v-else-if="module.hidden!==true && module.modules===null">

                                            <MenuItem :name="module.ename+'-0'" style="padding: 14px 24px 14px 43px;">

                                                <div class="layout-text"
                                                     @click="selectClick(module.ename,0)">
                                                    <Icon type="document-text" style="margin-right: 8px;"></Icon>
                                                    <span>{{module.name}}</span>
                                                </div>
                                            </MenuItem>
                                        </template>
                                    </template>
                                </Menu>
                            </Sider>
                        </div>
                    </div>


                </div>

            </div>
            <Layout>
                <Header class="layout-header-bar">
                    <!--<div class="layout-header-left">-->
                    <!--&lt;!&ndash;<Icon @click.native="collapsedSider" class="menu-icon iconfont" :class="rotateIcon" size="24"></Icon>&ndash;&gt;-->
                    <!--</div>-->
                    <div class="layout-nav">
                        <Menu mode="horizontal" active-name="">
                            <!--<MenuItem name="fullscreen">-->
                            <!--<div class="header-btn" @click="handleFullscreen">-->
                            <!--<Tooltip :content="defaults.fullscreenState ? '退出全屏' : '全屏'">-->
                            <!--<Icon :type="defaults.fullscreenState ? 'arrow-shrink' : 'arrow-expand'" size="22"></Icon>-->
                            <!--</Tooltip>-->
                            <!--</div>-->
                            <!--</MenuItem>-->
                            <!--<MenuItem name="lockScreen">-->
                            <!--<div class="header-btn" @click="handleLockScreen">-->
                            <!--<Tooltip content="锁屏">-->
                            <!--<Icon type="locked" size="20"></Icon>-->
                            <!--</Tooltip>-->
                            <!--</div>-->
                            <!--</MenuItem>-->
                            <!-- <MenuItem name="message">
                              <div class="header-btn">
                                <Tooltip content="有3条未读消息">
                                  <Badge dot>
                                    <Icon type="ios-bell" size="21"></Icon>
                                  </Badge>
                                </Tooltip>
                              </div>
                            </MenuItem> -->


                            <Submenu name="userConfig" class="user-config evannoborder">
                                <template slot="title">
                                    <div class="header-btn">
                                        <Avatar src="static/img/user_public.png" class="per_son"/>
                                        <span class="user_name" v-text="defaults.user.name"></span>
                                    </div>
                                </template>
                                <MenuItem name="3-1">
                                    <p @click="handleInfoChange">
                                        <Icon type="android-person"></Icon>
                                        <span>资料设置</span>
                                    </p>
                                </MenuItem>
                                <MenuItem name="3-2">
                                    <p @click="handlePswChange">
                                        <Icon type="ios-gear"></Icon>
                                        <span>修改密码</span>
                                    </p>
                                </MenuItem>
                                <MenuItem name="3-3">
                                    <p @click="handleLogout">
                                        <Icon type="android-exit"></Icon>
                                        <span>退出登录</span>
                                    </p>
                                </MenuItem>
                            </Submenu>
                        </Menu>
                    </div>
                </Header>
                <Content class="layout-content">

                    <router-view></router-view>
                </Content>

            </Layout>
        </Layout>
        <div id="lock_screen_back" class="lock-screen-back"></div>


        <Modal v-model="defaults.pswChangeShow" width="400" :mask-closable="false" class="psw-change">
            <p slot="header">
                <Icon type="ios-gear"></Icon>
                <span>修改密码</span>
            </p>
            <Form ref="pswForm" :model="pswChangeForm" :rules="pswChangeRules">
                <FormItem prop="oldPsw">
                    <Input type="password" placeholder="请输入旧密码" v-model="pswChangeForm.oldPsw">
                        <span slot="prepend">旧密码</span>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" placeholder="请输入新密码" v-model="pswChangeForm.password">
                        <span slot="prepend">新密码</span>
                    </Input>
                </FormItem>
                <FormItem prop="confirmPsw">
                    <Input type="password" placeholder="请确认新密码" v-model="pswChangeForm.confirmPsw">
                        <span slot="prepend">确认密码</span>
                    </Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" size="large" long @click="submitPswChange">确定</Button>
            </div>
        </Modal>
        <Modal v-model="defaults.infoChangeShow" width="400" :mask-closable="false" class="psw-change icon_time-show">
            <p slot="header">
                <Icon type="android-person"></Icon>
                <span>资料设置</span>
            </p>
            <Form ref="infoForm" :model="infoChangeForm" :rules="infoChangeRules">
                <FormItem prop="name">

                    <Input type="text" v-model="infoChangeForm.name">
                        <span slot="prepend">用户名</span>
                    </Input>
                </FormItem>
                <FormItem prop="sex">
                    <Input class="sex-input" type="text" v-model="infoChangeForm.sex">
                        <span slot="prepend">性别</span>
                    </Input>
                    <RadioGroup v-model="infoChangeForm.sex" type="button">
                        <Radio :label="1">男</Radio>
                        <Radio :label="2">女</Radio>
                        <Radio :label="3">保密</Radio>
                    </RadioGroup>
                </FormItem>

                <FormItem prop="phone">
                    <Input type="text" v-model="infoChangeForm.phone">
                        <span slot="prepend">手机号码</span>
                    </Input>
                </FormItem>

            </Form>
            <div slot="footer">
                <Button type="primary" size="large" long @click="submitInfoChange">确定</Button>
            </div>
        </Modal>


    </div>
</template>

<script>
    import api from "../common/api";
    import Util from "../common/util";
    import "jquery";
    import "jquery.nicescroll";

    const setLockBackSize = () => {
        let x = document.body.clientWidth;
        let y = document.body.clientHeight;
        let r = Math.sqrt(x * x + y * y);
        return parseInt(r);
    };

    export default {
        name: "Main",
        data () {
            var _this = this
            const pswConfirmRule = (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('确认密码不能为空'))
                        // } else if (!this.Regex.regexlist.password.test(this.pswChangeForm.confirmPsw)) {
                        //     callback(new Error('密码应同时包含数字大写字母3种'))
                    }
                    else if (this.pswChangeForm.password !== this.pswChangeForm.confirmPsw) {
                        callback(new Error('两次密码不一致'))
                    } else {
                        callback()
                    }
                },

                phoneRule = (rule, value, callback) => {
                    if (!value || value === '') {
                        callback(new Error('手机号码不能为空'))
                    }

                    else if (!this.Regex.regexlist.phone.test(this.infoChangeForm.phone) && this.infoChangeForm.phone !== '') {
                        callback(new Error('手机号码格式错误'))
                    } else {

                        _this.Global.ajax(
                            _this,
                            'get', {
                                base: '/musers',
                                other: '/existByPhone?',
                                access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),
                            }, {
                                phone: _this.infoChangeForm.phone,
                                id: _this.defaults.user.id
                            }, aa
                        )

                        function aa (a, b) {
                            if (a.data.status === 0) {
                                return callback(new Error(a.data.msg));
                            }
                            else {
                                return callback()
                            }
                        }
                    }
                }

            return {
                // 新菜单测试数据
                // options3: {
                //     disabledDate (date) {
                //         return date && date.valueOf() > Date.now() - 86400000;
                //     }
                // },
                isCollapsed: false,

                // menuShow: true,
                // isActive: true,
                // evanApp: {},
                // evanKey: "",
                // activename: [],
                // fristcilck: true,
                //
                selected: sessionStorage.getItem("selected") ? sessionStorage.getItem("selected") : "",
                //
                openname: sessionStorage.getItem("openname") ? [sessionStorage.getItem("openname")] : [],

                // // 新菜单测试数据
                //
                defaults: {
                    user: {},
                    menu: {},
                    rights: {},
                    fullscreenState: false,
                    pswChangeShow: false,
                    infoChangeShow: false,
                    datePickerShow: false,

                },
                // appnameactive: "",
                //
                // opt: {
                //     wtcpUser: {},
                //     wtcpUserActiveApp: {},
                //     wtcpUserToken: {},
                //     wtcpApplist: {},
                //     wtcpAppgroup: {},
                //     wtcpSupportModules: {},
                //     wtcpCurAppName: ""
                // },
                pswChangeForm: {
                    oldPsw: "",
                    password: "",
                    confirmPsw: ""
                },
                infoChangeForm: {


                    name: '',

                    phone: '',
                    sex: null,

                },
                pswChangeRules: {
                    oldPsw: [{required: true, message: "旧密码不能为空", trigger: "blur"}],
                    password: [
                        {required: true, message: '新密码不能为空', trigger: 'blur'},
                        {min: 6, message: '请输入最少6位'},
                        {max: 20, message: '请输入最多20位'},
                        // {
                        //     type: 'string',
                        //     pattern: this.Regex.regexlist.password,
                        //     message: '密码应同时包含数字小写字母大写字母3种',
                        //     trigger: 'blur'
                        // }
                    ],
                    confirmPsw: [{validator: pswConfirmRule, trigger: "blur"}]
                },
                infoChangeRules: {
                    name: [{required: true, message: "用户名不能为空", trigger: "blur"}],
                    phone: [{validator: phoneRule, trigger: "blur"}],
                    sex: [{type: 'number', required: true, message: "性别不能为空", trigger: "change"}]


                }
            };
        },
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        methods: {

            // dataonchange (e) {
            //     this.infoChangeForm.birthday = e,
            //         this.infoChangeForm.birthdaytemp = e
            // },


            watchMenu () {

                this.$nextTick(() => {
                    this.$refs.menu.updateActiveName();

                    this.$refs.menu.updateOpened();
                });
            },
            // 新菜单函数

            // menuOpen() {
            //     let _self = this;
            //     _self.isCollapsed = false;
            //     _self.menuShow = false;
            // },
            // menuClose() {
            //     let _self = this;
            //     _self.isCollapsed = true;
            //     _self.menuShow = true;
            // },

            selectClick (e, o) {

                this.$Modal.remove()
                // console.log(e + '-' + o)
                let _self = this;


                if (o === 0) {
                    sessionStorage.setItem("selected", e + "-0");
                    sessionStorage.setItem("openname", e);
                    _self.selected = sessionStorage.getItem("selected");
                    _self.openname = [sessionStorage.getItem("openname")];
                    this.$router.push({
                        name: e+"-0"
                    });
                } else {

                    sessionStorage.setItem("selected", e + "-" + o);
                    sessionStorage.setItem("openname", e);
                    _self.selected = sessionStorage.getItem("selected");
                    _self.openname = [sessionStorage.getItem("openname")];
                    this.$router.push({
                        name: e + "-" + o
                    });
                }

                // _self.watchMenu();
            },


            //新菜单函数


            handleLogout () {
                api.logout(this);
            },
            // handleRouterChange(key, value, stlected) {
            //     sessionStorage.setItem("selected", stlected);
            //     this.selected = sessionStorage.getItem("selected");
            //     sessionStorage.setItem("openname", stlected.split("_")[0]);
            //     this.openname = [sessionStorage.getItem("openname")];
            //
            //     console.log(key + "-" + value);
            //     this.opt.wtcpCurAppName = key;
            //     this.$router.push({
            //         name: key + "-" + value,
            //         params: this.opt
            //     });
            // },

            handlePswChange () {
                this.pswChangeForm = {
                    oldPsw: "",
                    password: "",
                    confirmPsw: ""
                };
                this.defaults.pswChangeShow = true;
                this.$refs.pswForm.resetFields();
            },
            handleInfoChange () {
                this.$refs.infoForm.resetFields()
                const userinfo = Util.session.get('rights').data.user

                this.infoChangeForm.name = userinfo.name ? userinfo.name : '暂无数据'

                this.infoChangeForm.phone = userinfo.phone ? userinfo.phone : '暂无数据'
                this.infoChangeForm.sex = userinfo.sex ? userinfo.sex : 3


                this.defaults.infoChangeShow = true

            },
            submitPswChange () {
                this.$refs.pswForm.validate(valid => {
                    if (valid) {
                        api.changePsw(this);
                    }
                });
            },
            submitInfoChange () {
                this.$refs.infoForm.validate(valid => {
                    if (valid) {
                        api.changeInfo(this);
                    }
                });
            },
            // getname() {
            //     let _self = this;
            //
            //     const names = Util.session.get('wtcp-user')
            //
            //     if (!names.name) {
            //         _self.defaults.user.name = names.username
            //     }
            //     else {
            //         _self.defaults.user.name = names.name
            //     }
            //
            // },
            // handleDatePickerShow() {
            //     this.defaults.datePickerShow = true;
            // },
            // handleDatePickerHide() {
            //     this.defaults.datePickerShow = false;
            // }

        },
        created () {
            if (Util.session.get('wtcp-user-token')) {
                api.getrights(this)


            }
            else {
                this.handleLogout()
            }
            // const l = this.defaults.menu.length
            // for (var i = 0; i<l; i++) {
            //
            //     this.defaults.rights[module.ename].toString().indexOf('r')!==-1
            // }
            //
            //
            // this.selected = sessionStorage.getItem("selected") ? sessionStorage.getItem("selected") : "",
            //
            //     this.openname = sessionStorage.getItem("openname") ? [sessionStorage.getItem("openname")] : [],

            $("html").niceScroll();
        },
        // watch: {
        //     $route () {();
        //     }
        // },
        mounted () {



            this.$nextTick(() => {
                this.$refs.menu.updateActiveName();

                this.$refs.menu.updateOpened();

            })

            // const timer = setInterval(() => {
            //     if ($(".ant-theme .ivu-menu-dark>div")) {
            //         $(".ant-theme .ivu-menu-dark>div").each(function (i) {
            //             if ($(this).find(".ivu-menu li").length === 0) {
            //                 $(this).hide();
            //                 this.watchMenu();
            //             }
            //             clearInterval(timer);
            //         });
            //     }
            // }, 200);
            //
            //
            //
            // let lockScreenBack;
            // if (!document.getElementById("lock_screen_back")) {
            //     let lockdiv = document.createElement("div");
            //     lockdiv.setAttribute("id", "lock_screen_back");
            //     lockdiv.setAttribute("class", "lock-screen-back");
            //     document.body.appendChild(lockdiv);
            //     lockScreenBack = document.getElementById("lock_screen_back");
            //     window.addEventListener("resize", () => {
            //         let size = setLockBackSize();
            //         this.lockScreenSize = size;
            //         lockScreenBack.style.transition = "all 0s";
            //         lockScreenBack.style.width = lockScreenBack.style.height = size + "px";
            //     });
            // } else {
            //     lockScreenBack = document.getElementById("lock_screen_back");
            // }
            // let size = setLockBackSize();
            // this.lockScreenSize = size;
            // lockScreenBack.style.transition = "all 3s";
            // lockScreenBack.style.width = lockScreenBack.style.height = size + "px";
        }
    };
</script>
