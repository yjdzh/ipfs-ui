<template>
    <div class="EVbase">
        <div :class="pageTitle?'EVbaseBoxT EVbaseBox':'EVbaseBox'">
            <div class="mbxBox">
                <h3 class="crumb-title " v-if="pageTitle">{{pageTitle}}</h3>
            </div>
            <div class="EVcontent">
                暂未开放
                <!--内容区域-->
                <!--<div class="EVeg">-->
                    <!--<span>样例：</span>-->
                    <!--<p class="EVeg">-->
                        <!--<EVdivider orientation='left'>我是分割线</EVdivider>-->
                    <!--</p>-->
                    <!---->
                <!--</div>-->
                <!--&lt;!&ndash;内容区域&ndash;&gt;-->
                <!--<div class="EVeg">-->
                    <!--<span>代码示例：</span>-->
                    <!--<pre class="EVcode" v-text="`<template>-->
    <!--<EVdivider orientation='left'> 我是分割线 </EVdivider>-->
<!--<template>`">-->
                    <!--</pre>-->
                   <!---->
                <!--</div>-->
                <!--&lt;!&ndash;内容区域&ndash;&gt;-->
                <!--<div class="EVeg">-->
                    <!--<span>API ：</span>-->
                    <!--<p>props</p>-->
                    <!--<div class="EVegtb">-->
                        <!--<Table border :columns="columns1" :data="data1"></Table>-->
                    <!--</div>-->

                <!--</div>-->
                <!--内容区域-->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'expandTree',
        data () {
            return {
                pageTitle: 'EVexpandTree 拓展树',

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

