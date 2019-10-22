<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>

        <Row>
            <!--<Col span="8">-->
                <!--<span class="expand-key">电子邮件：</span>-->
                <!--<span class="expand-value" v-text="(row.email===null)?'暂无数据':row.email"></span>-->
            <!--</Col>-->
            <!--<Col span="8">-->
                <!--<span class="expand-key">身份证号：</span>-->
                <!--<span class="expand-value" v-text="(row.idCard===null)?'暂无数据':row.idCard"></span>-->
            <!--</Col>-->
            <!--<Col span="8">-->
                <!--<span class="expand-key">生日：</span>-->
                <!--<span class="expand-value" v-text="(row.birthday===null)?'暂无数据':row.birthday"></span>-->
            <!--</Col>-->
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>
