<template>
    <EVpageList :pageTitle="pageTitle">
        <div slot="searchBox" class="serach">
            <Input v-model="searchValue" :class="selsctclass">
                <Select v-model="searchType" slot="prepend" style="width: 80px">
                    <Option :value="option.value" :label="option.label" v-text="option.label" v-for="option in options"
                            :key="option.index"></Option>
                </Select>
                <Button slot="append" icon="ios-search" @click="dosearch"></Button>
            </Input>
        </div>
        <div slot="btnBox" class="btn">
            <!--<Button @click="added" type="success">新增</Button>-->
            <Button @click="refresh" type="info">刷新</Button>
        </div>
        <div slot="table">
            <Scroll :on-reach-bottom="handleReachBottom">
                <evtab border :columns="datahead" :data="databody" size='small' :loading="loading" @on-select="select" @on-select-cancel="select" @on-select-all-cancel="selectall" @on-select-all="selectall"></evtab>
            </Scroll>
        </div>
        <!--<div slot="pagePage">-->
        <!--<Page :total="totalpage" show-total show-elevator :page-size="pagesize" @on-change="onchanges" :current="current">-->
        <!--</Page>-->
        <!--</div>-->

        <div slot="moreBtn">
            <!--拓展按钮1-->
        </div>
    </EVpageList>
</template>

<script>
    // import flows from './flowsExtend.vue';

    export default {
        name: "mflows",
        // components: {flows},
        data () {
            var _this = this;
            return {
                seta: false,

                api: {
                    base: '/mflows', //请求部分
                    access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),
                },
                pageTitle: '入库流水', //页面标题
                totalpage: 0,
                pagesize: this.Global.pagesize,
                current: 1,
                options: [ //下拉选项
                    {
                        label: '生产厂家',
                        value: 'mfrs',
                    }
                ],
                datahead: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    // {
                    //     type: 'expand',
                    //     width: 50,
                    //     render: function (h, params) {
                    //         return h(flows, {
                    //             props: {
                    //                 row: params.row
                    //             }
                    //         })
                    //     }
                    // },
                    {
                        align: 'left',
                        title: '产品名称',
                        render: function (h, params) {
                            return h('span', [params.row.productEntity.name])
                        }
                    },
                    // {
                    //     align: 'left',
                    //     title: '序列号',
                    //     key: 'sn',
                    //     width: 150
                    // },


                    {
                        align: 'left',
                        title: '生成厂商',
                        key: 'mfrs',

                    },
                    // {
                    //     align: 'left',
                    //     title: 'mac',
                    //     key: 'mac',
                    //     width: 50
                    // },
                    {
                        align: 'left',
                        title: '出厂日期',
                        key: 'factoryDate',

                    },


                    {
                        align: 'center',
                        title: '销售类型',
                        key: 'saleState',
                        render: function (h, params) {
                            return h('span', {
                                style: {
                                    color: function () {
                                        switch (params.row.saleState) {
                                            case 0:
                                                return '#19be6b';
                                                break;
                                            case 1:
                                                return '#ed3f14';
                                                break;

                                        }
                                    }()
                                }
                            }, [function () {
                                switch (params.row.saleState) {
                                    case 0:
                                        return '自维';
                                        break;
                                    case 1:
                                        return '托管';
                                        break;

                                }
                            }()])
                        },
                    },

                    {
                        align: 'left',
                        title: '入库类型',
                        key: 'stockType',
                        render: function (h, params) {
                            return h('span', {
                                style: {
                                    color: function () {
                                        switch (params.row.stockType) {
                                            case 0:
                                                return '#19be6b';
                                                break;
                                            case 1:
                                                return '#ed3f14';
                                                break;

                                        }
                                    }()
                                }
                            }, [function () {
                                switch (params.row.stockType) {
                                    case 0:
                                        return '表单入库';
                                        break;
                                    case 1:
                                        return '批量入库';
                                        break;

                                }
                            }()])
                        },
                    },
                    {
                        align: 'left',
                        title: '入库流水',
                        key: 'inboundNum',

                    },
                    {
                        title: '管理',
                        key: 'action',
                        width: 80,
                        align: 'center',
                        render: function (h, params) {
                            return h('div', [

                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',

                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: function () {
                                            _this.$Modal.confirm({
                                                title: '操作确认',
                                                content: '<p>确认要删除吗？</p>',
                                                loading: true,
                                                onOk: function () {
                                                    _this.Global.fun(
                                                        _this,
                                                        'delete', {
                                                            base: _this.api.base,
                                                            other: '/' + params.row.id + '?',
                                                            access_token: _this.api.access_token
                                                        }, {}, c)

                                                    function c (res, that) {
                                                        that.$Message.destroy();
                                                        that.$Message.info(res.data.msg);

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
                search: '',
                oprah: {},
                searchType: '',
                searchValue: '',
            };
        },
        computed: {
            disabledadd () {
                return false
            },
            selsctclass () {
                return this.options.length === 1 ? 'overhidden' : ''
            }
        },
        methods: {
            selectallc (e) {
                debugger
            },
            selectall (e) {
                debugger
                if (e.length == 0) {
                    for (var key in this.databody) {

                        this.databody[key]._checked = false

                    }
                    // console.log('取消')
                }
                else {
                    for (var key in this.databody) {

                        this.databody[key]._checked = true

                    }
                    // console.log('全选')
                }


            },
            select (a, b) {
                debugger
                this.databody[b.select]._checked = (!this.databody[b.select]._checked)
            },
            handleReachBottom () {
                this.loading = false

                this.searchValue = this.search === '' ? '' : this.search
                this.current = this.current + 1;
                this.Global.fun(this, 'get', {
                    base: this.api.base,
                    other: '/page?',
                    access_token: this.api.access_token
                }, this.searchValue !== '' ? JSON.parse('{"' + 'search_LIKE_' + this.searchType + '":"' + this.searchValue +
                    '","page":"' + (this.current - 1) + '","size":"' + this.pagesize + '"}') : {
                    page: this.current - 1,
                    size: this.pagesize
                }, c)

                function c (res, that) {
                    if (res.data.status === 1) {
                        for (var key in res.data.data) {
                            if (!res.data.data[key]) {
                                res.data.data[key] = '暂无数据'
                            }
                        }
                        debugger
                        if (res.data.data.content.length == 0) {
                            that.current = res.data.data.number + 1;
                        }
                        else {
                            that.current = res.data.data.number + 1;


                            for (var key in res.data.data.content) {
                                res.data.data.content[key]._checked = false
                                res.data.data.content[key].select = parseInt(key) + (10 * (that.current - 1))
                            }
                            that.databody = that.databody.concat(res.data.data.content);
                        }


                    } else {
                        that.$Message.destroy();
                        that.$Message.error(res.data.msg);
                        that.loading = false;
                    }
                }
            },
            refresh: function () {
                this.loading = true
                var _this = this;
                //                 this.searchType = 'mfrs'
                //                 this.searchValue = ''
                //                 this.search = ''
                //                 this.current = 1
                this.onchanges(this.current)
            },
            edit: function (params) {
                this.Global.value = '';
                this.Global.type = '';
                this.$router.push({
                    name: 'flows_form',
                    params: {
                        id: params.row.id

                    }
                })

            },
            added: function () {
                this.Global.value = '';
                this.Global.type = '';
                this.$router.push({
                    name: 'flows_form',
                    params: {
                        id: -1,

                    }
                })

            },
            onchanges: function (e) {
                this.databody = []
                this.loading = true
                this.searchValue = this.search === '' ? '' : this.search
                this.current = e;
                this.Global.fun(this, 'get', {
                    base: this.api.base,
                    other: '/page?',
                    access_token: this.api.access_token
                }, this.searchValue !== '' ? JSON.parse('{"' + 'search_LIKE_' + this.searchType + '":"' + this.searchValue +
                    '","page":"' + (this.current - 1) + '","size":"' + this.pagesize + '"}') : {
                    page: this.current - 1,
                    size: this.pagesize
                }, c)

                function c (res, that) {
                    if (res.data.status === 1) {
                        for (var key in res.data.data) {
                            if (res.data.data[key] === null) {
                                res.data.data[key] = '暂无数据'
                            }
                        }
                        that.totalpage = res.data.data.totalElements;
                        that.current = res.data.data.number + 1;
                        if (res.data.data.content.length == 0) {

                        }
                        else {

                            for (var key in res.data.data.content) {
                                res.data.data.content[key]._checked = false
                                res.data.data.content[key].select = key
                            }
                            that.databody = res.data.data.content;
                        }
                        that.loading = false;
                    } else {
                        that.$Message.destroy();
                        that.$Message.error(res.data.msg);
                        that.loading = false;
                    }
                }
            },
            oprahfun: function (e) {
                this.Global.oprahfun(this)
            },
            dosearch: function () {
                this.loading = true

                if (this.searchValue.match(this.Regex.regexlist.basesearch)) {
                    this.search = this.searchValue
                    this.onchanges(1)
                } else if (this.searchValue === '') {
                    this.search = ''
                    this.onchanges(1)
                } else {
                    this.$Message.destroy();
                    this.$Message.error('输入条件不合法');
                    this.loading = false;
                }
            }
        },
        created: function () {
            this.searchType = 'mfrs',
                this.refresh()
        },
    }
</script>

<style scoped>

</style>
