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
                        <Form :model="formItem" :label-width="80">
                            <Col span="23">
                            <FormItem label="用户账号">
                                <Input v-model.trim="formItem.search_LIKE_phone" placeholder="请输入手机号码"></Input>
                            </FormItem>
                            </Col>
                            <Col span="23">
                            <FormItem label="用户昵称">
                                <Input v-model.trim="formItem.search_LIKE_name" placeholder="请输入用户昵称"></Input>
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
                <Button @click="refresh" type="info"  @mouseleave.native="Global.stopself($event)">刷新</Button>
            </div>
            <div slot="table">

                <Modal v-model="sbfpO" class="evinputnumber" width="500">
                    <p slot="header">
                        <span>设备分配</span>
                    </p>
                    <div>
                        <Form ref="sbfpforms" :model="sbfpforms" :label-width="100" :rules="sbfpformRules">
                            <Col span="23">
                            <FormItem label="所属数据中心" prop="zoneId">
                                <Select v-model="sbfpforms.zoneId" @on-change="changezone" :label-in-value="true">
                                    <Option :value="zoneOption.zoneId" :label="zoneOption.name" v-for="zoneOption in zoneOptions"
                                        :key="zoneOption.index"></Option>
                                </Select>

                            </FormItem>
                            </Col>


                            <Col span="23">
                            <FormItem label="库存数量">
                                <span>{{hasnum}}</span>
                            </FormItem>
                            </Col>


                            <Col span="23">
                            <FormItem label="托管设备数量" prop="num">
                                <EVinputNumber v-model="sbfpforms.num" :min="1" :max="500" :precision="0"  placeholder="请输入托管设备数量"></EVinputNumber>
                            </FormItem>
                            </Col>
                            <Col span="23">
                            <FormItem label="托管时长" prop="monthNum">
                                <EVinputNumber v-model="sbfpforms.monthNum" :min="1" :max="36" :precision="0" placeholder="请输入托管时长(月)"></EVinputNumber>
                            </FormItem>
                            </Col>


                            <Col span="23">
                            <FormItem label="设备mac" prop="macs">
                                <Input v-model.trim="sbfpforms.macs" placeholder="请输入分配设备的mac，多个设备使用','分割"></Input>
                            </FormItem>
                            </Col>


                        </Form>
                    </div>
                    <div slot="footer">
                        <i-button type="ghost" size="large" @click="closemodal">取消</i-button>
                        <i-button type="primary" size="large" @click="sbfpS">确认</i-button>
                    </div>
                </Modal>
                <Modal v-model="tgfwO" class="evinputnumber" width="500">
                    <p slot="header">
                        <span>托管服务</span>
                    </p>
                    <div>
                        <Form ref="tgfwforms" :model="tgfwforms" :label-width="100" :rules="tgfwformRules">

                            <Col span="23">
                            <FormItem label="托管时长" prop="monthNum">
                                <EVinputNumber v-model="tgfwforms.monthNum" :min="1" :max="36" :precision="0" placeholder="请输入托管时长(月)"></EVinputNumber>
                            </FormItem>
                            </Col>

                        </Form>
                    </div>
                    <div slot="footer">
                        <i-button type="ghost" size="large" @click="closemodal">取消</i-button>
                        <i-button type="primary" size="large" @click="tgfwS">确认</i-button>
                    </div>
                </Modal>
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
        <Modal v-model="modal" title="默认配置" class-name="hideenfooter">
            <Form ref="formV" :model="formV" :rules="ruleV" :label-width="0">
                <EVdivider orientation="right">
                    <span class="dividertit">编辑配置</span>
                    <i-switch size='large' @on-change="switchfunction">
                        <span slot='open'>开启</span>
                        <span slot='close'>关闭</span>
                    </i-switch>
                </EVdivider>
                <FormItem label="" prop="hardInfo" :span="12" v-if="this.switch">
                    <Input type="textarea" :autosize="{minRows: 4,maxRows: 10}" v-model="formV.hardInfo" placeholder="请输入配置信息">

                    </Input>
                </FormItem>
                <div>
                    <pre v-if="!this.switch" v-text="hardInfo"></pre>
                </div>
                <FormItem>
                    <Button v-if="this.switch" type="primary" size="large" class="submitbbox" @click="handleSubmit('formV')"
                        :loading="load">提交
                    </Button>
                </FormItem>
            </Form>
        </Modal>


        <Modal v-model="dqtx" title="到期提醒">
            <div slot="footer">
                <Button type="text" size="large" @click="dqtxcancel">取消</Button>
                <Button type="primary" size="large" @click="dqtxok">确定</Button>
            </div>

            <Form ref="formV" class="dqtx" :model="formsV" :rules="rulesV" :label-width="120">
                <FormItem label="提前提醒天数:" prop="dqtxval">
                    <InputNumber class="dqtx_inputnum" :max="999" :min="1" v-model="formsV.dqtxval"></InputNumber>
                </FormItem>
            </Form>

        </Modal>
    </div>
</template>

<script>
    export default {
        name: "mpuser",

        data() {
            var _this = this;
            const coderhardInfo = function(coder, value, callback) {

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
                dqtx: false,
                formsV: {
                    dqtxval: null
                },
                dqtxid: -1,
                hasnum: '请选择数据中心',
                rulesV: {
                    dqtxval: [{
                        type: 'number',
                        required: true,
                        message: "请输入提前提醒天数",
                        trigger: "change"
                    }],
                },

                search: {},
                Hsearch: false,

                formItem: {
                    search_LIKE_phone: '',
                    search_LIKE_name: ''
                },


                api: {
                    base: '/mpuser', //请求部分
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
                ruleV: {

                    hardInfo: [{
                        required: true,
                        validator: coderhardInfo,
                        trigger: 'blur'
                    }],
                },
                options: [ //下拉选项
                    {
                        label: '用户账号',
                        value: 'search_LIKE_phone',
                    },
                ],
                datahead: [
                    {
                        align: 'left',
                        title: '昵称',
                        key: 'name',
                    },
                    {
                        align: 'left',
                        title: '姓名',
                        key: 'surname',
                    },
                    {
                        align: 'left',
                        title: '账号',
                        key: 'phone',
                    },
                    {
                        align: 'left',
                        title: '身份证',
                        key: 'idcard',
                    },
                    {
                        align: 'left',
                        title: '注册时间',
                        key: 'createDate',
                        width: 140,
                    },
                    {
                        align: 'left',
                        title: '关联设备数量',
                        key: 'hasDevNum',
                        width: 90,
                    },
                    {
                        title: '管理',
                        key: 'action',
                        width: 360,
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
                                            _this.sbfp(params)
                                        }
                                    }
                                }, '设备分配'),
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
                                            _this.tgfw(params)
                                        }
                                    }
                                }, '托管服务'),

                                h('Button', {
                                    props: {
                                        type: params.row.txState == 0 ? 'primary' : 'error',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: function() {
                                            _this.opendqtx(params)
                                        }
                                    },nativeOn:{
                                        mouseleave($event) {
                                            _this.Global.stopself($event)
                                        }
                                    }
                                }, '到期提醒'),

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
                                            _this.guanliang(params)
                                        }
                                    }
                                }, '关联设备'),

                                //                                 h('Button', {
                                //                                     props: {
                                //                                         type: 'primary',
                                //                                         size: 'small',
                                //
                                //                                     },
                                //                                     style: {
                                //                                         marginRight: '5px'
                                //                                     },
                                //                                     on: {
                                //                                         click: function () {
                                //
                                //                                         }
                                //                                     }
                                //                                 }, '到期提醒设置'),
                                //
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                        // disabled: params.row.? == 0 ? true : false,
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: function() {
                                            _this.$Modal.confirm({
                                                title: '操作确认',
                                                content: '<p>确认要删除吗？</p>',
                                                loading: true,
                                                closable: true,

                                                onOk: function() {
                                                    _this.Global.fun(
                                                        _this,
                                                        'delete', {
                                                            base: _this.api.base,
                                                            other: '/' + params
                                                                .row.id + '?',
                                                            access_token: _this
                                                                .api.access_token
                                                        }, {}, c)

                                                    function c(res, that) {
                                                        that.$Message.destroy();
                                                        that.$Message.info(res.data
                                                            .msg);

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
                searchType: 'search_LIKE_phone',
                searchValue: '',
                zoneOptions: [],
                pubUserId: null,
                sbfpO: false,
                tgfwO: false,
                sbfpforms: {
                    macs: '',
                    zoneId: '',
                    num: null,
                    monthNum: null,

                },
                tgfwforms: {
                    monthNum: null,

                },


                sbfpformRules: {
                    zoneId: [{
                        type: 'number',
                        required: true,
                        message: "所属数据中心不能为空",
                        trigger: "change"
                    }],
                    num: [{
                        type: 'number',
                        required: true,
                        message: "托管数量不能为空",
                        trigger: "change"
                    }],
                    monthNum: [{
                        type: 'number',
                        required: true,
                        message: "托管时长不能为空",
                        trigger: "change"
                    }],
                    macs: [{

                        required: true,
                        message: "mac地址不能为空",
                        trigger: "change"
                    }],


                },
                tgfwformRules: {
                    monthNum: [{
                        type: 'number',
                        required: true,
                        message: "托管时长不能为空",
                        trigger: "change"
                    }]
                }

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
            opendqtx(e) {
                this.Global.fun(this, 'get', {
                    base: 'mpuser/dqtx/',
                    other: e.row.id + '/?',
                    access_token: this.api.access_token
                }, {}, c)

                function c(res, that) {
                    debugger
                    if (res.data.status == 1) {
                        that.formsV.dqtxval = res.data.data == '' ? null : res.data.data;
                        that.dqtxid = e.row.id;
                        that.dqtx = true;
                    } else {
                        that.$Message.destroy();
                        that.$Message.error(res.data.msg);
                        that.dqtx = false
                    }
                }

            },
            dqtxcancel() {
                debugger
                this.dqtx = false
            },
            dqtxok() {
                debugger
                this.$refs['formV'].validate((valid) => {
                    if (valid) {
                        this.Global.fun(this, 'post', {
                            base: 'mpuser/dqtx/',
                            other: '?',
                            access_token: this.api.access_token
                        }, {
                            id: this.dqtxid,
                            num: this.formsV.dqtxval
                        }, c)

                        function c(res, that) {
                            if (res.data.status == 1) {
                                that.$Message.success(res.data.msg);
                                that.dqtx = false
                                 that.refresh();
                            } else {
                                that.$Message.destroy();
                                that.$Message.error(res.data.msg);
                                that.dqtx = false
                            }
                        }
                    }
                })
            },
            tgfw(e) {
                debugger
                this.pubUserId = e.row.id
                this.tgfwO = true
            },
            sbfp(e) {
                this.pubUserId = e.row.id
                this.sbfpO = true
            },
            sbfpS() {
                var th = this
                th.sbfpforms.macs = th.sbfpforms.macs.replace('，/g', ',')
                this.$refs['sbfpforms'].validate((valid) => {
                    if (valid) {
                        th.Global.fun(th, 'post', {
                                base: '/mpuser/tgsb',
                                other: '?',
                                access_token: th.api.access_token,
                            }, {
                                zoneId: th.sbfpforms.zoneId,
                                num: th.sbfpforms.num,
                                monthNum: th.sbfpforms.monthNum,
                                pubUserId: th.pubUserId,
                                macs: th.sbfpforms.macs,
                            },
                            function(res, that) {
                                if (res.data.status == 1) {
                                    that.$Message.destroy();
                                    that.$Message.success('分配成功');
                                    that.getoptions()
                                    that.closemodal()


                                } else {
                                    that.$Message.destroy();
                                    that.$Message.error('保存失败' + res.data.msg);
                                    that.closemodal()
                                }


                            });
                    } else {
                        this.$Message.error('请完整填写表单');
                    }
                })

            },
            closemodal() {
                this.sbfpO = false,
                    this.tgfwO = false,
                    this.sbfpforms.zoneId = '',
                    this.sbfpforms.num = null,
                    this.sbfpforms.monthNum = null,
                    this.sbfpforms.macs = null,
                    this.hasnum = '请选择数据中心',
                    this.tgfwforms.monthNum = null

                this.refresh()
            },

            tgfwS() {
                this.$refs['tgfwforms'].validate((valid) => {
                    if (valid) {
                        this.Global.fun(this, 'post', {
                                base: '/mpuser/tgfw',
                                other: '?',
                                access_token: this.api.access_token,
                            }, {
                                monthNum: this.tgfwforms.monthNum,
                                pubUserId: this.pubUserId
                            },
                            function(res, that) {
                                if (res.data.status == 1) {
                                    that.$Message.destroy();
                                    that.$Message.success('托管成功');
                                    that.getoptions()
                                    that.closemodal()
                                } else {
                                    that.$Message.destroy();
                                    that.$Message.error('保存失败' + res.data.msg);
                                    that.closemodal()
                                }


                            });
                    } else {
                        this.$Message.error('请完整填写表单');
                    }
                })


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
                this.searchType = 'search_LIKE_phone'
                //                 this.searchValue = ''

                //                 this.current = 1
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
            },


            optionchange() {
                this.Global.fun(this, 'get', {
                        base: '/mpuser',
                        other: '/tgsb?',
                        access_token: this.api.access_token,
                    }, {},
                    function(res, that) {
                        if (res.data.status == 1) {
                            that.$Message.destroy();

                        } else {
                            that.$Message.destroy();
                            that.$Message.error(res.data.msg);
                        }

                    })
            },

            changezone(e) {
                if (e != undefined) {
                    for (let k in this.zoneOptions) {
                        if (this.zoneOptions[k].zoneId == e.value) {
                            this.hasnum = this.zoneOptions[k].tgNum
                        }
                    }
                }


            }


        },
        created: function() {
            this.searchType = 'search_LIKE_phone',
            this.getoptions()
            this.refresh()
        },
    }
</script>
<style lang="less">
    .evinputnumber {
        .evaninline {

            >.ivu-input-group-append,
            >.ivu-input-group-prepend {
                display: none;
            }
        }
    }

    .dqtx {
        p {
            padding-left: 100px;
            position: relative;
            margin-bottom: 10px;
            line-height: 32px;

            b {
                position: absolute;
                left: 0;
                width: 90px;
                text-align: right;
            }

            .dqtx_inputnum {
                line-height: 32px;

            }
        }
    }
</style>
