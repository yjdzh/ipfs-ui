<template>
    <div>
        <EVpageList :pageTitle="pageTitle">
            <div slot="searchBox" class="serach">
                <!--<Input v-model="searchValue" :class="selsctclass">-->
                <!--<Select v-model="searchType" slot="prepend" style="width: 80px">-->
                <!--<Option :value="option.value" :label="option.label" v-text="option.label"-->
                <!--v-for="option in options"-->
                <!--:key="option.index"></Option>-->
                <!--</Select>-->
                <!--<Button slot="append" icon="ios-search" @click="dosearch"></Button>-->
                <!--</Input>-->
            </div>
            <div slot="btnBox" class="btn">
                <Button @click="qxglALL" type="success">批量取消关联</Button>
                <Button @click="refresh" type="info">刷新</Button>
            </div>
            <div slot="table">
                <Table border :columns="datahead" :data="databody" size='small' :loading="loading" @on-selection-change="qxgl">
                </Table>
            </div>
            <div slot="pagePage">
                <!-- <Page :total="totalpage" show-total show-elevator :page-size="pagesize" @on-change="onchanges"
                            :current="current">
                </Page> -->

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
                    <Input type="textarea" :autosize="{minRows: 4,maxRows: 10}" v-model="formV.hardInfo"
                           placeholder="请输入配置信息">

                    </Input>
                </FormItem>
                <div>
                    <pre v-if="!this.switch" v-text="hardInfo"></pre>
                </div>
                <FormItem>
                    <Button v-if="this.switch" type="primary" size="large" class="submitbbox"
                            @click="handleSubmit('formV')" :loading="load">提交
                    </Button>
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
                api: {
                    base: '/mpuser', //请求部分
                    access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),
                },

                pageTitle: '关联设备', //页面标题
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
                        label: '账号',
                        value: 'username',
                    },
                ],
                datahead: [
                    {
                        type: 'selection',
                        width: 50,
                    },
                    {
                        align: 'left',
                        title: '产品名称',
                        key: 'productName'
                    },
                    {
                        align: 'left',
                        title: 'mac',
                        width: 180,
                        key: 'mac',

                    },
                    {
                        align: 'left',
                        title: '绑定时间',
                        width: 180,
                        key: 'bindTime',
                        render: function (h, params) {
                            return h('span', [function () {
                                //return params.row.bindTime;

                                var date = new Date(params.row.bindTime);
                                var y = date.getFullYear();
                                var m = date.getMonth() + 1;
                                m = m < 10 ? ('0' + m) : m;
                                var d = date.getDate();
                                d = d < 10 ? ('0' + d) : d;
                                var h = date.getHours();
                                h = h < 10 ? ('0' + h) : h;
                                var minute = date.getMinutes();
                                var second = date.getSeconds();
                                minute = minute < 10 ? ('0' + minute) : minute;
                                second = second < 10 ? ('0' + second) : second;
                                return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
                            }()])
                        }


                    },
                    //
                    {
                        align: 'left',
                        title: '绑定类型',
                        key: 'bindType',
                        width: 120,
                        render: function (h, params) {
                            return h('span', {
                                style: {
                                    color: function () {
                                        switch (params.row.bindType) {
                                            case 0:
                                                return '#19be6b';
                                                break;
                                            case 1:
                                                return '#ed3f14';
                                                break;

                                        }
                                    }()
                                }
                            }, [function () {
                                switch (params.row.bindType) {
                                    case 0:
                                        return '自维';
                                        break;
                                    case 1:
                                        return '托管';
                                        break;

                                }
                            }()])
                        },
                    },
                    {
                        align: 'left',
                        title: '托管结束日期',
                        key: 'trusteeEndt',
                        width: 150,

                        render: function (h, params) {
                            return h('span', [function () {
                                if (params.row.bindType == 0) {
                                    return '--';
                                } else {
                                    var date = new Date(params.row.trusteeEndt);
                                    var y = date.getFullYear();
                                    var m = date.getMonth() + 1;
                                    m = m < 10 ? ('0' + m) : m;
                                    var d = date.getDate();
                                    d = d < 10 ? ('0' + d) : d;
                                    return y + '-' + m + '-' + d;
                                }
                            }()])
                        }
                    },
                    {
                        title: '管理',
                        key: 'action',
                        width: 100,
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
                                            _this.qxgl(params)
                                        }
                                    }
                                }, '取消关联'),


                            ])
                        }
                    }

                ],
                openType: null,
                databody: [],
                loading: true,
                search: '',
                oprah: {},
                searchType: '',
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
            qxglALL() {
            },
            qxgl() {
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


                            function (res, that) {
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
            refresh: function () {
                this.loading = true
                var _this = this;
                this.searchType = 'username'
                this.searchValue = ''
                this.search = ''
                this.current = 1
                this.onchanges(1)
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

                this.loading = true
                this.searchValue = this.search === '' ? '' : this.search
                this.current = e;
                this.Global.fun(this, 'get', {
                    base: this.api.base,
                    other: '/dev/' + this.openType + '?',
                    access_token: this.api.access_token
                }, {}, c)

                function c(res, that) {
                    if (res.data.status === 1) {
                        for (var key in res.data.data) {
                            if (res.data.data[key] === null) {
                                res.data.data[key] = '暂无数据'
                            }
                        }
                        that.totalpage = res.data.data.totalElements;
                        that.current = res.data.data.number + 1;
                        that.databody = res.data.data;
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
                    this.search = this.searchValue
                    this.onchanges(1)
                } else {
                    this.$Message.destroy();
                    this.$Message.error('输入条件不合法');
                    this.loading = false;
                }
            }

        },
        created: function () {
            this.searchType = 'username',
                this.openType = parseInt(this.$route.query.id)
            this.refresh()
        },
    }
</script>

<style scoped>

</style>
