<template>
    <div class="EVbase">
        <div :class="pageTitle?'EVbaseBoxT EVbaseBox':'EVbaseBox'" >
            <div class="pageload" v-show="pageload">
                <row>
                    <Col class="demo-spin-col" span="8">
                        <Spin fix>
                            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                            <div>加载中</div>
                        </Spin>
                    </Col>
                </row>
            </div>
            <div class="mbxBox">
                <h3 class="crumb-title " v-if="pageTitle">{{pageTitle}}</h3>
            </div>
            <div class="EVcontent">
                暂未开放
                <!--<Tabs type="card" class="evanTab">-->
                    <!--<TabPane label="标签一">-->
                        <!--<div class="EVtabContent">-->
                            <!--<EVpageForm  >-->
                                <!--<div slot="form">-->



                                    <!--<EVdivider orientation="left">表单样例</EVdivider>-->



                                    <!--<EVitemContainer label="E-mail" prop="mail" >-->
                                        <!--<Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>-->
                                    <!--</EVitemContainer>-->
                                    <!--<EVitemContainer label="City" prop="city">-->
                                        <!--<Select v-model="formValidate.city" placeholder="Select your city">-->
                                            <!--<Option value="beijing">New York</Option>-->
                                            <!--<Option value="shanghai">London</Option>-->
                                            <!--<Option value="shenzhen">Sydney</Option>-->
                                        <!--</Select>-->
                                    <!--</EVitemContainer>-->
                                    <!--<EVitemContainer label="Date">-->
                                        <!--<Row>-->
                                            <!--<Col span="11">-->
                                                <!--<FormItem prop="date">-->
                                                    <!--<DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>-->
                                                <!--</FormItem>-->
                                            <!--</Col>-->
                                            <!--<Col span="2" style="text-align: center">-</Col>-->
                                            <!--<Col span="11">-->
                                                <!--<FormItem prop="time">-->
                                                    <!--<TimePicker type="time" placeholder="Select time" v-model="formValidate.time"></TimePicker>-->
                                                <!--</FormItem>-->
                                            <!--</Col>-->
                                        <!--</Row>-->
                                    <!--</EVitemContainer>-->
                                    <!--<EVdivider orientation="left">我是分割线</EVdivider>-->
                                    <!--<EVitemContainer label="Gender" prop="gender">-->
                                        <!--<RadioGroup v-model="formValidate.gender">-->
                                            <!--<Radio label="male">Male</Radio>-->
                                            <!--<Radio label="female">Female</Radio>-->
                                        <!--</RadioGroup>-->
                                    <!--</EVitemContainer>-->
                                    <!--<EVitemContainer label="11111" prop="vvv">-->

                                        <!--<EVinputNumber v-model="formValidate.vvv"></EVinputNumber>-->
                                    <!--</EVitemContainer>-->
                                    <!--<EVitemContainer label="Hobby" prop="interest">-->
                                        <!--<CheckboxGroup v-model="formValidate.interest">-->
                                            <!--<Checkbox label="Eat"></Checkbox>-->
                                            <!--<Checkbox label="Sleep"></Checkbox>-->
                                            <!--<Checkbox label="Run"></Checkbox>-->
                                            <!--<Checkbox label="Movie"></Checkbox>-->
                                        <!--</CheckboxGroup>-->
                                    <!--</EVitemContainer>-->
                                    <!--<EVitemContainer label="Desc" prop="desc">-->
                                        <!--<Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"-->
                                               <!--placeholder="Enter something..."></Input>-->
                                    <!--</EVitemContainer>-->
                                <!--</div>-->


                            <!--</EVpageForm>-->
                        <!--</div>-->
                    <!--</TabPane>-->
                    <!--<TabPane label="标签二">标签二的内容</TabPane>-->
                    <!--<TabPane label="标签三"> <div class="EVtabContent">-->
                        <!--<EVpageForm  >-->

                        <!--<div slot="form">-->

                            <!--<EVdivider orientation="left">我是分割线</EVdivider>-->
                            <!--<EVitemContainer>-->
                                <!--<span slot="append">后置插槽(支持：对齐，边距，宽度）</span>-->
                                <!--<Input  placeholder="Enter your name"></Input>-->


                            <!--</EVitemContainer>-->
                            <!--<EVdivider orientation="left">我是分割线</EVdivider>-->

                            <!--<FormItem label="E-mail" prop="mail">-->
                                <!--<Input placeholder="Enter your e-mail"></Input>-->
                            <!--</FormItem>-->
                            <!--<FormItem label="City" prop="city">-->
                                <!--<Select  placeholder="Select your city">-->
                                    <!--<Option value="beijing">New York</Option>-->
                                    <!--<Option value="shanghai">London</Option>-->
                                    <!--<Option value="shenzhen">Sydney</Option>-->
                                <!--</Select>-->
                            <!--</FormItem><EVdivider orientation="left">我是分割线</EVdivider>-->
                            <!--<EVitemContainer>-->
                                <!--<span slot="append">后置插槽(支持：对齐，边距，宽度）</span>-->
                                <!--<Input  placeholder="Enter your name"></Input>-->


                            <!--</EVitemContainer>-->
                            <!--<EVdivider orientation="left">我是分割线</EVdivider>-->

                            <!--<FormItem label="E-mail" prop="mail">-->
                                <!--<Input placeholder="Enter your e-mail"></Input>-->
                            <!--</FormItem>-->
                            <!--<FormItem label="City" prop="city">-->
                                <!--<Select  placeholder="Select your city">-->
                                    <!--<Option value="beijing">New York</Option>-->
                                    <!--<Option value="shanghai">London</Option>-->
                                    <!--<Option value="shenzhen">Sydney</Option>-->
                                <!--</Select>-->
                            <!--</FormItem><EVdivider orientation="left">我是分割线</EVdivider>-->
                            <!--<EVitemContainer>-->
                                <!--<span slot="append">后置插槽(支持：对齐，边距，宽度）</span>-->
                                <!--<Input  placeholder="Enter your name"></Input>-->


                            <!--</EVitemContainer>-->
                            <!--<EVdivider orientation="left">我是分割线</EVdivider>-->

                            <!--<FormItem label="E-mail" prop="mail">-->
                                <!--<Input placeholder="Enter your e-mail"></Input>-->
                            <!--</FormItem>-->
                            <!--<FormItem label="City" prop="city">-->
                                <!--<Select  placeholder="Select your city">-->
                                    <!--<Option value="beijing">New York</Option>-->
                                    <!--<Option value="shanghai">London</Option>-->
                                    <!--<Option value="shenzhen">Sydney</Option>-->
                                <!--</Select>-->
                            <!--</FormItem>-->

                        <!--</div>-->


                    <!--</EVpageForm>-->
                    <!--</div>-->
                    <!--</TabPane>-->
                <!--</Tabs>-->
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "EVpage_tabForm",
        props: {
            pageTitle: {
                type: String,
                default: null,
                desc: "页面导航显示的当前页面名字"
            },
        },data () {
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
                    vvv:[],
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
                }
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
            ,switchfunction(e){
                this.switch=e
            }
        }
    }
</script>

<style scoped>

</style>
