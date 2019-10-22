<style lang="less">
  @keyframes error403animation {
    0% {
      transform: rotateZ(0deg);
    }
    40% {
      transform: rotateZ(-20deg);
    }
    45% {
      transform: rotateZ(-15deg);
    }
    50% {
      transform: rotateZ(-20deg);
    }
    55% {
      transform: rotateZ(-15deg);
    }
    60% {
      transform: rotateZ(-20deg);
    }
    100% {
      transform: rotateZ(0deg);
    }
  }
  .error403{
    &-body-con{
      width: 700px;
      height: 500px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      &-title{
        text-align: center;
        font-weight: 700;
        color: #2d8cf0;
        margin-top: 40px;
        .error403-0-span{
          display: inline-block;
          position: relative;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          border: 12px solid #ed3f14;
          color: #ed3f14;
          margin-right: 10px;
          i{
            display: inline-block;
            font-size: 60px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
          }
        }
        .error403-key-span{
          display: inline-block;
          position: relative;
          width: 100px;
          height: 190px;
          border-radius: 50%;
          margin-right: 10px;
          i{
            display: inline-block;
            font-size: 190px;
            position: absolute;
            left: 20px;
            transform: translate(-50%,-60%);
            transform-origin: center bottom;
            animation: error403animation 2.8s ease 0s infinite;
          }
        }
      }
      &-message{
        display: block;
        text-align: center;
        font-size: 46px;
        font-weight: 500;
        letter-spacing: 4px;
        color: #dddde2;
          margin: 30px 0;
      }
    }
    &-btn-con{
      text-align: center;
      padding: 20px 0;
      margin-bottom: 40px;
    }
  }
</style>

<template>
    <div class="error403">
        <div class="error403-body-con">
            <Card>
                <div class="error403-body-con-title">
                    <span class="error403-0-span">
                        <Icon type="android-lock"></Icon>
                    </span>
                    <!--<span class="error403-key-span">-->
                        <!--<Icon size="220" type="ios-bolt"></Icon>-->
                    <!--</span>-->
                </div>
                <p class="error403-body-con-message">授权已过期，请重新登录。</p>
                <div class="error403-btn-con">
                    <Button @click="goHome" size="large" style="width: 200px;" type="info">重新登录</Button>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>


  export default {
    name: 'Error401',
    methods: {
      /*backPage () {
        this.$router.go(-1)
      },*/
      goHome () {
        this.$router.push({
          name: 'Logout'
        });
      }
    }
  }
</script>
