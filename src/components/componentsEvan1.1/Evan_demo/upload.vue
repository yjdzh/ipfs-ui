<template>
    <div class="EVbase">
        <div :class="pageTitle?'EVbaseBoxT EVbaseBox':'EVbaseBox'">
            <div class="mbxBox">
                <h3 class="crumb-title " v-if="pageTitle">{{pageTitle}}</h3>
            </div>
            <div class="EVcontent">
                <!--内容区域-->
                <div class="EVeg">
                    <span>样例：</span>
                    <p class="EVeg">
                        <EVupload actionUrl="/zuul/wtcp-iis/uploads/img" action2Url="/wtcp-iis/uploads/"
                                  :doAfterUpload="doAfterUpload" :type="type" :autoUpload="false"></EVupload>
                    </p>
                </div>
                <!--内容区域-->
                <div class="EVeg">
                    <span>代码示例：</span>
                    <pre class="EVcode" v-text="`<template>
<EVupload actionUrl='/zuul/wtcp-iis/uploads/img'
          action2Url='/wtcp-iis/uploads/'
          :doAfterUpload='doAfterUpload'
          :type='type'
          :autoUpload='false'>
</EVupload>
<template>

export default {
    data () {
        return {
            doAfterUpload: function () {},
            type: ['img','png','jpg']
            }
        }
    }
}`">
                </pre>

                </div>
                <!--内容区域-->
                <div class="EVeg">
                    <span>API ：</span>
                    <p>props</p>
                    <div class="EVegtb">
                        <Table border :columns="columns1" :data="data1"></Table>
                    </div>

                </div>
                <!--内容区域-->
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'upload',
        data () {
            return {
                pageTitle: 'EVupload 上传',
                doAfterUpload: function () {
                },
                type: ['img', 'png', 'jpg'],
                columns1: [
                    {
                        title: '属性',
                        key: 'name',
                        width: 100
                    },
                    {
                        title: '说明',
                        key: 'doc'
                    },
                    {
                        title: '类型',
                        key: 'type',
                        width: 200
                    },
                    {
                        title: '默认值',
                        key: 'default',
                        width: 200
                    }
                ],
                data1: [
                    {
                        name: 'autoUpload',
                        doc: '是否开启自动上传',
                        type: 'Boolean',
                        default: 'true'
                    },
                    {
                        name: 'actionUrl',
                        doc: '上传的路径(包含令牌)',
                        type: 'String',
                        default: ''
                    },
                    {
                        name: 'action2Url',
                        doc: '获取上传进度的url',
                        type: 'String',
                        default: ''
                    },
                    {
                        name: 'type',
                        doc: '允许上传的类型',
                        type: 'Array',
                        default: '[]'
                    },
                    {
                        name: 'size',
                        doc: '允许上传的文件的大小',
                        type: 'Number',
                        default: '10485760'
                    },
                    {
                        name: 'doAfterUpload',
                        doc: '上传成功以后的回调函数',
                        type: 'Function',
                        default: 'false'
                    },
                    {
                        name: 'uploadText',
                        doc: '选择文件按钮的显示文字',
                        type: 'String',
                        default: '选择上传文件'
                    },
                    {
                        name: 'clickText',
                        doc: '手动上传按钮的显示文字',
                        type: 'String',
                        default: '开始上传'
                    },
                    {
                        name: 'disabled',
                        doc: '上传按钮是否不能点击',
                        type: 'Boolean',
                        default: 'false'
                    },
                ]

            }
        }
    };
</script>

