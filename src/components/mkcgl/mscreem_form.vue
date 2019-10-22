<template>
    <EVpageForm :pageTitle="pageTitle" :model="formValidate" :rules="ruleValidate" :labelWidth="120" :CancalBtn="false"
        :doSubmitBefor="doSubmitBefor" :submitUrl="submitUrl" :submitType="submitType" :doReset="creat" :doCancal="doCancal"
        :pageload="pageload">
        <div slot="form">

            <EVdivider orientation="left">大屏设置</EVdivider>
            <Row>
                <EVitemContainer label="总节点" prop="zjd" :span="12">
                    <Input v-model="formValidate.zjd" placeholder="请输入总结点信息"></Input>
                </EVitemContainer>
                <EVitemContainer label="离线节点" prop="lxjd" :span="12">
                    <Input v-model="formValidate.lxjd" placeholder="请输入离线点信息"></Input>
                </EVitemContainer>
            </Row>
            <Row>
                <EVitemContainer label="在线节点" prop="zxjd" :span="12">
                    <Input v-model="formValidate.zxjd" placeholder="请输入在线节点信息"></Input>
                </EVitemContainer>
                <EVitemContainer label="总存储容量使用占比" prop="zccrlzb" :span="12">
                    <EVinputNumber v-model="formValidate.zccrlzb" :min="1" :max="100" placeholder="请输入总存储容量使用占比"></EVinputNumber>
                </EVitemContainer>

            </Row>


            <Row>
                <EVitemContainer label="总存储容量" prop="zccrl" :span="12">
                    <Input v-model="formValidate.zccrl" placeholder="请输入总存储容量"></Input>
                </EVitemContainer>
            </Row>



            <EVdivider orientation="left">日总收益设置</EVdivider>

            <Row>
                <EVitemContainer label="币种名称1" prop="bzmc1" :span="12">
                    <Input v-model="formValidate.bzmc1" placeholder="请输入币种1的名称"></Input>
                </EVitemContainer>
                <EVitemContainer label="节点收益" prop="syzb1" :span="12">
                    <EVinputNumber v-model="formValidate.syzb1" :min="0" :max="100" placeholder="请输入币种1的节点收益"></EVinputNumber>
                </EVitemContainer>

            </Row>

            <Row>
                <EVitemContainer label="币种名称2" prop="bzmc2" :span="12">
                    <Input v-model="formValidate.bzmc2" placeholder="请输入币种2的名称"></Input>
                </EVitemContainer>
                <EVitemContainer label="节点收益" prop="syzb2" :span="12">
                    <EVinputNumber v-model="formValidate.syzb2" :min="0" :max="100" placeholder="请输入币种2的节点收益"></EVinputNumber>
                </EVitemContainer>
            </Row>



            <Row>
                <EVitemContainer label="币种名称3" prop="bzmc3" :span="12">
                    <Input v-model="formValidate.bzmc3" placeholder="请输入币种3的名称"></Input>
                </EVitemContainer>
                <EVitemContainer label="节点收益" prop="syzb3" :span="12">
                    <EVinputNumber v-model="formValidate.syzb3" :min="0" :max="100" placeholder="请输入币种3的节点收益"></EVinputNumber>
                </EVitemContainer>
            </Row>



            <EVdivider orientation="left">存储使用率设置</EVdivider>
            <Row>
                <EVitemContainer label="数据中心1" prop="kcmc1" :span="12">
                    <Input v-model="formValidate.kcmc1" placeholder="请输入数据中心1的名称"></Input>
                </EVitemContainer>
                <EVitemContainer label="存储占比" prop="cczb1" :span="12">
                    <EVinputNumber v-model="formValidate.cczb1" :min="0" :max="100" placeholder="请输入云池1的存储占比"></EVinputNumber>
                </EVitemContainer>
            </Row>

            <Row>
                <EVitemContainer label="数据中心2" prop="kcmc2" :span="12">
                    <Input v-model="formValidate.kcmc2" placeholder="请输入数据中心2的名称"></Input>
                </EVitemContainer>
                <EVitemContainer label="存储占比" prop="cczb2" :span="12">
                    <EVinputNumber v-model="formValidate.cczb2" :min="0" :max="100" placeholder="请输入云池2的存储占比"></EVinputNumber>
                </EVitemContainer>
            </Row>


            <Row>
                <EVitemContainer label="数据中心3" prop="kcmc3" :span="12">
                    <Input v-model="formValidate.kcmc3" placeholder="请输入数据中心3的名称"></Input>
                </EVitemContainer>
                <EVitemContainer label="存储占比" prop="cczb3" :span="12">
                    <EVinputNumber v-model="formValidate.cczb3" :min="0" :max="100" placeholder="请输入云池3的存储占比"></EVinputNumber>
                </EVitemContainer>
            </Row>

            <Row>
                <p style="padding-left: 45px;">展示页面链接地址为：<a href="http://47.92.51.100/#/screen" target="_blank">http://47.92.51.100/#/screen</a></p>
            </Row>

        </div>
    </EVpageForm>
</template>

<script>
    export default {
        name: "msetups",
        data() {
            var _this = this
            return {
                api: {
                    base: '/mscreem',
                    access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),

                },

                pageTitle: '大屏设置',
                pageload: true,
                openType: -1,
                formValidate: {
                    zjd: '',
                    lxjd: '',
                    zxjd: '',
                    zccrlzb: '',
                    bzmc1: '',
                    syzb1: '',
                    bzmc2: '',
                    syzb2: '',
                    bzmc3: '',
                    syzb3: '',
                    kcmc1: '',
                    cczb1: '',
                    kcmc2: '',
                    cczb2: '',
                    kcmc3: '',
                    cczb3: '',
                    zccrl:'',

                },
                ruleValidate: {
                    zccrl: [{
                            required: true,
                            message: '请输入总存储容量',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            max: 20,
                            message: '输入字符不得多于20个',
                            trigger: 'change'
                        },
                    ],
                    zjd: [{
                            required: true,
                            message: '请输入总节点信息',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            max: 50,
                            message: '输入字符不得多于50个',
                            trigger: 'change'
                        },
                    ],
                    lxjd: [{
                            required: true,
                            message: '请输入离线节点信息',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            max: 50,
                            message: '输入字符不得多于50个',
                            trigger: 'change'
                        },
                    ],
                    zxjd: [{
                            required: true,
                            message: '请输入在线节点信息',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            max: 50,
                            message: '输入字符不得多于50个',
                            trigger: 'change'
                        },
                    ],
                    zccrlzb: [{
                        type: 'number',
                        required: true,
                        message: '请输入总存储容量使用占比',
                        trigger: 'blur'
                    }],

                    bzmc1: [{
                            required: true,
                            message: '请输入币种1的名称信息',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            max: 50,
                            message: '输入字符不得多于50个',
                            trigger: 'change'
                        },
                    ],
                    syzb1: [{
                        type: 'number',
                        required: true,
                        message: '请输入币种1的收入占比',
                        trigger: 'blur'
                    }],

                    bzmc2: [{
                            required: true,
                            message: '请输入币种2的名称信息',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            max: 50,
                            message: '输入字符不得多于50个',
                            trigger: 'change'
                        },
                    ],
                    syzb2: [{
                        type: 'number',
                        required: true,
                        message: '请输入币种2的收入占比',
                        trigger: 'blur'
                    }],

                    bzmc3: [{
                            required: true,
                            message: '请输入币种3的名称信息',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            max: 50,
                            message: '输入字符不得多于50个',
                            trigger: 'change'
                        },
                    ],
                    syzb3: [{
                        type: 'number',
                        required: true,
                        message: '请输入币种3的收入占比',
                        trigger: 'blur'
                    }],






                    kcmc1: [{
                            required: true,
                            message: '请输入云池1的名称信息',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            max: 50,
                            message: '输入字符不得多于50个',
                            trigger: 'change'
                        },
                    ],
                    cczb1: [{
                        type: 'number',
                        required: true,
                        message: '请输入云池1的存储占比',
                        trigger: 'blur'
                    }],
                    kcmc2: [{
                            required: true,
                            message: '请输入云池2的名称信息',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            max: 50,
                            message: '输入字符不得多于50个',
                            trigger: 'change'
                        },
                    ],
                    cczb2: [{
                        type: 'number',
                        required: true,
                        message: '请输入云池2的存储占比',
                        trigger: 'blur'
                    }],

                    kcmc3: [{
                            required: true,
                            message: '请输入云池3的名称信息',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            max: 50,
                            message: '输入字符不得多于50个',
                            trigger: 'change'
                        },
                    ],
                    cczb3: [{
                        type: 'number',
                        required: true,
                        message: '请输入云池3的存储占比',
                        trigger: 'blur'
                    }]

                },
            }
        },

        computed: {
            title() {
                '设置'
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

<style scoped>
    .fileName {
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
        float: left;
        margin-right: 10px;
    }
</style>
