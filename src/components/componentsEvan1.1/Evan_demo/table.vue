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
                        <EVdivider orientation='left'>我是分割线</EVdivider>
                    </p>
                    <p class="EVeg">
                        <EVdivider orientation="right">
                            <i-switch size="large">
                                <span slot="open">开启</span>
                                <span slot="close">关闭</span>
                            </i-switch>
                        </EVdivider>
                    </p>
                </div>
                <!--内容区域-->
                <div class="EVeg">
                    <span>代码示例：</span>
                    <pre class="EVcode" v-text="`<template>
    <EVdivider orientation='left'> 我是分割线 </EVdivider>
<template>`">
                    </pre>
                    <pre class="EVcode" v-text="`<template>
    <EVdivider orientation='right'>
        <i-switch size='large'>
            <span slot='open'>开启</span>
            <span slot='close'>关闭</span>
        </i-switch>
    </EVdivider>
<template>`">

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
        name: 'divider',
        data () {
            return {
                pageTitle: 'EVdivider 分割线',

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
                        name: 'type',
                        doc: '水平还是垂直类型，可选值为 horizontal 或 vertical',
                        type: 'String',
                        default: 'horizontal'
                    },
                    {
                        name: 'orientation',
                        doc: '分割线标题的位置，可选值为 left、right 或 center',
                        type: 'Number',
                        default: 'center'
                    }, {
                        name: 'dashed',
                        doc: '是否虚线',
                        type: 'Boolean',
                        default: 'false'
                    },
                ]

            }
        }
    };
</script>
<style>
    .ivu-divider, .ivu-divider-vertical {
        margin: 0 8px;
        display: inline-block;
        height: .9em;
        width: 1px;
        vertical-align: middle;
        position: relative;
        top: -.06em
    }

    .ivu-divider-horizontal {
        display: block;
        height: 1px;
        width: 100%;
        margin: 24px 0;
        clear: both
    }

    .ivu-divider-horizontal.ivu-divider-with-text-center, .ivu-divider-horizontal.ivu-divider-with-text-left, .ivu-divider-horizontal.ivu-divider-with-text-right {
        display: table;
        white-space: nowrap;
        text-align: center;
        background: 0 0;
        font-weight: 500;
        color: #17233d;
        font-size: 16px;
        margin: 16px 0
    }

    .ivu-divider-horizontal.ivu-divider-with-text-center:after, .ivu-divider-horizontal.ivu-divider-with-text-center:before, .ivu-divider-horizontal.ivu-divider-with-text-left:after, .ivu-divider-horizontal.ivu-divider-with-text-left:before, .ivu-divider-horizontal.ivu-divider-with-text-right:after, .ivu-divider-horizontal.ivu-divider-with-text-right:before {
        content: "";
        display: table-cell;
        position: relative;
        top: 50%;
        width: 50%;
        border-top: 1px solid #e8eaec;
        -webkit-transform: translateY(50%);
        transform: translateY(50%)
    }

    .ivu-divider-horizontal.ivu-divider-with-text-left, .ivu-divider-horizontal.ivu-divider-with-text-right {
        font-size: 14px
    }

    .ivu-divider-horizontal.ivu-divider-with-text-left .ivu-divider-inner-text, .ivu-divider-horizontal.ivu-divider-with-text-right .ivu-divider-inner-text {
        display: inline-block;
        padding: 0 10px
    }

    .ivu-divider-horizontal.ivu-divider-with-text-left:before {
        top: 50%;
        width: 5%
    }

    .ivu-divider-horizontal.ivu-divider-with-text-left:after, .ivu-divider-horizontal.ivu-divider-with-text-right:before {
        top: 50%;
        width: 95%
    }

    .ivu-divider-horizontal.ivu-divider-with-text-right:after {
        top: 50%;
        width: 5%
    }

    .ivu-divider-inner-text {
        display: inline-block;
        padding: 0 24px
    }

    .ivu-divider-dashed {
        background: 0 0;
        border-top: 1px dashed #e8eaec
    }

    .ivu-divider-horizontal.ivu-divider-with-text-left.ivu-divider-dashed, .ivu-divider-horizontal.ivu-divider-with-text-right.ivu-divider-dashed, .ivu-divider-horizontal.ivu-divider-with-text.ivu-divider-dashed {
        border-top: 0
    }

    .ivu-divider-horizontal.ivu-divider-with-text-left.ivu-divider-dashed:after, .ivu-divider-horizontal.ivu-divider-with-text-left.ivu-divider-dashed:before, .ivu-divider-horizontal.ivu-divider-with-text-right.ivu-divider-dashed:after, .ivu-divider-horizontal.ivu-divider-with-text-right.ivu-divider-dashed:before, .ivu-divider-horizontal.ivu-divider-with-text.ivu-divider-dashed:after, .ivu-divider-horizontal.ivu-divider-with-text.ivu-divider-dashed:before {
        border-style: dashed none none
    }

</style>
