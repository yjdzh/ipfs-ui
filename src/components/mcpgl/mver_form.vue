<template>
    <EVpageForm :pageTitle="pageTitle+title" :model="formValidate" :rules="ruleValidate"
                :labelWidth="120" :doSubmitBefor="doSubmitBefor"
                :submitUrl="submitUrl" :submitType="submitType" :doReset="creat" :doCancal="doCancal"
                :pageload="pageload">
        <div slot="form">

            <EVdivider orientation="left">基础信息</EVdivider>
            <Row>
                <EVitemContainer label="所属产品名称" prop="productId" :span="12" >
                    <Select v-model="formValidate.productId" :disabled="this.openType == -1 ? false : true">
                        <Option :value="option.id" :label="option.name" v-text="option.name"
                                v-for="option in options"
                                :key="option.index"></Option>
                    </Select>
                </EVitemContainer>
                <!--<EVitemContainer label="激活状态" prop="liveState" :span="12">-->
                    <!--<RadioGroup v-model="formValidate.liveState" type="button">&ndash;&gt;-->
                        <!--<Radio label="1">激活</Radio>-->
                        <!--<Radio label="0">关闭</Radio>-->
                    <!--</RadioGroup>-->
                <!--</EVitemContainer>-->
                <EVitemContainer label="显示版本" prop="showVer" :span="12">
                <Input v-model.trim="formValidate.showVer"
                       placeholder="请输入显示版本"></Input>
            </EVitemContainer>
            </Row>

            <Row>

                <EVitemContainer label="内控版本" prop="ver" :span="12">
                    <Input v-model.trim="formValidate.ver"
                           placeholder="请输入内控版本"></Input>
                </EVitemContainer>
                <EVitemContainer label="版本描述信息" prop="info" :span="12">
                <Input type="textarea" :autosize="{minRows: 4,maxRows: 10}" v-model="formValidate.info"
                       placeholder="请输入版本描述信息"></Input>
            </EVitemContainer>
            </Row>


            <!--<Row>-->

                <!--<EVitemContainer label="激活日期" prop="liveData" :span="12">-->

                    <!--<DatePicker type="date" placeholder="请选择激活日期" @on-change="change"-->
                                <!--v-model="formValidate.liveData"></DatePicker>-->
                <!--</EVitemContainer>-->

            <!--</Row>-->


        </div>
    </EVpageForm>
</template>

<script>
    export default {
        name: "msetups",
        data () {
            var _this = this


            return {
                api: {
                    base: '/mver',
                    access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),

                },

                pageTitle: '版本管理-',
                pageload: true,
                openType: -1,
                options: [//下拉选项

                ],
                doCancal: {
                    name: 'mcpgl-mver',
                },
                formValidate: {

                    info: '',


                    liveData: '',





                    productId: '',


                    romPath: '',


                    showVer: '',


                    ver: '',


                },
                ruleValidate: {
                    info: [{max: 50, message: '请输入版本描述信息', trigger: 'blur'}],


                    liveData: [{type: 'date', message: '请输入激活日期', trigger: 'blur'}],





                    productId: [{type: 'number', required: true, message: '请选择所属产', trigger: 'blur'}],


                    romPath: [{type: 'string', max: 50, message: '输入字符不得多于50个', trigger: 'change'},],


                    showVer: [{required: true, message: '请输入显示版本版本', trigger: 'blur'},
                        {max: 20, message: '输入字符不得多于20个', trigger: 'blur'},
                        {pattern: this.Regex.regexlist.nums, message: '只能输入数和"."', trigger: 'blur'}],


                    ver: [{required: true, message: '请输入内控版本', trigger: 'blur'},

                        {max: 20, message: '输入字符不得多于20个', trigger: 'blur'},
                        {pattern: this.Regex.regexlist.nums, message: '只能输入数和"."', trigger: 'blur'}],


                },
            }
        },

        computed: {
            title () {
                return Number(this.openType) === -1 ? '新增' : '编辑'
            },
            submitType () {
                return this.openType
            },
            submitUrl () {
                return this.openType === -1 ? this.api.base + '?' : this.api.base + '/' + this.openType + '?'
            },
            actionUrl () {
                return '/mver/upload/' + this.openType + this.api.access_token
            }

        },
        methods: {
            change: function (daterange) {
                this.liveData = daterange


            },
            doAfterUpload (e) {
                this.switch = e

            },
            doSubmitBefor: function (data, e) {
                data.liveData = this.liveData
            },
            creat () {
                this.Global.fun(this, 'get', {
                        base: '/mproduct',
                        other: '/all?',
                        access_token: this.api.access_token,
                    },
                    {},
                    function (res, that) {
                    if(res.data.status==1){
                        that.options = res.data.data
                    }else {
                        that.$Message.destroy();
                        that.$Message.info(res.data.msg);
                    }

                    })
                if (this.openType === -1 || this.openType === '-1') {
                    this.pageload = false
                }
                else {
                    this.Global.fun(this, 'get', {
                            base: this.api.base,
                            other: '/' + this.openType + '?',
                            access_token: this.api.access_token,
                        },
                        {},
                        function (res, that) {

                            const st = res.data.status
                            if (st === 1) {
                                for (var key in res.data.data) {
                                    if (res.data.data[key] === null) {
                                        res.data.data[key] = '暂无数据'
                                    }
                                }

                                var back = res.data.data;
                                Object.keys(that.formValidate).forEach(function (key) {

                                    if (that.formValidate[key] == null) {
                                        that.formValidate[key] = '';
                                    }
                                    else {
                                        that.formValidate[key] = back[key];
                                    }
                                    that.formValidate.ver = back.ver.toString()
                                    that.formValidate.liveData = back.liveData
                                });
                            }
                            else {
                                that.$Message.destroy();
                                that.$Message.info(res.data.msg);
                            }
                            that.pageload = false;


                        })
                }
            }
        },
        created () {
            this.openType = parseInt(this.$route.query.id)
            this.creat()
        }
    }
</script>

<style scoped>

</style>
