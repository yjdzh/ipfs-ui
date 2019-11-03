<template>

    <div class="logbox">
        <h5 class="logtit">日志详情</h5>


        <!--        moduleName（模块），methodName（业务），level（级别），operateUser（操作用户），types（日志类型，1-运营日志，0-app日志"）,createdTime(操作时间)，content（内容，使用textarea显示），success（操作结果）-->


        <Col span="12">

            <!--            <FormItem label="模块">-->
            <p class="infoitem"><b>模块:</b>  {{datas.moduleName}}</p>
            <!--            </FormItem>-->
        </Col>
        <Col span="12">
            <!--            <FormItem label="业务">-->
            <p class="infoitem"> <b>业务:</b> {{datas.methodName}}</p>
            <!--            </FormItem>-->
        </Col>
        <Col span="12">

            <!--            <FormItem label="级别">-->
            <p class="infoitem"> <b>级别:</b> {{datas.level}}</p>
            <!--            </FormItem>-->
        </Col>
        <Col span="12">
            <!--            <FormItem label="操作用户">-->
            <p class="infoitem"> <b>操作用户:</b> {{datas.operateUser}}</p>
            <!--            </FormItem>-->
        </Col>
        <Col span="12">

            <!--            <FormItem label="日志类型">-->
            <p class="infoitem"> <b>日志类型:</b> {{datas.types==1?'运营日志':'app日志'}}</p>
            <!--            </FormItem>-->
        </Col>
        <Col span="12">
            <!--            <FormItem label="操作时间">-->
            <p class="infoitem"> <b>操作时间:</b> {{datas.createdTime}}</p>
            <!--            </FormItem>-->
        </Col>
        <Col span="12">

            <!--            <FormItem label="操作结果">-->
            <p class="infoitem"> <b>操作结果:</b> {{datas.success?'成功':'失败'}}</p>
            <!--            </FormItem>-->
        </Col>
        <Col span="24">
            <!--            <FormItem label="内容">-->
            <p class="infoitem"> <b>内容:</b> {{datas.content}}</p>
            <!--            </FormItem>-->
        </Col>

    </div>

</template>

<script>
    export default {
        name: "mlog",
        data() {
            return {
                api: {
                    base: '/mpuser', //请求部分
                    access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),
                },
                openType: '',
                datas: {

                    moduleName: '',
                    methodName: '',
                    level: '',
                    operateUser: '',
                    types: '',
                    createdTime: '',
                    content: '',
                    success: ''
                }
            }
        },
        methods: {
            dataget() {

                this.Global.fun(this, 'get', {
                        base: '/mlogs',
                        other: '/' + this.openType + '?',
                        access_token: this.api.access_token,
                    }, {},
                    function (res, that) {

                        if (res.data.status == 1) {
                            that.$Message.destroy();


                            that.datas.moduleName = res.data.data.moduleName,
                                that.datas.methodName = res.data.data.methodName,
                                that.datas.level = res.data.data.level,
                                that.datas.operateUser = res.data.data.operateUser,
                                that.datas.types = res.data.data.types,
                                that.datas.createdTime = res.data.data.createdTime,
                                that.datas.content = res.data.data.content,
                                that.datas.success = res.data.data.success


                        } else {
                            that.$Message.destroy();
                            that.$Message.error(res.data.msg);
                        }

                    })
            },
        },

        created() {

            this.openType = parseInt(this.$route.query.id)
            this.dataget()
        }
    }
</script>

<style scoped lang="less">
    .logbox {
        padding: 20px;
        box-sizing: border-box;

        .logtit {
            line-height: 30px;
            font-size: 18px;
            text-align: center;
            margin-bottom: 20px;
        }
        .infoitem{
            line-height: 30px;
            font-size: 14px;
            text-align: left;
            margin: 20px;
            b{
                width: 80px;
                display: inline-block;
                text-align: left;
                padding-right: 10px;
                box-sizing: border-box;
            }
        }

    }

</style>
