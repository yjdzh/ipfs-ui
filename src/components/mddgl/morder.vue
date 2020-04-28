<template>
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
            <Button icon="ios-search" type="primary" @click="openHsearch" style="display: inline-block">高级查询</Button>
            <Modal v-model="Hsearch" width="600" @on-cancel="HsearchC">
                <p slot="header">
                    <span>高级查询</span>
                </p>
                <div>
                    <Form :model="formItem" :label-width="80" style="overflow: hidden">
                        <Col span="23">
                            <FormItem label="产品名称">
                                <Select v-model="formItem.search_EQ_productId" placeholder="请选择产品">
                                    <Option :value="it.id" v-for="it in Hsearchopt" :key="Hsearchopt.index">
                                        {{it.name}}
                                    </Option>

                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="23">
                            <FormItem label="收货人">
                                <Input v-model.trim="formItem.search_LIKE_addressContacter" placeholder="请输入收货人"></Input>
                            </FormItem>
                        </Col>
                        <Col span="23">
                            <FormItem label="收货电话">
                                <Input v-model.trim="formItem.search_LIKE_addressTel" placeholder="请输入收货人的联系电话"></Input>
                            </FormItem>
                        </Col>


                        <Col span="23">
                            <FormItem label="下单人账号">
                                <Input v-model.trim="formItem.search_LIKE_pubPhone" placeholder="请输入下单账号的手机号码"></Input>
                            </FormItem>
                        </Col>

                        <Col span="23">
                            <FormItem label="销售类型">
                                <RadioGroup v-model="formItem.search_EQ_saleState" type="button">
                                    <Radio :label="0">自维</Radio>
                                    <Radio :label="1">托管</Radio>
                                    <Radio :label="2">托管服务</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>

                        <Col span="23">
                            <FormItem label="订单状态">
                                <RadioGroup v-model="formItem.search_EQ_state" type="button">
                                    <Radio :label="0">取消</Radio>
                                    <Radio :label="2">待支付</Radio>
                                    <Radio :label="3">已支付</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>


                        <Col span="23">
                            <FormItem label="处理结果">
                                <RadioGroup v-model="formItem.search_EQ_result" type="button">
                                    <Radio :label="0">未发货</Radio>
                                    <Radio :label="1">已发货</Radio>
                                    <Radio :label="2">未托管</Radio>
                                    <Radio :label="3">已托管</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                    </Form>
                </div>
                <div slot="footer">
                    <i-button type="ghost" size="large" @click="HsearchC">取消搜索</i-button>
                    <i-button type="primary" size="large" @click="HsearchS">确认搜索</i-button>
                    <i-button type="info" size="large" @click="putoutS">导出</i-button>
                </div>
            </Modal>
        </div>


        <div slot="btnBox" class="btn">
            <Button @click="refresh" type="info"  @mouseleave.native="Global.stopself($event)">刷新</Button>
        </div>
        <div slot="table">
            <Table border :columns="datahead" :data="databody" size='small' :loading="loading">
            </Table>

            <!--            <Modal v-model="modal1" width="500" @on-cancel="cancel1">-->
            <!--                <p slot="header">-->
            <!--                    <span>发货</span>-->
            <!--                </p>-->
            <!--                <div>-->
            <!--                    <p>提示！输入多个设备的mac，并使用"，"或者","进行分割。</p>-->
            <!--                    <br/>-->
            <!--                    <Input v-model.trim="value1" type="textarea" :autosize="{minRows: 5,maxRows: 8}"-->
            <!--                           placeholder="可以输入要发货设备的mac，并使用','或者'，'进行分割,如:00E0701355D1，00E0701355D2"></Input>-->
            <!--                </div>-->
            <!--                <div slot="footer">-->
            <!--                    <i-button type="primary" size="large" long @click="fahuoMeth">确认发货</i-button>-->
            <!--                </div>-->
            <!--            </Modal>-->


            <Modal v-model="modal2" width="700" @on-cancel="cancel2">
                <p slot="header">
                    <span>托管</span>
                </p>
                <div>
                    数据中心:
                    <Select v-model="zoneId" @on-change="dogetlist2">
                        <Option :value="zoneOption.id" v-text="zoneOption.name"
                                v-for="zoneOption in zoneOptions"
                                :key="zoneOption.index"></Option>
                    </Select>


                    <div v-if="zoneId">
<!--                        <evtab border :columns="datahead2" :data="databody2" size='small' :loading="loading2"-->
<!--                               @on-select="select2"-->
<!--                               @on-select-cancel="select2" @on-select-all-cancel="selectall2"-->
<!--                               @on-select-all="selectall2">-->
<!--                        </evtab>-->

                        <Table border :columns="datahead2" :data="databody2" size='small' :loading="loading2"
                               @on-selection-change="selectionchange2">
                        </Table>

                        <Page :total="totalpage2" show-total show-elevator :page-size="pagesize" @on-change="handleReachBottom2"
                              :current="current2">
                        </Page>





                    </div>
                </div>
                <!--<div>-->
                <!--<Page :total="totalpage2" show-total show-elevator :page-size="10" @on-change="getlist2" :current="current2">-->
                <!--</Page>-->
                <!--</div>-->
                <div slot="footer">
                    <i-button type="primary" size="large" long @click="tuoguanMeth">确认托管</i-button>
                </div>
            </Modal>


            ﻿
            <Modal v-model="modal3" width="700" @on-cancel="cancel3">
                <p slot="header">
                    <span>发货</span>
                </p>
                <div>数据中心:
                    <Select v-model="zoneId" @on-change="dogetlist3">
                        <Option :value="zoneOption.id" v-text="zoneOption.name"
                                v-for="zoneOption in zoneOptions"
                                :key="zoneOption.index"></Option>
                    </Select>
                    <div>
                        <div  v-if="zoneId">
<!--                            <evtab border :columns="datahead3" :data="databody3" size='small' :loading="loading3"-->
<!--                                   @on-select="select3"-->
<!--                                   @on-select-cancel="select3" @on-select-all-cancel="selectall3"-->
<!--                                   @on-select-all="selectall3">-->
<!--                            </evtab>-->



                            <Table border :columns="datahead3" :data="databody3" size='small' :loading="loading3"
                                   @on-selection-change="selectionchange3">
                            </Table>

                            <Page :total="totalpage3" show-total show-elevator :page-size="pagesize" @on-change="handleReachBottom3"
                                  :current="current3">
                            </Page>
                        </div>
                    </div>
                </div>
                <!--<div>-->
                <!--<Page :total="totalpage3" show-total show-elevator :page-size="10" @on-change="getlist3" :current="current3">-->
                <!--</Page>-->
                <!--</div>-->
                <div slot="footer">
                    <i-button type="primary" size="large" long @click="fhMeth">确认发货</i-button>
                </div>
            </Modal>

            <Modal v-model="modal4" width="570" @on-cancel="cancel1">
                <p slot="header">
                    <span>打印预览</span>
                </p>
                <div>
                    <section ref="print">
                        <table border="1" class="printtable">
                            <tr>
                                <th style="width: 300px">姓名：{{name}}</th>
                                <th style="width: 700px">电话：{{phone}}</th>

                            </tr>
                            <tr>
                                <th>客户名称：{{username}}</th>
                                <th>收货地址：{{address}}</th>
                            </tr>
                            <tr>
                                <td>发货设备mac列表</td>
                                <td>
                                    <table width="100%">
                                        <tr v-for="it in maclist">
                                            <td>{{it[0]?it[0]:''}} </td>
                                            <td>{{it[1]?it[1]:''}}</td>
                                            <td>{{it[2]?it[2]:''}} </td>
                                            <td>{{it[3]?it[3]:''}}</td>
                                        </tr>

                                    </table>
                                </td>

                            </tr>
                        </table>
                    </section>

                </div>
                <div slot="footer">
                    <i-button type="primary" size="large" long @click="print">确认打印</i-button>
                </div>
            </Modal>


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
</template>

<script>
    import order from './orderExtend.vue';

    export default {
        name: "morder",
        components: {
            order
        },
        data() {
            var _this = this;
            return {

                selectedArr2: {},
                selectedArr3: {},

                name: ' ',
                phone: null,
                username: ' ',
                address: ' ',
                mac: [],
                maclist: [],
                modal4: false,
                ///////////////打印
                search: {},
                Hsearch: false,
                Hsearchopt: [],
                formItem: {
                    search_EQ_productId: '',
                    search_LIKE_addressContacter: '',
                    search_EQ_saleState: '',
                    search_EQ_state: '',
                    search_EQ_result: '',
                    search_EQ_addressTel: '',
                    search_EQ_pubPhone: ''
                },
                productId: '',
                id: '',

                modal1: false,
                value1: '',
                zoneOptions: [],
                zoneId: '',
                modal2: false,
                value2: '',
                saleNum2: 0,
                selectNum2: 0,
                datahead2: [{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, {
                    align: 'left',
                    title: '产品名称',
                    key: 'name',
                    render: function (h, params) {
                        return h('span', [params.row.productEntity.name])
                    }
                }, {
                    align: 'left',
                    title: '产品型号',
                    key: 'model',
                    render: function (h, params) {
                        return h('span', [params.row.productEntity.model])
                    }
                }, {
                    align: 'left',
                    title: 'mac地址',
                    key: 'mac',
                }, {
                    align: 'left',
                    title: '产品状态',
                    key: 'lineState',
                    render: function (h, params) {
                        return h('span', {
                            style: {
                                color: function () {
                                    switch (params.row.lineState) {
                                        case 0:
                                            return '#0061be';
                                            break;
                                        case 1:
                                            return '#00ed03';
                                            break;

                                    }
                                }()
                            }
                        }, [function () {
                            switch (params.row.lineState) {
                                case 0:
                                    return '离线';
                                    break;
                                case 1:
                                    return '在线';
                                    break;


                            }
                        }()])
                    },
                }],
                databody2: [],
                loading2: false,
                totalpage2: 0,
                current2: 0,
                selects2:[],

                modal3: false,
                value3: '',
                saleNum3: 0,
                selectNum3: 0,
                datahead3: [{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, {
                    align: 'left',
                    title: '产品名称',
                    key: 'name',
                    render: function (h, params) {
                        return h('span', [params.row.productEntity.name])
                    }
                }, {
                    align: 'left',
                    title: '产品型号',
                    key: 'model',
                    render: function (h, params) {
                        return h('span', [params.row.productEntity.model])
                    }
                }, {
                    align: 'left',
                    title: 'mac地址',
                    key: 'mac',
                }, {
                    align: 'left',
                    title: '产品状态',
                    key: 'lineState',
                    render: function (h, params) {
                        return h('span', {
                            style: {
                                color: function () {
                                    switch (params.row.lineState) {
                                        case 0:
                                            return '#0061be';
                                            break;
                                        case 1:
                                            return '#00ed03';
                                            break;

                                    }
                                }()
                            }
                        }, [function () {
                            switch (params.row.lineState) {
                                case 0:
                                    return '离线';
                                    break;
                                case 1:
                                    return '在线';
                                    break;


                            }
                        }()])
                    },
                }],
                databody3: [],
                loading3: false,
                totalpage3: 0,
                current3: 0,
                selects3:[],

                api: {
                    base: '/morder', //请求部分
                    access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),
                },
                pageTitle: '订单管理', //页面标题
                totalpage: 0,
                pagesize: this.Global.pagesize,
                current: 1,
                options: [ //下拉选项
                    {
                        label: '产品名称',
                        value: 'search_LIKE_productEntity.name',
                    },
                ],
                datahead: [{
                    type: 'expand',
                    width: 50,
                    render: function (h, params) {
                        return h(order, {
                            props: {
                                row: params.row
                            }
                        })
                    }
                },
                    {
                        align: 'left',
                        title: '产品名称',
                        key: 'name',
                        render: function (h, params) {
                            return h('span', [params.row.productEntity.name])
                        }
                    },
                    {
                        align: 'left',
                        title: '订单状态',
                        key: 'state',
                        render: function (h, params) {
                            return h('span', {
                                style: {
                                    color: function () {
                                        switch (params.row.state) {
                                            case 0:
                                                return '#be003f';
                                                break;
                                            case 2:
                                                return '#ed8b12';
                                                break;
                                            case 3:
                                                return '#00ed03';
                                                break;

                                        }
                                    }()
                                }
                            }, [function () {
                                switch (params.row.state) {
                                    case 0:
                                        return '取消';
                                        break;
                                    case 2:
                                        return '待支付';
                                        break;
                                    case 3:
                                        return '已支付';
                                        break;

                                }
                            }()])
                        },
                    },
                    {
                        align: 'left',
                        title: '销售类型',
                        key: 'saleState',
                        render: function (h, params) {
                            return h('span', {
                                style: {
                                    color: function () {
                                        switch (params.row.saleState) {
                                            case 0:
                                                return '#0061be';
                                                break;
                                            case 1:
                                                return '#00ed03';
                                                break;
                                            case 2:
                                                return '#00ed03';
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
                                    case 2:
                                        return '托管服务';
                                        break;


                                }
                            }()])
                        },
                    }, {
                        align: 'left',
                        title: '购买数量',
                        key: 'saleNum'
                    }, {
                        align: 'left',
                        title: '总价',
                        key: 'totalMoney'
                    }, {
                        align: 'left',
                        title: '购买折扣',
                        key: 'saleDiscount'
                    }, {
                        align: 'left',
                        title: '处理结果',
                        key: 'result',
                        render: function (h, params) {
                            return h('span', {
                                style: {
                                    color: function () {
                                        switch (params.row.result) {
                                            case 0:
                                                return '#0061be';
                                                break;
                                            case 1:
                                                return '#00ed03';
                                                break;
                                            case 2:
                                                return '#0061be';
                                                break;
                                            case 3:
                                                return '#00ed03';
                                                break;
                                            case 4:
                                                return '#00ed03';
                                                break;

                                        }
                                    }()
                                }
                            }, [function () {
                                if (params.row.state == 0) {
                                    return '已取消';
                                } else {
                                    switch (params.row.result) {
                                        case 0:
                                            return '未发货';
                                            break;
                                        case 1:
                                            return '已发货';
                                            break;
                                        case 2:
                                            return '未托管';
                                            break;
                                        case 3:
                                            return '已托管';
                                            break;
                                        case 3:
                                            return '--';
                                            break;

                                    }
                                }
                            }()])
                        },
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
                                        disabled: params.row.saleState == 0 ? (params.row.result == 0 && params.row.state == 3 ? false : true) :
                                            params.row.result == 2 && params.row.state == 3 ? false : true

                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: function () {
                                            if (params.row.saleState == 0) {
                                                // 												_this.modal1 = true
                                                // 												_this.id = params.row.id
                                                // 												_this.saleNum2 = params.row.saleNum
                                                _this.modal3 = true,
                                                    _this.productId = params.row.productId
                                                _this.id = params.row.id
                                                _this.saleNum3 = params.row.saleNum
                                                // _this.getlist3(1)
                                            } else {
                                                _this.modal2 = true,
                                                    _this.productId = params.row.productId
                                                _this.id = params.row.id
                                                _this.saleNum2 = params.row.saleNum
                                                // _this.getlist2(1)

                                            }
                                        }
                                    }
                                }, params.row.saleState == 0 ? '发货' : '托管'),

                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small',
                                        disabled: (params.row.result === 1 || params.row.result === 3) ? false : true,

                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: function () {
                                            _this.modal4 = true
                                            _this.getprint(params.row.id)
                                        }
                                    },nativeOn:{
                                        mouseleave($event) {
                                            _this.Global.stopself($event)
                                        }
                                    }
                                }, '打印'),

                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                        disabled: (params.row.result === 1 || params.row.result === 3) ? true : false,

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

                                                    function c(res, that) {
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
                oprah: {},
                searchType: 'search_LIKE_productEntity.name',
                searchValue: '',
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
            selectionchange2(e) {
                this.selects2 = []
                this.selects2 = e
                if (e.length == 0) {
                    delete this.selectedArr2[this.current2]
                } else {
                    this.selectedArr2[this.current2] = e
                }

            },
            selectionchange3(e) {
                this.selects3 = []
                this.selects3 = e
                if (e.length == 0) {
                    delete this.selectedArr3[this.current3]
                } else {
                    this.selectedArr3[this.current3] = e
                }

            },
            dogetlist2(e) {
                this.selectedArr2= {}
                this.selectedArr3= {}
                this.current2 = 0,
                    this.databody2 = []
                this.handleReachBottom2(1)
            },
            dogetlist3(e) {
                this.selectedArr2= {}
                this.selectedArr3= {}
                this.current3 = 0,
                    this.databody3 = []
                this.handleReachBottom3(1)
            },


            print() {
                this.$print(this.$refs.print)
            },
            chunk(array, size) {
                let [start, end, result] = [null, null, []];
                for (let i = 0; i < Math.ceil(array.length / size); i++) {
                    start = i * size;
                    end = start + size;
                    result.push(array.slice(start, end));
                }
                return result;
            },

            ////////////打印
            selectall2(e) {

                if (e.length == 0) {
                    for (var key in this.databody2) {

                        this.databody2[key]._checked = false

                    }
                    // console.log('取消')
                    this.select02(e)
                } else {
                    for (var key in this.databody2) {

                        this.databody2[key]._checked = true

                    }
                    this.select02(e)
                    // console.log('全选')
                }


            },
            selectall3(e) {

                if (e.length == 0) {
                    for (var key in this.databody3) {

                        this.databody3[key]._checked = false

                    }
                    // console.log('取消')
                    this.select02(e)
                } else {
                    for (var key in this.databody3) {

                        this.databody3[key]._checked = true

                    }
                    this.select02(e)
                    // console.log('全选')
                }


            },
            select2(a, b) {

                this.databody2[b.select]._checked = (!this.databody2[b.select]._checked)
                this.select02(a)
            },
            select3(a, b) {

                this.databody3[b.select]._checked = (!this.databody3[b.select]._checked)
                this.select02(a)
            },


            openHsearch() {
                this.selectedArr2= {},
                    this.selectedArr3= {},
                this.formItem.search_EQ_productId = ''
                this.formItem.search_LIKE_addressContacter = ''
                this.formItem.search_EQ_saleState = ''
                this.formItem.search_EQ_state = ''
                this.formItem.search_EQ_result = ''
                this.Global.fun(this, 'get', {
                    base: '/mproduct/all?',
                    other: '',
                    access_token: this.api.access_token
                }, {}, function (res, that) {
                    if (res.data.status == 1) {
                        that.Hsearchopt = res.data.data
                    } else {
                        that.$Message.destroy();
                        that.$Message.error('信息获取失败');
                    }
                })
                this.Hsearch = true
            },
            HsearchC() {
                this.selectedArr2= {},
                    this.selectedArr3= {},
                this.Hsearch = false

            },
            HsearchS() {
                this.selectedArr2= {},
                    this.selectedArr3= {},
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
            putoutS() {
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
                var that = this
                this.loading = true
                this.searchValue = this.search[this.searchType] ? this.search[this.searchType] : ''

                this.Global.fun(this, 'get', {
                    base: this.api.base,
                    other: '/export?',
                    access_token: this.api.access_token
                }, function () {
                    delete that.search.page
                    delete that.search.size
                    return that.search
                }(), c)

                function c(res, that) {
                    console.log(res)

                    const url = res.data.data
                    window.open(url);

                }
            },


            select02(e) {

                this.value2 = ''
                this.selectNum2 = e.length
                console.log(e)
                for (var i = 0; i < this.selectNum2; i++) {

                    this.value2 = this.value2 + e[i].mac + ','
                }
                this.value2 = this.value2.substring(0, this.value2.length - 1)

            },
            tuoguanMeth() {
                const el = []
                var arr=this.selectedArr2
                for(var j in arr) {
                    console.log(arr[j]);
                    var m=arr[j]
                    for (var i = 0; i < m.length; i++) {
                        el.push(m[i].mac);
                    }
                }

                const sl = el.join(',')
                if (el.length == this.saleNum2) {
                    this.Global.fun(this, 'post', {
                        base: '/morder/sendTgDev?',
                        other: '',
                        access_token: this.api.access_token
                    }, {
                        macs: sl,
                        id: this.id,
                        zoneId: this.zoneId
                    }, c)

                    function c(res, that) {
                        if (res.data.status === 1) {
                            that.$Message.destroy();
                            that.$Message.success(res.data.msg);
                            that.loading2 = false;
                            that.cancel2;
                            that.modal2 = false,
                                that.current = 1
                            that.refresh()

                        } else {
                            that.$Message.destroy();
                            that.$Message.error(res.data.msg);
                            that.loading2 = false;
                            that.cancel2;
                            that.modal2 = false,
                                that.current = 1
                            that.refresh()
                            that.value2 = '';
                        }
                        this.selectedArr2= {}
                        this.selectedArr3= {}
                    }
                } else {
                    this.$Message.destroy();
                    this.$Message.error('选择数量和托管数量不符');

                }
            },


            // select3 (e) {
            //
            //
            //     this.value3 = ''
            //     this.selectNum3 = e.length
            //     console.log(e)
            //     for (var i = 0; i < this.selectNum3; i++) {
            //
            //         this.value3 = this.value3 + e[i].mac + ','
            //     }
            //     this.value3 = this.value3.substring(0, this.value3.length - 1)
            // },
            fhMeth() {
                const el = []
                var arr=this.selectedArr3
                for(var j in arr) {
                    console.log(arr[j]);
                    var m=arr[j]
                    for (var i = 0; i < m.length; i++) {
                        el.push(m[i].mac);
                    }
                }

                debugger
                const sl = el.join(',')
                if (el.length == this.saleNum3) {
                    this.Global.fun(this, 'post', {
                        base: '/morder/sendDev?',
                        other: '',
                        access_token: this.api.access_token
                    }, {
                        macs: sl,
                        id: this.id
                    }, c)

                    function c(res, that) {
                        if (res.data.status === 1) {
                            that.$Message.destroy();
                            that.$Message.success(res.data.msg);
                            that.loading3 = false;
                            that.cancel3;
                            that.modal3 = false,
                                that.current = 1
                            that.refresh()
                            this.selectedArr2= {}
                            this.selectedArr3= {}
                        } else {
                            that.$Message.destroy();
                            that.$Message.error(res.data.msg);
                            that.loading3 = false;
                            that.cancel3;
                            that.modal3 = false,
                                that.current = 1
                            that.refresh();
                            that.value2 = '';
                            this.selectedArr2= {}
                            this.selectedArr3= {}
                        }
                    }
                } else {
                    this.$Message.destroy();
                    this.$Message.error('选择数量和发货数量不符');

                }
            },


            fahuoMeth: function () {
                if (this.value1 != '') {
                    this.value1 = this.value1.replace(/，/g, ',')
                    if (this.value1.substr(-1) == ',') {
                        this.value1.length
                        this.value1 = this.value1.substr(0, this.value1.length - 1)
                    }


                    if (this.value1.split(',').length == this.saleNum2) {
                        this.Global.fun(this, 'post', {
                            base: '/morder/sendDev?',
                            other: '',
                            access_token: this.api.access_token
                        }, {
                            macs: this.value1,
                            id: this.id
                        }, c)

                        function c(res, that) {
                            if (res.data.status === 1) {
                                that.$Message.destroy();
                                that.$Message.success(res.data.msg);
                                that.loading1 = false;
                                that.cancel1;
                                that.modal1 = false,
                                    that.current = 1
                                that.refresh()

                            } else {
                                that.$Message.destroy();
                                that.$Message.error(res.data.msg);

                                that.loading1 = false;
                                that.cancel1;
                                that.modal1 = false,
                                    that.current = 1
                                that.value1 = ''
                                that.refresh()
                            }
                        }
                    } else {
                        this.$Message.destroy();
                        this.$Message.error('发货数量和购买数量不符');
                    }


                } else {
                    this.$Message.destroy();
                    this.$Message.error('输入为空');
                }
            },


            cancel1: function () {
                this.value1 = ''

            },
            cancel2: function () {
                debugger
                this.totalpage2 = 0,
                    this.current2 = 0,
                    this.databody2 = []
                this.loading3 = false;
                this.loading2 = false;
                this.loading = false;
                this.zoneId = ''

            },

            handleReachBottom2(e) {

                if (this.zoneId) {
                    this.loading = true

                    // this.searchValue = this.search === '' ? '' : this.search
                    this.current2 = e;
                    this.Global.fun(this, 'get', {
                        base: this.api.base,
                        other: '/unUsedTgDevs?',
                        access_token: this.api.access_token
                    }, {
                        page: this.current2 - 1,
                        size: this.pagesize,
                        productId: this.productId,
                        zoneId: this.zoneId
                    }, c)

                    function c(res, that) {

                        if (res.data.status === 1) {
                            for (var key in res.data.data) {
                                if (res.data.data[key] === null) {
                                    res.data.data[key] = ''
                                }
                            }

                            that.totalpage2 = res.data.data.totalElements;
                            if (res.data.data.content.length == 0) {
                                that.current2 = res.data.data.number + 1;
                            } else {
                                that.current2 = res.data.data.number + 1;


                                // for (var key in res.data.data.content) {
                                //     res.data.data.content[key]._checked = false
                                //     res.data.data.content[key].select = parseInt(key) + (10 * (that.current2 - 1))
                                // }
                                that.databody2 = res.data.data.content;
                                that.superSetSelected(that.selectedArr2,res.data.data.number + 1,res.data.data.content)
                            }
                            that.loading2 = false;


                        } else {
                            that.$Message.destroy();
                            that.$Message.error(res.data.msg);

                        }
                        this.loading = false
                    }
                }
            },


            getlist2: function (e, id) {
                debugger
                this.loading2 = true
                this.current2 = e
                this.Global.fun(this, 'get', {
                    base: this.api.base,
                    other: '/unUsedZwDevs?',
                    access_token: this.api.access_token
                }, {
                    page: this.current2 - 1,
                    size: this.pagesize,
                    productId: this.productId,
                    zoneId: id
                }, a)

                function a(res, that) {

                    if (res.data.status === 1) {
                        for (var key in res.data.data) {
                            if (res.data.data[key] === null) {
                                res.data.data[key] = ''
                            }
                        }
                        that.totalpage2 = res.data.data.totalElements;
                        that.current2 = res.data.data.number + 1;

                        if (res.data.data.content.length == 0) {

                        } else {

                            for (var key in res.data.data.content) {
                                res.data.data.content[key]._checked = false
                                res.data.data.content[key].select = key
                            }
                            that.databody2 = res.data.data.content;
                        }

                        that.loading2 = false;
                    } else {
                        that.$Message.destroy();
                        that.$Message.error(res.data.msg);
                        that.loading2 = false;
                    }
                }

            },


            cancel3: function () {
                debugger

                this.totalpage3 = 0,
                    this.current3 = 0,
                    this.databody3 = []
                this.loading3 = false;
                this.loading2 = false;
                this.loading = false;
                this.zoneId = ''
                this.selectedArr2= {}
                    this.selectedArr3= {}

            },

            handleReachBottom3(e) {
                if (this.zoneId) {




                    // this.searchValue = this.search === '' ? '' : this.search
                    this.current3 =e;
                    this.Global.fun(this, 'get', {
                        base: this.api.base,
                        other: '/unUsedZwDevs?',
                        access_token: this.api.access_token
                    }, {
                        page: this.current3 - 1,
                        size: this.pagesize,
                        productId: this.productId,
                        zoneId: this.zoneId
                    }, c)

                    function c(res, that) {

                        if (res.data.status === 1) {
                            for (var key in res.data.data) {
                                if (res.data.data[key] === null) {
                                    res.data.data[key] = ''
                                }
                            }

                            that.totalpage3 = res.data.data.totalElements;
                            if (res.data.data.content.length == 0) {
                                that.current3 = res.data.data.number + 1;
                            } else {
                                that.current3 = res.data.data.number + 1;


                                // for (var key in res.data.data.content) {
                                //     res.data.data.content[key]._checked = false
                                //     res.data.data.content[key].select = parseInt(key) + (10 * (that.current2 - 1))
                                // }
                                that.databody3 = res.data.data.content;
                                that.superSetSelected(that.selectedArr3,res.data.data.number + 1,res.data.data.content)
                            }
                            that.loading3 = false;


                        } else {
                            that.$Message.destroy();
                            that.$Message.error(res.data.msg);

                        }
                        this.loading = false
                    }
                }
            },
            getlist3: function (e) {

                this.loading3 = true
                this.current3 = e
                this.Global.fun(this, 'get', {
                    base: this.api.base,
                    other: '/unUsedZwDevs?',
                    access_token: this.api.access_token
                }, {
                    page: this.current3 - 1,
                    size: this.pagesize,
                    productId: this.productId
                }, a)

                function a(res, that) {

                    if (res.data.status === 1) {
                        for (var key in res.data.data) {
                            if (res.data.data[key] === null) {
                                res.data.data[key] = ''
                            }
                        }
                        that.totalpage3 = res.data.data.totalElements;
                        // TODO // that.current3 = res.data.data.number + 1;


                        that.current3 = res.data.data.number + 1;

                        if (res.data.data.content.length == 0) {

                        } else {
                            for (var key in res.data.data.content) {
                                res.data.data.content[key]._checked = false
                                res.data.data.content[key].select = key
                            }
                            that.databody3 = res.data.data.content;
                        }
                        that.loading3 = false;
                    } else {
                        that.$Message.destroy();
                        that.$Message.error(res.data.msg);
                        that.loading3 = false;
                    }
                }

            },


            getprint: function (e) {
                this.Global.fun(this, 'get', {
                    base: this.api.base,
                    other: '/print?',
                    access_token: this.api.access_token
                }, {
                    id: e
                }, a)

                function a(res, that) {
                    if (res.data.status === 1) {
                        //
                        that.name = res.data.data.name;
                        that.phone = res.data.data.phone;
                        that.username = res.data.data.username;
                        that.address = res.data.data.address;
                        that.mac = res.data.data.maclist


                        that.maclist = that.chunk(that.mac, 4)

                        that.loading3 = false;
                    } else {
                        that.$Message.destroy();
                        that.$Message.error(res.data.msg);
                        // that.loading3 = false;
                    }
                }

            },


            refresh: function () {
                this.loading = true
                this.searchValue = 'search_LIKE_productEntity.name'
                this.search = {}
                this.onchanges(this.current)

                this.selectedArr2= {}
                this.selectedArr3= {}
            },
            edit: function (params) {
                this.Global.value = '';
                this.Global.type = '';
                this.$router.push({
                    name: 'mproduct_form',
                    query: {
                        id: params.row.id,

                    }
                })

            },
            added: function () {
                this.Global.value = '';
                this.Global.type = '';
                this.$router.push({
                    name: 'mproduct_form',
                    query: {
                        id: -1,

                    }
                })

            },
            onchanges: function (e) {
                var that = this
                this.loading = true

                this.searchValue = this.search[this.searchType] ? this.search[this.searchType] : ''
                this.current = e;
                this.Global.fun(this, 'get', {
                    base: '/morder/page?',
                    other: '',                   
                    access_token: this.api.access_token
                }, function () {
                    that.search.page = e - 1
                    that.search.size = 10
                    return that.search
                }(), c)

                function c(res, that) {
                    if (res.data.status === 1) {
                        for (var key in res.data.data) {
                            if (res.data.data[key] === null) {
                                res.data.data[key] = ''
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
                this.selectedArr2= {}
                this.selectedArr3= {}
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
            }, getoptions() {
                this.Global.fun(this, 'get', {
                        base: '/mzone',
                        other: '/all?',
                        access_token: this.api.access_token,
                    }, {},
                    function (res, that) {
                        if (res.data.status == 1) {
                            that.$Message.destroy();
                            that.zoneOptions = res.data.data
                        } else {
                            that.$Message.destroy();
                            that.$Message.error(res.data.msg);
                        }

                    })
            }
        },
        created: function () {
            this.getoptions()
            this.searchType = 'search_LIKE_productEntity.name',
                this.onchanges(1)
            // this.maclist = this.chunk(this.mac, 4)
            ///////打印
        },
    }
</script>

<style scoped>
    .printtable th,
    .printtable td {
        padding: 5px 8px;
    }

    .printtable {
        margin: auto
    }
</style>
