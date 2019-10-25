<template>
    <div>
        <EVpageList :pageTitle="pageTitle">
            <div slot="searchBox" class="serach">
                <Input v-model="searchValue" :class="selsctclass">
                    <Select v-model="searchType" slot="prepend" style="width: 80px">
                        <Option :value="option.value" :label="option.label" v-text="option.label"
                                v-for="option in options" :key="option.index"></Option>
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
                        <Form :model="formItem" :label-width="80" style="overflow: hidden">
                            <Col span="23">
                                <FormItem label="名称">
                                    <Input v-model="formItem.search_LIKE_name"
                                           placeholder="请输入数据中心名称"></Input>
                                </FormItem>
                            </Col>
                            <Col span="23">
                                <FormItem label="地址">
                                    <Input v-model="formItem.search_LIKE_addr"
                                           placeholder="请输入数据中心地址"></Input>
                                </FormItem>
                            </Col>
                            <Col span="23">
                                <FormItem label="联系人">
                                    <Input v-model="formItem.search_LIKE_contactor"
                                           placeholder="请输入联系人"></Input>
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
                <Page :total="totalpage" show-total show-elevator :page-size="pagesize" @on-change="onchanges"
                      :current="current">
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
        name: "mzone",

        data () {
            var _this = this;
            const coderhardInfo = function (coder, value, callback) {

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
                    search_LIKE_name: '',
                    search_LIKE_contactor: '',
                    search_LIKE_addr: ''
                },


                api: {
                    base: '/mzone', //请求部分
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

                pageTitle: '数据中心管理', //页面标题
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
                        label: '名称',
                        value: 'search_LIKE_name',
                    },
                ],
                datahead: [
                    {
                        align: 'left',
                        title: '名称',
                        key: 'name'
                    },
					{
					    align: 'left',
					    title: '矿机总数',
					    key: 'totalNum',
					    width: 100
					},
					{
					    align: 'left',
					    title: '在线',
					    key: 'onlineNum',
					     width: 80
					},
					{
					    align: 'left',
					    title: '离线',
					    key: 'unlineNum',
					     width: 80
					},
                    {
                        align: 'left',
                        title: '联系人',
                        key: 'contactor',
                        width: 150
                    },
                    {
                        title: '管理',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: function (h, params) {
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
                                        click: function () {
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
                                        click: function () {
                                            _this.$Modal.confirm({
                                                title: '操作确认',
                                                content: '<p>确认要删除吗？</p>',
                                                loading: true,
                                                closable: true,
                                                onOk: function () {
                                                    _this.Global.fun(
                                                        _this,
                                                        'delete', {
                                                            base: _this.api.base,
                                                            other: '/' + params.row.id + '?',
                                                            access_token: _this.api.access_token
                                                        }, {}, c)
                                                    function c (res, that) {
														if (res.data.status == 1) {
															that.$Message.destroy();
															that.$Message.info(res.data.msg);
															that.$Modal.remove();
															that.refresh()
														}else{
															that.$Message.destroy();
															that.$Message.error(res.data.msg);
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
                searchType: 'search_LIKE_name',
                searchValue: '',
                id: null,
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
            openHsearch () {
                this.formItem.search_LIKE_name = ''
                this.formItem.search_LIKE_addr = ''
                this.formItem.search_LIKE_contactor = ''
                this.Hsearch = true
            },
            HsearchC () {
                this.Hsearch = false
            },
            HsearchS () {
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

            refresh: function () {
                this.loading = true
                this.search = {}
                this.searchType = 'search_LIKE_username'
                // this.searchValue = ''
                // this.search = ''
                // this.current = 1
                this.onchanges(this.current)
            },
            edit: function (params) {
                this.Global.value = '';
                this.Global.type = '';
                this.$router.push({
                    name: 'mzone_form',
                    query: {
                        id: params.row.id,
                        current: this.current,
                        search: this.search,
                    }
                })

            },
            added: function () {
                this.Global.value = '';
                this.Global.type = '';
                this.$router.push({
                    name: 'mzone_form',
                    query: {
                        id: -1,
                        current: 1,
                        search: '',

                    }
                })

            },
            onchanges: function (e) {
                var that = this
                this.loading = true
                this.searchValue = this.search[this.searchType] ? this.search[this.searchType] : ''
                this.current = e;
                this.Global.fun(this, 'get', {
                    base: this.api.base,
                    other: '/page?',
                    access_token: this.api.access_token
                }, function () {
                    that.search.page = e - 1
                    that.search.size = 10
                    return that.search
                }(), c)

                function c (res, that) {
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
            oprahfun: function (e) {
                this.Global.oprahfun(this)
            },
            dosearch: function () {
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
        created: function () {
            this.current = this.$route.query.current ? parseInt(this.$route.query.current) : 1
            this.search = this.$route.query.search ? this.$route.query.search : {}
            this.searchType = 'search_LIKE_name',
            this.loading = true,
            this.onchanges(1)
            this.defaults.powerShow = this.show
        },
    }
</script>

<style scoped>

</style>
