<template>

    <Modal v-model="defaults.powerShow" width="600" :mask-closable="false" class="powerModal"
           @on-cancel="" @on-ok="">
        <p slot="header">
            <Icon type="earth"></Icon>
            <span v-text="'设置“'+defaults.powerFormTitle + '”的分类权限'"></span>
            <!--<span :v-show="false" v-text="username"></span>-->
        </p>


        <p class="powerTitle">
            <span>分类权限</span>
            <label>
          <span v-for="(item, index) in defaults.opera" :key="index">
            <em v-if="item === 'r'" v-text="'访问'"></em>
            <em v-else-if="item === 'c'" v-text="'添加'"></em>
            <em v-else-if="item === 'u'" v-text="'修改'"></em>
            <em v-else-if="item === 'd'" v-text="'删除'"></em>
            <em v-else-if="item === 'a'" v-text="'审核'"></em>

          </span>
                <span>
            <em v-text="'全选'"></em>
          </span>
            </label>
        </p>
        <div class="powerBox">
            <Tree :data="powerListInit" :render="RenderContent"></Tree>
            <!--<Tree :data="powerList"></Tree>-->
            <Spin size="large" fix v-if="defaults.spinShow"></Spin>
        </div>
        <div slot="footer">
            <Button type="error" class="evanBtnBox" size="small" long
                    @click="submitA(powerListInit,4,username)"
            >取消授权
            </Button>
            <Button type="primary" class="evanBtnBox" size="small" long
                    @click="submitB(powerListInit,4,username)"
            >确定授权
            </Button>
        </div>
    </Modal>
</template>

<script>

    export default {
        name: 'divider',
        props: {
            show: {
                type: Boolean,
                default: false,
            }
        },
        doChange:'',
        doClear:'',
        powerFormTitle: '',
        opera: ['r', 'c', 'u', 'd', 'a'],

        data () {
            var _this = this;
            return {

                username: '',
                tmp: {},
                powernode: {},
                defaults: {
                    spinShow: true,
                    powerShow: false,
                    powerFormTitle: '',
                    opera: ['r', 'c', 'u', 'd', 'a'],
                    appName: ''
                },


                //声明公共请求部分
                api: {

                    base: '/wtcp-iis/catalogRights',
                    access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),

                },


                //其他数据
                //请求的表体数据
                loading: true,
                //权限函数
                powerListInit: [],
                powerOperaListInit: {},
                oprah: {},
            };
        },
        methods: {
            doOperaList () {
                this.defaults.opera.push('null')
                this.arrayRemove('null')

            },
            arrayRemove (val) {
                var index = this.defaults.opera.indexOf(val);
                if (index > -1) {
                    this.defaults.opera.splice(index, 1);
                }
            },
            RenderContent (h, {root, node, data}) {
                var _this = this
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                }, [
                    h('span', {
                        class: ['ivu-tree-title' + node.nodeKey, 'ivu-tree-title'],
                        // on: {
                        //     click: () => {
                        //         let ele = document.getElementsByClassName('ivu-tree-title')
                        //         for (let i = 0; i < ele.length; i++) {
                        //             ele[i].classList.remove("ivu-tree-title-selected")
                        //         }
                        //         let el = document.getElementsByClassName('ivu-tree-title' + node.nodeKey)
                        //         el[0].classList.add("ivu-tree-title-selected")
                        //     }
                        // }
                    }, [
                        h('span', data.title)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            marginRight: '16px',
                            float: 'right'
                        },
                        class: 'evancheck'
                    }, [


                        h('CheckboxGroup', {
                            props: {
                                value: _this.powernode['uuid' + data.uuid]
                            },
                            on: {
                                'on-change' (v) {


                                    var key = 'uuid' + data.uuid
                                    if ((v.indexOf('ALL') === -1) && (_this.powernode[key].length === _this.defaults.opera.length + 1) && (_this.powernode[key].indexOf('ALL') !== -1)) {
                                        const temp1 = []
                                        _this.powernode[key] = temp1
                                        _this.doOperaList()

                                        return
                                    }//取消全选

                                    else if ((v.indexOf('ALL') !== -1) && (_this.powernode[key].indexOf('ALL') === -1)) {


                                        const temp2 = _this.defaults.opera.slice(0);
                                        temp2.push('ALL')
                                        _this.powernode[key] = temp2

                                        const coder = data.code.split(',')
                                        const codeLength = coder.length
                                        for (var l = 1; l < codeLength; l++) {
                                            var t = 'uuid' + coder[l]
                                            console.log(l)
                                            const temp22 = _this.powernode[t].slice(0);
                                            if (temp22.indexOf('r') === -1) {
                                                temp22.push('r')
                                                _this.powernode[t] = temp22

                                            }

                                        }
                                        // _this.doOperaList()

                                        _this.doOperaList()
                                        return

                                    }//点击全选
                                    else if ((v.length < _this.powernode[key].length) && (v.indexOf('r') === -1) && (_this.powernode[key].indexOf('r') !== -1) && (v.length > 0)) {
                                        const temp33 = v

                                        _this.powernode[key] = v
                                        _this.powernode[key].push('r')

                                        console.log(_this.powernode[key])
                                        _this.defaults.opera.push('null')
                                        _this.arrayRemove('null')


                                        return
                                    }//取消访问
                                    else if (v.length < _this.powernode[key].length) {
                                        const temp3 = v
                                        _this.powernode[key] = temp3
                                        _this.doOperaList()
                                        return
                                    }//取消其他

                                    else if (v.length > _this.powernode[key].length) {
                                        //
                                        const coder = data.code.split(',')
                                        const codeLength = coder.length
                                        for (var l = 1; l < codeLength; l++) {
                                            var t = 'uuid' + coder[l]
                                            console.log(l)
                                            const temp22 = _this.powernode[t].slice(0);
                                            if (temp22.indexOf('r') === -1) {
                                                temp22.push('r')
                                                _this.powernode[t] = temp22

                                            }

                                        }
                                        v.forEach(item => {
                                            if (_this.powernode[key].indexOf(item) === -1) {
                                                _this.powernode[key].push(item)
                                                if (_this.powernode[key].indexOf('r') === -1) {
                                                    _this.powernode[key].push('r')
                                                }
                                            }
                                        })
                                        _this.doOperaList()
                                    }


                                    else {
                                    }//点击其他


                                }
                            }
                            // click: () => {
                            //     value = _this.powernode['uuid' + data.uuid]
                            // }


                        }, [

                            h('Checkbox',
                                {
                                    props: {
                                        label: this.defaults.opera[0]
                                    }
                                    ,

                                    style: {
                                        display: 'inlineBlock', width:
                                            '56px', margin:
                                            '0 0 0 4px', textAlign:
                                            'center'
                                    }
                                }
                            ),

                            h('Checkbox',
                                {
                                    props: {label: this.defaults.opera[1]},

                                    style: {
                                        display: 'inlineBlock',
                                        width: '56px',
                                        margin: '0 0 0 4px',
                                        textAlign: 'center'
                                    }
                                }),

                            h('Checkbox',
                                {
                                    props: {label: this.defaults.opera[2]},

                                    style: {
                                        display: 'inlineBlock',
                                        width: '56px',
                                        margin: '0 0 0 4px',
                                        textAlign: 'center'
                                    }
                                }),

                            h('Checkbox',
                                {
                                    props: {label: this.defaults.opera[3]},

                                    style: {
                                        display: 'inlineBlock',
                                        width: '56px',
                                        margin: '0 0 0 4px',
                                        textAlign: 'center'
                                    }
                                }),

                            h('Checkbox',
                                {
                                    props: {label: this.defaults.opera[4]},

                                    style: {
                                        display: 'inlineBlock',
                                        width: '56px',
                                        margin: '0 0 0 7px',
                                        textAlign: 'center'
                                    }
                                }),

                            h('Checkbox',
                                {
                                    props: {label: 'ALL'},

                                    style: {
                                        display: 'inlineBlock',
                                        width: '56px',
                                        margin: '0 0 0 4px',
                                        textAlign: 'center'
                                    }
                                }),

                        ])
                    ])
                ])
                    ;
            },

            // submitA (data, foolr, params) {
            //     var _this = this
            //     debugger
            //     const deletPowerShow = function (data, foolr, params) {
            //         for (var i in data) {
            //             if (data[i].code.split(',').length === foolr) {
            //                 _this.tmp[data[i].uuid] = ''
            //             } else {
            //
            //                 _this.tmp[data[i].uuid] = ''
            //
            //                 deletPowerShow(data[i].children, foolr);
            //             }
            //         }
            //     }
            //     deletPowerShow(data, foolr, params)
            //
            //     // this.tmp={}
            //     // this.powernode= {}
            //     // this.powerListInit= []
            //     // this.powerOperaListInit={}
            //     //取消的提交
            //     this.Global.ajax(this, 'put', {
            //         base: '/wtcp-iis/catalogRights/rights',
            //         other: '?',
            //         access_token: this.api.access_token,
            //     }, {
            //         rights: JSON.parse('{}'),
            //         username: params,
            //     }, function (res, that) {
            //         if (res.data.status == 1) {
            //             that.$Message.destroy()
            //             that.$Message.success('设置分类权限成功')
            //             that.defaults.powerShow = false
            //         } else {
            //             that.$Message.destroy()
            //             that.$Message.error(res.data.msg);
            //             that.defaults.powerShow = false
            //         }
            //
            //     })
            //
            //
            // },
            submitB (data, foolr, params) {
                var _this = this
                debugger
                const submitPowerShow = function (data, foolr, params) {

                    for (var i in data) {
                        if (data[i].code.split(',').length === foolr) {

                            _this.tmp[data[i].uuid] = _this.powernode['uuid' + data[i].uuid] ? _this.powernode['uuid' + data[i].uuid] : ''

                            var index = _this.tmp[data[i].uuid].indexOf('ALL');
                            if (index > -1) {
                                _this.tmp[data[i].uuid].splice(index, 1);
                            }
                            _this.tmp[data[i].uuid] = Object.values(_this.tmp[data[i].uuid]).join('')
                            console.log(Object.values(_this.tmp[data[i].uuid]).join(''))

                        } else {
                            //
                            _this.tmp[data[i].uuid] = _this.powernode['uuid' + data[i].uuid] ? _this.powernode['uuid' + data[i].uuid] : ''
                            var index = _this.tmp[data[i].uuid].indexOf('ALL');
                            if (index > -1) {
                                _this.tmp[data[i].uuid].splice(index, 1);
                            }

                            _this.tmp[data[i].uuid] = Object.values(_this.tmp[data[i].uuid]).join('')
                            console.log(Object.values(_this.tmp[data[i].uuid]).join(''))


                            submitPowerShow(data[i].children, foolr);
                        }
                    }
                }

                submitPowerShow(data, foolr, params)

                this.Global.ajax(this, 'put', {
                    base: '/wtcp-iis/catalogRights/rights',
                    other: '?',
                    access_token: this.api.access_token,
                }, {
                    rights: JSON.stringify(this.tmp),
                    username: params,
                }, function (res, that) {
                    if (res.data.status == 1) {
                        that.$Message.destroy()
                        that.$Message.success('设置分类权限成功')
                        that.defaults.powerShow = false
                    } else {
                        that.$Message.destroy()
                        that.$Message.error(res.data.msg);
                        that.defaults.powerShow = false
                    }
                })


            },


            handlePowerShow (params) {

                this.tmp = {}
                this.powernode = {}
                this.powerListInit = []
                this.powerOperaListInit = {}

                this.defaults.spinShow = true;
                this.defaults.powerFormTitle = params.row.username;
                this.username = params.row.username;
                let url = '/wtcp-iis/catalogRights/rights?' + this.api.access_token + '&username=' + params.row.username;

                this.$http.get(url).then((res) => {


                    const resData = res.data;
                    if (resData.status === 1) {
                        this.powerOperaListInit = resData.data.rights
                        this.powerListInit = resData.data.tree
                        this.defaults.spinShow = false
                        this.defaults.powerShow = true
                        this.getArray(this.powerListInit, this.powerOperaListInit, 4)

                    } else {
                        this.$Message.destroy()
                        this.$Message.error(resData.msg)
                    }
                })


            }
            ,


            getArray (data, data2, foolr) {

                for (var i in data) {
                    if (data[i].code.split(',').length === foolr) {
                        data[i].expand = true
                        this.powernode['uuid' + data[i].uuid] = []
                        this.powernode['uuid' + data[i].uuid] = data2[data[i].uuid] ? data2[data[i].uuid].split('') : []
                        if (this.powernode['uuid' + data[i].uuid].length === this.defaults.opera.length) {
                            this.powernode['uuid' + data[i].uuid].push('ALL')
                        }

                    } else {
                        data[i].expand = true
                        this.powernode['uuid' + data[i].uuid] = []
                        this.powernode['uuid' + data[i].uuid] = data2[data[i].uuid] ? data2[data[i].uuid].split('') : []
                        if (this.powernode['uuid' + data[i].uuid].length === this.defaults.opera.length) {
                            this.powernode['uuid' + data[i].uuid].push('ALL')
                        }
                        this.getArray(data[i].children, data2, foolr);
                    }
                }

            }

            ,
            //重置，刷新，初始化函数（默认 搜索项相关置空，分页相关数据初始化）


        },
        created: function () {
            debugger
            this.defaults.powerShow= this.show


        }


    };
</script>
<style lang="less">
    .powerTitle {
        padding-bottom: 5px;
        border-bottom: 1px solid #eee;
        label {
            float: right;
            span {
                display: inline-block;
                width: 60px;
                padding-left: 0;
                text-align: center;
                color: #666;
            }
        }
        span {
            padding-left: 23px;
        }
    }

    .powerBox {
        position: relative;
        .ivu-tree-empty {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
        }
    }

    .powerBox .ivu-tree {
        position: relative;
        .ivu-select-dropdown {
            margin-top: -15px;
            margin-left: -2px;
        }
        .ivu-dropdown-menu {
            min-width: 100px;
            margin: 0;
            padding: 0;
        }
        .ivu-dropdown-item {
            margin: 0;
            line-height: normal;
            padding: 7px 16px;
            clear: both;
            color: #495060;
            font-size: 12px !important;
            white-space: nowrap;
            list-style: none;
            cursor: pointer;
            transition: background .2s ease-in-out;
        }
        .ivu-dropdown-item-disabled {
            color: #bbbec4;
            cursor: not-allowed;
        }

    }

    .evancheck {
        .ivu-checkbox {
            & + span {
                display: none;
            }
        }
    }
</style>
