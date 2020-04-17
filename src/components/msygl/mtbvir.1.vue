<template>
    <div>
        <EVpageList :pageTitle="pageTitle">
            <div slot="searchBox" class="serach">
                <Input v-model.trim="searchValue" :class="selsctclass">
                <Select v-model="searchType" slot="prepend" style="width: 80px">
                    <Option :value="option.value" :label="option.label" v-text="option.label" v-for="option in options"
                        :key="option.index"></Option>
                </Select>
                <Button slot="append" icon="ios-search" @click="dosearch"  @mouseleave.native="Global.stopself($event)"></Button>
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
                        <Form :model="formItem" :label-width="80" >
                            <Col span="23">
                            <FormItem label="id">
                                <Input v-model.trim="formItem.search_EQ_id" placeholder="请输入id"></Input>
                            </FormItem>
                            </Col>
                            <Col span="23">
                            <FormItem label="用户名称">
                                <Input v-model.trim="formItem.search_LIKE_userName" placeholder="请输入用户名称"></Input>
                            </FormItem>
                            </Col>
                            <Col span="23">
                            <FormItem label="状态">
                                <!--								<Input v-model.trim="formItem.search_EQ_tbResult" placeholder="请选择状态"></Input>-->
                                <RadioGroup v-model="formItem.search_EQ_tbResult" type="button" size="large">
                                    <Radio label="1">完成</Radio>
                                    <Radio label="0">未完成</Radio>
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
                <Button @click="refresh" type="info"  @mouseleave.native="Global.stopself($event)">刷新</Button>
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
                search: {},
                Hsearch: false,
                formItem: {
                    search_LIKE_userName: '',
                    search_EQ_tbResult: '',
                    search_EQ_id: ''
                },


                api: {
                    base: '/mtbvir', //请求部分
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

                pageTitle: '提币管理', //页面标题
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
                    },
                ],
                datahead: [{
                        align: 'left',
                        title: 'id',
                        key: 'id',
                        width: 120
                    }, {
                        align: 'left',
                        title: '用户名称',
                        key: 'userName',
                    }, {
                        align: 'left',
                        title: '币种',
                        key: 'virName',
                        width: 80
                    }, {
                        align: 'left',
                        title: '真实钱包',
                        key: 'virAddress',
                        width: 180
                    },
                    {
                        align: 'left',
                        title: '提币数量',
                        key: 'tbMoney',
                        width: 80
                    },
                    {
                        align: 'left',
                        title: '发起时间',
                        key: 'createTime',
                        render: function(h, params) {
                            return h('span', [_this.Global.getDate(params.row.createTime, 'year')])
                        },
                        width: 150
                    },
                    {
                        align: 'left',
                        title: '剩余处理时间',
                        key: 'offTime',
                        width: 120
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
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: function() {
                                            _this.downExcel(params)
                                        }
                                    }
                                }, '下载表格'),
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small',
                                        disabled:params.row.tbResult ==1?true:false

                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: function() {
                                            _this.changeResult(params)
                                        }
                                    }
                                }, '完成'),
                            ])
                        }
                    }
                ],
                databody: [],
                loading: true,
                oprah: {},
                searchType: 'search_LIKE_userName',
                searchValue: '',
                id: null,
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
                this.formItem.search_LIKE_userName = ''
                this.formItem.search_EQ_tbResult = ''
                this.formItem.search_EQ_id = ''
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
            downExcel: function(params) {

                this.Global.fun(this, 'get', {
                    base: '/mtbvir/export/',
                    other: params.row.id + '/?',
                    access_token: this.api.access_token
                }, {}, c)

                function c(res, that) {
                    if (res.data.status == 1) {
                        window.open(res.data.data);

                        that.loading = false;
                    } else {
                        that.$Message.destroy();
                        that.$Message.error(res.data.msg);
                        that.loading = false;
                    }
                }

            },
            changeResult: function(params) {
                this.Global.fun(this, 'get', {
                    base: '/mtbvir/result/',
                    other: params.row.id + '/?',
                    access_token: this.api.access_token
                }, {}, c)

                function c(res, that) {
                     if (res.data.status == 1) {
                        that.$Message.destroy();
                        that.$Message.success(res.data.msg);
                        //that.$Modal.remove();
                       that.refresh()
                    } else {
                        that.$Message.destroy();
                        that.$Message.error(res.data.msg);
                        that.refresh()
                    }
                }
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
            this.current = this.$route.query.current ? parseInt(this.$route.query.current) : 1
            this.search = this.$route.query.search ? this.$route.query.search : {}
            this.searchType = 'search_LIKE_userName',
                this.loading = true,
                this.onchanges(1)
            this.defaults.powerShow = this.show
        },
    }
</script>

<style scoped>

</style>
