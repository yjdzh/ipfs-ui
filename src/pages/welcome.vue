<template>
    <div class="wel">
        <img class="wellogo" src="../assets/biglogo.png">

        <h3>公司介绍：币码翁·星际特工是一家致力于区块链分布式存储的技术开发公司</h3>
        <h4>软件名称：币码翁智能云/bitcodeman</h4>


        <p>软件说明：这是一款一键式挖矿软件，区块链分布式存储软硬件技术服务提供商。</p>
        <p>软件版本：v1.0</p>
        <img class="wellogobottom" src="../assets/logobottom.png">
    </div>

</template>

<script>


    export default {
        name: 'welcome',
        data () {
            return {}
        },
        created: function () {

        }
    }
</script>

<style>
    .wel {
        background: #fff;
        padding: 28px 55px;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        background-image: url("../assets/welcome.png");
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .wel .wellogo {
        /*background: #fff;*/
        width: auto;
        height: 120px;
        box-sizing: border-box;
        display: inline-block;
        /*background-image: url("../assets/biglogo.png");*/
        /*background-position: center center;*/
        /*background-repeat: no-repeat;*/
        /*background-size: cover;*/
    }

    .wel .wellogobottom {
        position: absolute;
        bottom: 20px;
        width: 110px;
        height: auto;
        left: 50%;
        margin-left: -55px;

    }

    .wel h3 {
        margin-top: 20px;
        font-size: 24px;
        color: #fff;
        line-height: 55px;
    }

    .wel h4 {
        font-size: 24px;
        margin-bottom: 20px;
        color: #fff;
        line-height: 30px;
    }

    .wel p {
        font-size: 16px;
        color: #fff;
        line-height: 30px;
    }

</style>

