<template>
    <div>
        <EVpageList :pageTitle="pageTitle" class="selelctearchs">
            <div slot="searchBox" class="serach">
                钱包
                <Select v-model="searchType" placeholder="请选择钱包">
                    <Option v-for="walletOption in options" :value="walletOption.id" :label="walletOption.allName" :key="walletOption.index"></Option>
                </Select>
                <Button slot="append" icon="ios-search" @click="dosearch"></Button>
            </div>

            <div slot="Hsearch" class="Hserach">
                <Button icon="ios-search" type="primary" @click="openHsearch" style="display: inline-block">高级查询
                </Button>
                <Modal v-model="Hsearch" width="500" @on-cancel="HsearchC">
                    <p slot="header">
                        <span>高级查询</span>
                    </p>
                    <div>
                        <Form :model="formItem" :label-width="80" >

                            <Col span="23">
                            <FormItem label="钱包">
                                <Select v-model="formItem.search_EQ_walletId">
                                    <Option :value="walletOption.id" :label="walletOption.allName" v-for="walletOption in this.walletOptions"
                                        :key="walletOption.index"></Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="23">
                            <FormItem label="分配方式">
                                <RadioGroup v-model="formItem.search_EQ_playType" type="button">
                                    <Radio label="0">所有客户平均分配</Radio>
                                    <Radio label="1">指定客户</Radio>

                                </RadioGroup>
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
                 <Button @click="added" type="success">新增</Button>
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
        name: "mplayrule",

        data() {
            var _this = this;

            return {
                times: 0,
                search: {},
                Hsearch: false,
                formItem: {
                    search_LIKE_walletId: '',
                    search_LIKE_alloteType: ''
                },


                api: {
                    base: '/mplayrule', //请求部分
                    access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),
                },
                defaults: {
                    spinShow: true,
                    powerShow: false,
                    powerFormTitle: '',
                    opera: ['opera'],
                    appName: ''
                },
                powerListInit: [],
                powerOperaListInit: {},
                oprah: {},

                pageTitle: '活动奖励', //页面标题
                totalpage: 0,
                pagesize: this.Global.pagesize,
                current: 1,
                modal: false,
                switch: false,
                load: false,
                id: null,

                options: [ //下拉选项
                    {
                        allName: '不限',
                        value: '0',
                    },
                ],
                datahead: [{
                        align: 'left',
                        title: '币种',
                        render: function(h, params) {
                            return h('span', [params.row.walletModel.virName])
                        },
                        width: 80
                    },
                    {
                        align: 'left',
                        title: '所属钱包',
                        render: function(h, params) {
                            return h('span', [params.row.walletModel.zoneName])
                        }
                    },
                    {
                        align: 'left',
                        title: '奖励时间',
                        key: 'playTime',
                        render: function(h, params) {
                            debugger
                            return h('span', [_this.Global.getDate(params.row.playTime, 'year')])
                        },
                        width: 180
                    },
                    {
                        align: 'left',
                        title: '活动状态',
                        width: 120,
                        render: function(h, params) {
                            debugger
                            return h('span', {
                                style: {
                                    color: function() {
                                        if (params.row.playTime > _this.times) {

                                            return '#19be6b';
                                        } else {
                                            return '#ed3f14';
                                        }
                                    }()
                                }
                            }, [function() {
                                if (params.row.playTime > _this.times) {

                                    return '未开始';
                                } else {
                                    return '已完成';
                                }
                            }()])
                        }
                    },
                    {
                        align: 'left',
                        title: '奖励总数',
                        key: 'playMoney',
                        width: 120,
                        render: function(h, params) {
                            return h('span', [parseFloat(params.row.playMoney) / 1000000000])
                        }
                    },
                    {
                        align: 'left',
                        title: '奖励方式',
                        width: 120,
                        render: function(h, params) {
                            return h('span', {
                                style: {
                                    color: function() {
                                        switch (params.row.playType) {
                                            case 1:
                                                return '#333';
                                                break;
                                            case 0:
                                                return '#333';
                                                break;
                                        }
                                    }()
                                }
                            }, [function() {
                                switch (params.row.playType) {
                                    case 1:
                                        return '指定客户';
                                        break;
                                    case 0:
                                        return '所有客户平均分配';
                                        break;

                                }
                            }()])
                        }
                    },
                    {
                        title: '管理',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: function(h, params) {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        disabled: params.row.playTime < _this.times ? true : false
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: function() {
                                            _this.edit(params)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        disabled: false
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: function() {
                                            _this.see(params)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small',
                                        disabled: params.row.playTime < _this.times ? true : false
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: function() {
                                            _this.$Modal.confirm({
                                                title: '操作确认',
                                                content: '<p>确认要删除吗？</p>',
                                                loading: true,
                                                closable: true,
                                                disabled: function() {
                                                    if (params.row.playType > this.times) {
                                                        return false
                                                    } else {
                                                        return true
                                                    }
                                                },
                                                onOk: function() {
                                                    _this.Global.fun(
                                                        _this,
                                                        'delete', {
                                                            base: _this.api.base,
                                                            other: '/' + params
                                                                .row.id + '?',
                                                            access_token: _this
                                                                .api.access_token
                                                        }, {}, c)

                                                    function c(res, that) {
                                                        if (res.data.status == 1) {
                                                            that.$Message.destroy();
                                                            that.$Message.info(res.data
                                                                .msg);
                                                            that.$Modal.remove();
                                                            that.refresh()
                                                        } else {
                                                            that.$Message.destroy();
                                                            that.$Message.error(res
                                                                .data.msg);
                                                            that.$Modal.remove();

                                                        }
                                                    }

                                                },
                                            });
                                        }
                                    }
                                }, '删除'),
                            ])
                        }
                    }
                ],
                databody: [],
                loading: true,
                oprah: {},
                searchType: '0',
                searchValue: '',
                id: null,
                walletOptions: [],
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
            openHsearch() {
                this.formItem.search_LIKE_name = ''
                this.formItem.search_LIKE_addr = ''
                this.formItem.search_LIKE_contactor = ''
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
            edit: function(params) {
                this.Global.value = '';
                this.Global.type = '';
                this.$router.push({
                    name: 'mplayrule-form',
                    query: {
                        id: params.row.id,
                        current: this.current,
                        search: this.search,
                    }
                })

            },
            see: function(params) {
                this.Global.value = '';
                this.Global.type = '';
                this.$router.push({
                    name: 'mplayrule-seeform',
                    query: {
                        id: params.row.id,
                        current: this.current,
                        search: this.search,

                    },

                })

            },
            added: function() {
                this.Global.value = '';
                this.Global.type = '';
                this.$router.push({
                    name: 'mplayrule-form',
                    query: {
                        id: -1,
                        current: 1,
                        search: '',
                    }
                })

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
            getoptions() {
                debugger
                this.Global.fun(this, 'get', {
                        base: '/mwallet',
                        other: '/all?',
                        access_token: this.api.access_token,
                    }, {},
                    function(res, that) {
                        if (res.data.status == 1) {
                            that.$Message.destroy();
                            that.walletOptions = res.data.data
                            that.options = [...res.data.data, ...that.options]
                        } else {
                            that.$Message.destroy();
                            that.$Message.error(res.data.msg);
                        }

                    })
            },
        },
        created: function() {
            this.current = this.$route.query.current ? parseInt(this.$route.query.current) : 1
            this.search = this.$route.query.search ? this.$route.query.search : {}
            this.getoptions()
            this.loading = true,
                this.onchanges(1)

            this.times = Date.parse(new Date())

        },
    }
</script>

<style lang="less">
    .selelctearchs {
        .EVsearch {
            .ivu-select {
                display: inline-block;
                width: 150px;
            }
        }
    }
</style>
