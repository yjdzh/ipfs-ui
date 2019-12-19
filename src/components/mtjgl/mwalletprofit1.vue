<template>
    <div>
        <EVpageList :pageTitle="pageTitle">
            <div slot="searchBox" class="serach">
                <Input v-model.trim="searchValue" :class="selsctclass">
                <Select v-model="searchType" slot="prepend" style="width: 80px">
                    <Option :value="option.value" :label="option.label" v-text="option.label" v-for="option in options"
                        :key="option.index"></Option>
                </Select>
                <Button slot="append" icon="ios-search" @click="dosearch"></Button>
                </Input>
            </div>


            <div slot="Hsearch" class="Hserach">
                <!-- <Button icon="ios-search" type="primary" @click="openHsearch" style="display: inline-block">高级查询
                </Button> -->
                <Modal v-model="Hsearch" width="500" @on-cancel="HsearchC">
                    <p slot="header">
                        <!-- <span>高级查询</span> -->
                    </p>
                    <div>
                        <Form :model="formItem" :label-width="80" >
                            <Col span="23">
                            <FormItem label="中心名称">
                                <Input v-model.trim="formItem.search_LIKE_name" placeholder="请输入数据中心名称"></Input>
                            </FormItem>
                            </Col>
                            <Col span="23">
                            <FormItem label="中心地址">
                                <Input v-model.trim="formItem.search_LIKE_addr" placeholder="请输入数据中心地址"></Input>
                            </FormItem>
                            </Col>
                            <Col span="23">
                            <FormItem label="联系人">
                                <Input v-model.trim="formItem.search_LIKE_contactor" placeholder="请输入联系人"></Input>
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
        <Modal v-model="modal1" :title="activename +' 的收益统计'" width="720px" footer-hide>
            <div id="chart1"></div>

        </Modal>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: "mpusevir",
        data() {
            var _this = this;
            return {
                search: {},
                Hsearch: false,
                formItem: {
                    search_LIKE_name: '',
                    search_LIKE_contactor: '',
                    search_LIKE_addr: ''
                },
                api: {
                    base: '/mwalletprofit', //请求部分
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
                pageTitle: '中心收益', //页面标题
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
                options: [ //下拉选项
                    {
                        label: '名称',
                        value: 'search_LIKE_name',
                    },
                ],
                datahead: [{
                        align: 'left',
                        title: '名称',
                        key: 'zoneName'
                    },
                    {
                        align: 'left',
                        title: 'FN',
                        key: 'fn',
                        width: 200,
                        render: function (h, params) {
                            return h('span', [parseFloat(params.row.fn)/1000000000])
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

                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: function() {
                                            _this.sytj(params)
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
                searchType: 'search_LIKE_name',
                searchValue: '',
                id: null,

                modal1: false,
                activeid: null,
                activename: '',
                xdata: [],
                ydata: [],
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
            sytj(e) {
                this.activeid = e.row.zoneId
                this.activename = e.row.zoneName

                this.modal1 = true
                this.getdata()
            },
            getdata() {
                var th = this
                this.Global.fun(this, 'get', {
                        base: '/mwalletprofit/total/',
                        other: this.activeid + '?',
                        access_token: this.api.access_token,
                    }, {},
                    function(res, that) {
                        const st = res.data.status
                        if (st === 1) {
                            debugger
                            const da = res.data.data
                            th.xdata = da.data;
                            const l = da.items.length
                            const label = {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }

                            };
                            const names = []
                            const type = 'line';
                            const areaStyle = {}
                            for (var i = 0; i < l; i++) {
                                names.push(da.items[i].name)
                                da.items[i]['label'] = label
                                da.items[i]['type'] = type
                                da.items[i]['areaStyle'] = areaStyle
                            }

                            th.ydata = da.items;
                            th.line1('chart1', th.xdata, th.ydata)

                        } else {
                            that.$Message.destroy();
                            that.$Message.info(res.data.msg);
                        }


                    })
            },


            line1: function(id, x, y, names) {
                var th = this
                this.chart = echarts.init(document.getElementById(id));
                this.chart.clear();

                const optionData = {
                    title: {
                        text: '近七日收益'
                    },
                    grid: {
                        left: '3%',
                        right: '10%',
                        bottom: '3%',
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'axis',

                    },
                    legend: {
                        data: names
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: x
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: y


                };

                this.chart.setOption(optionData);
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
                this.searchType = 'search_LIKE_name'
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
            this.searchType = 'search_LIKE_name',
                this.loading = true,
                this.onchanges(1)
            this.defaults.powerShow = this.show
        },
    }
</script>

<style scoped>
    #chart1 {
        width: 700px;
        height: 400px;
    }
</style>
