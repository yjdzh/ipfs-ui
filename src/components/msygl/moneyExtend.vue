<style scoped>
    .expand-row {
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        
        <Row>
			<Col span="24" >				
			    <span class="expand-key">filenet钱包地址：</span>
			    <span class="expand-value" v-text="(!row.filenetUrl)?'暂无数据':row.filenetUrl"></span>
			</Col>
			
			<Col span="24" >				
			    <span class="expand-key">xmr钱包地址：</span>
			    <span class="expand-value" v-text="(!row.xmrUrl)?'暂无数据':row.xmrUrl"></span>
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
