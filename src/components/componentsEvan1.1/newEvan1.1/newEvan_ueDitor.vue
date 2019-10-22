<style lang="less">
    #edui1_toolbarbox {

        z-index: 1000;
        top: 0;
        width: 100%;
    }

    #edui1_iframeholder {
        width: 100% !important;



        z-index: 1 !important;
        box-sizing: border-box;
        }

    #edui1_bottombar {
        position: absolute;
        bottom: 0px;
        right: 0;
        width: 100%;

        z-index: 2;
    }

    .view {
        padding: 0;
        word-wrap: break-word;
        cursor: text;
        height: 100%;
        overflow: auto;
    }

    #edui1 {

        z-index: 1!important;
    }

    .ivu-layout {
        display: flex;
        flex-direction: column;
        flex: auto;
        background: #ffffff;
    }

    .text_input-wri {
        .ivu-input-type {
            border-color: #dddee1;
            border-style: dashed;
            transition: color 0.2s linear, background-color 0.2s linear,
            border 0.2s linear, box-shadow 0.2s linear;
            &:hover {
                border-color: #57a3f3;
            }
        }
    }

    #ue1 {
        body.view {
            overflow-y: auto !important;
        }
    }
</style>
<template>
    <div>

        <script :id=id type="text/plain"></script>

        <Modal v-if="imgUrl" v-model="updimage" title='上传图片' @on-ok="clear" @on-cancel="clear">
            <Form :model="formItem" class="text_input-wri">
                <FormItem>
                    <Input v-model="formItem.input" placeholder="请输入关键字"></Input>
                </FormItem>
            </Form>
            <EVupload :actionUrl="imgUrl" :action2Url="imgUrl2" ref="uploadButton1"
                      :doAfterUpload="doAfterUpload" :type="imgType"></EVupload>
        </Modal>
        <Modal v-if="audioUrl" v-model="updaudio" title="上传音频" @on-ok="clear" @on-cancel="clear">
            <EVupload :actionUrl="audioUrl" :action2Url="audioUrl2" ref="uploadButton2"
                      :doAfterUpload="audioAfterUpload" :type="audioType"></EVupload>
        </Modal>
        <Modal v-if="videoUrl" v-model="updvideo" title="上传视频" @on-ok="clear" @on-cancel="clear">
            <EVupload :actionUrl="videoUrl" :action2Url="videoUrl2" ref="uploadButton3"
                      :doAfterUpload="videoAfterUpload" :type="videoType"></EVupload>
        </Modal>
    </div>
</template>
<script>
    import Evanupload from './newEvan_upload'
    export default {
        name: "UE",
        components: {
            Evanupload: Evanupload
        },
        data() {
            return {
                api: {
                    access_token: "access_token=" +
                        JSON.parse(sessionStorage.getItem("wtcp-user-token")),


                },

                // img: [],
                // audio: [],
                // vidue: [],


                file2:
                    null,
                formItem:
                    {
                        input: ""
                    }
                ,
                updimage: false,
                updaudio:
                    false,
                updvideo:
                    false,
                editor:
                    null,
                conf:
                this.config,
                config1:
                    {
                        initialFrameWidth: '100%',
                        initialFrameHeight: this.initialFrameHeight,
                        autoHeightEnabled:
                            false,
                        elementPathEnabled:
                            false,
                        wordCount:
                            true,
                        maximumWords:
                            5000,
                        wordOverFlowMsg:
                            "超出字数限制",

                        focus:
                            true,
                        autoFloatEnabled:
                            false,
                        toolbars:
                            [
                                [
                                    // 'anchor', //锚点
                                    "undo", //撤销
                                    "redo", //重做
                                    "|",
                                    "indent", //首行缩进
                                    "bold", //加粗
                                    // 'snapscreen', //截图
                                    "italic", //斜体
                                    "underline", //下划线
                                    "strikethrough", //删除线
                                    // 'subscript', //下标
                                    // 'fontborder', //字符边框
                                    // 'superscript', //上标
                                    "formatmatch", //格式刷
                                    // 'source', //源代码
                                    // 'blockquote', //引用
                                    // 'pasteplain', //纯文本粘贴模式
                                    // 'selectall', //全选
                                    // 'print', //打印
                                    "preview", //预览
                                    "horizontal", //分隔线
                                    // 'removeformat', //清除格式
                                    // 'time', //时间
                                    // 'date', //日期
                                    "unlink", //取消链接

                                    // 'insertrow', //前插入行
                                    // 'insertcol', //前插入列
                                    // 'mergeright', //右合并单元格
                                    // 'mergedown', //下合并单元格
                                    // 'deleterow', //删除行
                                    // 'deletecol', //删除列
                                    // 'splittorows', //拆分成行
                                    // 'splittocols', //拆分成列
                                    // 'splittocells', //完全拆分单元格
                                    // 'deletecaption', //删除表格标题
                                    // 'inserttitle', //插入标题
                                    // 'mergecells', //合并多个单元格
                                    // // 'deletetable', //删除表格
                                    // 'cleardoc', //清空文档
                                    // 'insertparagraphbeforetable', //"表格前插入行"
                                    // 'insertcode', //代码语言
                                    "|",
                                    "fontfamily", //字体
                                    "fontsize", //字号
                                    "paragraph", //段落格式
                                    // 'simpleupload', //单图上传
                                    // 'insertimage', //多图上传
                                    // 'edittable', //表格属性
                                    // 'edittd', //单元格属性
                                    "|",
                                    "link", //超链接
                                    // 'emotion', //表情
                                    // 'spechars', //特殊字符
                                    "searchreplace", //查询替换
                                    // 'map', //Baidu地图
                                    // 'gmap', //Google地图
                                    // 'insertvideo', //视频
                                    // 'help', //帮助
                                    "|",
                                    "justifyleft", //居左对齐
                                    "justifyright", //居右对齐
                                    "justifycenter", //居中对齐
                                    "justifyjustify", //两端对齐
                                    "|",
                                    "forecolor", //字体颜色
                                    "backcolor", //背景色
                                    "insertorderedlist", //有序列表
                                    // 'insertunorderedlist', //无序列表
                                    // 'fullscreen', //全屏
                                    // 'directionalityltr', //从左向右输入
                                    // 'directionalityrtl', //从右向左输入
                                    "|",
                                    "rowspacingtop", //段前距
                                    "rowspacingbottom", //段后距
                                    // 'pagebreak', //分页
                                    // 'insertframe', //插入Iframe
                                    // 'imagenone', //默认
                                    // 'imageleft', //左浮动
                                    // 'imageright', //右浮动
                                    // 'attachment', //附件
                                    // 'imagecenter', //居中
                                    // 'wordimage', //图片转存
                                    // 'lineheight', //行间距
                                    // 'edittip ', //编辑提示
                                    // 'customstyle', //自定义标题
                                    // 'autotypeset', //自动排版
                                    // 'webapp', //百度应用
                                    // 'touppercase', //字母大写
                                    // 'tolowercase', //字母小写
                                    // 'background', //背景
                                    // 'template', //模板
                                    // 'scrawl', //涂鸦
                                    // 'music', //音乐
                                    // 'inserttable', //插入表格
                                    // 'drafts', // 从草稿箱加载
                                    // 'charts', // 图表
                                    "|"
                                ]
                            ]
                    }
            }
                ;
        },
        props: {
            imgUrl: {
                type: String,
                default: null
            },
            imgUrl2: {
                type: String,
                default: null
            },
            audioUrl: {
                type: String,
                default: null
            },
            audioUrl2: {
                type: String,
                default: null
            },
            videoUrl: {
                type: String,
                default: null
            },
            videoUrl2: {
                type: String,
                default:null
            },
            initialFrameHeight: {
                type: Number,
                default: 500
            },
            content: {
                type: String,
                default: ""
            },
            config: {
                type: Object
            },
            id: {
                type: String,
                default: "EVueditor"
            },
            imgType:{
                type: Array,
                default: function () {}
            },
            audioType:{
                type: Array,
                default:  function () {}
            },
            videoType:{
                type: Array,
                default:  function () {}
            },
        },
        mounted() {
            const _this = this;
            _this.editor = UE.getEditor(_this.id, _this.conf); // 初始化UE
            this.editor.ready(function () {
                //设置编辑器的内容
                _this.editor.setContent(_this.content);
                //获取html内容，返回: <p>hello</p>
            });

            UE.registerUI(
                "uploadimg",
                function (editor, uiName) {
                    var uploadimg = new UE.ui.Button({
                        //按钮的名字
                        name: "uploadimg",
                        //提示
                        title: "上传图片",
                        //添加额外样式，指定icon图标，这里默认使用一个重复的
                        cssRules: "background-position: -380px 0;",
                        //点击时执行的命令
                        onclick: function () {
                            //这里可以不用执行命令,做你自己的操作也可
                            _this.updimage = true;
                        }
                    });
                    return uploadimg;
                },
                [1]
            );

            UE.registerUI(
                "uploadaudio",
                function (editor, uiName) {
                    var uploadaudio = new UE.ui.Button({
                        //按钮的名字
                        name: "uploadaudio",
                        //提示
                        title: "上传音频",
                        //添加额外样式，指定icon图标，这里默认使用一个重复的
                        cssRules: "background-position: -18px -40px;",
                        //点击时执行的命令
                        onclick: function () {
                            //这里可以不用执行命令,做你自己的操作也可
                            _this.updaudio = true;
                        }
                    });
                    return uploadaudio;
                },
                [3]
            );
            UE.registerUI(
                "uploadvideo",
                function (editor, uiName) {
                    var uploadvideo = new UE.ui.Button({
                        //按钮的名字
                        name: "uploadvideo",
                        //提示
                        title: "上传视频",
                        //添加额外样式，指定icon图标，这里默认使用一个重复的
                        cssRules: "background-position: -320px -20px;",
                        //点击时执行的命令
                        onclick: function () {
                            //这里可以不用执行命令,做你自己的操作也可
                            _this.updvideo = true;
                        }
                    });
                    return uploadvideo;
                },
                [10]
            );

        },
        created() {
            const _this = this;
            if (!_this.config) {
                _this.conf = _this.config1;
            }
             // 初始化UE


            //设置编辑器的内容

            //获取html内容，返回: <p>hello</p>

        },

        methods: {
            clear() {
                this.$refs.uploadButton1.file = null;
                this.$refs.uploadButton2.file = null;
                this.$refs.uploadButton3.file = null;

            },

            getContent() {
                // 获取内容方法
                return this.editor.getContent();
            }
            ,

            // 图片上传成功
            doAfterUpload: function (res, that) {
                let urrl = res.data.data.url.substr(0, res.data.data.url.length);
                urrl = urrl.replace(/\\/g, "/");
                this.editor.execCommand(
                    "inserthtml",
                    "&nbsp;<img src=" + this.Global.uploadUrl + urrl + ">&nbsp;"
                );
            }
            ,

            //音频上传成功
            audioAfterUpload: function (res, that) {
                let urrl = res.data.data.url.substr(0, res.data.data.url.length);
                console.log(urrl);
                urrl = urrl.replace(/\\/g, "/");
                console.log(urrl);
                this.editor.execCommand(
                    "inserthtml",
                    "&nbsp;<audio src=" +
                    this.Global.uploadUrl +
                    urrl +
                    ' controls="controls"></audio>&nbsp;'
                );
            }
            ,

            // 视频上传成功
            videoAfterUpload: function (res, that) {
                let urrl = res.data.data.url.substr(0, res.data.data.url.length);
                urrl = urrl.replace(/\\/g, "/");
                this.editor.execCommand(
                    "inserthtml",
                    "&nbsp;<video src=" +
                    this.Global.uploadUrl +
                    urrl +
                    ' controls="controls"></video>&nbsp;'
                );
            }
        }
        ,
        destroyed() {
            this.editor.destroy();
        },

    }
    ;
</script>
