<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>

        <Row>
            <Col span="6">
                <span class="expand-key">自维购买价格：</span>
                <span class="expand-value" v-text="(!row.maintainPrice)?'暂无数据':row.maintainPrice"></span>
            </Col>
            <Col span="4">
                <span class="expand-key">自维默认折扣：</span>
                <span class="expand-value" v-text="(!row.maintainDiscount)?'暂无数据':row.maintainDiscount"></span>
            </Col>
            <Col span="6">
                <span class="expand-key">托管购买价格：</span>
                <span class="expand-value" v-text="(!row.trusteePrice)?'暂无数据':row.trusteePrice+'元/月'"></span>
            </Col>
            <Col span="4">
                <span class="expand-key">托管默认折扣：</span>
                <span class="expand-value" v-text="(!row.trusteeDiscount)?'暂无数据':row.trusteeDiscount"></span>
            </Col>
            <Col span="4">
                <span class="expand-key">最低托管时长：</span>
                <span class="expand-value" v-text="(!row.trusteeMin)?'暂无数据':row.trusteeMin+'个月'"></span>
            </Col>
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
