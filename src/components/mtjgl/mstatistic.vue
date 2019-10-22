<template>
    <EVpageList :pageTitle="pageTitle">
        <div slot="Hsearch" class="Hserach" style="margin-left: -10px;">
            <Button icon="ios-search" type="primary" @click="openHsearch" style="display: inline-block">统计</Button>
            <Modal v-model="Hsearch" width="500" @on-cancel="HsearchC">
                <p slot="header">
                    <span>统计条件</span>
                </p>
                <div>
                    <Form :model="formItem" :label-width="80" style="overflow: hidden;height: 120px;padding: 0">
                        <Col span="23">
                            <FormItem label="请选择时间">
                                <Col span="8">
                                    <Select v-model="formItem.year" placeholder="请选择时间">
                                        <Option value="2018">2018</Option>
                                        <Option value="2019">2019</Option>
                                        <Option value="2020">2020</Option>
                                        <Option value="2021">2021</Option>
                                        <Option value="2022">2022</Option>
                                        <Option value="2023">2023</Option>

                                    </Select>
                                </Col>
                                <Col span="1">
                                    <hr style="border: 1px solid rgb(221, 222, 225);width: 58%;margin: 22%;display: inline-block;height: 0px;">
                                </Col>
                                <Col span="7">
                                    <Select :disabled="!formItem.year" v-model="formItem.month" placeholder="选择月">
                                        <Option value="1">1</Option>
                                        <Option value="2">2</Option>
                                        <Option value="3">3</Option>
                                        <Option value="4">4</Option>
                                        <Option value="5">5</Option>
                                        <Option value="6">6</Option>
                                        <Option value="7">7</Option>
                                        <Option value="8">8</Option>
                                        <Option value="9">9</Option>
                                        <Option value="10">10</Option>
                                        <Option value="11">11</Option>
                                        <Option value="12">12</Option>
                                    </Select>
                                </Col>
                                <Col span="1">
                                    <hr style="border: 1px solid rgb(221, 222, 225);width: 58%;margin: 22%;display: inline-block;height: 0px;">
                                </Col>
                                <Col span="7">

                                    <Select :disabled="!formItem.month" v-model="formItem.day" placeholder="选择日">
                                        <Option value="1">1</Option>
                                        <Option value="2">2</Option>
                                        <Option value="3">3</Option>
                                        <Option value="4">4</Option>
                                        <Option value="5">5</Option>
                                        <Option value="6">6</Option>
                                        <Option value="7">7</Option>
                                        <Option value="8">8</Option>
                                        <Option value="9">9</Option>
                                        <Option value="10">10</Option>
                                        <Option value="11">11</Option>
                                        <Option value="12">12</Option>
                                        <Option value="13">13</Option>
                                        <Option value="14">14</Option>
                                        <Option value="15">15</Option>
                                        <Option value="16">16</Option>
                                        <Option value="17">17</Option>
                                        <Option value="18">18</Option>
                                        <Option value="19">19</Option>
                                        <Option value="20">20</Option>
                                        <Option value="21">21</Option>
                                        <Option value="22">22</Option>
                                        <Option value="23">23</Option>
                                        <Option value="24">24</Option>
                                        <Option value="25">25</Option>
                                        <Option value="26">26</Option>
                                        <Option value="27">27</Option>
                                        <Option value="28">28</Option>
                                        <Option :disabled="this.formItem.month==2&&this.formItem.year!=2020"
                                                value="29">
                                            29
                                        </Option>
                                        <Option :disabled="this.formItem.month==2" value="30">30</Option>
                                        <Option
                                            :disabled="this.formItem.month==2||this.formItem.month==4||this.formItem.month==6||this.formItem.month==9||this.formItem.month==11"
                                            value="31">31
                                        </Option>

                                    </Select>
                                </Col>
                            </FormItem>

                        </Col>
                    </Form>
                </div>
                <div slot="footer">
                    <i-button type="ghost" size="large" @click="HsearchC">取消统计</i-button>
                    <i-button type="primary" size="large" @click="HsearchS">确认统计</i-button>
                </div>
            </Modal>
        </div>

        <div slot="btnBox" class="btn">
            <!--<Button @click="added" type="success">新增</Button>-->
            <Button @click="refresh" type="info">刷新</Button>
        </div>
        <div slot="table">
            <Table border :columns="datahead" :data="databody" size='small' :loading="loading">
            </Table>
        </div>


        <div slot="moreBtn">
            <!--拓展按钮1-->
        </div>
    </EVpageList>
</template>

<script>


    export default {
        name: "morder",

        data () {
            var _this = this;
            return {

                search: {
                    year: '2019'
                },
                Hsearch: false,
                Hsearchopt: [],
                formItem: {
                    month: '',
                    year: '2019',
                    day: '',

                },


                api: {
                    base: '/mstatiistic',//请求部分
                    access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),
                },
                pageTitle: '产品统计',//页面标题
                totalpage: 0,
                pagesize: this.Global.pagesize,
                current: 1,

                datahead: [


                    {
                        align: 'left',
                        title: '产品名称',
                        key: 'name',

                    },
                    {
                        align: 'left',
                        title: '激活量',
                        key: 'jhl'
                    }, {
                        align: 'left',
                        title: '入库量',
                        key: 'rkl'
                    }, {
                        align: 'left',
                        title: '销售量',
                        key: 'xsl'
                    },


                ],
                databody: [],
                loading: true,

                oprah: {},

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
                this.formItem.month = ''
                this.formItem.year = '2019'
                this.formItem.day = ''

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
                        else {
                            this.search[k]=Number(this.search[k])
                        }
                    }
                }
                this.search = this.search
                this.onchanges(1)
                this.HsearchC()
            },


            refresh: function () {
                this.loading = true

                this.search = {
                    year: '2019'
                }

                this.onchanges(1)
            },

            onchanges: function (e) {
                var that = this
                this.loading = true
                this.searchValue = this.search[this.searchType] ? this.search[this.searchType] : ''
                this.current = e;
				
                this.Global.fun(this, 'get', {
                    base: this.api.base,
                    other: '/mcptj?',
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
                                res.data.data[key] = ''
                            }
                        }
                        that.databody = res.data.data;
                        that.loading = false;
                    }
                    else {
                        that.$Message.destroy();
                        that.$Message.error(res.data.msg);
                        that.loading = false;
                    }
                }
            },
            oprahfun: function (e) {
                this.Global.oprahfun(this)
            }
            ,
            dosearch: function () {

            }
        },
        created: function () {
            this.search = {
                year: '2019'
            }
            //this.refresh()
			 this.loading = false;
        },
    }
</script>

<style scoped>

</style>
