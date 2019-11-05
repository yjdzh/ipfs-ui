<template>
    <EVpageForm :pageTitle="pageTitle+title" :model="formValidate" :rules="infoChangeRules" :labelWidth="120"
        :doSubmitBefor="doSubmitBefor" :submitUrl="submitUrl" :submitType="submitType" :doReset="creat" :doCancal="doCancal"
        :pageload="pageload">
        <div slot="form">

            <EVdivider orientation="left">基础信息</EVdivider>
            <Row>
                <EVitemContainer label="数据中心" prop="zoneId" :span="12">
                    <Select v-model="formValidate.zoneId" :disabled="this.openType!=-1">
                        <Option :value="zoneOption.id" :label="zoneOption.name" v-for="zoneOption in zoneOptions" :key="zoneOption.index"></Option>
                    </Select>
                </EVitemContainer>

                <EVitemContainer label="币种" prop="virId" :span="12">
                    <Select v-model="formValidate.virId" :disabled="this.openType!=-1">
                        <Option :value="virOption.id" :label="virOption.name" v-for="virOption in virOptions" :key="virOption.index"></Option>
                    </Select>
                </EVitemContainer>

            </Row>
            <Row>
                <EVitemContainer label="钱包地址" prop="realMoneyUrl" :span="24">
                    <Input v-model="formValidate.realMoneyUrl" placeholder="请输入钱包地址"></Input>
                </EVitemContainer>
            </Row>




            <EVdivider orientation="left">单台设备收益计算</EVdivider>
            <Row>
                <EVitemContainer label="总收益获取方式" prop="sourceType" :span="12">
                    <RadioGroup v-model="formValidate.sourceType" type="button">
                        <Radio :label="0">官网获取</Radio>
                        <Radio :label="1">自定义</Radio>
                    </RadioGroup>
                </EVitemContainer>

                <EVitemContainer v-if="formValidate.sourceType==1" label="自定义总收益" prop="sourceNum" :span="12">
                    <EVinputNumber v-model="formValidate.sourceNum" :min="1" :max="100000000" placeholder="请输入自定义总收益"></EVinputNumber>
                </EVitemContainer>
            </Row>


            <Row>
                <EVitemContainer label="总节点数" prop="nodesType" :span="12">
                    <RadioGroup v-model="formValidate.nodesType" type="button">
                        <Radio :label="0">库存设备总数</Radio>
                        <Radio :label="1">总在线设备数</Radio>
                        <Radio :label="2">自定义节点数</Radio>
                    </RadioGroup>
                </EVitemContainer>

                <EVitemContainer v-if="formValidate.nodesType==2" label="自定义节点数量" prop="nodesNum" :span="12">
                    <EVinputNumber v-model="formValidate.nodesNum" :min="1" :max="100000000" placeholder="请输入自定义节点数量"></EVinputNumber>
                </EVitemContainer>
            </Row>


            <EVdivider orientation="left">客户收益分配方式</EVdivider>
            <Row>
                <EVitemContainer label="自维设备分配方式" prop="maintainType" :span="12">
                    <RadioGroup v-model="formValidate.maintainType" type="button">
                        <Radio :label="0">客户自维设备在线数量</Radio>
                        <Radio :label="1">客户自维设备总数量</Radio>
                    </RadioGroup>
                </EVitemContainer>

                <EVitemContainer label="自维设备记提比例" prop="maintainAccrue" :span="12">
                    <EVinputNumber v-model="formValidate.maintainAccrue" :min="1" :max="99" placeholder="请输入自维设备记提比例(%)"></EVinputNumber>
                </EVitemContainer>
            </Row>
            <Row>
                <EVitemContainer label="托管设备分配方式" prop="trusteeType" :span="12">
                    <RadioGroup v-model="formValidate.trusteeType" type="button">
                        <Radio :label="0">客户托管设备在线数量</Radio>
                        <Radio :label="1">客户托管设备总数量</Radio>
                    </RadioGroup>
                </EVitemContainer>

                <EVitemContainer label="托管设备记提比例" prop="trusteeAccrue" :span="12">
                    <EVinputNumber v-model="formValidate.trusteeAccrue" :min="1" :max="99" placeholder="请输入托管设备记提比例(%)"></EVinputNumber>
                </EVitemContainer>
            </Row>
            <Row>
                <EVitemContainer label="收益获取时间" prop="cycleTime" :span="24">
                    <!--					 <Input v-model="formValidate.cycleTime"  placeholder="请输入收益获取时间(HH:mm:ss)"></Input>-->
                    <TimePicker :value="formValidate.cycleTime" @on-change=ochange format="HH:mm:ss" placeholder="请输入收益获取时间"
                        style="width: 168px"></TimePicker>

                </EVitemContainer>
            </Row>



            <EVdivider orientation="left">提币规则</EVdivider>
            <Row>
                <EVitemContainer label="最小提币额度" prop="minQuota" :span="12">
                    <EVinputNumber v-model="formValidate.minQuota" :min="1" :max="10000" placeholder="请输入最小提币额度"></EVinputNumber>
                </EVitemContainer>

                <EVitemContainer label="提币倍数" prop="multipleNum" :span="12">
                    <EVinputNumber v-model="formValidate.multipleNum" :min="1" :max="10000" placeholder="请输入提币倍数"></EVinputNumber>
                </EVitemContainer>
            </Row>
            <Row>
                <EVitemContainer label="办结时长(小时)" prop="transactTime" :span="24">
                    <EVinputNumber v-model="formValidate.transactTime" :min="1" :max="168" placeholder="请输入办结时长(小时)"></EVinputNumber>
                </EVitemContainer>
            </Row>

        </div>
    </EVpageForm>
</template>

<script>
    export default {
        name: "mwallet",
        data() {
            var _this = this
            const zoneId = function(coder, value, callback) {
                if (value === '') {
                    callback(new Error('请选择所属数据中心'));
                } else {


                    if (_this.formValidate.zoneId.length >= 12) {
                        callback(new Error('输入过长'));
                    } else {

                        _this.Global.ajax(
                            _this,
                            'get', {
                                base: '/mwallet/',
                                other: '/exist?',
                                access_token: _this.api.access_token
                            },
                            function() {
                                if (_this.openType !== -1) {
                                    return {
                                        zoneId: _this.formValidate.zoneId,
                                        id: _this.openType
                                    }
                                } else {
                                    return {
                                        zoneId: _this.formValidate.zoneId,
                                    }
                                }
                            }(), aa
                        )

                        function aa(a, b) {
                            if (a.data.status === 0) {
                                return callback(new Error(a.data.msg));
                            } else {
                                return callback()
                            }
                        }
                    }
                }
            };
            const virId = function(coder, value, callback) {
                if (value === '') {
                    callback(new Error('请选择所属币种'));
                } else {


                    if (_this.formValidate.virId.length >= 12) {
                        callback(new Error('输入过长'));
                    } else {

                        _this.Global.ajax(
                            _this,
                            'get', {
                                base: '/mvirdict',
                                other: '/exist?',
                                access_token: _this.api.access_token
                            },
                            function() {
                                if (_this.openType !== -1) {
                                    return {
                                        virId: _this.formValidate.virId,
                                        id: _this.openType
                                    }
                                } else {
                                    return {
                                        virId: _this.formValidate.virId,

                                    }
                                }
                            }(), aa
                        )

                        function aa(a, b) {
                            if (a.data.status === 0) {
                                return callback(new Error(a.data.msg));
                            } else {
                                return callback()
                            }
                        }
                    }
                }
            };

            const nodesnumrules = function(coder, value, callback) {
                debugger
                if (_this.formValidate.nodesType == 2 && !_this.formValidate.nodesNum) {
                    return callback(new Error('自定义节点数量不能为空'));
                } else {
                    return callback()
                }
            }

            const sourcenumrules = function(coder, value, callback) {
                debugger
                if (_this.formValidate.sourceType == 1 && !_this.formValidate.sourceNum) {
                    return callback(new Error('自定义总收益不能为空'));
                } else {
                    return callback()
                }
            }


            return {
                api: {
                    base: '/mwallet',
                    access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),
                },

                pageTitle: '数据中心钱包-',
                pageload: true,
                search: '111',
                current: 1,
                openType: -1,

                zoneOptions: [ //下拉选项

                ],

                virOptions: [ //下拉选项

                ],


                formValidate: {
                    zoneId: '',
                    virId: '',
                    realMoneyUrl: '',
                    cycleTime: '',
                    minQuota: '',
                    multipleNum: '',
                    transactTime: '',
                    nodesType: '',
                    nodesNum: '',
                    sourceType: '',
                    sourceNum: '',
                    maintainType: '',
                    maintainAccrue: '',
                    trusteeType: '',
                    trusteeAccrue: '',
                },

                infoChangeRules: {
                    zoneId: [{
                        type: 'number',
                        required: true,
                        message: '请选择所属数据中心',
                        // validator: zoneId,
                        trigger: 'change'
                    }],
                    virId: [{
                        type: 'number',
                        required: true,
                        // validator: virId,
                        message: '请选择所属币种',
                        trigger: 'change'
                    }],
                    realMoneyUrl: [{
                            required: true,
                            message: '请输入钱包地址',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            max: 100,
                            message: '输入字符不得多于100个',
                            trigger: 'change'
                        }
                    ],
                    cycleTime: [{

                        required: true,
                        message: '请输入收益获取时间',
                        trigger: 'change'
                    }],
                    minQuota: [{
                        type: 'number',
                        required: true,
                        message: '请输入最小提币额度',
                        trigger: 'change'
                    }],
                    multipleNum: [{
                        type: 'number',
                        required: true,
                        message: '请输入提币倍数',
                        trigger: 'change'
                    }],
                    transactTime: [{
                        type: 'number',
                        required: true,
                        message: '请输入办结时长',
                        trigger: 'change'
                    }],
                    nodesType: [{
                        type: 'number',
                        required: true,
                        message: '请选择总节点数',
                        trigger: 'change'
                    }],
                    nodesNum: [{
                        validator: nodesnumrules,
                        trigger: 'change'
                    }], 
                    sourceType: [{
                        type: 'number',
                        required: true,
                        message: '请选择自定义总收入',
                        trigger: 'change'
                    }],
                    sourceNum: [{
                        validator: sourcenumrules,
                        trigger: 'change'
                    }],                    
                    maintainType: [{
                        type: 'number',
                        required: true,
                        message: '请选择自维设备分配方式',
                        trigger: 'change'
                    }],
                    maintainAccrue: [{
                        type: 'number',
                        required: true,
                        message: '请输入自维计提比例',
                        trigger: 'change'
                    }],
                    trusteeType: [{
                        type: 'number',
                        required: true,
                        message: '请选择托管设备分配方式',
                        trigger: 'change'
                    }],
                    trusteeAccrue: [{
                        type: 'number',
                        required: true,
                        message: '请输入托管计提比例',
                        trigger: 'change'
                    }],
                },
            }
        },

        computed: {
            doCancal() {
                return {
                    name: 'msygl-mwallet',
                    query: {
                        search: this.search,
                        current: this.current,
                    }
                }

            },
            title() {
                return Number(this.openType) === -1 ? '新增' : '编辑'
            },
            submitType() {
                return this.openType
            },
            submitUrl() {
                return this.openType === -1 ? this.api.base + '?' : this.api.base + '/' + this.openType + '?'
            },


        },
        methods: {
            ochange(e) {

                this.formValidate.cycleTime = e
            },
            doSubmitBefor: function(data, e) {

            },
            creat() {
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


                this.Global.fun(this, 'get', {
                        base: '/mvirdict',
                        other: '/all?',
                        access_token: this.api.access_token,
                    }, {},
                    function(res, that) {
                        if (res.data.status == 1) {
                            that.$Message.destroy();
                            that.virOptions = res.data.data
                        } else {
                            that.$Message.destroy();
                            that.$Message.error(res.data.msg);
                        }

                    })
                if (this.openType === -1 || this.openType === '-1') {
                    this.pageload = false
                } else {
                    this.Global.fun(this, 'get', {
                            base: this.api.base,
                            other: '/' + this.openType + '?',
                            access_token: this.api.access_token,
                        }, {},
                        function(res, that) {
                            const st = res.data.status
                            if (st === 1) {
                                for (var key in res.data.data) {
                                    if (res.data.data[key] === null) {
                                        res.data.data[key] = ''
                                    }
                                }
                                var back = res.data.data;
                                Object.keys(that.formValidate).forEach(function(key) {
                                    that.formValidate[key] = back[key];
                                });


                            } else {
                                that.$Message.destroy();
                                that.$Message.info(res.data.msg);
                            }
                            that.pageload = false;


                        })
                }
            }
        },
        created() {
            this.openType = parseInt(this.$route.query.id)
            this.current = parseInt(this.$route.query.current)
            this.search = this.$route.query.search
            this.creat();
        }
    }
</script>

<style scoped>

</style>
