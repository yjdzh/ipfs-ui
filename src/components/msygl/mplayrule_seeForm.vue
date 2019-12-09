<template>

    <EVpageList :pageTitle="pageTitle+title" class="selelctearchs">
        <div slot="table">
            <Row>
                <Col span="12" style="padding: 5px">
                <Card dis-hover>
                    <b>数据中心钱包：</b>
                    <span>{{walletId}}</span>
                </Card>
                </Col>

                <Col span="12" style="padding: 5px">
                <Card dis-hover>
                    <b>奖励时间：</b>
                    <span>{{playTime}}</span>
                </Card>
                </Col>

            </Row>
            <Row>
                <Col span="12" style="padding: 5px">
                <Card dis-hover>
                    <b>奖励总数：</b>
                    <span>{{formValidate.playMoney}}</span>
                </Card>
                </Col>
                <Col span="12" style="padding: 5px">
                <Card dis-hover>
                    <b>奖励方式：</b>
                    <span>{{formValidate.playType?'指定客户':'所有客户平均分配'}}</span>
                </Card>

                </Col>
            </Row>


            <Row>
                <Col span="12" style="padding: 5px">
                <Card dis-hover>
                    <b>奖励说明：</b>
                    <span>{{formValidate.remark}}</span>
                </Card>
                </Col>
                <Col span="12" style="padding: 5px" v-if="formValidate.playType==1">
                <Card dis-hover>
                    <b>奖励客户：</b>
                    <span>{{funpuserId}}
                    </span>
                </Card>

                </Col>
            </Row>
        </div>
    </EVpageList>
    <!--		</div>-->
    <!--	</EVpageForm>-->
</template>

<script>
    export default {
        name: "mplayrule",
        data() {
            var _this = this

            return {
                seetype: false,
                options3: {
                    disabledDate(date) {
                        return date && date.valueOf() < Date.now();
                        // return date && date.valueOf() < Date.now() - 86400000;
                        // 时间选择器过滤
                    }
                },
                api: {
                    base: '/mplayrule',
                    access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),
                },
                pageTitle: '活动奖励-',
                pageload: true,
                search: '111',
                current: 1,
                openType: -1,
                walletOptions: [ //下拉选项

                ],

                formValidate: {
                    walletId: '',
                    playType: 0,
                    playMoney: '',
                    playTime: '',
                    puserId: '',
                    remark:'',
                },

                infoChangeRules: {
                    walletId: [{
                        type: 'number',
                        required: true,
                        message: '请选择数据中心钱包',
                        trigger: 'change'
                    }],
                    playMoney: [{
                        type: 'number',
                        required: true,
                        message: '请输入奖励总数',
                        trigger: 'blur'
                    }],
                    playType: [{
                        type: 'number',
                        required: true,
                        message: '请选择奖励方式',
                        trigger: 'blur'
                    }],
                    playTime: [{
                        type: 'date',
                        required: true,
                        message: '请输入奖励时间',
                        trigger: 'blur'
                    }],
                    puserId: [{
                        type: 'number',
                        required: true,
                        message: '请选择奖励客户',
                        trigger: 'blur'
                    }],

                },
                mpuserOptions: [],
            }
        },

        computed: {
            doCancal() {
                return {
                    name: 'msygl-mplayrule',
                    query: {
                        search: this.search,
                        current: this.current,
                    }
                }

            },
            funpuserId() {
                var th = this
                var da = ""
                th.mpuserOptions.forEach(myFunction)

                function myFunction(key, index) {
                    if (th.formValidate.puserId == key.id) {
                        da = key.name
                    }
                }
                return da
            },
            walletId() {
                var th = this
                var da2 = ""
                th.walletOptions.forEach(myFunction)

                function myFunction(key, index) {
                    if (th.formValidate.walletId == key.id) {
                        da2 = key.allName
                    }
                }
                return da2
            },
            playTime() {
                var th = this

                return this.Global.getDate(th.formValidate.playTime, 'year')

            },
            title() {
                return '查看'
            },
            submitType() {
                return this.openType
            },
            submitUrl() {
                return this.openType === -1 ? this.api.base + '?' : this.api.base + '/' + this.openType + '?'
            },


        },
        methods: {
            getmpuser() {
                this.Global.fun(this, 'get', {
                        base: '/mpuser',
                        other: '/all?',
                        access_token: this.api.access_token,
                    }, {},
                    function(res, that) {
                        if (res.data.status == 1) {
                            that.$Message.destroy();
                            that.mpuserOptions = res.data.data
                        } else {
                            that.$Message.destroy();
                            that.$Message.error(res.data.msg);
                        }

                    })
            },
            doSubmitBefor: function(data, e) {
                data.playTime = Date.parse(data.playTime)
            },
            creat() {
                this.Global.fun(this, 'get', {
                        base: '/mwallet',
                        other: '/all?',
                        access_token: this.api.access_token,
                    }, {},
                    function(res, that) {
                        if (res.data.status == 1) {
                            that.$Message.destroy();
                            that.walletOptions = res.data.data
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
                                res.data.data.playTime = new Date(res.data.data.playTime)
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
            this.getmpuser()
            this.creat()
        }
    }
</script>

<style scoped>

</style>
