<template>
    <div>
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
                            <FormItem label="id">
                                <Input v-model="formItem.search_EQ_id" placeholder="请输入id"></Input>
                            </FormItem>
                            </Col>
                            <Col span="23">
                            <FormItem label="用户名称">
                                <Input v-model="formItem.search_LIKE_userName" placeholder="请输入用户名称"></Input>
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


                            <Col span="23">
                            <FormItem label="转账状态">
                                <RadioGroup v-model="formItem.search_EQ_transferState" type="button" size="large">
                                    <Radio label="0">未转账</Radio>
                                    <Radio label="1">转账完成</Radio>
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
                <Button @click="refresh" type="info">刷新</Button>
                <Button @click="downpost">账单下载</Button>
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

        <Modal v-model="modal1" :title="datadoTransfer.userName==undefined?'':datadoTransfer.userName+'转账'"
            :mask-closable="false" :loading="true">
            <div slot="footer">
                <Button type="text" size="large" @click="cancel">取消</Button>
                <Button type="primary" size="large" @click="ok">确定</Button>
            </div>
            <div class="tbzz" v-if="modal1">

                <p><b>转出账户: </b>{{datadoTransfer.zoneName==undefined?'':datadoTransfer.zoneName+'-'+datadoTransfer.virName}}
                </p>
                <p><b>转出钱包地址: </b>{{datadoTransfer.walletAddress==undefined?'':datadoTransfer.walletAddress}} </p>
                <p><b>转入账户: </b>{{datadoTransfer.userPhone==undefined?'':datadoTransfer.userPhone}} </p>
                <p><b>转入钱包地址: </b>{{datadoTransfer.virAddress==undefined?'':datadoTransfer.virAddress}} </p>
                <p><b>转账金额: </b>{{datadoTransfer.pickMoney==undefined?'':datadoTransfer.pickMoney}} </p>
                <p><b>转账时间: </b>{{datadoTransfer.createTime==undefined?'':this.Global.getDate(datadoTransfer.createTime)}}
                </p>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                    <FormItem label="密码:" prop="password">
                        <Input :type="showtype ? 'text' : 'password'" placeholder="请输入密码" v-model="formValidate.password">
                        </Input>
                        <Icon class="tbzz_pwixon" :type="showtype ? 'eye' : 'eye-disabled'" @click="handleShowPassword"></Icon>

                    </FormItem>
                </Form>



            </div>

        </Modal>


    </div>
</template>

<script>
    export default {
        name: "mplayrule",

        data() {
            var _this = this;

            return {

                ruleValidate: {
                    password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }],
                },

                showtype: false,
                formValidate: {
                    password: ''
                },
                search: {},
                Hsearch: false,
                formItem: {
                    search_LIKE_userName: '',
                    search_EQ_auditState: '',
                    search_EQ_transferState: '',
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
                        width: 110
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
                        width: 100
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
                        key: 'transferState',
                        width: 80,
                        render: function(h, params) {
                            return h('span', {
                                style: {
                                    color: function() {
                                        switch (params.row.transferState) {
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
                                switch (params.row.transferState) {
                                    case 0:
                                        return '未转账';
                                        break;
                                    case 1:
                                        return '转账完成';
                                        break;
                                }
                            }()])
                        },
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
                                }, '下载'),
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
                                            _this.seedoAudit(params)
                                        }
                                    }
                                }, '审核'),
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small',
                                        disabled: params.row.auditState == 1 ? (params.row.transferState ==
                                            1 ? true : false) : true
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: function() {
                                            _this.doTransfer(params)
                                        }
                                    }
                                }, '转账'),
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
                selectlist: [],
                modal1: false,
                datadoTransfer: {}
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
            ok(e) {
                debugger
                this.$refs['formValidate'].validate((valid) => {
                    if (valid) {
                        this.Global.fun(this, 'get', {
                            base: 'mpickvir/transfer/',
                            other: this.datadoTransfer.id + '/' + this.formValidate.password + '/?',
                            access_token: this.api.access_token
                        }, {}, c)

                        function c(res, that) {
                            if (res.data.status == 1) {
                                that.$Message.success(res.data.msg);
                                that.refresh()
                                that.modal1 = false

                            } else {
                                that.$Message.destroy();
                                that.$Message.error(res.data.msg);
                                that.modal1 = false
                            }
                        }
                    } else {
                        debugger
                        this.modal1 = true
                    }
                })


            },
            cancel() {
                this.modal1 = false
                this.datadoTransfer = {}
                this.formValidate.password = ''
            },
            handleShowPassword() {
                this.showtype = !this.showtype
            },

            downpost() {
                this.Global.fun(this, 'post', {
                    base: '/mpickvir/mulexport',
                    other: '/?',
                    access_token: this.api.access_token
                }, {
                    ids: this.selectlist.join(",")
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
                this.selectlist = []
                for (let k in e) {
                    this.selectlist.push(e[k].id)
                }
                console.log(this.selectlist)
            },


            openHsearch() {
                this.formItem.search_LIKE_userName = ''
                this.formItem.search_EQ_auditState = ''
                this.formItem.search_EQ_transferState = ''
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
            doAudit: function(params, type) {
                this.Global.fun(this, 'get', {
                    base: '/mpickvir/audit/',
                    other: params.row.id + '/' + type + '/?',
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
            seedoAudit(params) {
                debugger
                this.$Modal.confirm({
                    title: '审核',
                    closable: true,
                    content: '<div class="tbsh">' +
                        '<p><b>用户名称: </b>' + params.row.userName + '</p>' +
                        '<p><b>用户账号: </b>' + params.row.userPhone + '</p>' +
                        '<p><b>所提币种: </b>' + params.row.virName + '</p>' +
                        '<p><b>提币数量: </b>' + params.row.pickMoney + '</p>' +
                        '<p><b>钱包地址: </b>' + params.row.virAddress + '</p>' +
                        '<p><b>提币时间: </b>' + this.Global.getDate(params.row.createTime) + '</p>' +
                        '</div>',
                    okText: '审核通过',
                    cancelText: '审核驳回',
                    onOk: () => {
                        this.doAudit(params, 1)
                        this.$Modal.remove();
                    },
                    onCancel: () => {
                        this.doAudit(params, 2)
                        this.$Modal.remove();
                    }
                });
            },

            doTransfer: function(params) {
                this.modal1 = true
                this.datadoTransfer = params.row

                // this.$Modal.confirm({
                //     title: '转账',
                //     content: '<div class="tbsh">' +
                //         '<p><b>转出账户: </b>' + params.row.userName + '</p>' +
                //         '<p><b>转出钱包地址: </b>' + params.row.virName + '</p>' +
                //         '<p><b>转入账户: </b>' + params.row.virAddress + '</p>' +
                //         '<p><b>转入钱包地址: </b>' + params.row.pickMoney + '</p>' +
                //         '<p><b>转账金额: </b>' + params.row.createTime + '</p>' +
                //         '<p><b>转账时间: </b>' + params.row.offTime + '</p>' +
                //         '<p><b>密码: </b><Input placeholder="请输入奖励时间" type="password"></Input>' + params.row.auditState + '</p>' +
                //
                //         '</div>',
                //     // okText: '审核通过',
                //     // cancelText: '审核驳回',
                //     onOk: () => {
                //         this.doAudit(params, 1)
                //     },
                //     onCancel: () => {
                //         this.doAudit(params, 2)
                //     }
                // });
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
                        debugger
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
