<template>
    <div class="EVbase">
        <div :class="pageTitle?'EVbaseBoxT EVbaseBox':'EVbaseBox'">
            <div class="mbxBox">
                <h3 class="crumb-title " v-if="pageTitle">{{pageTitle}}</h3>
            </div>
            <div class="EVcontent">
                <!--<EVtags></EVtags>-->
                <!--内容区域-->
                <div class="EVeg">
                    <span>样例：</span>
                    <p class="EVeg">
                        <EVtags :value="val"></EVtags>
                    </p>
                </div>
                <!--内容区域-->
                <div class="EVeg">
                    <span>代码示例：</span>
                    <pre class="EVcode" v-text="`<template>
   <EVtags :value='val'></EVtags>
<template>

export default {
    data () {
        return {
            val:['123','456']
        }
    }
};`">
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
        name: 'tags',
        data () {
            return {
                pageTitle: 'EVtags 标签',
                val:['123','456'],
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
                        name: 'value',
                        doc: '标签初始值',
                        type: 'Array',
                        default: '[]'
                    },
                    {
                        name: 'title',
                        doc: '弹窗（模态框）标题',
                        type: 'String',
                        default: '新增标签'
                    }, {
                        name: 'addTag',
                        doc: '添加按钮的文字内容',
                        type: 'String',
                        default: '新增'
                    }, {
                        name: 'tagUrl',
                        doc: '异步请求验证的url',
                        type: 'String',
                        default: ''
                    }, {
                        name: 'ajaxKey',
                        doc: '提交验证时候的键值对的key',
                        type: 'String',
                        default: 'key'
                    }, {
                        name: 'doAjax',
                        doc: '是否开启异步验证',
                        type: 'Boolean',
                        default: 'false'
                    }, {
                        name: 'min',
                        doc: '新增的标签字数最小限制',
                        type: 'Number',
                        default: '1'
                    }, {
                        name: 'max',
                        doc: '新增的标签字数最大限制',
                        type: 'Number',
                        default: '4'
                    }, {
                        name: 'regexTxt',
                        doc: '校验输入内容的正则表达式',
                        type: 'RegExp',
                        default: ''
                    },{
                        name: 'regexText',
                        doc: '正则校验未通过时的提示',
                        type: 'String',
                        default: '含有非法字符'
                    },{
                        name: 'arryLength',
                        doc: '允许的最大标签个数',
                        type: 'Number',
                        default: '4'
                    },
                ]

            }
        },
        methods: {
            abc(){
                console.log(this)
            }
        }

    };
</script>

