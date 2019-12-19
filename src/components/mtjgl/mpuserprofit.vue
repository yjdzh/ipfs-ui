<template>
    <div>
        <EVpageList :pageTitle="pageTitle" ass="nohidden">
            <div slot="searchBox" class="serach">
                <Input v-model.trim="searchValue" :class="selsctclass">
                    <Select v-model="searchType" slot="prepend" style="width: 90px">
                        <Option :value="option.value" :label="option.label" v-text="option.label"
                                v-for="option in options"
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
                        <Form :model="formItem" v-if="Hsearch" :label-width="90">

                            <Col span="23">
                                <FormItem label="客户名称">
                                    <Input v-model.trim="formItem.search_LIKE_userName" placeholder="请输入数据中心名称"></Input>
                                </FormItem>
                            </Col>

                            <Col span="23">
                                <FormItem label="钱包">
                                    <Select v-model="formItem.search_EQ_walletId">
                                        <Option :value="walletOption.id" :label="walletOption.allName"
                                                v-for="walletOption in walletOptions"
                                                :key="walletOption.index"></Option>
                                    </Select>
                                </FormItem>
                            </Col>

                            <Col span="23">
                                <FormItem label="开始日期">
                                    <DatePicker type="date" style="    width: 100%;" placeholder="请选择开始日期"
                                                @on-change="datechange($event,'search_LIKE_startDate')"
                                                :editable="false" format="yyyy-MM-dd"></DatePicker>
                                </FormItem>
                            </Col>

                            <Col span="23">
                                <FormItem label="结束日期">
                                    <DatePicker type="date" style="    width: 100%;" placeholder="请选择结束日期"
                                                @on-change="datechange($event,'search_LIKE_endDate')"
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
                <Button @click="dobtns()" type="info">批量导出</Button>
                <Button @click="refresh" type="info">刷新</Button>
            </div>
            <div slot="table">
                <Table border :columns="datahead" :data="databody" size='small' :loading="loading"
                       @on-selection-change="selectionchange">
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
        <Modal v-model="modal1" :title="activename +' 的收益统计'" width="720px" footer-hide style="height: 300px;">


            <div id="chart1"></div>

        </Modal>
    </div>
</template>

<script>
    import echarts from "echarts";

    export default {
        name: "mwallet",

        data() {
            var _this = this;
            return {
                //这部分是新的
                selectedArr: {},


                //这部分是新的
                search: {},
                Hsearch: false,
                selects: [],
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
                datahead: [
                    {
                        type: 'selection',
                        width: 50,
                    }, {
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
                        title: '日总收益',
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
                searchType: 'search_LIKE_userName',
                searchValue: '',
                id: null,
                walletOptions: [],

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
            //这部分是新的


            //切换时候设置某一页的选中、未选中
            superSetSelected(selectall, page, data) {
                debugger
                if (selectall[page] == undefined) {
                    return
                } else {
                    var lidt = selectall[page]
                    var l = selectall[page].length

                    var d = data.length
                    for (var i = 0; i < l; i++) {
                        for (var j = 0; j < d; j++) {
                            if (selectall[page][i].id == data[j].id) {
                                data[j]._checked=true
                            }
                        }
                    }

                }

            },


            //这部分是新的

            datechange(e, v) {
                debugger
                this.formItem[v] = e
            },

            dobtns() {
                const el = []
                var arr=this.selectedArr
                for(var j in arr) {
                    console.log(arr[j]);
                    var m=arr[j]
                    for (var i = 0; i < m.length; i++) {
                        el.push(m[i].id);
                    }
                }

                const sl = el.join(',')
                console.log(sl)
                debugger
                this.Global.newfun(this, 'post', {
                    base: '/mpuserprofit/mulexport?',
                    other: '',
                    access_token: this.api.access_token
                }, {
                    ids: sl
                }, function (res, that) {
                    if (res.data.status == 1) {
                        window.open(res.data.data);
                    } else {
                        that.$Message.destroy();
                        that.$Message.error(res.data.msg);
                    }
                })
            },

            sytj(e) {
                debugger
                this.activeid = e.row.id
                this.activename = e.row.pubUserName
                this.modal1 = true
                this.getdata()
                // const y=[1,2,3,4]
                //
                // const x=[5,5,5,6]
                //
                //
                //
                //
                // this.line1('chart1', x,y)
            },
            getdata() {
                var th = this
                this.Global.fun(this, 'get', {
                        base: '/mpuserprofit/total/',
                        other: this.activeid + '?',
                        access_token: this.api.access_token,

                    }, {},
                    function (res, that) {
                        debugger
                        const st = res.data.status
                        if (st === 1) {
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


            line1: function (id, x, y, names) {
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
            getoptions() {
                this.Global.fun(this, 'get', {
                        base: '/mwallet',
                        other: '/all?',
                        access_token: this.api.access_token,
                    }, {},
                    function (res, that) {
                        if (res.data.status == 1) {
                            that.$Message.destroy();
                            that.walletOptions = res.data.data

                        } else {
                            that.$Message.destroy();
                            that.$Message.error(res.data.msg);
                        }

                    })
            },

            selectionchange(e) {
                this.selects = []
                this.selects = e
                if (e.length == 0) {
                    delete this.selectedArr[this.current]
                } else {
                    this.selectedArr[this.current] = e
                }

            },
            openHsearch() {
                this.formItem.search_EQ_walletId = ''
                this.formItem.search_LIKE_startDate = ''
                this.formItem.search_LIKE_endDate = ''
                this.formItem.search_LIKE_userName = ''
                this.Hsearch = true
                this.selectedArr={}
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

            refresh: function () {
                this.loading = true
                this.search = {}
                this.selectedArr={}
                this.searchType = 'search_LIKE_userName'
                // this.searchValue = ''
                // this.search = ''
                // this.current = 1
                this.onchanges(this.current)
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
                        that.superSetSelected(that.selectedArr,res.data.data.number + 1,res.data.data.content)
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
                this.selectedArr={}
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


            },
        },
        created: function () {

            this.searchType = 'search_LIKE_userName',
                this.loading = true,

                this.refresh()
            this.getoptions()
            this.defaults.powerShow = this.show
            this.onchanges(1)

        },
    }
</script>

<style lang="less">
    .ivu-modal-footer {
        border-top: 0px solid #e9eaec !important;

    }

    .overappend {
        .evaninline {

            > .ivu-input-group-append,
            > .ivu-input-group-prepend {
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
<style scoped>
    #chart1 {
        width: 700px;
        height: 400px;
    }
</style>
