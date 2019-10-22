<template>
    <div>
        <EVpageList :pageTitle="pageTitle">
            <div slot="searchBox" class="serach">
                <Input v-model="searchValue" :class="selsctclass">
                    <Select v-model="searchType" slot="prepend" style="width: 50px">
                        <Option :value="option.value" :label="option.label" v-text="option.label"
                                v-for="option in options" :key="option.index"></Option>
                    </Select>
                    <Button slot="append" icon="ios-search" @click="dosearch"></Button>
                </Input>
            </div>
            <div slot="btnBox" class="btn">
                <Button @click="added" type="success">新增</Button>
                <Button @click="refresh" type="info">刷新</Button>
            </div>
            <div slot="table">
                <Table border :columns="datahead" :data="databody" size='small' :loading="loading">
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
        <Modal v-model="modal" title="通用配置" class-name="hideenfooter">
            <Form ref="formV" :model="formV" :rules="ruleV" :label-width="0">

                <FormItem label="" prop="hardInfo" :span="12" style="    margin-bottom: 10px;">

                    <jsoneditor :value="json" @change="change"></jsoneditor>
                </FormItem>

                <FormItem style="    margin-bottom: 0px;">
                    <Button type="primary" size="large" class="submitbbox"
                            @click="handleSubmit('formV')" :loading="load">提交
                    </Button>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    import product from './productExtend.vue';

    export default {
        name: "mproduct",
        components: {
            product
        },
        data () {
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
                    base: '/mproduct', //请求部分
                    access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),
                },

                pageTitle: '产品管理', //页面标题
                totalpage: 0,
                pagesize: this.Global.pagesize,
                current: 1,
                formV: {
                    hardInfo: {},
                },
                json: {
                    "array": [1, 2, 3],
                    "boolean": true,
                    "color": "#82b92c",
                    "null": null,
                    "number": 123,
                    "object": {"a": "b", "c": "d"},
                    "string": "Hello World"
                },

                modal: false,
                switch: false,
                // hardInfo: {},
                load: false,
                id: null,
                ruleV: {

                    hardInfo: [],
                },
                options: [ //下拉选项
                    {
                        label: '型号',
                        value: 'model',
                    },
                ],
                datahead: [{
                    type: 'expand',
                    width: 50,
                    render: function (h, params) {
                        return h(product, {
                            props: {
                                row: params.row
                            }
                        })
                    }
                },
                    {
                        align: 'left',
                        title: '名称',
                        key: 'name'
                    },
                    {
                        align: 'left',
                        title: '型号',
                        key: 'model',
                        width: 150
                    },
                    {
                        align: 'center',
                        title: '照片',
                        key: 'img',
                        width: 150,
                        render: function (h, params) {
                            if (params.row.img === '') {
                                return h('span', {
                                    style: {
                                        color: "#19be6b"
                                    }
                                }, '未上传图片');
                            }
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px',
                                        textAlign: 'center',
                                    },
                                    on: {
                                        click: function () {
                                            _this.$Modal.confirm({
                                                title: params.row.name + '图片',
                                                content: '<img style="max-width: 300px; max-height:300px;text-align: center;\n' +
                                                    '    margin: 0 auto;\n' +
                                                    '    display: block;" src=http://47.92.51.100/ipfs' + params.row.img + '>',
                                                closable: true,
                                                okText: '关闭',
                                                cancelText: ' '

                                            });
                                        }
                                    }
                                }, '查看图片'),

                            ])
                        }
                    },

                    // {
                    //     align: 'left',
                    //     title: '配置',
                    //     key: 'hardInfo',
                    //
                    // },
                    // {
                    //     align: 'left',
                    //     title: '功耗',
                    //     key: 'powerInfo',
                    //     width: 150
                    // },
                    // {
                    //     align: 'left',
                    //     title: '自维购买价格',
                    //     key: 'maintainPrice',
                    //     width: 100
                    // },
                    // {
                    //     align: 'left',
                    //     title: '自维默认折扣',
                    //     key: 'maintainDiscount',
                    //     width: 100
                    // },
                    // {
                    //     align: 'left',
                    //     title: '托管购买价格/月',
                    //     key: 'rusteePrice',
                    //     width: 110
                    // },
                    // {
                    //     align: 'left',
                    //     title: '托管默认折扣',
                    //     key: 'trusteeDiscount',
                    //     width: 100
                    // },
                    // {
                    //     align: 'left',
                    //     title: '最低托管时长',
                    //     key: 'trusteeMin',
                    //     width: 100
                    // },


                    {
                        align: 'center',
                        title: '自维库存余量',
                        key: 'maintainStock',

                    },
                    {
                        align: 'center',
                        title: '托管库存余量',
                        key: 'trusteeStock',

                    },


                    {
                        title: '管理',
                        key: 'action',
                        width: 180,
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

                                            _this.Global.fun(_this, 'get', {
                                                    base: _this.api.base,
                                                    other: '/cfg/' + params.row.id + '?',
                                                    access_token: _this.api.access_token,
                                                }, {},
                                                function (res, that) {

                                                    if (res.data.data) {
                                                        debugger
                                                        that.json = res.data.data
                                                        // that.hardInfo = JSON.parse(JSON.stringify(res.data.data))
                                                        that.id = params.row.id
                                                        that.modal = true
                                                    } else {
                                                        that.json = {}
                                                        // that.hardInfo = '暂无数据'
                                                        that.id = params.row.id
                                                        that.modal = true

                                                    }

                                                });

                                        }
                                    }
                                }, '通用配置'),
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
                                            _this.edit(params)
                                        }
                                    }
                                }, '编辑'),

                                h('Button', {
                                    props: {

                                        type: 'error',
                                        size: 'small',


                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: function () {
                                            _this.$Modal.confirm({
                                                title: '操作确认',
                                                content: '<p>确认要删除吗？</p>',
                                                closable: true,
                                                loading: true,
                                                okText: '删除',
                                                cancelText: '取消',
                                                onOk: function () {
                                                    _this.Global.fun(
                                                        _this,
                                                        'delete', {
                                                            base: _this.api.base,
                                                            other: '/' + params.row.id + '?',
                                                            access_token: _this.api.access_token
                                                        }, {}, c)

                                                    function c (res, that) {
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
                search: '',
                oprah: {},
                searchType: '',
                searchValue: '',
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
            change (e) {
                this.json = e

            },
            switchfunction (e) {
                this.switch = e

            },
            handleSubmit (name) {
                debugger
                var js = JSON.stringify(this.json)
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.load = true
                        this.Global.submit(this, 'put', {
                                base: this.api.base,
                                other: '/cfg/' + this.id + '?',
                                access_token: this.api.access_token,
                            }, {
                                // cfg: (this.formV.hardInfo.replace(/\\/g, "")).replace(/ \s*/g, "")
                                cfg: js
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
                //                 this.searchType = 'model'
                //                 this.searchValue = ''
                //                 this.search = ''
                //                 this.current = 1
                this.onchanges(this.current = 1)
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
                    other: '/page?',
                    access_token: this.api.access_token
                }, this.searchValue !== '' ? JSON.parse('{"' + 'search_LIKE_' + this.searchType + '":"' + this.searchValue +
                    '","page":"' + (this.current - 1) + '","size":"' + this.pagesize + '"}') : {
                    page: this.current - 1,
                    size: this.pagesize
                }, c)

                function c (res, that) {
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
            oprahfun: function (e) {
                this.Global.oprahfun(this)
            },
            dosearch: function () {
                this.loading = true

                if (this.searchValue.match(this.Regex.regexlist.basesearch)) {
                    this.search = this.searchValue
                    this.onchanges(1)
                } else if (this.searchValue === '') {
                    this.search = ''
                    this.onchanges(1)
                } else {
                    this.$Message.destroy();
                    this.$Message.error('输入条件不合法');
                    this.loading = false;
                }
            }
        },
        created: function () {
            this.searchType = 'model',
                this.refresh()
        },
    }
</script>

<style scoped>

</style>
