<template>
    <div>
        <EVpageList :pageTitle="pageTitle" class="nohidden">
            <div slot="searchBox" class="serach">
                币种
                <Select v-model="searchType" placeholder="请选择搜索币种" @on-change="selectchange">
                    {{options}}
                    <Option :value="virOption.id" :label="virOption.name" v-for="virOption in options" :key="virOption.index"></Option>

                </Select>


            </div>


            <div slot="Hsearch" class="Hserach">
                <Button icon="ios-search" type="primary" @click="openHsearch" style="display: inline-block">高级查询
                </Button>
                <Modal v-model="Hsearch" width="500" @on-cancel="HsearchC">
                    <p slot="header">
                        <span>高级查询</span>
                    </p>
                    <div>
                        <Form :model="formItem" :label-width="90">

                            <Col span="23">
                            <FormItem label="数据中心">

                                <Select v-model="formItem.search_EQ_zoneId">
                                    <Option :value="zoneOption.id" :label="zoneOption.name" v-for="zoneOption in zoneOptions"
                                        :key="zoneOption.index"></Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="23">
                            <FormItem label="币种">
                                <Select v-model="formItem.search_EQ_virId">
                                    <Option :value="virOption.id" :label="virOption.name" v-for="virOption in virOptions"
                                        :key="virOption.index"></Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="23">
                            <FormItem label="钱包地址">
                                <Input v-model.trim="formItem.search_LIKE_realMoneyUrl" placeholder="请输入钱包地址"></Input>
                            </FormItem>
                            </Col>

                            <Col span="23">
                            <FormItem label="最小提币额度" class="overappend">
                                <EVinputNumber v-model="formItem.search_EQ_minQuota" :min="1" :max="10000" placeholder="请输入最小提币额度"></EVinputNumber>
                            </FormItem>
                            </Col>
                            <Col span="23">
                            <FormItem label="办结时长" class="overappend">
                                <EVinputNumber v-model="formItem.search_EQ_transactTime" :min="1" :max="168"
                                    placeholder="请输入办结时长(小时)"></EVinputNumber>

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
    import mwallet from './walletExtend.vue';

    export default {
        name: "mwallet",

        data() {
            var _this = this;
            const coderhardInfo = function(coder, value, callback) {

                if ((_this.formV.hardInfo !== '')) {
                    const str = _this.formV.hardInfo
                    if (typeof str == 'string') {
                        try {
                            var obj = JSON.parse(str);
                            if (typeof obj == 'object' && obj) {
                                callback();
                            } else {
                                callback(new Error('JSON格式异常'));
                            }
                        } catch (e) {
                            callback(new Error('JSON格式异常'));
                        }
                    }

                }

            }
            return {
                search: {},
                Hsearch: false,
                formItem: {
                    search_EQ_zoneId: '',
                    search_EQ_virId: '',
                    search_LIKE_realMoneyUrl: '',
                    search_EQ_minQuota: '',
                    search_EQ_transactTime: '',
                },

                api: {
                    base: '/mwallet', //请求部分
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

                pageTitle: '钱包管理', //页面标题
                totalpage: 0,
                pagesize: this.Global.pagesize,
                current: 1,
                formV: {
                    hardInfo: '',
                },
                modal: false,
                switch: false,
                hardInfo: {},
                load: false,
                id: null,
                ruleV: {
                    hardInfo: [{
                        required: true,
                        validator: coderhardInfo,
                        trigger: 'blur'
                    }],
                },
                options: [ //下拉选项
                    {
                        id: '0',
                        name: '不限'
                    }

                ],
                datahead: [{
                        type: 'expand',
                        width: 50,
                        render: function(h, params) {
                            return h(mwallet, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    }, {
                        align: 'left',
                        title: '币种',
                        render: function(h, params) {
                            return h('span', [params.row.virDictEntity.name])
                        },
                        width: 80
                    },
                    {
                        align: 'left',
                        title: '所属数据中心',
                        key: 'zoneEntity.name',
                        width: 180,
                        render: function(h, params) {
                            return h('span', [params.row.zoneEntity.name])
                        }
                    },
                    {
                        align: 'left',
                        title: '钱包地址',
                        key: 'realMoneyUrl'
                    },
                    {
                        align: 'left',
                        title: '最小提币额',
                        key: 'minQuota',
                        width: 80
                    },
                    {
                        align: 'left',
                        title: '提币倍数',
                        key: 'multipleNum',
                        width: 80
                    },
                    {
                        align: 'left',
                        title: '钱包余额',
                        key: 'walletBalance',
                        width: 100,
                        render: function(h, params) {
                            return h('span', [parseFloat(params.row.walletBalance) / 1000000000])
                        }
                    },
                    {
                        title: '管理',
                        key: 'action',
                        width: 120,
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
                                            _this.edit(params)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small',
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
                zoneOptions: [],
                virOptions: []

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
                        base: '/mzone',
                        other: '/all?',
                        access_token: this.api.access_token,
                    }, {},
                    function(res, that) {
                        if (res.data.status == 1) {
                            that.$Message.destroy();
                            that.zoneOptions = res.data.data
                        } else {
                            that.$Message.destroy();
                            that.$Message.error(res.data.msg);
                        }

                    })


                this.Global.fun(this, 'get', {
                        base: '/mvirdict',
                        other: '/all?',
                        access_token: this.api.access_token,
                    }, {},
                    function(res, that) {
                        if (res.data.status == 1) {
                            that.$Message.destroy();
                            that.virOptions = res.data.data
                            that.options = [...res.data.data, ...that.options]

                        } else {
                            that.$Message.destroy();
                            that.$Message.error(res.data.msg);
                        }

                    })
            },
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
                    name: 'mwallet-form',
                    query: {
                        id: params.row.id,
                        current: this.current,
                        search: this.search,
                    }
                })

            },
            added: function() {
                this.Global.value = '';
                this.Global.type = '';
                this.$router.push({
                    name: 'mwallet-form',
                    query: {
                        id: -1,
                        current: 1,
                        search: '',
                    }
                })

            },


            selectchange(e) {
                this.search = {}
                debugger
                if (e != 0) {
                    this.search = {
                        'search_EQ_virId': e
                    }

                }
                this.onchanges(1)

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
                        search_EQ_virId: this.searchType
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
