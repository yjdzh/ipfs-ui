<template>
    <div class="EVbase"  style="padding:0;">
        <div class="evanContentBox">

            <div class="mbxBox mb10">
                <h3 class="crumb-title">{{pageTitle}}</h3>
            </div>

            <div class="evanContent">
                <Row>
                    <Col class="h100 tree_box EVtree " span="6" style="position: absolute;z-index: 1;width: 220px;max-width: 220px">
                        <div class="h100 borederR"
                             style="border-right: 1px solid #ccc;padding: 0 10px;overflow: auto;position: relative;">
                            <Tree :data="root" :render="renderContent"></Tree>
                        </div>
                    </Col>
                    <Col class="list_tab-wrap EVp15 nopadding" style="padding-left: 235px;">
                        <EVpageList>
                            <!--<div slot="searchBox" class="serach">-->
                            <!--<Input v-model.trim="searchValue" :class="selsctclass">-->
                            <!--<Select v-model="searchType" slot="prepend" style="width: 80px">-->
                            <!--<Option :value="option.value" :label="option.label" v-text="option.label"-->
                            <!--v-for="option in options"-->
                            <!--:key="option.index"></Option>-->
                            <!--</Select>-->
                            <!--<Button slot="append" icon="ios-search" @click="dosearch"  @mouseleave.native="Global.stopself($event)"></Button>-->
                            <!--</Input>-->
                            <!--</div>-->
                            <div slot="btnBox" class="btn" style="overflow: hidden;">
                                 <Button @click="added" type="success">新增</Button>
                                <Button @click="refresh" type="info"  @mouseleave.native="Global.stopself($event)">刷新</Button>
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
                    </Col>
                </Row>
            </div>
        </div>
        <Modal

            v-model="modal"
            title="默认配置"
            class-name="hideenfooter"
        >


            <EVupload :actionUrl="actionUrl" :doAfterUpload="doAfterUpload"
                      :type="type"></EVupload>


        </Modal>
    </div>
</template>

<script>


    export default {
        name: "mver",

        data () {
            var _this = this;
            return {
                api: {
                    base: '/mver',//请求部分
                    access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),
                },
                pageTitle: '版本管理',//页面标题
                totalpage: 0,
                pagesize: this.Global.pagesize,
                current: 1,
                options: [//下拉选项
                    {
                        label: '型号',
                        value: 'model',
                    },
                ],
                loading: false,
                modal: false,
                id: null,
                root: [{
                    id: "0",
                    level:0,
                    title: "版本库",
                    expand: true,
                    children: []
                }],
                datahead: [

                    {
                        align: 'left',
                        title: '产品名称',

                        render: function (h, params) {
                            return h('span', [params.row.productEntity.name])
                        }
                    },
                    {
                        align: 'left',
                        title: '内控版本',
                        key: 'ver',
                        width: 120
                    },
                    {
                        align: 'left',
                        title: '显示版本',
                        key: 'showVer',
                        width: 100,

                    },

                    // {
                    //     align: 'left',
                    //     title: '版本描述信息',
                    //     key: 'info',
                    //
                    // },
                    // {
                    //     align: 'left',
                    //     title: '发布日期',
                    //     key: 'updateDate',
                    //
                    // },
                    {
                        align: 'left',
                        title: 'rom状态',
                        width: 80,
                        key: 'romPath',
                        render: function (h, params) {
                            return h('span', {
                                style: {
                                    color: function () {
                                        if(params.row.romPath==''){
                                           return '#19be6b';
                                        }else{
                                             return '#ed3f14';
                                        }

                                    }()
                                }
                            }, [function () {
                                if(params.row.romPath==''){
                                   return '未上传';
                                }else{
                                     return '已上传';
                                }
                            }()])
                        },
                    },{
                        align: 'left',
                        title: '激活状态',
                        width: 80,
                        key: 'liveState',
                        render: function (h, params) {
                            return h('span', {
                                style: {
                                    color: function () {
                                        switch (params.row.liveState) {
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
                                switch (params.row.liveState) {
                                    case 0:
                                        return '未激活 ';
                                        break;
                                    case 1:
                                        return '激活 ';
                                        break;

                                }
                            }()])
                        },
                    },

                    // {
                    //     align: 'left',
                    //     title: 'rom路径',
                    //     key: 'romPath',
                    //
                    // },

                    {
                        title: '管理',
                        key: 'action',
                        width: 220,
                        align: 'center',
                        render: function (h, params) {
                            return h('div', [
                                    h('EVupload', {
                                        props: {
                                            actionUrl: '/mver/upload/' + params.row.id + '?' + _this.api.access_token,
                                            doAfterUpload: _this.doAfterUpload,
                                            type: _this.type,
                                            clickText:'rom上传'
                                        },
                                        style: {
                                            marginRight: '5px',
                                            display: 'inline-block'
                                        },
                                        class:'uplod',
                                        on: {
                                            click: function () {

                                            }
                                        },nativeOn:{
                                            mouseleave($event) {
                                                _this.Global.stopself($event)
                                            }
                                        }
                                    }, 'ROM上传'), h('Button', {
                                        props: {
                                            type: 'info',
                                            size: 'small',
                                            disabled: params.row.liveState == 1 ? true : false
                                        },
                                        style: {
                                            marginRight: '5px',

                                        },
                                        on: {
                                            click: function () {
                                                _this.Global.fun(_this, 'put', {
                                                        base: _this.api.base,
                                                        other: '/live/' + params.row.id + '?',
                                                        access_token: _this.api.access_token,
                                                    },
                                                    {},
                                                    function (res, that) {
                                                        if (res.data.status == 1) {
                                                            that.onchanges(1)
                                                        }
                                                        else {

                                                            that.$Message.destroy();
                                                            that.$Message.error(res.data.msg);

                                                        }

                                                    });

                                            }
                                        }
                                    }, '激活'),
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
                                                    loading: true,
                                                    closable: true,
                                                    onOk: function () {
                                                        _this.Global.fun(
                                                            _this,
                                                            'delete',
                                                            {
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

                                ]
                            )
                        }
                    }
                ],
                databody: [],
                loading: true,
                search: '',
                oprah: {},
                searchType: 'name',
                searchValue: '',
                actionUrl: '',
                type: ['zip', '7z', 'rar']
            };
        },
        computed: {
            disabledadd () {
                return false
            },
            selsctclass () {
                return this.options.length === 1 ? 'overhidden' : ''
            },
            // actionUrl () {
            //     return '/mver/upload/' + this.id + '?' + this.api.access_token
            // },
            // action2Url () {
            //     action2Url= '/mver/pro/'+ sessionStorage.getItem('wtcp-user-token')
            // }

        },
        methods: {

            doAfterUpload (e) {
                console.log(e)

            },
            renderContent (h, {root, node, data}) {
                var th = this

                return h(
                    "span", {
                        style: {
                            display: "inline-block",
                            width: "100%"
                        }
                    }, [
                        h(
                            "span", {
                                class: ["ivu-tree-title" + node.nodeKey, "ivu-tree-title"],
                                on: {
                                    click: () => {
                                        // 获取当前节点信息列表数据
                                        this.treeNodeClickHandle(
                                            data,
                                        );
                                        let ele = document.getElementsByClassName("ivu-tree-title");
                                        for (let i = 0; i < ele.length; i++) {
                                            ele[i].classList.remove("ivu-tree-title-selected");
                                        }
                                        let el = document.getElementsByClassName(
                                            "ivu-tree-title" + node.nodeKey
                                        );
                                        el[0].classList.add("ivu-tree-title-selected");

                                    }
                                }
                            }, [h("Icon", {
                                props: {
                                    type: "android-clipboard"

                                },
                                style: {
                                    padding: "2px 4px",
                                    fontSize: "14px"
                                }
                            }),
                                h("span", {
                                    class: "etitle",
                                    style: {
                                        padding: "2px 4px",
                                        fontSize: "12px"
                                    }
                                }, data.title),

                            ]
                        )
                    ]
                );
            },
            refresh: function () {
                this.loading = true
                var _this = this;
//                 this.searchType = 'name'
//                 this.searchValue = ''
//                 this.search = ''
//                 this.current = 1
                this.onchanges(this.current = 1)
            },
            edit: function (params) {
                this.Global.value = '';
                this.Global.type = '';
                this.$router.push({
                    name: 'mver_form',
                    query: {
                        id: params.row.id

                    }
                })

            },
            added: function () {
                this.Global.value = '';
                this.Global.type = '';
                this.$router.push({
                    name: 'mver_form',
                    query: {
                        id: -1,

                    }
                })

            },
            treeNodeClickHandle (e) {
                this.loading = true
                this.search = e.id
                this.onchanges(1)
                console.log(e)
            },
            onchanges: function (e) {
                this.loading = true
                this.searchValue = this.search === '' ? '' : this.search
                this.current = e;
                this.Global.fun(this, 'get', {
                    base: this.api.base,
                    other: '/page?',
                    access_token: this.api.access_token
                }, this.searchValue !== '' ? JSON.parse('{"search_EQ_productId":"' + this.searchValue + '","page":"' + (this.current - 1) + '","size":"' + this.pagesize + '"}') : {
                    page: this.current - 1,
                    size: this.pagesize
                }, c)

                function c (res, that) {
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
                this.loading = true

                if (this.searchValue.match(this.Regex.regexlist.basesearch)) {
                    this.search = this.searchValue
                    this.onchanges(1)
                }
                else {
                    this.$Message.destroy();
                    this.$Message.error('输入条件不合法');
                    this.loading = false;
                }
            },
            getAllTreeData () {
                this.Global.fun(
                    this,
                    "get", {
                        base: '/mproduct/tree',
                        other: "?",
                        access_token: this.api.access_token
                    }, {},
                    function (res, that) {
                        if (res.data.status == 1) {

                            const child = res.data.data
                            that.root[0].children = child

                        }
                    }
                );


            }
        },
        created: function () {
            this.searchType = 'name',
                this.getAllTreeData(),
                this.refresh()


        },
    }
</script>

<style scoped>

</style>
