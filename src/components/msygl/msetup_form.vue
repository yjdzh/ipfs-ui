<template>
    <EVpageForm :pageTitle="pageTitle" :model="formValidate" :rules="ruleValidate" :labelWidth="120" :CancalBtn="false"
        :doSubmitBefor="doSubmitBefor" :submitUrl="submitUrl" :submitType="submitType" :doReset="creat" :doCancal="doCancal"
        :pageload="pageload">
        <div slot="form">
            <EVdivider orientation="left">提币设置</EVdivider>
                <Row>
                    <EVitemContainer label="提币开始日期" prop="pickStart" :span="12">
                        <EVinputNumber v-model="formValidate.pickStart" :min="1" :max="31" :precision="0"  placeholder="请设置提币开始日期"></EVinputNumber>
                    </EVitemContainer>
                    <EVitemContainer label="提币截止日期" prop="pickEnd" :span="12">
                        <EVinputNumber v-model="formValidate.pickEnd" :min="1" :max="31" :precision="0" placeholder="请设置提币截止日期"></EVinputNumber>
                    </EVitemContainer>
                </Row>

            <EVdivider orientation="left">提币手续费（%）</EVdivider>
                <Row>
                    <EVitemContainer label="初级特工手续费" prop="cjtgFy" :span="12">
                        <EVinputNumber v-model="formValidate.cjtgFy" :min="0" :max="100" :precision="0" placeholder="请设置初级特工手续费"></EVinputNumber>
                    </EVitemContainer>
                    <EVitemContainer label="中级特工手续费" prop="zjtgFy" :span="12">
                        <EVinputNumber v-model="formValidate.zjtgFy" :min="0" :max="100" :precision="0" placeholder="请设置中级特工手续费"></EVinputNumber>
                    </EVitemContainer>
                    <EVitemContainer label="高级特工手续费" prop="gjtgFy" :span="12">
                        <EVinputNumber v-model="formValidate.gjtgFy" :min="0" :max="100" :precision="0" placeholder="请设置高级特工手续费"></EVinputNumber>
                    </EVitemContainer>
                </Row>

        </div>
    </EVpageForm>
</template>

<script>
    export default {
        data() {
            var _this = this
            return {
                api: {
                    base: '/msetup',
                    access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),
                },

                pageTitle: '运营参数',
                pageload: true,
                openType: -1,
                formValidate: {
                    pickStart: '',
                    pickEnd: '',
                    cjtgFy:'',
                    zjtgFy:'',
                    gjtgFy:''
                },
                ruleValidate: {
                    pickStart: [{
                        type: 'number',
                        required: true,
                        message: '请输入提币开始日期',
                        trigger: 'blur'
                    }],
                    pickEnd: [{
                        type: 'number',
                        required: true,
                        message: '请输入提币截止日期',
                        trigger: 'blur'
                    }],
                    cjtgFy: [{
                        type: 'number',
                        required: true,
                        message: '请输入初级特工手续费',
                        trigger: 'blur'
                    }],
                    zjtgFy: [{
                        type: 'number',
                        required: true,
                        message: '请输入中级特工手续费',
                        trigger: 'blur'
                    }],
                    gjtgFy: [{
                        type: 'number',
                        required: true,
                        message: '请输入高级特工手续费',
                        trigger: 'blur'
                    }]
                },
            }
        },

        computed: {
            title() {
                '运营参数'
            },
            submitType() {
                return this.openType
            },
            submitUrl() {
                return this.openType === -1 ? this.api.base + '?' : this.api.base + '/' + this.openType + '?'
            },
        },
        methods: {
            doSubmitBefor: function(data, e) {},
            creat() {
                this.Global.fun(this, 'get', {
                        base: this.api.base,
                        other: '/detail?',
                        access_token: this.api.access_token,
                    }, {},
                    function(res, that) {
                        const st = res.data.status
                        if (st === 1) {
                            for (var key in res.data.data) {
                                if (res.data.data[key] === null) {
                                    res.data.data[key] = ''
                                }
                            }

                            var back = res.data.data;
                            Object.keys(that.formValidate).forEach(function(key) {
                                if (that.formValidate[key] == null) {
                                    that.formValidate[key] = '暂无数据';
                                } else {
                                    that.formValidate[key] = back[key];
                                }
                            });
                        } else {
                            that.$Message.destroy();
                            that.$Message.info(res.data.msg);
                        }
                        that.pageload = false;
                    })

            }
        },
        created() {
            this.openType = -1;
            this.creat()
        }
    }
</script>
