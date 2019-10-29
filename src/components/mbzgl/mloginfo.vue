<template>

    <Form :model="formItem" :label-width="80" style="overflow: hidden">-->
                                    <Col span="23">
                                        <FormItem label="用户账号">
                                            <Input v-model="formItem.search_LIKE_phone" placeholder="请输入手机号码"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="23">
                                        <FormItem label="用户昵称">
                                            <Input v-model="formItem.search_LIKE_name" placeholder="请输入用户昵称"></Input>
                                        </FormItem>
                                    </Col>

                                </Form>

</template>

<script>
    export default {
        name: "mlog"
    }
</script>

<style scoped>

</style>
