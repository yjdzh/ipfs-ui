<template>
    <EVpageForm :pageTitle="pageTitle+title" :model="formValidate" :rules="ruleValidate"
                :labelWidth="120" :doSubmitBefor="doSubmitBefor"
                :submitUrl="api.base+'?'" :submitType="0" :doReset="creat" :params="true">
        <div slot="form">



            <Row >
                <EVitemContainer label="阿里短信ID" prop="smsid" :span="12">
                    <Input v-model="formValidate.smsid" placeholder="请输入阿里短信ID" ></Input>
                </EVitemContainer>

                <EVitemContainer label="托管到期保留天数" prop="trusteeday" :span="12">
                    <EVinputNumber v-model="formValidate.trusteeday" :min="0" :max="365"  placeholder="请输入保留天数"></EVinputNumber>
                </EVitemContainer>
            </Row>
            <Row >
                <EVitemContainer label="阿里短信秘钥" prop="smssec" :span="12">
                    <Input v-model="formValidate.smssec" placeholder="请输入短信秘钥" ></Input>
                </EVitemContainer>
                <EVitemContainer label="订单自动审核" prop="orderaudit" :span="12">
                    <RadioGroup v-model="formValidate.orderaudit" type="button">
                        <Radio label="1" >打开</Radio>
                        <Radio label="0" >关闭</Radio>
                    </RadioGroup>
                </EVitemContainer>
            </Row>


        </div>
    </EVpageForm>
</template>

<script>
    export default {
        name: "msetups",
        data () {
            return {
                api: {
                    base: '/msetups',
                    access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),

                },
                pageTitle: '产品管理-',
                openType:-1,

                formValidate: {
                    smsid: '',
                    trusteeday: '',
                    smssec: '',
                    orderaudit: '0',
                },
                ruleValidate: {
                    smsid: [{required: true, message: '请输入阿里短信ID', trigger: 'blur'},
                        {type: 'string', max: 50, message: '输入字符不得多于50个', trigger: 'change'},],
                    trusteeday: [
                        {type: 'number', required: true, message: '请输入保留天数', trigger: 'blur'},
                        {type: 'number', max: 365, message: '保留天数不得超过365天', trigger: 'change'},
                    ],
                    smssec: [
                        {required: true, message: '请输入短信秘钥', trigger: 'blur'},
                        {type: 'string', max: 50, message: '输入字符不得多于50个', trigger: 'change'},
                    ],
                    orderaudit: [
                        {required: true, message: '请选择订单是否自动审核', trigger: 'blur'},

                    ],

                },
            }
        },
        computed: {
            title () {
                return Number(this.openType) === -1 ? '新增' : '编辑'
            },

        },
        methods: {
            switchfunction (e) {
                this.switch = e

            },
            doSubmitBefor: function (data,e) {
                data.trusteeday=this.formValidate.trusteeday.toString()
            },
            creat(e){
                this.Global.fun(this, 'get', {
                        base: this.api.base,
                        other: '?',
                        access_token: this.api.access_token,
                    },
                    {},
                    function (res, that) {

                        const st = res.data.status
                        if(st===1){
                            for (var key in res.data.data) {
                                if (res.data.data[key].value === null) {
                                    res.data.data[key].value = '暂无数据'}
                            }
                            var back = res.data.data;
                            Object.keys(that.formValidate).forEach(function (key) {

                                if (that.formValidate[key] == null) {
                                    that.formValidate[key] ='';
                                }
                                else {
                                    that.formValidate[key] = back[key].value;
                                }
                            });
                        }
                        else {
                            that.$Message.destroy();
                            that.$Message.info(res.data.msg);
                        }
                        e.pageload = false;


                    })
            }
        },
        created(){
            this.openType = parseInt(this.$route.params.id)
            this.creat()
        }
    }
</script>

<style scoped>

</style>
