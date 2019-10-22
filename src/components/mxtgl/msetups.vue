<template>
    <EVpageForm :pageTitle="pageTitle" :model="formValidate" :rules="ruleValidate" :SubmitBtn="this.switch"
                :labelWidth="120" :doSubmitBefor="doSubmitBefor"
                :CancalBtn="false" :ResetBtn="this.switch" :submitUrl="api.base+'?'" :submitType="0" :doReset="creat" :params="true" :pageload="pageload">
        <div slot="form">


            <EVdivider orientation="left">
                <span class="dividertit">编辑参数</span>
                <i-switch size='large' @on-change="switchfunction">
                    <span slot='open'>开启</span>
                    <span slot='close'>关闭</span>
                </i-switch>
            </EVdivider>
            <Row >
                <EVitemContainer label="阿里短信ID" prop="smsid" :span="12">
                    <Input v-model="formValidate.smsid" placeholder="请输入阿里短信ID" :disabled="!this.switch"></Input>
                </EVitemContainer>

                <EVitemContainer label="托管到期保留天数" prop="trusteeday" :span="12">
                    <EVinputNumber v-model="formValidate.trusteeday" :min="0" :max="365" :disabled="!this.switch" placeholder="请输入保留天数"></EVinputNumber>
                </EVitemContainer>
            </Row>
            <Row >
                <EVitemContainer label="阿里短信秘钥" prop="smssec" :span="12">
                    <Input v-model="formValidate.smssec" placeholder="请输入短信秘钥" :disabled="!this.switch"></Input>
                </EVitemContainer>
                <!--<EVitemContainer label="订单自动审核" prop="orderaudit" :span="12">-->
                    <!--<RadioGroup v-model="formValidate.orderaudit" type="button">-->
                        <!--<Radio label="1" :disabled="!this.switch">打开</Radio>-->
                        <!--<Radio label="0" :disabled="!this.switch">关闭</Radio>-->
                    <!--</RadioGroup>-->
                <!--</EVitemContainer>-->
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
                pageTitle: '参数设置',
                switch: false,
                pageload:true,
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
                                    res.data.data[key].value = ''}
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
                        that.pageload = false;


                    })
            }
        },
        created(){
            this.creat()
        }
    }
</script>

<style scoped>

</style>
