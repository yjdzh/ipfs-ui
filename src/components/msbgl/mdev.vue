<template>
    <div class="EVbase" style="padding:0;">
        <EVpageList :pageTitle="pageTitle">
            <div slot="searchBox" class="serach">
                <Input v-model.trim="searchValue" :class="selsctclass">
                    <Select v-model="searchType" slot="prepend" style="width: 80px">
                        <Option :value="option.value" :label="option.label" v-text="option.label"
                                v-for="option in options" :key="option.index"></Option>
                    </Select>
                    <Button slot="append" icon="ios-search" @click="dosearch"  @mouseleave.native="Global.stopself($event)"></Button>
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
                                <FormItem label="产品名称">
                                    <Select v-model="formItem.search_EQ_productId" placeholder="请选择产品">
                                        <Option :value="it.id" v-for="it in Hsearchopt" :key="Hsearchopt.index">
                                            {{it.name}}
                                        </Option>

                                    </Select>
                                </FormItem>

                            </Col>
                            <Col span="23">
                                <FormItem label="数据中心" prop="zoneId">
                                    <Select v-model="formItem.search_EQ_zoneId">
                                        <Option :value="zoneOption.id" v-text="zoneOption.name"
                                                v-for="zoneOption in zoneOptions"
                                                :key="zoneOption.index"></Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem label="在线状态">
                                    <RadioGroup v-model="formItem.search_EQ_lineState" type="button">
                                        <Radio :label="0">离线</Radio>
                                        <Radio :label="1">在线</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </Col>
                            <Col span="11">
                                <FormItem label="激活状态">
                                    <RadioGroup v-model="formItem.search_EQ_activeState" type="button">
                                        <Radio :label="0">未激活</Radio>
                                        <Radio :label="1">激活</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </Col>

                            <Col span="10">
                                <!-- <FormItem label="客户名称">
                                    <Input v-model.trim="formItem.search_LIKE_buyUserName" placeholder="请输入客户名称"></Input>
                                </FormItem> -->
                                <FormItem label="序列号sn">
                                    <Input v-model.trim="formItem.search_LIKE_sn" placeholder="请输入序列号sn"></Input>
                                </FormItem>
                            </Col>
                            <Col span="11">
                                <FormItem label="客户帐号">
                                    <Input v-model.trim="formItem.search_LIKE_buyUserTel" placeholder="请输入客户帐号"></Input>
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem label="设备mac">
                                    <Input v-model.trim="formItem.search_LIKE_mac" placeholder="请输入设备mac"></Input>
                                </FormItem>
                            </Col>
                            <Col span="11">
                                <FormItem label="销售类型">
                                    <RadioGroup v-model="formItem.search_EQ_saleState" type="button">
                                        <Radio :label="0">自维</Radio>
                                        <Radio :label="1">托管</Radio>
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
                <!--<Button @click="added" type="success">新增</Button>-->

                <span class="inline">
					<Alert type="info" show-icon>设备总数：{{allline}} 台</Alert>
				</span>
                <span class="inline">
					<Alert type="success" show-icon>在线设备：{{online}} 台</Alert>
				</span>
                <span class="inline">
					<Alert type="error" show-icon>离线设备：{{outline}} 台</Alert>
				</span>

                <!--<Button @click="dobtns(0)" type="info">软件升级</Button>-->
                <!--<Button @click="dobtns(1)" type="info">设备复位</Button>-->
                <!--<Button @click="dobtns(2)" type="info">设备重启</Button>-->
                <!--<Button @click="dobtns(3)" type="error">删除</Button>-->

                <Button @click="refresh" type="info"  @mouseleave.native="Global.stopself($event)">刷新</Button>


            </div>
            <div slot="table">
                <Table border :columns="datahead" :data="databody" size='small' :loading="loading"
                       @on-selection-change="selectionchange">
                </Table>

                <Modal v-model="modal2" width="700" @on-cancel="cancel2">
                    <p slot="header">
                        <span> 查看mac:{{this.mac}}的日志</span>
                    </p>
                    <div>
                        <Table border :columns="datahead2" :data="databody2" size='small' :loading="loading2">
                        </Table>
                    </div>

                    <div slot="footer">

                    </div>
                </Modal>
            </div>
            <div slot="pagePage">
                <Page :total="totalpage" show-total show-elevator :page-size="pagesize" @on-change="onchanges"
                      :current="current">
                </Page>
            </div>

            <div slot="moreBtn">
                <Button @click="dobtns(0)" type="info">软件升级</Button>
                <Button @click="dobtns(1)" type="info">设备复位</Button>
                <Button @click="dobtns(2)" type="info">设备重启</Button>
                <Button @click="dobtns(3)" type="error">删除</Button>


                <!--拓展按钮1-->
            </div>
        </EVpageList>
        <Modal v-model="modal" title="设备配置" class-name="hideenfooter">
            <Form ref="formV" :model="formV" :rules="ruleV" :label-width="0">
                <!--<EVdivider orientation="right">-->
                <!--<span class="dividertit">编辑配置</span>-->
                <!--<i-switch size='large' @on-change="switchfunction">-->
                <!--<span slot='open'>开启</span>-->
                <!--<span slot='close'>关闭</span>-->
                <!--</i-switch>-->
                <!--</EVdivider>-->
                <FormItem label="" prop="hardInfo" :span="12" style="    margin-bottom: 10px;">
                    <!--<Input type="textarea" :autosize="{minRows: 4,maxRows: 10}" v-model="formV.hardInfo"-->
                    <!--placeholder="请输入配置信息">-->

                    <!--</Input>-->
                    <jsoneditor :value="json" @change="change"></jsoneditor>

                </FormItem>
                <!--<div>-->
                <!--<pre v-if="!this.switch" v-text="hardInfo"></pre>-->
                <!--</div>-->
                <FormItem style="margin-bottom: 0px;">
                    <Button type="primary" size="large" class="submitbbox" @click="handleSubmit('formV')"
                            :loading="load">提交
                    </Button>
                </FormItem>
            </Form>
        </Modal>


        <Modal v-model="editsb" class="evinputnumber editbox" width="500">
            <p slot="header">
                <span>编辑设备</span>
            </p>
            <div>
                <Form ref="editsbforms" :model="editsbforms" :label-width="100" :rules="editsbformRules"
                >

                    <Col span="23">
                        <FormItem label="设备mac">
                            <span
                                style="height: 38px;line-height: 38px;display: inline-block">{{editsbforms.mac}}</span>
                        </FormItem>
                    </Col>


                    <Col span="23">
                        <FormItem label="销售类型" prop="saleType">
                            <RadioGroup v-model="editsbforms.saleType" type="button" size="large">
                                <Radio label="0">自维</Radio>
                                <Radio label="1">托管</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Col>
                    <Col span="23">
                        <!-- <FormItem label="所属数据中心"  v-if="editsbforms.saleType=='1'"> -->
                        <FormItem label="所属数据中心" prop="zoneId">
                            <Select v-model="editsbforms.zoneId">
                                <Option v-for="zoneOpt in zoneOptions" :value="zoneOpt.id" :label="zoneOpt.name"
                                        :key="zoneOpt.index"></Option>
                            </Select>

                        </FormItem>
                    </Col>


                </Form>
            </div>
            <div slot="footer">
                <i-button type="ghost" size="large" @click="closemodal">取消</i-button>
                <i-button type="primary" size="large" @click="editsbsubmit">确认</i-button>
            </div>
        </Modal>


    </div>
</template>

<script>
    import dev from './devExtend.vue';

    export default {
        name: "mdev",
        components: {
            dev
        },
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
                selectedArr: {},

                editsb: false,

                editsbforms: {
                    saleType: '0',
                    id: '',
                    zoneId: '',
                    mac: '',
                },

                editsbformRules: {
                    saleType: [{
                        // type: 'number',
                        required: true,
                        message: "请选择销售类型",
                        trigger: "change"
                    }],
                    zoneId: [
                        {
                            type: 'number',
                            required: true,
                            message: '请选择数据中心',
                            trigger: 'change'
                        }
                    ]
                },


                selects: [],
                json: {},
                allline: 0,
                online: 0,
                outline: 0,
                search: {},
                Hsearch: false,
                Hsearchopt: [],
                formItem: {
                    search_EQ_zoneId: '',
                    search_EQ_activeState: '',
                    search_EQ_productId: '',
                    search_LIKE_mac: '',
                    search_EQ_lineState: '',
                    search_LIKE_sn: '',
                    search_LIKE_buyUserTel: '',
                },
                zoneOptions: [],

                mac: '',
                modal2: false,
                datahead2: [{

                    title: '日志名称',
                    key: 'fileName',

                },
                    {
                        title: '日志大小',
                        key: 'size',
                    }, {
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
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: function () {
                                            window.open(params.row.url, '_blank')
                                        }
                                    }
                                }, '查看'),
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
                                                        'delete', {
                                                            base: _this.api.base,
                                                            other: '/delete/logs?',
                                                            access_token: _this.api.access_token
                                                        }, {
                                                            fileName: params.row.fileName,
                                                            mac: _this.mac
                                                        },
                                                        function (res, that) {
                                                            if (res.data.status == 1) {
                                                                that.$Message.destroy();
                                                                that.$Message.success(res.data.msg);
                                                                that.$Modal.remove();
                                                                that.getlist()
                                                            } else {
                                                                that.$Message.destroy();
                                                                that.$Message.error(res.data.msg);
                                                                that.$Modal.remove();
                                                                that.getlist()
                                                            }
                                                        })


                                                },
                                            });
                                        }
                                    }
                                }, '删除'),


                            ])
                        }
                    }
                ],
                databody2: [],
                loading2: false,

                api: {
                    base: '/mdev', //请求部分
                    access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),
                },
                pageTitle: '设备管理', //页面标题
                totalpage: 0,
                pagesize: this.Global.pagesize,
                current: 1,
                formV: {
                    hardInfo: '',
                },
                ruleV: {

                    hardInfo: [],
                },
                load: false,
                loading: false,
                modal: false,
                switch: false,
                hardInfo: {},
                options: [ //下拉选项
                    {
                        label: '设备mac',
                        value: 'search_LIKE_mac',
                    },

                ],
                datahead: [
                    {
                        type: 'selection',
                        width: 50,
                    }, {
                        type: 'expand',
                        width: 50,
                        render: function (h, params) {
                            return h(dev, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        align: 'left',
                        title: '产品名称',
                        render: function (h, params) {
                            return h('span', {
                                attrs: {
                                    title: params.row.productEntity.name,
                                },
                            }, [params.row.productEntity.name])
                        }
                    },
                    {
                        align: 'left',
                        title: 'mac',
                        key: 'mac',
                        width: 120,
                        render: function (h, params) {
                            return h('span', {
                                attrs: {
                                    title: params.row.mac,
                                },
                            }, [params.row.mac])
                        },

                    }, {
                        align: 'left',
                        title: '序列号',
                        width: 120,
                        key: 'sn',
                        render: function (h, params) {
                            return h('span', {
                                attrs: {
                                    title: params.row.sn,
                                },
                            }, [params.row.sn])
                        },

                    }, {
                        align: 'left',
                        title: 'IP',
                        key: 'ip',
                        width: 100,
                        render: function (h, params) {
                            return h('span', {
                                attrs: {
                                    title: params.row.ip,
                                },
                            }, [params.row.ip])
                        },
                    }, {
                        align: 'left',
                        title: '软件版本',
                        key: 'softVer',
                        width: 120,
                        render: function (h, params) {
                            return h('span', {
                                attrs: {
                                    title: params.row.softVer,
                                },
                            }, [params.row.softVer])
                        },

                    }, {
                        align: 'left',
                        title: '姓名',
                        key: 'buyUserName',
                        width: 100,
                        render: function (h, params) {
                            return h('span', {
                                attrs: {
                                    title: params.row.buyUserName,
                                },
                            }, [params.row.buyUserName])
                        },
                    },
                    {
                        align: 'center',
                        title: '电话',
                        key: 'buyUserTel',
                        width: 120,
                        render: function (h, params) {
                            return h('span', {
                                attrs: {
                                    title: params.row.buyUserTel,
                                },
                            }, [params.row.buyUserTel])
                        },

                    },
                    {
                        align: 'center',
                        title: '业务状态',
                        key: 'bussState',
                        width: 80,
                        render: function (h, params) {
                            return h('span', {
                                style: {
                                    color: function () {
                                        switch (params.row.bussState) {
                                            case 0:
                                                return '#19be6b';
                                                break;
                                            case 1:
                                                return '#ed3f14';
                                                break;
                                            case 2:
                                                return '#b3be02';
                                                break;
                                            case 3:
                                                return '#ed0597';
                                                break;
                                            case 4:
                                                return '#0010be';
                                                break;
                                            case 5:
                                                return '#00a3ed';
                                                break;
                                            case 6:
                                                return '#be5e00';
                                                break;


                                        }
                                    }()
                                }
                            }, [function () {
                                switch (params.row.bussState) {
                                    case 0:
                                        return '库存';
                                        break;
                                    case 1:
                                        return '预销售';
                                        break;
                                    case 2:
                                        return '已销售';
                                        break;
                                    case 3:
                                        return '到期 ';
                                        break;
                                    case 4:
                                        return '报废 ';
                                        break;
                                    case 5:
                                        return '退货 ';
                                        break;
                                    case 6:
                                        return '测试';
                                        break;
                                    case 7:
                                        return '托管中';
                                        break;
                                    case 8:
                                        return '托管到期';
                                        break;

                                }
                            }()])
                        },
                    },
                    {
                        align: 'center',
                        title: '激活状态',
                        key: 'activeState',
                        width: 70,
                        render: function (h, params) {
                            return h('span', {
                                style: {
                                    color: function () {
                                        switch (params.row.activeState) {
                                            case 0:
                                                return '#ed3f14';
                                                break;
                                            case 1:
                                                return '#19be6b';
                                                break;

                                        }
                                    }()
                                }
                            }, [function () {
                                switch (params.row.activeState) {
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
                    {
                        align: 'center',
                        title: '在线状态',
                        key: 'lineState',
                        width: 80,
                        render: function (h, params) {
                            return h('span', {
                                style: {
                                    color: function () {
                                        switch (params.row.lineState) {
                                            case 0:
                                                return '#ed3f14';
                                                break;
                                            case 1:
                                                return '#19be6b';
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
                    },
                    {
                        align: 'center',
                        title: '销售类型',
                        key: 'saleState',
                        width: 80,
                        render: function (h, params) {
                            return h('span', {
                                style: {
                                    color: function () {
                                        switch (params.row.saleState) {
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
                                switch (params.row.saleState) {
                                    case 0:
                                        return '自维 ';
                                        break;
                                    case 1:
                                        return '托管';
                                        break;

                                }
                            }()])
                        },
                    },
                    {
                        title: '管理',
                        key: 'action',
                        width: 120,
                        align: 'center',
                        render: function (h, params) {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        disabled: params.row.lineState == 0 ? true : false,
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
                                }, '配置'),

//                                 h('Button', {
//                                     props: {
//                                         type: 'error',
//                                         size: 'small',
//                                         disabled: false,
//                                     },
//                                     style: {
//                                         marginRight: '5px'
//                                     },
//                                     on: {
//                                         click: function () {
//                                             _this.$Modal.confirm({
//                                                 title: '操作确认',
//                                                 content: '<p>确认要删除吗？</p>',
//                                                 loading: true,
//                                                 closable: true,
//                                                 onOk: function () {
//                                                     _this.Global.fun(
//                                                         _this,
//                                                         'delete', {
//                                                             base: _this.api.base,
//                                                             other: '/' + params.row.id + '?',
//                                                             access_token: _this.api.access_token
//                                                         }, {}, c)
//
//                                                     function c(res, that) {
//                                                         that.$Message.destroy();
//                                                         that.$Message.info(res.data.msg);
//
//                                                         that.$Modal.remove();
//                                                         that.refresh()
//                                                     }
//
//                                                 },
//                                             });
//                                         }
//                                     }
//                                 }, '删除'),
                                h('Dropdown', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                            disabled: params.row.lineState == 0 ? true : false,
                                        },
                                        style: {
                                            marginRight: '5px'
                                        }
                                    }, '更多'),
                                    h('DropdownMenu', {
                                        slot: "list"
                                    }, [

                                        h('DropdownItem', {
                                            props: {
                                                disabled: params.row.lineState == 0 ? true : false,
                                            },

                                            nativeOn: {
                                                click: function () {
                                                    if (params.row.lineState == 0) {
                                                        return;
                                                    }
                                                    _this.$Modal.confirm({
                                                        title: '操作确认',
                                                        content: '<p>确认要重启设备吗？</p>',
                                                        loading: true,
                                                        closable: true,
                                                        onOk: function () {
                                                            _this.readDev(params, 0)
                                                        },
                                                    });
                                                }
                                            }
                                        }, '重启设备'),
                                        h('DropdownItem', {
                                            props: {
                                                disabled: params.row.lineState == 0 ? true : false,
                                            },
                                            nativeOn: {
                                                click: function () {
                                                    if (params.row.lineState == 0) {
                                                        return;
                                                    }
                                                    _this.$Modal.confirm({
                                                        title: '操作确认',
                                                        content: '<p>确认要恢复出厂吗？</p>',
                                                        loading: true,
                                                        closable: true,
                                                        onOk: function () {
                                                            _this.readDev(params, 1)
                                                        },
                                                    });
                                                }
                                            }
                                        }, '恢复出厂'),

                                        h('DropdownItem', {
                                            props: {
                                                disabled: params.row.lineState == 0 ? true : false,
                                            },
                                            nativeOn: {
                                                click: (name) => {
                                                    if (params.row.lineState == 0) {
                                                        return;
                                                    }
                                                    _this.readDev(params, 2)
                                                }
                                            }
                                        }, "上传运行参数"),
                                        h('DropdownItem', {
                                            props: {
                                                disabled: params.row.lineState == 0 ? true : false,
                                            },
                                            nativeOn: {
                                                click: (name) => {
                                                    if (params.row.lineState == 0) {
                                                        return;
                                                    }
                                                    _this.readDev(params, 3)
                                                }
                                            }
                                        }, "上传日志"),
                                        h('DropdownItem', {
                                            nativeOn: {
                                                click: (name) => {
                                                    _this.readDev(params, 4)
                                                }
                                            }
                                        }, "查看日志"),
                                        h('DropdownItem', {
                                            props: {
                                                disabled: params.row.bussState != 0 ? true : false,
                                            },
                                            nativeOn: {
                                                click: (name) => {
                                                    if (params.row.bussState != 0) {
                                                        return;
                                                    }
                                                    _this.editDev(params)
                                                }
                                            }
                                        }, "编辑设备"),

                                    ])
                                ]),


                            ])
                        }
                    }
                ],
                databody: [],
                loading: true,

                oprah: {},
                searchType: 'search_LIKE_mac',
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
            closemodal() {
                this.editsb = false
                this.editsbforms.saleType = '',
                    this.editsbforms.id = '',
                    this.editsbforms.zoneId = ''
                this.editsbforms.mac = ''
            },


            editsbsubmit() {
                this.$refs['editsbforms'].validate((valid) => {
                    if (valid) {
                        this.Global.fun(this, 'put', {
                                base: '/mdev',
                                other: '?',
                                access_token: this.api.access_token,
                            }, {
                                saleType: this.editsbforms.saleType,
                                zoneId: this.editsbforms.zoneId,
                                id: this.editsbforms.id
                            },
                            function (res, that) {
                                if (res.data.status == 1) {
                                    that.$Message.destroy();
                                    that.$Message.success(res.data.msg);
                                    that.closemodal()
                                    that.refresh()
                                } else {
                                    that.$Message.destroy();
                                    that.$Message.error('设置失败' + res.data.msg);
                                    that.closemodal()
                                    that.refresh()
                                }


                            });
                    } else {
                        this.$Message.error('请完整填写表单');
                    }
                })
            },


            dobtns(e) {
                var _this = this
                var st = ['软件升级', '设备复位', '设备重启', '删除']
                _this.$Modal.confirm({
                    title: '操作确认',
                    content: '<p>确认要执行批量 ' + st[e] + ' 吗？</p>',
                    loading: true,
                    onOk: function () {


                        const el = []
                        var arr = _this.selectedArr
                        for (var j in arr) {
                            console.log(arr[j]);
                            var m = arr[j]
                            for (var i = 0; i < m.length; i++) {
                                el.push(m[i].id);
                            }
                        }


                        const sl = el.join(',')
                        _this.Global.newfun(_this, 'post', {
                            base: '/mdev/multis/',
                            other: e + '?',
                            access_token: _this.api.access_token
                        }, {
                            ids: sl
                        }, function (res, that) {
                            if (res.data.status == 1) {
                                that.$Message.success(res.data.msg);
                                if (e == 3) {
                                    that.refresh();
                                }
                                _this.$Modal.remove()
                            } else {
                                that.$Message.destroy();
                                that.$Message.error(res.data.msg);
                                _this.$Modal.remove()
                            }
                        })
                    },
                });
            },
            // selectionchange(e) {
            //     this.selects = []
            //     this.selects = e
            // },
            selectionchange(e) {
                this.selects = []
                this.selects = e
                if (e.length == 0) {
                    delete this.selectedArr[this.current]
                } else {
                    this.selectedArr[this.current] = e
                }

            },
            change(e) {
                this.json = e
            },
            openHsearch() {
                this.formItem.search_EQ_productId = ''
                this.formItem.search_EQ_activeState = ''
                this.formItem.search_LIKE_mac = ''
                this.formItem.search_EQ_lineState = ''
                this.selectedArr = {}
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
                this.Hsearch = false
                this.selectedArr = {}

            },
            HsearchS() {
                this.search = {},
                    this.selectedArr = {}

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
            refresh: function () {
                this.loading = true
                this.searchValue = 'search_LIKE_mac'
                this.search = {}
                this.selectedArr = {}
                // 				this.search = ''
                // 				this.current = 1
                this.onchanges(this.current);
                this.onnout();
            },
            edit: function (params) {
                this.Global.value = '';
                this.Global.type = '';
                this.$router.push({
                    name: 'mdev_form',
                    query: {
                        id: params.row.productId

                    }
                })

            },
            cancel2: function () {
                this.databody2 = [],
                    this.loading2 = false
            },
            getlist: function () {
                this.loading2 = true

                this.Global.fun(this, 'get', {
                    base: this.api.base,
                    other: '/logs/' + this.mac + '?',
                    access_token: this.api.access_token,
                }, {}, c)

                function c(res, that) {
                    if (res.data.status === 1) {
                        that.databody2 = res.data.data
                        that.loading2 = false;
                    } else {
                        that.$Message.destroy();
                        that.$Message.error(res.data.msg);
                        that.loading2 = false;
                    }
                }
            },

            readDev: function (params, type) {

                if (type !== 4 && params.row.lineState == 0) {
                    return;
                }
                if (type == 4) {
                    this.modal2 = true,
                        this.mac = params.row.mac
                    this.getlist()
                } else {
                    this.loading = true

                    this.Global.fun(this, 'get', {
                        base: this.api.base,
                        other: '/' + params.row.mac + '/' + type + '?',
                        access_token: this.api.access_token,
                    }, {}, d)

                    function d(res, that) {
                        if (res.data.status === 1) {
                            that.$Message.destroy();
                            that.$Message.info("操作成功");
                            that.loading = false;
                            that.$Modal.remove();
                        } else {
                            that.$Message.destroy();
                            that.$Message.error(res.data.msg);
                            that.loading = false;
                            that.$Modal.remove();
                        }
                    }
                }
            },

            editDev: function (params) {
                debugger
                this.editsbforms.id = params.row.id
                this.editsbforms.mac = params.row.mac
                this.editsb = true
            },
            // added: function () {
            //     this.Global.value = '';
            //     this.Global.type = '';
            //     this.$router.push({
            //         name: 'mdev_form',
            //         params: {
            //             id: -1,
            //
            //         }
            //     })
            //
            // },
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
                                data[j]._checked = true
                            }
                        }
                    }

                }

            },
            onchanges: function (e) {
                var that = this
                this.loading = true
                this.searchValue = this.search[this.searchType] ? this.search[this.searchType] : ''
                this.current = e;
                this.Global.fun(this, 'get', {
                    base: this.api.base,
                    other: '/page?',
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
            handleSubmit(name) {
                var js = JSON.stringify(this.json)
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // console.log(this.formV.hardInfo)

                        // var str = (JSON.stringify(this.formV.hardInfo).replace(/\\/g, "")).replace(/ \s*/g, "")
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
                                    that.$Message.error('保存失败' + res.data.msg);

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
            oprahfun: function (e) {
                this.Global.oprahfun(this)
            },
            dosearch: function () {
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
            },

            onnout() {
                this.Global.fun(this, 'get', {
                        base: this.api.base,
                        other: '/statecount?',
                        access_token: this.api.access_token,
                    }, '',

                    function (res, that) {

                        if (res.data.status == 1) {

                            const muns = res.data.data.split(',')
                            debugger
                            that.online = muns[0]
                            that.outline = muns[1]
                            that.allline = muns[2]

                        } else {
                            that.$Message.destroy();
                            that.$Message.error('设备数据获取失败');

                        }

                    });

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

        }
        ,
        created: function () {
            this.searchType = 'search_LIKE_mac',
                this.loading = true,

                this.refresh()
            this.getoptions()
        }
        ,
    }
</script>

<style scoped>
    .inline {
        display: inline-block;
        margin-right: 8px;
        position: relative;
        top: 1px;
    }

    .inline .ivu-alert.ivu-alert-with-icon {
        padding: 8px 15px 8px 36px;
    }

</style>
<style>
    .editbox .ivu-modal-footer {
        border-top: 0px solid #e9eaec;
    }
</style>
