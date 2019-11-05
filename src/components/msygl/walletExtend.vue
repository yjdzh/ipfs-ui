<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>

        <Row>
            <Col span="8">
                <span class="expand-key">总收益类型：</span>
                <span class="expand-value" v-text="(row.sourceType===0)?'官网获取':'自定义'"></span>
            </Col>
            <Col span="8">
                <span class="expand-key">自维分配类型：</span>
                <span class="expand-value" v-text="(row.maintainType===0)?'客户自维设备在线数量':'客户自维设备总数量'"></span>
            </Col>
            <Col span="8">
                <span class="expand-key">自维计提比例：</span>
                <span class="expand-value" v-text="(row.maintainAccrue===null)?'暂无数据':row.maintainAccrue"></span>
            </Col>
        
            <Col span="8">
                <span class="expand-key">总节点类型：</span>
                <span class="expand-value" v-text="(row.nodesType===0)?'库存设备总数':((row.nodesType===1)?'总在线设备数':'自定义节点数')"></span>
            </Col>
            <Col span="8">
                <span class="expand-key">托管分配类型：</span>
                <span class="expand-value" v-text="(row.trusteeType===0)?'客户托管设备在线数量':'客户托管设备总数量'"></span>
            </Col>
            <Col span="8">
                <span class="expand-key">托管计提比例：</span>
                <span class="expand-value" v-text="(row.trusteeAccrue===null)?'暂无数据':row.trusteeAccrue"></span>
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
