<template>
    <div>
        <EVpageList :pageTitle="pageTitle">
            <div slot="searchBox" class="serach">
                <!-- <Input v-model.trim="searchValue" :class="selsctclass">
            	<Select v-model="searchType" slot="prepend" style="width: 80px">
            		<Option :value="option.value" :label="option.label" v-text="option.label" v-for="option in options" :key="option.index"></Option>
            	</Select>
            	<Button slot="append" icon="ios-search" @click="dosearch"></Button>
            	</Input> -->
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
               <!--  <Button @click="added" type="success">新增</Button> -->

                <!--拓展按钮1-->
            </div>
        </EVpageList>

    </div>
</template>

<script>
    export default {
        name: "moutwallet",

        data() {
            var _this = this;
            return {
                search: {},
                Hsearch: false,
                formItem: {
                    search_LIKE_phone: '',
                    search_LIKE_name: ''
                },


                api: {
                    base: '/moutwallet', //请求部分
                    access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),
                },

                pageTitle: '转出账户', //页面标题
                totalpage: 0,
                pagesize: this.Global.pagesize,
                current: 1,

                modal: false,
                switch: false,
                load: false,
                id: null,

                options: [ //下拉选项
                    {
                        label: '用户账号',
                        value: 'search_LIKE_phone',
                    },
                ],
                datahead: [{
                        align: 'left',
                        title: '币种',
                        render: function(h, params) {
                            return h('span', [params.row.virDictEntity.name])
                        },
                        width: 80
                    },
                    {
                        align: 'left',
                        title: '钱包地址',
                        key: 'realMoneyUrl'
                    },
                    {
                        align: 'left',
                        title: '是否默认',
                        width: 60,
                        key: 'isDefaule',
                        render: function(h, params) {
                            return h('span', {
                                style: {
                                    color: function() {
                                        switch (params.row.liveState) {
                                            case 0:
                                                return '#19be6b';
                                                break;
                                            case 1:
                                                return '#ed3f14';
                                                break;

                                        }
                                    }()
                                }
                            }, [function() {
                                switch (params.row.isDefaule) {
                                    case 0:
                                        return '否 ';
                                        break;
                                    case 1:
                                        return '是';
                                        break;

                                }
                            }()])
                        }
                    },
                    {
                        align: 'left',
                        title: '余额',
                        key: 'surplus',
                        width: 145
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
                                        disabled: params.row.isDefaule == 0 ? false : true,
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: function() {
                                            _this.mrsz(params)
                                        }
                                    }
                                }, '设置为默认'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                        // disabled: params.row.params.row.isDefaule? == 0 ? true : false,
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
                                                        that.$Message.destroy();
                                                        that.$Message.info(res.data
                                                            .msg);
                                                        that.$Modal.remove();
                                                        that.refresh()
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
                searchType: 'search_LIKE_phone',
                searchValue: ''

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
                this.formItem.search_LIKE_phone = ''
                this.formItem.search_LIKE_name = ''
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
                this.searchType = 'search_LIKE_phone'
                this.onchanges(this.current)
            },

            added: function() {
                this.Global.value = '';
                this.Global.type = '';
                this.$router.push({
                    name: 'moutwallet-form',
                    query: {
                        id: -1,
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
                    console.log(that.search)
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
            mrsz: function(params) {
                    this.loading = true
                    this.Global.fun(this, 'get', {
                        base: this.api.base,
                        other: '/reset/' + params.row.id  + '?',
                        access_token: this.api.access_token,
                    }, {}, d)

                    function d(res, that) {
                        if (res.data.status === 1) {
                            that.$Message.destroy();
                            that.$Message.info("操作成功");
                            that.loading = false;
                            that.$Modal.remove();
                            that.refresh();
                        } else {
                            that.$Message.destroy();
                            that.$Message.error(res.data.msg);
                            that.loading = false;
                            that.$Modal.remove();
                            that.refresh();
                        }
                    }
            },
            dosearch: function() {
                this.loading = true
                if (this.searchValue.match(this.Regex.regexlist.basesearch)) {
                    this.search = {}
                    this.search[this.searchType] = this.searchValue
                    this.onchanges(1)
                } else if (this.searchValue === '') {
                    this.search = {}
                    this.onchanges(1)
                } else {
                    this.$Message.destroy();
                    this.$Message.error('输入条件不合法');
                    this.loading = false;
                }
            }
        },
        created: function() {
            this.searchType = 'search_LIKE_phone',
                // this.getoptions()
                this.refresh()
        },
    }
</script>
<style lang="less">
    .evinputnumber {
        .evaninline {

            >.ivu-input-group-append,
            >.ivu-input-group-prepend {
                display: none;
            }
        }
    }

    .dqtx {
        p {
            padding-left: 100px;
            position: relative;
            margin-bottom: 10px;
            line-height: 32px;

            b {
                position: absolute;
                left: 0;
                width: 90px;
                text-align: right;
            }

            .dqtx_inputnum {
                line-height: 32px;

            }
        }
    }
</style>
