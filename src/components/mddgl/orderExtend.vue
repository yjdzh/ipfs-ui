<style scoped>
    .expand-row {
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <!--	收货地址 address（saleState ==0时显示，即销售类型为自维时显示）-->
        <!--	收货电话  addressTel（saleState ==0时显示）-->
        <!--	收货人  addressContacter（saleState ==0时显示）-->
        <!--	托管时长 trusteeDuration（saleState ==1时显示，即销售类型为托管时显示）-->
        <!--	支付方式 payType  （0：支付宝 1：微信）-->
        <!--	创建时间 ctime（时间戳，转换成字符串格式显示）-->

        <Row>
			<Col span="6" >
				
			    <span class="expand-key">收货人：</span>
			    <span class="expand-value" v-text="(!row.addressContacter)?'暂无数据':row.addressContacter"></span>
			</Col>
			<Col span="6" >
			    <span class="expand-key">收货电话：</span>
			    <span class="expand-value" v-text="(!row.addressTel)?'暂无数据':row.addressTel"></span>
			</Col>
            <Col span="12" >
                <span class="expand-key">收货地址：</span>
                <span class="expand-value" v-text="(!row.address)?'暂无数据':row.address"></span>
            </Col>
                    
           
            <Col span="6">
                <span class="expand-key">支付方式：</span>
                <span class="expand-value" v-text="row.payType==1?'微信':'支付宝'"></span>
            </Col>
            <Col span="6">
                <span class="expand-key">创建时间：</span>
                <span class="expand-value" v-text="(!row.ctime)?'暂无数据':this.Global.getDate(row.ctime)"></span>
            </Col>
			 <Col span="12" v-if="row.saleState==1||row.saleState=='1'">
			    <span class="expand-key">托管时长：</span>
			    <span class="expand-value" v-text="(!row.trusteeDuration)?'暂无数据':row.trusteeDuration+'个月'"></span>
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
