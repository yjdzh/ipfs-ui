<style>
    .ivu-progress-active .ivu-progress-bg:before {
        content: "";
        opacity: 1 !important;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
        border-radius: 10px;
        -webkit-animation: ivu-progress-active 2s ease-in-out infinite;
        animation: ivu-progress-active 2s ease-in-out infinite;
    }
</style>
<template>
    <div>
        <Upload ref="uploadButton"
                :before-upload="handleUpload"
                :action="action"
                :data="data"
        >

            <Button icon="ios-cloud-upload-outline" :disabled=disabled type="dashed"
                    v-text="loadingStatus ? '进行中' : clickText" :loading="loadingStatus"></Button>
            <span>{{tiptxt}}</span>

        </Upload>
        <div v-if="file !== null " v-show="!autoUpload">文件名: {{ file.name }}<br>
            <Progress :stroke-width="5" v-if="action2Url!==''" v-show="pressshow" :percent="percent"
                      :status="upstatus===''?'active':upstatus"></Progress>
            <Progress :stroke-width="5" v-else v-show="pressshow" :percent="percent!==100?99.9:100"
                      :status="upstatus===''?'active':upstatus"
                      hide-info></Progress>
            <Button type="info" @click="upload" :loading="loadingStatus" :disabled="fails"
                    v-text="loadingtext"></Button>
        </div>


    </div>
</template>
<script>
    export default {
        name: 'Evupload',
        props: {
            actionUrl: {//上传地址
                type: String,
                default: '',
                desc: "上传的路径(包含令牌)"
            },
            tiptxt: {//上传地址
                type: String,
                default: '',
                desc: "提示信息"
            },
            autoUpload: {//上传地址
                type: Boolean,
                default: true,
                desc: "是否开启自动上传"
            },
            type: {//上传地址
                type: Array,
                default: function () {
                    return []
                },
                desc: "允许上传的类型"
            },
            size: {//上传地址
                type: Number,
                default: 10485760,
                desc: "允许上传的文件的大小"
            },
            action2Url: {//回调进度地址
                type: String,
                default: '',
                desc: "获取上传进度的url"
            },
            doAfterUpload: {//上传以后的回调
                type: Function,
                default: function () {
                },
                desc: "上传成功以后的回调函数"
            },
            uploadText: {//上传文字
                type: String,
                default: '选择上传文件',
                desc: "选择文件按钮的显示文字"
            },
            clickText: {//点击文字
                type: String,
                default: '开始上传',
                desc: "手动上传按钮的显示文字"
            },
            disabled: {//点击文字
                type: Boolean,
                default: false,
                desc: "上传按钮是否不能点击"
            },
            data: {//点击文字
                type: Object,
                default: function () {
                    return {}
                },

            },
        },
        data() {
            return {
                action: this.actionUrl,
                action2: this.action2Url,
                file: null,
                loadingStatus: false,
                headers: {"Content-Type": " multipart/form-data"},

                percent: 0,
                upstatus: '',
                pressshow: true,
                fails: false
            }
        },
        methods: {
            clearfile() {
                this.file = null
            },
            handleUpload(file) {
                this.file = file;
                const f = file.name.split(".")
                const s = file.size
                if (s < this.size) {
                    if (this.type.indexOf(f[f.length - 1]) !== -1) {
                        this.percent = 0,
                            this.upstatus = '',
                            this.pressshow = true,
                            this.fails = false,
                            this.loadingtext = '开始上传'

                        if (this.autoUpload === true) {
                            this.upload()
                        }


                    } else {

                        console.log(this.type)
                        this.$Message.destroy()
                        this.$Message.error(
                            '文件格式错误，只支持上传' + this.type.join(";") + '类型文件'
                        )
                        this.percent = 0,
                            this.upstatus = '',
                            this.pressshow = false,
                            this.fails = true,
                            this.loadingtext = '开始上传'

                    }
                    return false;
                } else {
                    this.$Message.destroy()
                    this.$Message.error(
                        '最大文件为' + this.size / 1024 / 1024 + 'M'
                    )
                    this.percent = 0,
                        this.upstatus = '',
                        this.pressshow = true,
                        this.fails = true,
                        this.loadingtext = '开始上传'

                }
                return false;
            },
            upload() {

                this.upstatus = '',
                    this.pressshow = true
                var _this = this
                _this.loadingStatus = true;
                let file = this.file;
                let param = new FormData();
                //创建form对象

                param.append('file', file, file.name);

                var k
                for (k in this.data) {
                    param.append(k, this.data[k]);

                }

                //通过append向form对象添加数据
                let config = {
                    headers: {'Content-Type': 'multipart/form-data'},
                };  //添加请求头
                this.axios.post(this.action,
                    param,
                    config).then(res => {
                    if (res.data.status !== 1) {
                        _this.fails = true
                        _this.percent = 0

                        _this.upstatus = 'wrong'
                        _this.loadingtext = '上传失败'
                        var error = function (res) {
                            _this.$Notice.error({
                                title: '上传出错',
                                desc: res.data.msg
                            });
                        }
                        error(res)
                        _this.$Message.destroy()
                        _this.$Message.error(
                            '上传失败'
                        )
                        _this.loadingStatus = false
                        clearInterval(time)
                    } else {
                        _this.fails = true
                        clearInterval(time)
                        _this.upstatus = ''
                        _this.percent = 100
                        _this.loadingtext = '上传完成'
                        _this.pressshow = false
                        _this.$Message.destroy()
                        _this.$Message.success(
                            "上传成功"
                        )
                        _this.loadingStatus = false
                        _this.doAfterUpload(res, _this)
                    }
                })
                const time = setInterval(() => {
                    if (_this.loadingStatus === false || _this.action2 === '') {
                        clearInterval(time)
                    } else {
                        this.axios({
                            method: 'get',
                            url: this.action2,
                        }).then(function (res) {
                            if (res.data.data.percent !== undefined) {
                                _this.percent = parseInt(res.data.data.percent)
                            }
                            if (res.data.data.read === -1) {
                                clearInterval(time)
                                _this.loadingStatus = false
                            } else if (res.data.status === 0) {
                                clearInterval(time)
                                _this.loadingStatus = false
                            } else if (res.data.data.percent === '100%') {
                                _this.loadingStatus = false
                                clearInterval(time)
                            }
                        }).catch(function () {
                        })
                    }
                }, 100)
            },
        },
    }
</script>


