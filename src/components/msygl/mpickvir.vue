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
                <Modal v-model="Hsearch" width="600" @on-cancel="HsearchC">
                    <p slot="header">
                        <span>高级查询</span>
                    </p>
                    <div>
                        <Form :model="formItem" :label-width="80" style="overflow: hidden">
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
                            <FormItem label="审核状态">
                                <RadioGroup v-model="formItem.search_EQ_auditState" type="button" size="large">
                                    <Radio label="0">未审核</Radio>
                                    <Radio label="1">审核通过</Radio>
                                    <Radio label="2">审核驳回</Radio>
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
                <Button @click="downpost" @mouseleave.native="Global.stopself($event)">账单下载</Button>
            </div>
            <div slot="table">
                <Table border :columns="datahead" :data="databody" size='small' :loading="loading" @on-selection-change="selectchange">
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

        <Modal v-model="modal1" :title="datadoAudit.userName==undefined?'':datadoAudit.userName+'审核 '" :mask-closable="false"
            :loading="true" @on-visible-change="modelVisibleChange">
            <div slot="footer">
                <Button type="text" size="large" @click="cancel">取消</Button>
                <Button type="primary" size="large" @click="auditRefuse">审核驳回</Button>
                <Button type="success" size="large" @click="auditPass">审核通过</Button>
            </div>
            <div class="tbzz" v-if="modal1">
                <p><b>币种: </b>{{datadoAudit.virName==undefined?'':datadoAudit.virName}} </p>
                <p><b>转入账户: </b>{{datadoAudit.userPhone==undefined?'':datadoAudit.userPhone}} </p>
                <p><b>转入钱包地址: </b>{{datadoAudit.virAddress==undefined?'':datadoAudit.virAddress}} </p>
                <p><b>转账金额: </b>{{datadoAudit.pickMoney==undefined?'':datadoAudit.pickMoney}} </p>
            </div>
        </Modal>




        <Modal v-model="modal2" :title="datadoTransfer.userName==undefined?'':datadoTransfer.userName+'转账 '"
            :mask-closable="false" :loading="true" @on-visible-change="modelVisibleChange">
            <div slot="footer">
                <Button type="text" size="large" @click="cancelTrans">取消</Button>
                <Button type="success" size="large" @click="transPass">确定</Button>
            </div>
            <div class="tbzz" v-if="modal2">
                <!-- <p><b>转出账户: </b>{{datadoTransfer.zoneName==undefined?'':datadoTransfer.zoneName+'-'+datadoTransfer.virName}}
                </p> -->
                <p><b>币种: </b>{{datadoTransfer.virName==undefined?'':datadoTransfer.virName}} </p>
                <p><b>转入账户: </b>{{datadoTransfer.userPhone==undefined?'':datadoTransfer.userPhone}} </p>
                <p><b>转入钱包地址: </b>{{datadoTransfer.virAddress==undefined?'':datadoTransfer.virAddress}} </p>
                <p>

                        <b>转账金额: </b>{{datadoTransfer.pickMoney==undefined?'':datadoTransfer.pickMoney}}

                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span style="font-weight:bold">提币费率：</span> {{datadoTransfer.fee==undefined?'':datadoTransfer.fee+'%'}}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span style="font-weight:bold">服务费：</span> {{datadoTransfer.feeMoney==undefined?'':datadoTransfer.feeMoney}}
                </p>

                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                    <Col span="23">
                    <FormItem label="转出账户" prop="outWalletId">
                        <Select v-model="formValidate.outWalletId" :label-in-value="true">
                            <Option :value="outWalletOption.id" :label="outWalletOption.realMoneyUrl" v-for="outWalletOption in outWalletOptions"
                                :key="outWalletOption.index"></Option>
                        </Select>

                    </FormItem>
                    </Col>

                    <Col span="23">
                    <FormItem label="密码:" prop="password">
                        <Input :type="showtype ? 'text' : 'password'" placeholder="请输入密码" v-model="formValidate.password">
                        </Input>
                        <Icon class="tbzz_pwixon" :type="showtype ? 'eye' : 'eye-disabled'" @click="handleShowPassword"></Icon>
                    </FormItem>
                    </Col>
                </Form>

            </div>
        </Modal>


    </div>
</template>

<script>
    import Util from "../../common/util"
    export default {
        name: "mplayrule",

        data() {
            var _this = this;
            return {
                ruleValidate: {
                    outWalletId: [{
                        type: 'number',
                        required: true,
                        message: "请选择转出账户",
                        trigger: "change"
                    }],
                    password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }]
                },
                showtype: false,
                formValidate: {
                    outWalletId: '',
                    password: ''
                },
                selectedArr: {},
                search: {},
                Hsearch: false,
                formItem: {
                    search_LIKE_userName: '',
                    search_EQ_auditState: '',
                    search_EQ_id: ''
                },


                api: {
                    base: '/mpickvir', //请求部分
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
                outWalletOptions: [],
                options: [ //下拉选项
                    {
                        label: '用户名称',
                        value: 'search_LIKE_userName',
                    },
                ],
                datahead: [{
                        type: 'selection',
                        width: 50,
                    }, {
                        align: 'left',
                        title: 'id',
                        key: 'id',
                        width: 120
                    }, {
                        align: 'left',
                        title: '用户名称',
                        key: 'userName',
                        width: 100
                    }, {
                        align: 'left',
                        title: '币种',
                        key: 'virName',
                        width: 60
                    }, {
                        align: 'left',
                        title: '真实钱包',
                        key: 'virAddress',
                    }, {
                        align: 'left',
                        title: '提币费率',
                        render: function(h, params) {
                            return h('span', params.row.fee+'%')
                        },
                        width: 80
                    },
                    {
                        align: 'left',
                        title: '提币数量',
                        key: 'pickMoney',
                        width: 80
                    },
                    {
                        align: 'left',
                        title: '发起时间',
                        key: 'createTime',
                        render: function(h, params) {
                            return h('span', [_this.Global.getDate(params.row.createTime, 'year')])
                        },
                        width: 140
                    },
                    {
                        align: 'left',
                        title: '剩余时间',
                        key: 'offTime',
                        width: 90
                    },
                    {
                        align: 'left',
                        title: '审核状态',
                        key: 'auditState',
                        width: 80,
                        render: function(h, params) {
                            return h('span', {
                                style: {
                                    color: function() {
                                        switch (params.row.auditState) {
                                            case 0:
                                                return '#19be6b';
                                                break;
                                            case 1:
                                                return '#ed3f14';
                                                break;
                                            case 2:
                                                return '#b3be02';
                                                break;

                                        }
                                    }()
                                }
                            }, [function() {
                                switch (params.row.auditState) {
                                    case 0:
                                        return '未审核';
                                        break;
                                    case 1:
                                        return '审核通过';
                                        break;
                                    case 2:
                                        return '审核驳回';
                                        break;
                                }
                            }()])
                        },
                    },

                    {
                        align: 'left',
                        title: '转账状态',
                        key: 'auditState',
                        width: 80,
                        render: function(h, params) {
                            return h('span', {
                                style: {
                                    color: function() {
                                        switch (params.row.transState) {
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
                                switch (params.row.transState) {
                                    case 0:
                                        return '未转账';
                                        break;
                                    case 1:
                                        return '已转账';
                                        break;
                                }
                            }()])
                        },
                    },
                    // {
                    //     align: 'left',
                    //     title: '交易单号',
                    //     key: 'txid',
                    //     width: 140
                    // },

                    {
                        title: '管理',
                        key: 'action',
                        width: 110,
                        align: 'center',
                        render: function(h, params) {
                            return h('div', [
                                // h('Button', {
                                //     props: {
                                //         type: 'primary',
                                //         size: 'small',
                                //     },
                                //     style: {
                                //         marginRight: '5px'
                                //     },
                                //     on: {
                                //         click: function() {
                                //             _this.downExcel(params)
                                //         }
                                //     }
                                // }, '下载'),
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small',
                                        disabled: params.row.auditState == 0 ? false : true
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: function() {
                                            _this.doAudit(params)
                                        }
                                    }
                                }, '审核'),
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small',
                                        disabled: params.row.auditState == 1 ? (params.row.transState ==
                                            0 ? false : true) : true
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: function() {
                                            _this.doTrans(params)
                                        }
                                    }
                                }, '转账')
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
                selects: [],
                modal1: false,
                modal2: false,
                datadoAudit: {},
                datadoTransfer: {},
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

                if (selectall[page] == undefined) {
                    return
                } else {
                    var lidt = selectall[page]
                    var l = selectall[page].length

                    var d = data.length
                    for (var i = 0; i < l; i++) {
                        for (var j = 0; j < d; j++) {
                            if (selectall[page][i].id == data[j].id) {
                                data[j]._checked = true
                            }
                        }
                    }

                }

            },

            getoptions() {
                this.Global.fun(this, 'get', {
                        base: '/moutwallet',
                        other: '/all?',
                        access_token: this.api.access_token,
                    }, {},
                    function(res, that) {
                        if (res.data.status == 1) {
                            that.$Message.destroy();
                            that.outWalletOptions = res.data.data

                        } else {
                            that.$Message.destroy();
                            that.$Message.error(res.data.msg);
                        }

                    })
            },
            //这部分是新的
            auditRefuse(e) {
                this.Global.newfun(this, 'post', {
                    base: 'mpickvir/audit?',
                    other: '',
                    access_token: this.api.access_token
                }, {
                    id: this.datadoAudit.id,
                    auditState: '2'
                }, c)

                function c(res, that) {
                    if (res.data.status == 1) {
                        debugger
                        that.$Message.success(res.data.msg);
                        that.refresh()
                        that.modal1 = false
                    } else {
                        that.$Message.destroy();
                        that.$Message.error(res.data.msg);
                        that.modal1 = false
                    }
                }
            },

            auditPass(e) {
                this.Global.newfun(this, 'post', {
                    base: 'mpickvir/audit?',
                    other: '',
                    access_token: this.api.access_token
                }, {
                    id: this.datadoAudit.id,
                    auditState: '1'
                }, c)

                function c(res, that) {
                    if (res.data.status == 1) {
                        debugger
                        that.$Message.success(res.data.msg);
                        that.refresh()
                        that.modal1 = false
                    } else {
                        // that.$Message.destroy();
                        that.$Message.error(res.data.msg);
                        that.modal1 = false
                    }
                }
            },


            cancel() {
                this.modal1 = false
                this.datadoAudit = {}
            },


            cancelTrans() {
                this.modal2 = false
                this.datadoTransfer = {}
                this.formValidate.outWalletId = ''
                this.formValidate.password = ''
            },

            transPass(e) {
                this.$refs['formValidate'].validate((valid) => {
                    if (valid) {
                        this.Global.newfun(this, 'post', {
                            base: 'mpickvir/trans?',
                            other: '',
                            access_token: this.api.access_token
                        }, {
                            id: this.datadoTransfer.id,
                            outWalletId: this.formValidate.outWalletId,
                            pwd: Util.code64(this.formValidate.password)
                        }, c)

                        function c(res, that) {
                            if (res.data.status == 1) {
                                that.$Message.destroy();
                                // that.$Message.success(res.data.msg);
                                that.refresh();
                                that.modal2 = false
                                that.$Modal.confirm({
                                    title: '转账成功',
                                    closable: true,
                                    content: '<div class="tbsh">' +
                                        '<p><b>交易单号: </b>' + res.data.data.txid + '</p>' +
                                        '<p><b>交易块高度: </b>' + res.data.data.height + '</p>' +
                                        '<p><b>交易数量: </b>' + res.data.data.pickMoney + '</p>' +
                                        '<p><b>交易时间: </b>' + res.data.data.transTime + '</p>' +
                                        '</div>',
                                    onOk: () => {
                                        that.$Modal.remove();
                                    },
                                    onCancel: () => {
                                        that.$Modal.remove();
                                    }
                                });
                            } else {
                                // that.$Message.destroy();
                                that.$Message.error(res.data.msg);
                                that.modal2 = false
                            }
                        }
                    } else {
                        this.modal2 = true
                    }
                })
            },

            handleShowPassword() {
                this.showtype = !this.showtype
            },
            downpost() {
                const el = []
                var arr = this.selectedArr
                for (var j in arr) {
                    console.log(arr[j]);
                    var m = arr[j]
                    for (var i = 0; i < m.length; i++) {
                        el.push(m[i].id);
                    }
                }

                const sl = el.join(',')
                this.Global.fun(this, 'post', {
                    base: '/mpickvir/mulexport',
                    other: '/?',
                    access_token: this.api.access_token
                }, {
                    ids: sl
                }, c)

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


            selectchange(e) {

                // this.selects = []
                // for (let k in e) {
                //     this.selects.push(e[k].id)
                // }
                //                if (e.length == 0) {
                //                    delete this.selectedArr[this.current]
                //                } else {
                //                    this.selectedArr[this.current] = e
                //                }


                this.selects = []
                this.selects = e
                if (e.length == 0) {
                    delete this.selectedArr[this.current]
                } else {
                    this.selectedArr[this.current] = e
                }

            },


            openHsearch() {
                this.formItem.search_LIKE_userName = ''
                this.formItem.search_EQ_auditState = ''
                this.formItem.search_EQ_id = ''
                this.Hsearch = true
                this.selectedArr = {}
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
                this.selectedArr = {}
                this.onchanges(this.current)
            },
            downExcel: function(params) {
                this.Global.fun(this, 'get', {
                    base: '/mpickvir/export/',
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

            doAudit: function(params) {
                this.modal1 = true
                this.datadoAudit = params.row
            },


            doTrans: function(params) {
                this.modal2 = true
                this.datadoTransfer = params.row
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
                        that.superSetSelected(that.selectedArr, res.data.data.number + 1, res.data.data.content)
                        that.loading = false;
                    } else {
                        that.$Message.destroy();
                        that.$Message.error(res.data.msg);
                        that.loading = false;
                    }
                }
            },

            modelVisibleChange: function(e) {
                if (e) {
                    this.formValidate.outWalletId = this.outWalletOptions[0].id
                    this.formValidate.password = ''
                }
            },

            oprahfun: function(e) {
                this.Global.oprahfun(this)
            },
            dosearch: function() {
                this.loading = true
                this.selectedArr = {}
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
            this.getoptions();
            this.current = this.$route.query.current ? parseInt(this.$route.query.current) : 1
            this.search = this.$route.query.search ? this.$route.query.search : {}
            this.searchType = 'search_LIKE_userName',
                this.loading = true,
                this.onchanges(1)
            this.defaults.powerShow = this.show
        },
    }
</script>

<style lang="less">
    .tbsh {
        p {
            padding-left: 100px;
            position: relative;
            margin-bottom: 10px;
            word-break: break-all;

            b {
                position: absolute;
                left: 0;
                width: 90px;
                text-align: right;
            }
        }
    }

    .tbzz {
        p {
            padding-left: 100px;
            position: relative;
            margin-bottom: 10px;
            line-height: 32px;
            word-break: break-all;

            b {
                position: absolute;
                left: 0;
                width: 90px;
                text-align: right;
            }
        }

        .tbzz_pwixon {
            line-height: 32px;
            position: absolute;
            right: 10px;
            top: 0px;
            cursor: pointer;
            z-index: 99;
            font-size: 18px;
            color: #999;
        }

        .ivu-form-item-label {
            font-weight: bold;
        }
    }
</style>
