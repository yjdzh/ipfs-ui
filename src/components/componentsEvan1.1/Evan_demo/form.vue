<template>
    <div>
        <!--内容区域-->
        <div class="EVeg"  style="padding: 10px;">
            <span>样例：</span>
            <div>
                <EVpageForm pageTitle="普通表单页面demo" :model="formValidate" :rules="ruleValidate" >
                    <div slot="form">


                        <EVdivider orientation="left">表单样例</EVdivider>

                        <i-switch size='large' @on-change="switchfunction">
                            <span slot='open'>开启</span>
                            <span slot='close'>关闭</span>
                        </i-switch>

                        <EVitemContainer label="E-mail" prop="mail" v-if="this.switch">
                            <Input v-model.trim="formValidate.mail" placeholder="Enter your e-mail"></Input>
                        </EVitemContainer>
                        <EVitemContainer label="City" prop="city" v-if="this.switch">
                            <Select v-model="formValidate.city" placeholder="Select your city">
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </EVitemContainer>
                        <EVitemContainer label="Date" v-if="this.switch">
                            <Row>
                                <Col span="11">
                                    <FormItem prop="date">
                                        <DatePicker type="date" placeholder="Select date"
                                                    v-model="formValidate.date"></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="2" style="text-align: center">-</Col>
                                <Col span="11">
                                    <FormItem prop="time">
                                        <TimePicker type="time" placeholder="Select time"
                                                    v-model="formValidate.time"></TimePicker>
                                    </FormItem>
                                </Col>
                            </Row>
                        </EVitemContainer>
                        <EVdivider orientation="left" v-if="this.switch">我是分割线</EVdivider>
                        <EVitemContainer label="Gender" prop="gender" v-if="this.switch">
                            <RadioGroup v-model="formValidate.gender">
                                <Radio label="male">Male</Radio>
                                <Radio label="female">Female</Radio>
                            </RadioGroup>
                        </EVitemContainer>
                        <EVitemContainer label="11111" prop="vvv" v-if="this.switch">

                            <EVinputNumber v-model="formValidate.vvv"></EVinputNumber>
                        </EVitemContainer>
                        <EVitemContainer label="Hobby" prop="interest" v-if="this.switch">
                            <CheckboxGroup v-model="formValidate.interest">
                                <Checkbox label="Eat"></Checkbox>
                                <Checkbox label="Sleep"></Checkbox>
                                <Checkbox label="Run"></Checkbox>
                                <Checkbox label="Movie"></Checkbox>
                            </CheckboxGroup>
                        </EVitemContainer>
                        <EVitemContainer label="Desc" prop="desc" v-if="this.switch">
                            <Input v-model.trim="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                                   placeholder="Enter something..."></Input>
                        </EVitemContainer>
                    </div>
                </EVpageForm>
            </div>
        </div>
        <!--内容区域-->
        <div class="EVeg" style="padding: 10px;">
            <span>代码示例：</span>
            <pre class="EVcode" v-text="`<template>
    <EVpageForm pageTitle='普通表单页面demo' :model='formValidate' :rules='ruleValidate'>
        <div slot='form'>
            <EVdivider orientation='left'>表单样例</EVdivider>
            <i-switch size='large' @on-change='switchfunction'>
                <span slot='open'>开启</span>
                <span slot='close'>关闭</span>
            </i-switch>
            <EVitemContainer label='E-mail' prop='mail' v-if='this.switch'>
                <Input v-model.trim='formValidate.mail' placeholder='Enter your e-mail'></Input>
            </EVitemContainer>
            <EVitemContainer label='City' prop='city'v-if='this.switch'>
                <Select v-model='formValidate.city' placeholder='Select your city'>
                    <Option value='beijing'>New York</Option>
                    <Option value='shanghai'>London</Option>
                    <Option value='shenzhen'>Sydney</Option>
                </Select>
            </EVitemContainer>
            <EVitemContainer label='Date'v-if='this.switch'>
                <Row>
                    <Col span='11'>
                        <FormItem prop='date'>
                            <DatePicker type='date' placeholder='Select date' v-model='formValidate.date'></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span='2' style='text-align: center'>-</Col>
                    <Col span='11'>
                        <FormItem prop='time'>
                            <TimePicker type='time' placeholder='Select time' v-model='formValidate.time'></TimePicker>
                        </FormItem>
                    </Col>
                </Row>
            </EVitemContainer>
            <EVdivider orientation='left'v-if='this.switch'>我是分割线</EVdivider>
            <EVitemContainer label='Gender' prop='gender'v-if='this.switch'>
                <RadioGroup v-model='formValidate.gender'>
                    <Radio label='male'>Male</Radio>
                    <Radio label='female'>Female</Radio>
                </RadioGroup>
            </EVitemContainer>
            <EVitemContainer label='11111' prop='vvv'v-if='this.switch'>
                <EVinputNumber v-model='formValidate.vvv'></EVinputNumber>
            </EVitemContainer>
            <EVitemContainer label='Hobby' prop='interest'v-if='this.switch'>
                <CheckboxGroup v-model='formValidate.interest'>
                    <Checkbox label='Eat'></Checkbox>
                    <Checkbox label='Sleep'></Checkbox>
                    <Checkbox label='Run'></Checkbox>
                    <Checkbox label='Movie'></Checkbox>
                </CheckboxGroup>
            </EVitemContainer>
            <EVitemContainer label='Desc' prop='desc'v-if='this.switch'>
                <Input v-model.trim='formValidate.desc' type='textarea' :autosize='{minRows: 2,maxRows: 5}'
                       placeholder='Enter something...'></Input>
            </EVitemContainer>
        </div>
        </EVpageForm>
<template>

export default {
    data () {
        return {
            switch:false,
            formValidate: {
                name: '',
                mail: '',
                city: '',
                gender: '',
                interest: [],
                date: '',
                time: '',
                desc: '',
                vvv: null,
            },
            ruleValidate: {
                name: [
                    {required: true, validator: validator.integer, trigger: 'blur'}
                ],
                mail: [
                    {required: true, message: 'Mailbox cannot be empty', trigger: 'blur'},
                    {type: 'email', message: 'Incorrect email format', trigger: 'blur'}
                ],
                city: [
                    {required: true, message: 'Please select the city', trigger: 'change'}
                ],
                gender: [
                    {required: true, message: 'Please select gender', trigger: 'change'}
                ],

                interest: [
                    {
                        required: true,
                        type: 'array',
                        min: 1,
                        message: 'Choose at least one hobby',
                        trigger: 'change'
                    },
                    {type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change'}
                ],
                date: [
                    {required: true, type: 'date', message: 'Please select the date', trigger: 'change'}
                ],
                time: [
                    {required: true, type: 'string', message: 'Please select time', trigger: 'change'}
                ],
                desc: [
                    {required: true, message: 'Please enter a personal introduction', trigger: 'blur'},
                    {type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur'}
                ]
            },
        }
    }
},`">
                    </pre>
        </div>
        <!--内容区域-->
        <div class="EVeg" style="padding: 10px;">
            <span>API ：</span>
            <p>porps</p>
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
</template>
<script>
    import {
        demoFormAddSubmit,
        demoFormEditOpen,
        demoFormEditSubmit,
        demoForm1validate,
        demoForm2validate,
        demoForm3upload
    } from "../api/index";
    import validator from "../util/validator"

    export default {
        data () {
            return {
                switch: false,
                formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: '',
                    vvv: null,
                },
                ruleValidate: {
                    name: [
                        {required: true, validator: validator.integer, trigger: 'blur'}
                    ],
                    mail: [
                        {required: true, message: 'Mailbox cannot be empty', trigger: 'blur'},
                        {type: 'email', message: 'Incorrect email format', trigger: 'blur'}
                    ],
                    city: [
                        {required: true, message: 'Please select the city', trigger: 'change'}
                    ],
                    gender: [
                        {required: true, message: 'Please select gender', trigger: 'change'}
                    ],
                    vvv: [],
                    interest: [
                        {
                            required: true,
                            type: 'array',
                            min: 1,
                            message: 'Choose at least one hobby',
                            trigger: 'change'
                        },
                        {type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change'}
                    ],
                    date: [
                        {required: true, type: 'date', message: 'Please select the date', trigger: 'change'}
                    ],
                    time: [
                        {required: true, type: 'string', message: 'Please select time', trigger: 'change'}
                    ],
                    desc: [
                        {required: true, message: 'Please enter a personal introduction', trigger: 'blur'},
                        {type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur'}
                    ]
                },
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
                        name: 'pageTitle',
                        doc: '页面导航显示的当前页面名字',
                        type: 'String',
                        default: 'null'
                    },
                    {
                        name: 'doload',
                        doc: '是否显示提交按钮',
                        type: 'Boolean',
                        default: 'true'
                    },
                    {
                        name: 'SubmitBtn',
                        doc: '是否显示提交按钮',
                        type: 'Boolean',
                        default: 'true'
                    },
                    {
                        name: 'submitBtnText',
                        doc: 'submit按钮显示的名字',
                        type: 'String',
                        default: '提交'
                    },
                    {
                        name: 'CancalBtn',
                        doc: '是否显示取消按钮',
                        type: 'Boolean',
                        default: 'true'
                    },
                    {
                        name: 'cancelBtnText',
                        doc: 'cancel按钮显示的名字',
                        type: 'String',
                        default: '取消'
                    },

                    {
                        name: 'ResetBtn',
                        doc: '是否显示重置按钮',
                        type: 'Boolean',
                        default: 'true'
                    },
                    {
                        name: 'resetBtnText',
                        doc: 'reset按钮显示的名字',
                        type: 'String',
                        default: '重置'
                    },
                    {
                        name: 'model',
                        doc: '表单中的数据项集合',
                        type: 'Object',
                        default: '{}'
                    },
                    {
                        name: 'rules',
                        doc: '表单校验规则集合',
                        type: 'Object',
                        default: '{}'
                    },
                    {
                        name: 'submitType',
                        doc: '表单页类型（编辑/新增）',
                        type: 'Number',
                        default: '-1'
                    },
                    {
                        name: 'submitUrl',
                        doc: '提交的请求地址（请求中段【/api以后 和 access_token之前的部分】）',
                        type: 'String',
                        default: ''
                    },
                    {
                        name: 'doSubmit',
                        doc: '提交函数（点击按钮并且通过表单校验以后才执行的）',
                        type: 'Function',
                        default: ''
                    },
                    {
                        name: 'doSubmitSuccess',
                        doc: '提交成功发出，回执为1时候的函数',
                        type: 'Function',
                        default: 'function () {\n' +
                            '                    this.defaultSubmitSuccess()\n' +
                            '                },'
                    },
                    {
                        name: 'doSubmitFail',
                        doc: '提交成功发出，回执为0时候的函数',
                        type: 'Function',
                        default: 'function () {\n' +
                            '                    this.defaultSubmitFail()\n' +
                            '                },'
                    },
                    {
                        name: 'doSubmitBefor',
                        doc: '按下提交按钮，完成表单检验以后提交函数之前的数据准备函数（拼装隐藏值和表单值）',
                        type: 'Function',
                        default: ''
                    },
                    {
                        name: 'doCancal',
                        doc: '点击返回（包含两个键值对，1要跳转地址路由的名字name；2携带的参数query{}）',
                        type: 'Object',
                        default: '{}'
                    },
                    {
                        name: 'doReset',
                        doc: '点击重置执行的函数（默认清空检验报错和值）',
                        type: 'Function',
                        default: 'function (e) {\n' +
                            '                    this.defauleReset(e)\n' +
                            '                },'
                    },
                    {
                        name: 'doCreated',
                        doc: '页面加载前的函数（用来准备数据，基本不用）',
                        type: 'Function',
                        default: ''
                    },
                    {
                        name: 'verification',
                        doc: '是否验证表单',
                        type: 'Boolean',
                        default: 'true'
                    },
                    {
                        name: 'labelWidth',
                        doc: '表单控件左边说明文字的宽度',
                        type: 'Number',
                        default: '80'
                    },
                    {
                        name: 'labelAlign',
                        doc: '表单控件左边说明文字的对齐方式',
                        type: 'String',
                        default: 'left'
                    },
                    {
                        name: 'formItemWidth',
                        doc: '表单整体宽度百分比（默认居中）',
                        type: 'Number',
                        default: '100'
                    },
                    {
                        name: 'backRemarkWidth',
                        doc: '表单控件后插槽宽度',
                        type: 'Number',
                        default: '100'
                    },
                    {
                        name: 'backRemarkAlign',
                        doc: '表单控件后插槽对齐方式',
                        type: 'String',
                        default: 'right'
                    },
                    {
                        name: 'backRemarkPadding',
                        doc: '表单控件后插槽边距',
                        type: 'String',
                        default: '0px 10px 0px 10px'
                    },
                    {
                        name: 'frontRemarkWidth',
                        doc: '表单控件前插槽宽度',
                        type: 'Number',
                        default: '100'
                    },
                    {
                        name: 'frontRemarkAlign',
                        doc: '表单控件前插槽对齐方式',
                        type: 'String',
                        default: 'right'
                    },
                    {
                        name: 'frontRemarkPadding',
                        doc: '表单控件前插槽边距',
                        type: 'String',
                        default: '0px 10px 0px 10px'
                    },
                    {
                        name: 'itemPadding',
                        doc: '表单控件（含侧控件的label说明文字）整体边距',
                        type: 'String',
                        default: '0px 0px 0px 0px'
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
                        name: 'form',
                        doc: '表单插槽',

                    }

                ]
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
            , switchfunction (e) {
                this.switch = e
            }
        }
    }
</script>
