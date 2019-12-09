<template>
    <EVpageForm :pageTitle="pageTitle+title" :model="formValidate" :rules="infoChangeRules" :labelWidth="120"
        :doSubmitBefor="doSubmitBefor" :submitUrl="submitUrl" :submitType="submitType" :doReset="creat" :doCancal="doCancal"
        :pageload="pageload">
        <div slot="form">

            <Row>
                 <EVitemContainer label="币种" prop="virId" :span="12">
                    <Select v-model="formValidate.virId" :disabled="this.openType!=-1">
                        <Option :value="virOption.id" :label="virOption.name" v-for="virOption in virOptions" :key="virOption.index"></Option>
                    </Select>
                </EVitemContainer>
                <EVitemContainer label="交易密码" prop="pwd" :span="12">
                     <Input v-model="formValidate.pwd" placeholder="请输入交易密码"></Input>
                 </EVitemContainer>
            </Row>
            <Row>
              <EVitemContainer label="私钥" prop="privateKey" :span="24">
                  <Input v-model="formValidate.privateKey" placeholder="请输入私钥"></Input>
              </EVitemContainer>
            </Row>


        </div>
    </EVpageForm>
</template>

<script>
    export default {
        name: "mwallet",
        data() {
            var _this = this

            return {
                api: {
                    base: '/moutwallet',
                    access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),
                },

                pageTitle: '转出账户管理-',
                pageload: true,
                search: '111',
                current: 1,
                openType: -1,

                virOptions: [ //下拉选项

                ],


                formValidate: {
                    virId: '',
                    privateKey: '',
                    pwd: ''
                },

                infoChangeRules: {
                    virId: [{
                        type: 'number',
                        required: true,
                        message: '请选择所属币种',
                        trigger: 'change'
                    }],
                    privateKey: [{
                            required: true,
                            message: '请输入私钥',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            max: 100,
                            message: '输入字符不得多于100个',
                            trigger: 'change'
                        }
                    ],

                    pwd: [{
                            required: true,
                            message: '请输入交易密码',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            max: 100,
                            message: '输入字符不得多于100个',
                            trigger: 'change'
                        }
                    ]

                },
            }
        },

        computed: {
            doCancal() {
                return {
                    name: 'msygl-moutwallet',
                    query: {
                        search: this.search,
                        current: this.current,
                    }
                }

            },
            title() {
                return Number(this.openType) === -1 ? '新增' : '编辑'
            },
            submitType() {
                return this.openType
            },
            submitUrl() {
                return this.openType === -1 ? this.api.base + '?' : this.api.base + '/' + this.openType + '?'
            }
        },
        methods: {
            ochange(e) {

            },
            doSubmitBefor: function(data, e) {


            },
            creat() {
                this.Global.fun(this, 'get', {
                        base: '/mvirdict',
                        other: '/all?',
                        access_token: this.api.access_token,
                    }, {},
                    function(res, that) {
                        if (res.data.status == 1) {
                            that.$Message.destroy();
                            that.virOptions = res.data.data
                        } else {
                            that.$Message.destroy();
                            that.$Message.error(res.data.msg);
                        }

                    })
                if (this.openType === -1 || this.openType === '-1') {
                    this.pageload = false
                } else {
                    this.Global.fun(this, 'get', {
                            base: this.api.base,
                            other: '/' + this.openType + '?',
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
                                    that.formValidate[key] = back[key];
                                });

                            } else {
                                that.$Message.destroy();
                                that.$Message.info(res.data.msg);
                            }
                            that.pageload = false;
                        })
                }
            }
        },
        created() {
            this.openType = parseInt(this.$route.query.id)
            this.current = parseInt(this.$route.query.current)
            this.search = this.$route.query.search
            this.creat();
        }
    }
</script>

<style scoped>

</style>
