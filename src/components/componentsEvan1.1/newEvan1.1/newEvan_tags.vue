
<template>
    <div class='tags'>
        <Tag v-for="it in value2" :key="it" :name="it" closable @on-close="handleClose">{{it}}</Tag>
        <Button icon="plus-round" type="dashed" size="small" @click="modal=true" v-text="addTag"></Button>

        <Modal v-model="modal" width="320" :title="title" @on-cancel="doClose('tags')">
            <Form ref="tags" :model="tags" :rules="ruletags" :label-width="0">
                <FormItem prop="value">
                    <Input v-model.trim="tags.value" placeholder="请输入新增标签" @on-enter="handleAdd('tags')"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" long @click="handleAdd('tags')" v-text="addTag"></Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "EVtags",
        props: {
            tagdata: {
                type: Object,
                default: function () {
                },
                desc: "标签数据项"
            },
            value:{
                type: Array,
                default: function () {
                    return[]
                },
                desc: "标签初始值"
            },
            title: {
                type: String,
                default: '新增标签',
                desc: "弹窗（模态框）标题"
            },
            addTag: {
                type: String,
                default: '新增',
                desc: "添加按钮的文字内容"
            },
            tagUrl: {
                type: String,
                default: '',
                desc: "异步请求验证的url"

            },
            ajaxKey: {
                type: String,
                default: 'key',
                desc: "提交验证时候的键值对的key"

            },
            doAjax: {
                type: Boolean,
                default: false,
                desc: "是否开启异步验证"

            },
            min: {
                type: Number,
                default: 1,
                desc: "新增的标签字数最小限制"

            },
            max: {
                type: Number,
                default: 4,
                desc: "新增的标签字数最大限制"

            },
            regexTxt: {
                type: RegExp,
                default:function () {
                },
                desc: "校验输入内容的正则表达式"

            },
            regexText: {
                type: String,
                default:'含有非法字符',
                desc: "正则校验未通过时的提示"

            },
            arryLength:{
                type: Number,
                default: 4,
                desc: "允许的最大标签个数"

            },
        },
        data() {
            var _this = this
            const rulename = function (rule, value, callback) {
                if (_this.tags.value === '') {
                    callback(new Error('输入不能为空'));
                } else {

                    if (!_this.tags.value.match(RegExp(_this.regexTxt))) {
                        callback(new Error(_this.regexText));
                    }
                    else if (_this.tags.value.length < _this.min) {
                        callback(new Error('请至少输入'+_this.min+'个字'));
                    }
                    else if (_this.tags.value.length > _this.max) {
                        callback(new Error('最多允许输入'+_this.max+'个字'));
                    }
                    else if (_this.doAjax) {
                        _this.tagdata2[_this.ajaxKey] = _this.tags.value
                        _this.Global.ajaxurl(
                            _this,
                            'get',
                            _this.tagUrl,
                            _this.tagdata2, a)

                        function a(a, b) {
                            if (a.data.status === 0) {
                                return callback(new Error(a.data.msg));
                            }
                            else {
                                return callback()
                            }
                        }


                    }
                    else if (_this.value2.indexOf(_this.tags.value) !== -1) {
                        callback(new Error('输入重复'));

                    }
                    else if(_this.value2.length===_this.arryLength){
                        callback(new Error('标签个数超出限制'));
                    }

                    else {
                        return callback()
                    }
                }
            };
            return {
                tags: {
                    value: "",
                },
                tagdata2: this.tagdata,
                ruletags: {
                    value: [
                        {
                            required: true,
                            // message: "标签名称不能为空",
                            trigger: "blur",
                            validator: rulename,
                        }
                    ],

                },

                modal: false,
                value2: [],
                valuefun: function (e) {
                    return e;
                }
            };
        },

        methods: {

            handleAdd(name) {
                var _this = this
                this.$refs[name].validate(valid => {
                    if (valid) {
                        _this.value2.push(_this.tags.value);
                        _this.modal = false
                        _this.tags.value = ""
                        _this.$refs[name].resetFields();
                    } else {
                    }
                });
            },
            handleClose: function (event, name) {
                this.value2.splice(this.value2.indexOf(name), 1);

                this.tags.value=''

            },
            doClose:function(name) {
                this.$refs[name].resetFields();
                this.tags.value=''
            }
        },
        created: function () {

            if(this.value){
                this.value2= this.value
            }

            if (this.doAjax) {
                this.tagdata2[this.ajaxKey] = this.tags.value
            }

        }
    };
</script>
