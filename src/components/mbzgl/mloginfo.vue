<template>

    <Form :model="datas" :label-width="80" style="overflow: hidden">


        <!--        moduleName（模块），methodName（业务），level（级别），operateUser（操作用户），types（日志类型，1-运营日志，0-app日志"）,createdTime(操作时间)，content（内容，使用textarea显示），success（操作结果）-->


        <Col span="12">

            <FormItem label="模块">
                {{datas.moduleName}}
            </FormItem>
        </Col>
        <Col span="12">
            <FormItem label="业务">
                {{datas.methodName}}
            </FormItem>
        </Col>
        <Col span="12">

            <FormItem label="级别">
                {{datas.level}}
            </FormItem>
        </Col>
        <Col span="12">
            <FormItem label="操作用户">
                {{datas.operateUser}}
            </FormItem>
        </Col>
        <Col span="12">

            <FormItem label="日志类型">
                {{datas.types}}
            </FormItem>
        </Col>
        <Col span="12">
            <FormItem label="操作时间">
                {{datas.createdTime}}
            </FormItem>
        </Col>
        <Col span="12">

            <FormItem label="操作结果">
                {{datas.success}}
            </FormItem>
        </Col>
        <Col span="24">
            <FormItem label="内容">
                {{datas.content}}
            </FormItem>
        </Col>

    </Form>

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
        methods:{
            dataget() {
                debugger
                this.Global.fun(this, 'get', {
                        base: '/mlogs',
                        other: '/'+this.openType+'?',
                        access_token: this.api.access_token,
                    }, {},
                    function (res, that) {
                    debugger
                        if (res.data.status == 1) {
                            that.$Message.destroy();


                            that.datas.moduleName=res.data.data.moduleName,
                                that.datas.methodName=res.data.data.methodName,
                                that.datas.level=res.data.data.level,
                                that.datas.operateUser=res.data.data.operateUser,
                                that.datas.types=res.data.data.types,
                                that.datas.createdTime=res.data.data.createdTime,
                                that.datas.content=res.data.data.content,
                                that.datas.success=res.data.data.success







                        } else {
                            that.$Message.destroy();
                            that.$Message.error(res.data.msg);
                        }

                    })
            },
        },

        created() {
            debugger
            this.openType = parseInt(this.$route.query.id)
            this.dataget()
        }
    }
</script>

<style scoped>

</style>
