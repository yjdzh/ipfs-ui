<template>
    <div>
        <EVpageList :pageTitle="pageTitle" class="logs">
            <div slot="searchBox" class="serach">
<!--                <Input v-model="searchValue" :class="selsctclass">-->
<!--                    <Select v-model="searchType" slot="prepend" style="width: 80px">-->
<!--                        <Option :value="option.value" :label="option.label"  v-for="option in options"-->
<!--                                :key="option.index"></Option>-->
<!--                    </Select>-->
<!--                    <Button slot="append" icon="ios-search" @click="dosearch"></Button>-->
<!--                </Input>-->
                <Button  type="primary" @click="type1sh" style="display: inline-block">运营日志
                </Button>
                <Button  type="primary" @click="type0sh" style="display: inline-block">app日志
                </Button>
                <Button  type="primary" @click="refresh1sh" style="display: inline-block">全部
                </Button>
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
<!--                            search_LIKE_level: '',-->
<!--                            search_LIKE_operateUse: '',-->
<!--                            search_LIKE_types: ''-->

                            <Col span="23">
                                <FormItem label="级别">


                                    <Select v-model="formItem.search_LIKE_level" >
                                        <Option label="错误" value="错误" ></Option>
                                        <Option label="信息" value="信息" ></Option>
                                    </Select>


                                </FormItem>
                            </Col>
                            <Col span="23">
                                <FormItem label="日志类型">
                                    <Select v-model="formItem.search_EQ_types" >
                                        <Option label="app日志" value="0" ></Option>
                                        <Option label="运营日志" value="1" ></Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="23">
                                <FormItem label="操作用户">
                                    <Input v-model="formItem.search_LIKE_operateUse" placeholder="请输入操作用户"></Input>
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
                <!-- <Button @click="added" type="success">新增</Button> -->
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
        name: "mlog",
        data() {
            var _this = this;

            return {
                search: {},
                Hsearch: false,

                formItem: {
                    search_LIKE_level: '',
                    search_LIKE_operateUse: '',
                    search_LIKE_types: ''
                },


                api: {
                    base: '/mlogs', //请求部分
                    access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),
                },

                pageTitle: 'APP用户', //页面标题
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
                // ruleV: {
                //
                //     hardInfo: [{
                //         required: true,
                //         validator: coderhardInfo,
                //         trigger: 'blur'
                //     }],
                // },
                options: [ //下拉选项
                    {
                        label: '运营日志',
                        value: 'search_EQ_types=1',
                    },
                    {
                        label: 'app日志',
                        value: 'search_EQ_types=0',
                    },
                ],
                datahead: [





                    {
                        align: 'left',
                        title: '模块',
                        key: 'moduleName',
                    },
                    {
                        align: 'left',
                        title: '业务',
                        key: 'methodName',


                    },
                    {
                        align: 'left',
                        title: '级别',
                        key: 'level',


                    },
                    {
                        align: 'left',
                        title: '操作用户',
                        key: 'operateUser',


                    },
                    {
                        align: 'left',
                        title: '日志类型',
                        key: 'types',

                        render: function(h, params) {
                            return h('span', {
                                style: {
                                    color: function() {
                                        switch (params.row.types) {
                                            case 0:
                                                return '#333';
                                                break;
                                            case 1:
                                                return '#333';
                                                break;

                                        }
                                    }()
                                }
                            }, [function() {
                                switch (params.row.types) {
                                    case 0:
                                        return 'App日志';
                                        break;
                                    case 1:
                                        return '运营日志';
                                        break;

                                }
                            }()])
                        },
                    },
                    {
                        align: 'left',
                        title: '操作时间',
                        key: 'createdTime',

                    },
                    {
                        title: '管理',
                        key: 'action',
                        width: 100,
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
                                }, '查看'),


                            ])
                        }
                    }
                ],
                databody: [],
                loading: true,

                oprah: {},
                searchType: 'search_EQ_types=1',
                searchValue: '',
                zoneOptions: [],
                pubUserId: null,
                sbfpO: false,
                tgfwO: false,
                sbfpforms: {
                    zoneId: '',
                    num: null,
                    monthNum: null,

                },
                tgfwforms: {
                    monthNum: null,

                },




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

            edit: function (params) {
                this.Global.value = '';
                this.Global.type = '';
                this.$router.push({
                    name: 'mbzgl-mloginfo',
                    query: {
                        id: params.row.id,

                    }
                })

            },

            closemodal() {
                this.sbfpO = false,
                    this.tgfwO = false,
                    this.sbfpforms.zoneId = '',
                    this.sbfpforms.num = null,
                    this.sbfpforms.monthNum = null,
                    this.tgfwforms.monthNum = null
                this.refresh()
            },


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


            switchfunction(e) {
                this.switch = e

            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.load = true
                        this.Global.submit(this, 'put', {
                                base: this.api.base,
                                other: '/cfg/' + this.id + '?',
                                access_token: this.api.access_token,
                            }, {
                                cfg: (this.formV.hardInfo.replace(/\\/g, "")).replace(/ \s*/g, "")
                            },


                            function(res, that) {
                                if (res.data.status == 1) {
                                    that.$Message.destroy();
                                    that.$Message.success('保存成功');

                                } else {
                                    that.$Message.destroy();
                                    that.$Message.error('保存失败');

                                }
                                that.$refs['formV'].resetFields();
                                that.load = false
                                that.modal = false
                            });
                    } else {
                        this.$Message.error('JSON格式错误');
                    }
                    this.$Modal.remove()
                })

            },
            refresh: function() {
                this.loading = true
                this.search = {}
                this.searchType = 'search_EQ_types=1'
                //                 this.searchValue = ''

                //                 this.current = 1
                this.onchanges(this.current)
            },
            refresh1sh: function() {
                this.loading = true
                this.search = {}
                this.searchType = ''
                //                 this.searchValue = ''

                                this.current = 1
                this.onchanges(this.current)
            },
            type1sh: function() {
                this.loading = true
                this.search = {search_EQ_types:1}
                this.searchType = 'search_EQ_types'
                //                 this.searchValue = ''

                                this.current = 1
                this.onchanges(this.current)
            },
            type0sh: function() {
                this.loading = true
                this.search = {search_EQ_types:0}
                this.searchType = 'search_EQ_types'
                //                 this.searchValue = ''

                                this.current = 1
                this.onchanges(this.current)
            },
            guanliang: function(params) {
                this.Global.value = '';
                this.Global.type = '';
                this.$router.push({
                    name: 'mpuser_list',
                    query: {
                        id: params.row.id,

                    }
                })

            },
            added: function() {
                this.Global.value = '';
                this.Global.type = '';
                this.$router.push({
                    name: 'mproduct_form',
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
                        debugger
                    } else {
                        that.loading = false;
                        that.$Message.destroy();
                        that.$Message.error(res.data.msg);
                        debugger

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
            },
            getoptions() {
                this.Global.fun(this, 'get', {
                        base: '/mzone',
                        other: '/allwithTgNum?',
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
            }
        },
        created: function() {

                this.getoptions()
            this.refresh()
        },
    }
</script>

<style  lang="less">
    .logs .topTool{overflow: unset !important;}

</style>
