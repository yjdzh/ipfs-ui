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
                        <EVpageForm pageTitle="例子一" :SubmitBtn="false">
                            <div slot="form">
                                <EVitemContainer label='Label' prop='number'>
                                    <span slot="prepend">前置插槽(支持：对齐，边距，宽度）</span>
                                    <Input placeholder="请输入内容"></Input>
                                    <span slot="append">
                                        <Tooltip content='后置插槽(支持：对齐，边距，宽度）' placement='left'>
                                            <Icon type='help'></Icon>
                                        </Tooltip>
                                </span>
                                </EVitemContainer>
                            </div>
                        </EVpageForm>
                    </p>
                    <p class="EVeg">
                        <EVpageForm pageTitle="例子二" :SubmitBtn="false" :model="formvalue1">
                            <div slot="form">
                                <EVitemContainer label="LabelVal" prop="val">
                                    <EVinputNumber v-model="formvalue1.val" placeholder="请输入0-100的整数"></EVinputNumber>
                                </EVitemContainer>
                            </div>
                        </EVpageForm>
                    </p>

                </div>
                <!--内容区域-->
                <div class="EVeg">
                    <span>代码示例：</span>
                    <pre class="EVcode" v-text="`<template>
   <EVpageForm pageTitle='例子一' :SubmitBtn='false'>
        <div slot='form'>
            <EVitemContainer label='Label' prop='number'>
                <span slot='prepend'>前置插槽(支持：对齐，边距，宽度）</span>
                <Input placeholder='请输入内容'></Input>
                <span slot='append'>
                    <Tooltip content='后置插槽(支持：对齐，边距，宽度）' placement='left'>
                        <Icon type='help'></Icon>
                    </Tooltip>
                </span>
            </EVitemContainer>
        </div>
    </EVpageForm>
<template>`">
                    </pre>
                    <pre class="EVcode" v-text="`<template>
    <EVpageForm pageTitle='例子二' :SubmitBtn='false' :model='formvalue1' >
        <div slot='form'>
            <EVitemContainer label='LabelVal' prop='val'>
                <EVinputNumber v-model='formvalue1.val' placeholder='请输入0-100的整数'></EVinputNumber>
            </EVitemContainer>
        </div>
    </EVpageForm>
<template>

export default {
    data () {
        return {
            formvalue1: {
                val: '',
            },
            ruleValidate: {},
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
                    <p>slot</p>
                    <div class="EVegtb">
                        <Table border :columns="columns2" :data="data2"></Table>
                    </div>

                </div>
                <!--内容区域-->
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'itemContainer',
        data () {
            return {
                pageTitle: 'EVitemContainer 表单项',

                formvalue1: {
                    val: '',
                },
                ruleValidate: {},
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
                        name: 'label',
                        doc: '表单此项显示的名字',
                        type: 'String',
                        default: ''
                    },
                    {
                        name: 'prop',
                        doc: '对应校验的名字',
                        type: 'String',
                        default: ''
                    },
                ],
                columns2: [
                    {
                        title: '名称',
                        key: 'name',
                        width: 100
                    },
                    {
                        title: '说明',
                        key: 'doc'
                    },

                ],
                data2: [
                    {
                        name: 'prepend',
                        doc: '前置插槽(支持：对齐，边距，宽度）',

                    },
                    {
                        name: 'append',
                        doc: '后置插槽(支持：对齐，边距，宽度）',

                    },
                ]

            }
        }
    };
</script>

