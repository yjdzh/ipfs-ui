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
                        <EVueDitor content="这里是初始化内容" :initialFrameHeight="200"></EVueDitor>
                    </p>
                </div>
                <!--内容区域-->
                <div class="EVeg">
                    <span>代码示例：</span>
                    <pre class="EVcode" v-text="`<template>
    <EVueDitor content='这里是初始化内容' :initialFrameHeight='200' ></EVueDitor>
</template>
`">
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
        name: 'ueDitor',
        data () {
            return {
                pageTitle: 'EVueDitor 编辑器',

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
                        name: 'imgUrl',
                        doc: '图片上传地址(包含令牌)',
                        type: 'String',
                        default: 'null'
                    },
                    {
                        name: 'imgUrl2',
                        doc: '图片进度地址(包含令牌)',
                        type: 'String',
                        default: 'null'
                    },
                    {
                        name: 'audioUrl',
                        doc: '音频上传地址(包含令牌)',
                        type: 'String',
                        default: 'null'
                    },
                    {
                        name: 'audioUrl2',
                        doc: '音频进度地址(包含令牌)',
                        type: 'String',
                        default: 'null'
                    },
                    {
                        name: 'videoUrl',
                        doc: '视频上传地址(包含令牌)',
                        type: 'String',
                        default: 'null'
                    },
                    {
                        name: 'videoUrl2',
                        doc: '视频进度地址(包含令牌)',
                        type: 'String',
                        default: 'null'
                    },
                    {
                        name: 'initialFrameHeight',
                        doc: '编辑器高度',
                        type: 'Number',
                        default: '500'
                    },
                    {
                        name: 'imgType',
                        doc: '上传图片允许上传的类型',
                        type: 'Array',
                        default: '[]'
                    },
                    {
                        name: 'audioType',
                        doc: '上传音频允许上传的类型',
                        type: 'Array',
                        default: '[]'
                    },
                    {
                        name: 'videoType',
                        doc: '上传视频允许上传的类型',
                        type: 'Array',
                        default: '[]'
                    },
                    {
                        name: 'content',
                        doc: '初始化内容',
                        type: 'String',
                        default: '这里是初始化内容'
                    },

                ]

            }
        }
    };
</script>

