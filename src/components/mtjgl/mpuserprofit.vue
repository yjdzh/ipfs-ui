<template>
    <div>
        <EVpageList :pageTitle="pageTitle" class="nohidden">
            <div slot="searchBox" class="serach">
                <Input v-model="searchValue" :class="selsctclass">
                <Select v-model="searchType" slot="prepend" style="width: 80px">
                    <Option :value="option.value" :label="option.label" v-text="option.label" v-for="option in options"
                        :key="option.index"></Option>
                </Select>
                <Button slot="append" icon="ios-search" @click="dosearch"></Button>
                </Input>
            </div>


            <div slot="Hsearch" class="Hserach">
                <Button icon="ios-search" type="primary" @click="openHsearch" style="display: inline-block">高级查询
                </Button>
                <Modal v-model="Hsearch" width="500" @on-cancel="HsearchC">
                    <p slot="header">
                        <span>高级查询</span>
                    </p>
                    <div>
                        <Form :model="formItem" :label-width="90" style="overflow: hidden">

                            <Col span="23">
                            <FormItem label="客户名称">
                                <Input v-model="formItem.search_LIKE_userName" placeholder="请输入数据中心名称"></Input>
                            </FormItem>
                            </Col>

                            <Col span="23">
                            <FormItem label="钱包">
                                <Select v-model="formItem.search_EQ_walletId">
                                    <Option :value="walletOption.id" :label="walletOption.allName" v-for="walletOption in walletOptions"
                                        :key="walletOption.index"></Option>
                                </Select>
                            </FormItem>
                            </Col>

                            <Col span="23">
                            <FormItem label="开始日期">
                                <DatePicker type="date" placeholder="请选择开始日期" v-model="formItem.search_LIKE_startDate"
                                    :editable="false" format="yyyy-MM-dd"></DatePicker>
                            </FormItem>
                            </Col>

                            <Col span="23">
                            <FormItem label="结束日期">
                                <DatePicker type="date" placeholder="请选择结束日期" v-model="formItem.search_LIKE_endDate"
                                    :editable="false" format="yyyy-MM-dd"></DatePicker>
                            </FormItem>
                            </Col>
                        </Form>
                    </div>
                    <div slot="footer">
                        <i-button type="ghost" size="large" @click="HsearchC">取消搜索</i-button>
                        <i-button type="primary" size="large" @click="HsearchS">确认搜索</i-button>
                    </div>
                </Modal>
            </div>


            <div slot="btnBox" class="btn">
                <!--   <Button @click="added" type="success">新增</Button> -->
                <Button @click="refresh" type="info">刷新</Button>
            </div>
            <div slot="table">
                <Table border :columns="datahead" :data="databody" size='small' :loading="loading">
                </Table>
            </div>
            <div slot="pagePage">
                <Page :total="totalpage" show-total show-elevator :page-size="pagesize" @on-change="onchanges" :current="current">
                </Page>
            </div>

            <div slot="moreBtn">
                <!--拓展按钮1-->
            </div>
        </EVpageList>

    </div>
</template>

<script>
    export default {
        name: "mwallet",

        data() {
            var _this = this;
            return {
                search: {},
                Hsearch: false,
                formItem: {
                    search_EQ_walletId: '',
                    search_LIKE_startDate: '',
                    search_LIKE_endDate: '',
                    search_LIKE_userName: '',
                },

                api: {
                    base: '/mpuserprofit', //请求部分
                    access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),
                },
                defaults: {
                    spinShow: true,
                    powerShow: false,
                    powerFormTitle: '',
                    opera: ['opera'],
                    appName: ''
                },
                oprah: {},
                pageTitle: '客户收益', //页面标题
                totalpage: 0,
                pagesize: this.Global.pagesize,
                current: 1,
                modal: false,
                switch: false,
                load: false,
                id: null,
                options: [ //下拉选项
                    {
                        label: '用户名称',
                        value: 'search_LIKE_userName',
                    }
                ],
                datahead: [{
                        align: 'left',
                        title: '币种',
                        key: 'virName',
                        width: 60
                    },
                    {
                        align: 'left',
                        title: '数据中心',
                        key: 'zoneName',
                        width: 100
                    },
                    {
                        align: 'left',
                        title: '用户名称',
                        key: 'pubUserName'
                    },
                    {
                        align: 'left',
                        title: '自维收益',
                        key: 'maintainIncome',
                        width: 90,
                    },
                    {
                        align: 'left',
                        title: '托管收益',
                        key: 'trusteeIncome',
                        width: 90
                    },
                    {
                        align: 'left',
                        title: '奖励收益',
                        key: 'playIncome',
                        width: 90
                    },
                    {
                        align: 'left',
                        title: '日总收',
                        key: 'allIncome',
                        width: 90
                    }, {
                        align: 'left',
                        title: '提币数量',
                        key: 'takeout',
                        width: 90
                    }, {
                        align: 'left',
                        title: '账户余额',
                        key: 'urplus',
                        width: 90
                    },
                    {
                        align: 'left',
                        title: '累计收益',
                        key: 'balance',
                        width: 90
                    },
                    {
                        align: 'left',
                        title: '日期',
                        key: 'profitDate',
                        width: 90
                    },
                    {
                        title: '统计',
                        key: 'action',
                        width: 80,
                        align: 'center',
                        render: function(h, params) {
                            return h('div', [

                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',

                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: function() {
                                            // _this.sytj(params)
                                        }
                                    }
                                }, '收益统计')
                            ])
                        }
                    }
                ],
                databody: [],
                loading: true,
                oprah: {},
                searchType: '',
                searchValue: '',
                id: null,
                walletOptions: []

            };
        },
        computed: {
            disabledadd() {
                return false
            },
            selsctclass() {
                return this.options.length === 1 ? 'overhidden' : ''
            }
        },
        methods: {
            getoptions() {
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
            },
            openHsearch() {
                this.formItem.search_EQ_walletId = ''
                this.formItem.search_LIKE_startDate = ''
                this.formItem.search_LIKE_endDate = ''
                this.formItem.search_LIKE_userName = ''
                this.Hsearch = true
            },
            HsearchC() {
                this.Hsearch = false
            },
            HsearchS() {
                this.search = {}
                this.search = this.formItem
                if (this.search) {
                    for (var k in this.search) {
                        if (this.search[k] === '') {
                            delete this.search[k]
                        }
                    }
                }
                this.search = this.search
                this.onchanges(1)
                this.HsearchC()
            },

            refresh: function() {
                this.loading = true
                this.search = {}
                // this.searchType = 'search_LIKE_username'
                // this.searchValue = ''
                // this.search = ''
                // this.current = 1
                this.onchanges(this.current)
            },


            onchanges: function(e) {
                var that = this
                this.loading = true
                this.searchValue = this.search[this.searchType] ? this.search[this.searchType] : ''
                this.current = e;
                this.Global.fun(this, 'get', {
                    base: this.api.base,
                    other: '/page?',
                    access_token: this.api.access_token
                }, function() {
                    that.search.page = e - 1
                    that.search.size = 10
                    return that.search
                }(), c)

                function c(res, that) {
                    if (res.data.status === 1) {
                        for (var key in res.data.data) {
                            if (res.data.data[key] === null) {
                                res.data.data[key] = '暂无数据'
                            }
                        }
                        that.totalpage = res.data.data.totalElements;
                        that.current = res.data.data.number + 1;
                        that.databody = res.data.data.content;
                        that.loading = false;
                    } else {
                        that.$Message.destroy();
                        that.$Message.error(res.data.msg);
                        that.loading = false;
                    }
                }
            },
            oprahfun: function(e) {
                this.Global.oprahfun(this)
            },
            dosearch: function() {
                this.loading = true
                if (this.searchType != 0) {
                    this.search = {
                        search_EQ_walletId: this.searchType
                    }
                } else {
                    this.search = {}
                }
                this.onchanges(1)


            },
        },
        created: function() {
            this.current = this.$route.query.current ? parseInt(this.$route.query.current) : 1
            this.search = this.$route.query.search ? this.$route.query.search : {}

            this.loading = true,
                this.onchanges(1)
            this.defaults.powerShow = this.show

            this.getoptions()
        },
    }
</script>

<style lang="less">
    .overappend {
        .evaninline {

            >.ivu-input-group-append,
            >.ivu-input-group-prepend {
                display: none;
            }
        }
    }

    .nohidden {

        .topTool,
        .overhidden {
            overflow: unset !important;
        }

        .overhidden .ivu-select-selection .ivu-select-arrow {
            display: unset;
        }

        .EVsearch {
            .ivu-select {
                display: inline-block;
                width: 150px;
            }
        }
    }
</style>
