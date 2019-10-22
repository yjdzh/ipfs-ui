<template>

    <div class="EVbase">
        <div :class="pageTitle?'EVbaseBoxT EVbaseBox':'EVbaseBox'">
            <div class="pageload" v-if="pageloads" v-show="!stopSubmit?'true':pageload">
                <row>
                    <Col class="demo-spin-col" span="8">
                        <Spin fix>
                            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                            <div>加载中</div>
                        </Spin>
                    </Col>
                </row>
            </div>
            <div class="mbxBox">
                <h3 class="crumb-title " v-if="pageTitle">{{pageTitle}}</h3>
            </div>
            <div class="EVcontent">
                <Form ref="model" :model="model" :rules="rules" :label-width="labelWidth"
                      class="EVbaseBox-content">
                    <slot name="form"></slot>
                    <FormItem class="btnBox">
                        <Button type="primary" v-if="SubmitBtn!==false" @click="handleSubmit('model')">
                            {{submitBtnText}}
                        </Button>
                        <Button v-if="CancalBtn!==false" @click="handleCancal('model')"
                                style="margin-left: 8px">
                            {{cancelBtnText}}
                        </Button>
                        <Button v-if="ResetBtn!==false" @click="handleReset('model')"
                                style="margin-left: 8px">
                            {{resetBtnText}}
                        </Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>

</template>
<script>
    export default {

        props: {
            pageload:{
                type: Boolean,
                default: true,
                desc: "loading动画"
            },
            pageTitle: {
                type: String,
                default: null,
                desc: "页面导航显示的当前页面名字"
            },
            params: {
                type: Boolean,
                default: false,
                desc: "是否开启params提交"
            },

            doload: {
                type: Boolean,
                default: true,
                desc: "是否开启loading"
            },
            SubmitBtn: {
                type: Boolean,
                default: true,
                desc: "是否显示提交按钮"
            },
            submitBtnText: {
                type: String,
                default: '提交',
                desc: "submit按钮显示的名字"
            },
            CancalBtn: {
                type: Boolean,
                default: true,
                desc: "是否显示取消按钮"
            },
            cancelBtnText: {
                type: String,
                default: '取消',
                desc: "cancel按钮显示的名字"
            },
            ResetBtn: {
                type: Boolean,
                default: true,
                desc: "是否显示重置按钮"
            },
            resetBtnText: {
                type: String,
                default: '重置',
                desc: "reset按钮显示的名字"
            },

            model: {
                type: Object,
                default: function () {
                    return {}
                },
                desc: "表单中的数据项集合"
            },
            rules: {
                type: Object,
                default: function () {
                    return {}
                },
                desc: "表单校验规则集合"
            },

            submitType: {
                type: Number,
                default: -1,
                desc: "表单页类型（编辑/新增）"
            },
            submitUrl: {
                type: String,
                default: '',
                desc: "提交的请求地址（请求中段【/api以后 和 access_token之前的部分】）"
            },
            doSubmit: {
                type: Function,
                default: function () {
                    this.defaultSubmit()
                },
                desc: "提交函数（点击按钮并且通过表单校验以后才执行的）"
            },
            afterDoSubmit: {
                type: Function,
                default: function () {

                },
                desc: "提交以后函数（点击按钮并且通过表单校验以后才执行的）"
            },
            doSubmitSuccess: {
                type: Function,
                default: function () {
                    this.defaultSubmitSuccess()
                },
                desc: "提交成功发出，回执为1时候的函数"
            },
            doSubmitFail: {
                type: Function,
                default: function (a,b) {
                    this.defaultSubmitFail(a,b)
                },
                desc: "提交成功发出，回执为0时候的函数"
            },
            doSubmitBefor: {
                type: Function,
                default: function () {
                },
                desc: "按下提交按钮，完成表单检验以后提交函数之前的数据准备函数（拼装隐藏值和表单值）"
            },
            doCancal: {
                type: [Object, Function],
                default: function () {
                    return {}
                },
                desc: "点击返回（包含两个键值对，1要跳转地址路由的名字name；2携带的参数query{}）"
            },

            doReset: {
                type: [Object, Function],
                default: function (e) {

                },
                desc: "点击重置执行的函数（默认清空检验报错和值）"
            },
            doCreated: {
                type: Function,
                default: function () {

                },
                desc: "页面加载前的函数（用来准备数据，基本不用）"
            },
            verification: {
                type: Boolean,
                default: true,
                desc: "是否验证表单"
            },
            // （页面全局值）
            labelWidth: {
                type: Number,
                default: 80,
                desc: "表单控件左边说明文字的宽度"
            },
            labelAlign: {
                type: String,
                default: 'left',
                desc: "表单控件左边说明文字的对齐方式"
            },
            formItemWidth: {
                type: Number,
                default: 100,
                desc: "表单整体宽度百分比（默认居中）"
            },
            backRemarkWidth: {
                type: Number,
                default: 100,
                desc: "表单控件后插槽宽度"
            },
            backRemarkAlign: {
                type: String,
                default: 'right',
                desc: "表单控件后插槽对齐方式"
            },
            backRemarkPadding: {
                type: String,
                default: '0px 10px 0px 10px',
                desc: "表单控件后插槽边距"
            },
            frontRemarkWidth: {
                type: Number,
                default: 100,
                desc: "表单控件前插槽宽度"
            },
            frontRemarkAlign: {
                type: String,
                default: 'right',
                desc: "表单控件前插槽对齐方式"
            },
            frontRemarkPadding: {
                type: String,
                default: '0px 10px 0px 10px',
                desc: "表单控件前插槽边距"
            },

            itemPadding: {
                type: String,
                default: '0px 0px 0px 0px',
                desc: "表单控件（含侧控件的label说明文字）整体边距"
            },


        },
        data () {
            return {
                formData: {},
                pageloads: true,
                stopSubmit: true,// "中断提交"
                api: {
                    access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),
                },
            }
        },
        computed: {},
        methods: {
            defaultSubmitSuccess: function (res) {
                this.$Message.destroy();
                this.$Message.success("保存成功！");
            },
            defaultSubmitFail: function (res,b) {
                this.$Message.destroy();
                this.$Message.error(res.data.msg);
            },

            defaultSubmit () {

                var _this = this

                _this.axios({
                    method: Number(_this.submitType) === -1 ? 'post' : 'put',
                    emulateJSON: true,
                    dataType: 'json',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    url: _this.submitUrl + 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),

                    params: (_this.params ? _this.formData : ''),

                    data: (!_this.params ? _this.formData : ''),
                }).then(function (res) {

                    if (res.data.status === 1) {
                        _this.stopSubmit = true
                        _this.doSubmitSuccess(res, _this)


                        _this.$router.push({
                            name: _this.doCancal.name,
                            query: _this.doCancal.query
                        })

                    }
                    else {
                        _this.stopSubmit = true
                        _this.doSubmitFail(res, _this)

                    }
                    _this.afterDoSubmit(_this)
                    _this.pageloads = false
                }).catch(function (res) {
                    _this.stopSubmit = true
                    _this.afterDoSubmit(_this)
                });

            },

            handleSubmit (name) {
                this.stopSubmit = false



                var _this = this;

                if (this.verification) {
                    this.$refs[name].validate((valid) => {

                        if (valid && !this.stopSubmit) {

                            this.pageloads = true
                            if (this.SubmitBtn && this.doload) {
                                _this.pageloads = true
                                _this.formData = Object.assign({}, _this.model);


                                _this.doSubmitBefor(_this.formData, _this)



                                if (!_this.stopSubmit) {
                                    _this.doSubmit(_this)
                                } else {
                                    return
                                }
                            }
                            else {
                                _this.formData = Object.assign({}, _this.model);


                                _this.doSubmitBefor(_this.formData)
                                if (!_this.stopSubmit) {
                                    _this.doSubmit(_this)
                                } else {
                                    return
                                }
                            }
                        }
                        else {
                            this.stopSubmit = false,
                                this.pageloads = false
                            return
                        }
                    })
                } else {

                    _this.formData = Object.assign({}, _this.model);

                    _this.doSubmitBefor(_this.formData)
                    if (!_this.stopSubmit) {
                        _this.doSubmit(this)
                    } else {
                        return
                    }


                }


            },
            handleReset (name) {
                this.stopSubmit = false
                if (this.ResetBtn) {
                    if (typeof(this.doReset) != 'object') {
                        this.$refs[name].resetFields();
                        this.doReset(name)
                        this.stopSubmit = true
                    }
                    else {
                        this.doReset.fun(this)
                        this.stopSubmit = true
                    }
                }
            }
            ,

            handleCancal () {
                if (this.CancalBtn) {
                    if (this.doCancal.fun) {
                        this.doCancal.fun()
                    }
                    else {

                        this.$router.push({
                            name: this.doCancal.name,
                            query: this.doCancal.query
                        })
                    }
                }
                this.removeNewStyle()
            }
            ,
            addNewStyle (newStyle) {
                var styleElement = document.getElementById('styles_js');
                if (!styleElement) {
                    styleElement = document.createElement('style');
                    styleElement.type = 'text/css';
                    styleElement.id = 'styles_js';
                    document.getElementsByTagName('head')[0].appendChild(styleElement);
                }
                styleElement.appendChild(document.createTextNode(newStyle));
            }
            ,
            removeNewStyle () {
                var styleElement = document.getElementById('styles_js');
                if (styleElement) {
                    document.getElementsByTagName('head')[0].removeChild(styleElement);
                }
            }
            ,
            clear(){

                this.$refs['model'].resetFields();
            }

        }
        ,
        mounted(){

        },
        created: function () {


            this.addNewStyle('.EVbaseBox .ivu-col {padding:' + this.itemPadding + '}');
            this.addNewStyle('.EVbaseBox .ivu-input-group-prepend>span{padding:' + this.frontRemarkPadding + '    display: inline-block;}');
            this.addNewStyle('.EVbaseBox .ivu-input-group-prepend>span {width:' + this.frontRemarkWidth + 'px;text-align:' + this.frontRemarkAlign + ';overflow: hidden;display:inline-block}');
            this.addNewStyle('.EVbaseBox .ivu-input-group-append>span{padding:' + this.backRemarkPadding + '    display: inline-block;}');
            this.addNewStyle('.EVbaseBox .ivu-input-group-append>span {width:' + this.backRemarkWidth + 'px;text-align:' + this.backRemarkAlign + ';overflow: hidden;display:inline-block}');
            this.addNewStyle('.EVbaseBox .EVbaseBox-content {width:' + this.formItemWidth + '%}');
            this.doCreated(this)



        }
        ,

    }
</script>


