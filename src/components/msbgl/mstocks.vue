<template>
    <div class="EVbase" style="padding:0;">
        <EVpageList :pageTitle="pageTitle">
            <div slot="searchBox" class="serach">
                <Input v-model.trim="searchValue" :class="selsctclass">
                <Select v-model="searchType" slot="prepend" style="width: 80px">
                    <Option :value="option.value" :label="option.label" v-text="option.label" v-for="option in options"
                        :key="option.index"></Option>
                </Select>
                <Button slot="append" icon="ios-search" @click="dosearch" @mouseleave.native="Global.stopself($event)"></Button>
                </Input>
            </div>
            <div slot="btnBox" class="btn">
                <Button @click="uploads=true" type="primary">批量入库</Button>
                <Button @click="added" type="success">手动入库</Button>
                <Button @click="refresh" type="info" @mouseleave.native="Global.stopself($event)">刷新</Button>
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
        <Modal v-model="uploads" title="批量入库">

            <Form ref="formValidate" v-if="uploads" :model="formValidate" :rules="ruleValidate" :label-width="80">

                <FormItem label="数据中心" prop="zoneId">
                    <Select v-model="formValidate.zoneId" @on-change="onchange">
                        <Option :value="zoneOption.id" v-text="zoneOption.name" v-for="zoneOption in zoneOptions" :key="zoneOption.index"></Option>
                    </Select>
                </FormItem>
                <div style="margin-bottom: 15px"><span>模版下载：</span><a href="http://47.92.51.100/ipfs/templete/dev_upload_templet.xlsx">点击下载模板</a></div>
                <EVupload v-if="formValidate.zoneId" :actionUrl="actionUrl" :doAfterUpload="doAfterUpload" :data=data
                    :type="type"></EVupload>
            </Form>

            <div slot="footer">
            </div>
        </Modal>


    </div>


</template>

<script>
    // import dev from './devExtend.vue';

    export default {
        name: "mstocks",
        // components: {dev},
        data() {
            var _this = this;
            return {
                uploads: false,
                doAfterUpload: function(e) {
                    debugger
                    if (e.data.status == 1) {
                        _this.uploads = false
                        _this.formValidate.zoneId = ''
                    }
                },
                type: ['xlsx'],
                api: {
                    base: '/mstocks', //请求部分
                    access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),
                },
                pageTitle: '库存管理', //页面标题
                totalpage: 0,
                pagesize: this.Global.pagesize,
                current: 1,
                options: [ //下拉选项
                    {
                        label: '产品名称',
                        value: 'name',
                    },

                ],
                datahead: [{
                        align: 'left',
                        title: '产品名称',
                        render: function(h, params) {
                            return h('span', [params.row.name])
                        }
                    },
                    {
                        align: 'center',
                        title: '自维总量',
                        width: 120,
                        render: function(h, params) {
                            return h('span', [params.row.maintainStock])
                        }
                    },
                    {
                        align: 'center',
                        title: '自维已销售量',
                        width: 120,
                        render: function(h, params) {
                            return h('span', [params.row.useMaintainNum])
                        }
                    },
                    {
                        align: 'center',
                        title: '自维库存余量',
                        width: 120,
                        render: function(h, params) {
                            return h('span', [params.row.unUseMaintainNum])
                        }
                    },
                    {
                        align: 'center',
                        title: '托管总量',
                        width: 120,
                        render: function(h, params) {
                            return h('span', [params.row.trusteeStock])
                        }
                    },
                    {
                        align: 'center',
                        title: '托管已分配',
                        width: 120,
                        render: function(h, params) {
                            return h('span', [params.row.useTrusteeNum])
                        }
                    },
                    {
                        align: 'center',
                        title: '托管未分配',
                        width: 120,
                        render: function(h, params) {
                            return h('span', [params.row.unUseTrusteeNum])
                        }
                    },
                ],
                databody: [],
                loading: false,
                search: '',
                oprah: {},
                searchType: '',
                searchValue: '',
                formValidate: {
                    zoneId: 0
                },
                ruleValidate: {
                    zoneId: [{
                        type: 'number',
                        required: true,
                        message: '请选择数据中心',
                        trigger: 'change'
                    }],
                },
                zoneOptions: [],
                data: {
                    zoneId: 0
                }
            };
        },
        computed: {
            disabledadd() {
                return false
            },
            selsctclass() {
                return this.options.length === 1 ? 'overhidden' : ''
            },
            actionUrl() {
                return '/mstocks/upload?' + this.api.access_token
            }
        },
        methods: {
            onchange(e) {

                this.data.zoneId = e
            },
            refresh: function() {
                this.loading = true
                var _this = this;
                //                 this.searchType = 'name'
                //                 this.searchValue = ''
                //                 this.search = ''
                //                 this.current = 1
                this.onchanges(this.current)
            },
            edit: function(params) {
                this.Global.value = '';
                this.Global.type = '';
                this.$router.push({
                    name: 'mstocks_form',
                    query: {
                        id: params.row.id.toString(),

                    }
                })

            },
            added: function() {
                this.Global.value = '';
                this.Global.type = '';
                this.$router.push({
                    name: 'mstocks_form',
                    query: {
                        id: '-1',

                    }
                })

            },
            onchanges: function(e) {
                this.loading = true
                this.searchValue = this.search === '' ? '' : this.search
                this.current = e;
                this.Global.fun(this, 'get', {
                    base: this.api.base,
                    other: '/page?',
                    access_token: this.api.access_token
                }, this.searchValue !== '' ? JSON.parse('{"' + 'search_LIKE_' + this.searchType + '":"' +
                    this.searchValue + '","page":"' + (this.current - 1) + '","size":"' + this.pagesize +
                    '"}') : {
                    page: this.current - 1,
                    size: this.pagesize
                }, c)

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
            },
            getoptions() {
                this.Global.fun(this, 'get', {
                        base: '/mzone',
                        other: '/all?',
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
            this.searchType = 'name',
                this.loading = true
            this.refresh()

            this.getoptions()
        },
    }
</script>

<style scoped>

</style>
