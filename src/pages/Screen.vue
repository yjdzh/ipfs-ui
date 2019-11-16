<template>
    <div class="mainContentbox">
        <div class="mainContent">
            <div class="screenH">
                <div class="screenHlogo"></div>
                <div class="screenHtitle">IPFS星际特工全球分布式云存储监测系统</div>
               <!-- <div class="screenHlogin"><a @click="login">登录</a></div> -->
            </div>
            <div class="screenB">
                <div class="screenBleft">
                    <div class="left1box">
                        <div class="pront">
                            <div class="loader3 p0">
                                <span></span>
                                <span></span>
                            </div>

                            <div class="loader3 p1">
                                <span></span>
                                <span></span>
                            </div>
                            <div class="loader3 p2">
                                <span></span>
                                <span></span>
                            </div>
                            <div class="loader3 p3">
                                <span></span>
                                <span></span>
                            </div>

                            <div class="loader3 p4">
                                <span></span>
                                <span></span>
                            </div>
                            <div class="loader3 p5">
                                <span></span>
                                <span></span>
                            </div>
                            <div class="loader3 p6">
                                <span></span>
                                <span></span>
                            </div>
                            <div class="loader3 p7">
                                <span></span>
                                <span></span>
                            </div>
                            <div class="loader3 p8">
                                <span></span>
                                <span></span>
                            </div>
                            <div class="loader3 p9">
                                <span></span>
                                <span></span>
                            </div>
                            <div class="loader3 p10">
                                <span></span>
                                <span></span>
                            </div>
                            <div class="loader3 p11">
                                <span></span>
                                <span></span>
                            </div>
                            <div class="loader3 p12">
                                <span></span>
                                <span></span>
                            </div>
                            <div class="loader3 p13">
                                <span></span>
                                <span></span>
                            </div>
                            <div class="loader3 p14">
                                <span></span>
                                <span></span>
                            </div>
                            <div class="loader3 p15">
                                <span></span>
                                <span></span>
                            </div>
                            <div class="loader3 p16">
                                <span></span>
                                <span></span>
                            </div>
                            <div class="loader3 p17">
                                <span></span>
                                <span></span>
                            </div>
                        </div>


                        <i class="tl con1"></i>
                        <i class="tl con2"></i>
                        <i class="tr con1"></i>
                        <i class="tr con2"></i>
                        <i class="bl con1"></i>
                        <i class="bl con2"></i>
                        <i class="br con1"></i>
                        <i class="br con2"></i>
                        <p class="left1info">
                            <span>总节点 <b class="violet">{{allline}}万台</b></span>
                            <span>在线节点 <b class="green">{{online}}万台</b></span>
                            <span>离线节点 <b class="red">{{unline}}万台</b></span>
                        </p>
                        <div id="left1"></div>
                    </div>
                </div>
                <div class="screenBright">
                    <div class="rightbox">
                        <i class="tl con1"></i>
                        <i class="tl con2"></i>
                        <i class="tr con1"></i>
                        <i class="tr con2"></i>
                        <i class="bl con1"></i>
                        <i class="bl con2"></i>
                        <i class="br con1"></i>
                        <i class="br con2"></i>
                        <div class="right">
                            <div class="right1">
                                <span class="total">总存储容量</span>
                                <div id="right1"></div>
                            </div>
                            <h3>节点收益</h3>
                            <div class="right2">
                                <div id="right2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="screenBbottom">
                <div class="bottombox">
                    <i class="tl con1"></i>
                    <i class="tl con2"></i>
                    <i class="tr con1"></i>
                    <i class="tr con2"></i>
                    <i class="bl con1"></i>
                    <i class="bl con2"></i>
                    <i class="br con1"></i>
                    <i class="br con2"></i>
                    <div class="bottom ">
                        <h3>容量使用率</h3>
                        <ul>
                            <li class="bottomTab1">
                                <div id="bottom1"></div>
                            </li>
                            <li class="bottomTab2">
                                <div id="bottom2"></div>
                            </li>
                            <li class="bottomTab3">
                                <div id="bottom3"></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import echarts from "echarts";

    export default {
        name: "screen",
        data() {
            return {
                online: null,
                allline: null,
                unline:null,
            }

        },
        methods: {
            login() {
                alert('登录')
            },
            right1: function (id, x, y, names) {
                var th = this;
                this.chart = echarts.init(document.getElementById(id));
                this.chart.clear();

                const optionData = {
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        formatter: '总存储量：' + names + '<br/>占比：' + x + '%'
                    },
                    series: [
                        {
                            hoverAnimation: false,
                            type: "pie",
                            radius: [60, 65],
                            center: ["50%", "50%"],

                            data: [
                                {
                                    value: x,

                                    itemStyle: {
                                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                            {
                                                offset: 0,
                                                color: "#9a8eef"
                                            },
                                            {
                                                offset: 1,
                                                color: "#7dcae7"
                                            }
                                        ])
                                    },

                                    label: {
                                        normal: {
                                            show: true,
                                            formatter: '{c|' + names + '}',
                                            rich: {
                                                c: {
                                                    color: '#7ec9e9',
                                                    fontSize: 22,
                                                    fontWeight: 'bold',
                                                    lineHeight: 5
                                                },

                                            },
                                            textStyle: {
                                                fontSize: 28,
                                                fontWeight: "bold"
                                            },
                                            position: "center"

                                        }
                                    },
                                    labelLine: {
                                        normal: {
                                            show: false
                                        }
                                    },
                                },
                                {
                                    value: y,

                                    itemStyle: {
                                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                            {
                                                offset: 0,
                                                color: "#393f52"
                                            },
                                            {
                                                offset: 1,
                                                color: "#393f52"
                                            }
                                        ])
                                    },
                                    labelLine: {
                                        normal: {
                                            show: false
                                        }
                                    },

                                }
                            ]
                        }
                    ]
                };

                this.chart.setOption(optionData);
            },
            right2: function (id, x, y, names) {
                var th = this;
                this.chart = echarts.init(document.getElementById(id));
                this.chart.clear();

                const optionData = {

                    grid: {
                        top: "5%",
                        right: "3%",
                        left: "25%",
                        bottom: "10%"
                    },
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        formatter: "{b} 收益占比：{c}%"
                    },
                    yAxis: [
                        {
                            type: "category",
                            color: "#fff",
                            data: x,

                            axisLine: {
                                show: false
                            },
                            axisLabel: {
                                margin: 20,
                                color: "#fff",
                                textStyle: {
                                    fontSize: 14
                                }
                            }
                        }
                    ],
                    xAxis: [
                        {
                            min: 0,
                            max: 100,
                            axisLabel: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            }
                        }
                    ],
                    series: [
                        {
                            type: "bar",
                            data: y,
                            barWidth: "20px",
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0,
                                        0,
                                        0,
                                        1,
                                        [
                                            {
                                                offset: 0,
                                                color: "#8eb1f9" // 0% 处的颜色
                                            },
                                            {
                                                offset: 1,
                                                color: "#6787ea" // 100% 处的颜色
                                            }
                                        ],
                                        false
                                    ),
                                    barBorderRadius: [0, 7, 7, 0],
                                    shadowColor: "rgba(0,255,225,1)",
                                    shadowBlur: 1
                                }
                            }
                        }
                    ]
                };

                this.chart.setOption(optionData);
            },
            bottom1: function (id,  y,x, names) {
                var th = this;
                this.chart = echarts.init(document.getElementById(id));
                this.chart.clear();


                var myColor = ["#1089E7"];
                const optionData = {
                    grid: {

                        right: "50px",
                        left: "140px",
                    },
                    // tooltip: {
                    //     show: true,
                    //     trigger: 'item',
                    //     formatter: x + " 存储使用率：{c}%"
                    // },
                    xAxis: {
                        show: false
                    },
                    yAxis: [
                        {
                            show: true,
                            data: y,
                            inverse: false,
                            axisLabel: {
                                textStyle: {
                                    fontSize: 14,
                                    color: "#fff"
                                }
                            },
                        },
                        {
                            show: true,
                            inverse: false,
                            data: x,
                            axisLabel: {
                                color: "#7981e8",
                                formatter: x+'%',
                                fontSize: 14,
                            }




                        }
                    ],
                    series: [
                        {
                            name: "条",
                            type: "bar",
                            yAxisIndex: 0,
                            hoverAnimation: false,

                            data: x,
                            barWidth: 30,
                            itemStyle: {
                                normal: {
                                    barBorderRadius: 2,
                                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                        {
                                            offset: 0,
                                            color: "#7981e8"
                                        },
                                        {
                                            offset: 1,
                                            color: "#5eb5e4"
                                        }
                                    ])
                                }
                            },
                            label: {
                                normal: {
                                    show: false,
                                    position: "inside",
                                    formatter: "{c}%"
                                }
                            }
                        },
                        {
                            name: "框",
                            type: "bar",
                            yAxisIndex: 1,
                            barGap: "-100%",
                            data: [100],
                            barWidth: 30,
                            itemStyle: {
                                normal: {
                                    color: "none",
                                    borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                        {
                                            offset: 0,
                                            color: "#7981e8"
                                        },
                                        {
                                            offset: 1,
                                            color: "#5eb5e4"
                                        }
                                    ]),
                                    borderWidth: 1,
                                    barBorderRadius: 2
                                }
                            }
                        }
                    ]
                };
                this.chart.setOption(optionData);
            },
            bottom2: function (id,  y,x, names) {
                var th = this;
                this.chart = echarts.init(document.getElementById(id));
                this.chart.clear();


                var myColor = ["#1089E7"];
                const optionData = {
                    grid: {
                        right: "50px",
                        left: "140px",
                    },
                    // tooltip: {
                    //     show: true,
                    //     trigger: 'item',
                    //     formatter: x + " 存储使用率：{c}%"
                    // },
                    xAxis: {
                        show: false
                    },
                    yAxis: [
                        {
                            show: true,
                            data: y,
                            inverse: false,
                            axisLabel: {
                                textStyle: {
                                    fontSize: 14,
                                    color: "#fff"
                                }
                            },
                        },
                        {
                            show: true,
                            inverse: false,
                            data: x,
                            axisLabel: {
                                color: "#7981e8",
                                formatter: x+'%',
                                fontSize: 14,
                            }




                        }
                    ],
                    series: [
                        {
                            name: "条",
                            type: "bar",
                            yAxisIndex: 0,
                            hoverAnimation: false,

                            data: x,
                            barWidth: 30,
                            itemStyle: {
                                normal: {
                                    barBorderRadius: 2,
                                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                        {
                                            offset: 0,
                                            color: "#7981e8"
                                        },
                                        {
                                            offset: 1,
                                            color: "#5eb5e4"
                                        }
                                    ])
                                }
                            },
                            label: {
                                normal: {
                                    show: false,
                                    position: "inside",
                                    formatter: "{c}%"
                                }
                            }
                        },
                        {
                            name: "框",
                            type: "bar",
                            yAxisIndex: 1,
                            barGap: "-100%",
                            data: [100],
                            barWidth: 30,
                            itemStyle: {
                                normal: {
                                    color: "none",
                                    borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                        {
                                            offset: 0,
                                            color: "#7981e8"
                                        },
                                        {
                                            offset: 1,
                                            color: "#5eb5e4"
                                        }
                                    ]),
                                    borderWidth: 1,
                                    barBorderRadius: 2
                                }
                            }
                        }
                    ]
                };
                this.chart.setOption(optionData);
            },
            bottom3: function (id,  y,x, names) {
                var th = this;
                this.chart = echarts.init(document.getElementById(id));
                this.chart.clear();


                var myColor = ["#1089E7"];
                const optionData = {
                    grid: {
right: "50px",
                        left: "140px",
                    },
                    // tooltip: {
                    //     show: true,
                    //     trigger: 'item',
                    //     formatter: x + " 存储使用率：{c}%"
                    // },
                    xAxis: {
                        show: false
                    },
                    yAxis: [
                        {
                            show: true,
                            data: y,
                            inverse: false,
                            axisLabel: {
                                textStyle: {
                                    fontSize: 14,
                                    color: "#fff"
                                }
                            },
                        },
                        {
                            show: true,
                            inverse: false,
                            data: x,
                            axisLabel: {
                                color: "#7981e8",
                                formatter: x+'%',
                                fontSize: 14,
                            }




                        }
                    ],
                    series: [
                        {
                            name: "条",
                            type: "bar",
                            yAxisIndex: 0,
                            hoverAnimation: false,

                            data: x,
                            barWidth: 30,
                            itemStyle: {
                                normal: {
                                    barBorderRadius: 2,
                                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                        {
                                            offset: 0,
                                            color: "#7981e8"
                                        },
                                        {
                                            offset: 1,
                                            color: "#5eb5e4"
                                        }
                                    ])
                                }
                            },
                            label: {
                                normal: {
                                    show: false,
                                    position: "inside",
                                    formatter: "{c}%"
                                }
                            }
                        },
                        {
                            name: "框",
                            type: "bar",
                            yAxisIndex: 1,
                            barGap: "-100%",
                            data: [100],
                            barWidth: 30,
                            itemStyle: {
                                normal: {
                                    color: "none",
                                    borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                        {
                                            offset: 0,
                                            color: "#7981e8"
                                        },
                                        {
                                            offset: 1,
                                            color: "#5eb5e4"
                                        }
                                    ]),
                                    borderWidth: 1,
                                    barBorderRadius: 2
                                }
                            }
                        }
                    ]
                };
                this.chart.setOption(optionData);
            },

            getdata() {
                var th = this
                this.Global.fun(this, 'get', {
                        base: '/mscreem/detail/',
                        other: '?',
                        access_token: ''

                    }, {},
                    function (res, that) {

                        const st = res.data.status
                        if (st === 1) {
                            const da = res.data.data

                            th.right1('right1', da.zccrlzb, 1 - da.zccrlzb, da.zccrl)

                            th.right2('right2', [da.bzmc1, da.bzmc2, da.bzmc3], [da.syzb1, da.syzb2, da.syzb3])

                            th.bottom1('bottom1', [da.kcmc1], [da.cczb1])

                            th.bottom2('bottom2', [da.kcmc2], [da.cczb2])

                            th.bottom3('bottom3', [da.kcmc3], [da.cczb3])

                            th.allline = da.zjd
                            th.online = da.zxjd
                            th.unline= da.lxjd
                        } else {
                            that.$Message.destroy();
                            that.$Message.info(res.data.msg);
                        }


                    })
            },


        },
        created: function () {
            this.getdata()
        },
        mounted: function () {
        }
    };
</script>
<style lang="less">
    .mainContentbox {
        background-image: url("../../static/img/screen/background.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center;
        position: relative;
        width: 100%;
        height: 100%;

        h3 {
            letter-spacing: 3px
        }

        .con1 {
            display: block;
            position: absolute;
            width: 5px;
            height: 25px;
            background-color: #0d819d;
            border-radius: 1px;
        }

        .con2 {
            display: block;
            position: absolute;
            height: 5px;
            width: 25px;
            border-radius: 1px;
            background-color: #0d819d;
        }

        .tl {
            top: 0px;
            left: 0px;
        }

        .bl {
            bottom: 0px;
            left: 0px;
        }

        .tr {
            top: 0px;
            right: 0px;
        }

        .br {
            bottom: 0px;
            right: 0px;
        }



        .loader3 {
            margin-left: -8px;
            margin-top: -8px;
            width: 50px;
            height: 50px;
            display: inline-block;
            padding: 0px;
            text-align: left;
            position: absolute;
        }

        .loader3 span {
            position: absolute;
            display: inline-block;
            width: 50px;
            height: 50px;
            border-radius: 100%;
            background: rgba(255, 255, 255, 1);
            -webkit-animation: loader3 1.5s linear infinite;
            animation: loader3 1.5s linear infinite;
        }

        .loader3 span:last-child {
            animation-delay: -0.9s;
            -webkit-animation-delay: -0.9s;
        }

        @keyframes loader3 {
            0% {
                transform: scale(0, 0);
                opacity: 0.8;
            }
            100% {
                transform: scale(1, 1);
                opacity: 0;
            }
        }
        @-webkit-keyframes loader3 {
            0% {
                -webkit-transform: scale(0, 0);
                opacity: 0.8;
            }
            100% {
                -webkit-transform: scale(1, 1);
                opacity: 0;
            }
        }
        .p0 {
            top: 49%;
            left: 74%;
            width: 90px;
            height: 90px;
            span{
                width: 90px;
                height: 90px;
            }
        }

        .p1 {
            top: 23%;
            left: 7%;
        }

        .p2 {
        top: 34.8%;
        left: 16.3%;
        }

        .p3 {
            top: 35.8%;
            left: 26.7%;
        }

        .p4 {
            top: 14.1%;
            left: 28.2%;
        }

        .p5 {
            top: 64.4%;
            left: 24.4%;
        }

        .p6 {
            top: 71%;
            left: 28%;
        }

        .p7 {
        top: 23%;
        left: 69%;
        }

        .p8 {
        top: 24%;
        left: 81%;
        }

        .p9 {
            top: 31%;
            left: 58.7%;
        }

        .p10 {
            top: 34%;
            left: 69%;
        }

        .p11 {
            top: 36%;
            left: 77.4%;

        }

        .p12 {
            top: 74.5%;
            left: 83.3%;
        }

        .p13 {
            top: 45.3%;
            left: 70.6%;
        }

        .p14 {
            top: 41%;
            left: 59%;
        }

        .p15 {
            top: 59%;
            left: 54%;
        }

        .p16 {
            top: 55%;
            left: 45.7%;
        }

        .p17 {
            top: 39.8%;
            left: 46.7%;
        }
    }

    .mainContent {
        width: 90%;
        height: 95%;
        margin: auto;
        position: relative;

        .screenH {
            position: absolute;
            top: 0px;
            width: 100%;
            height: 50px;


            div {
                position: absolute;
                top: 0;
                height: 100%;
            }

            .screenHlogo {
                left: -25px;
                width: 130px;
                background-image: url("../../static/img/screen/logo2.png");
                background-repeat: no-repeat;
                background-size: 100% auto;
                background-position: center;
                top: 20px;
            }

            .screenHlogin {
                right: -25px;
                width: 75px;
                background-image: url("../../static/img/screen/login.png");
                background-repeat: no-repeat;
                background-size: auto 10px;
                background-position: center left;
                color: #fff;
                top: 20px;

                a {
                    display: inline-block;
                    height: 20px;
                    margin: 15px 0 15px 45px;
                    line-height: 20px;
                    color: #fff;
                    font-size: 14px;
                }
            }

            .screenHtitle {
                background-image: url("../../static/img/screen/title.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
                background-position: center;
                width: 1100px;
                color: #fff;
                font-weight: 600;
                font-size: 20px;
                text-align: center;
                line-height: 50px;
                position: relative;
                margin: auto;
                letter-spacing: 1px

            }
        }

        .screenB {
            width: 100%;
            overflow: hidden;
            height: 75%;
            padding-top: 80px;

            .screenBleft {
                width: 60%;
                height: 100%;
                float: left;
                box-sizing: border-box;
                padding: 20px;

                .left1box {
                    position: relative;
                    padding: 2px;
                    box-sizing: border-box;
                    height: 100%;

                    .pront {
                        position: absolute;
                        z-index: 1;
                        width: 100%;
                        height: 100%;
                    }

                    .left1info {
                        text-align: center;
                        position: absolute;
                        color: #fff;
                        font-size: 14px;
                        width: 100%;
                        top: 18px;
                        z-index: 2;

                        span {
                            display: inline-block;
                            padding: 0px 10px;

                            .violet {
                                background-color: #50489a;
                            }

                            .green {
                                background-color: #5d9a48;
                            }


                            .red {
                                background-color: #f58736;
                            }

                            b {
                                display: inline-block;
                                padding: 0px 5px;
                                margin: 0px 10px;
                                border-radius: 2px;

                            }
                        }
                    }

                    #left1 {
                        background-image: url("../../static/img/screen/map.png");
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        background-position: center center;
                        background-color: rgba(255, 255, 255, 0.1);
                        height: 100%;
                    }
                }

            }

            .screenBright {
                width: 40%;
                height: 100%;
                float: right;
                box-sizing: border-box;
                padding: 20px;

                .rightbox {
                    position: relative;
                    padding: 2px;
                    box-sizing: border-box;
                    height: 100%;

                    .right {

                        background-color: rgba(255, 255, 255, 0.1);
                        height: 100%;
                        position: relative;

                        h3 {
                            position: absolute;
                            font-size: 18px;
                            color: #fff;
                            font-weight: 600;
                            text-align: center;
                            margin-top: 10px;
                            width: 100%;
                        }
                    }

                    .right1 {
                        background-image: url("../../static/img/screen/line.png");
                        background-repeat: no-repeat;
                        background-size: 85% auto;
                        background-position: center bottom;
                        color: #fff;
                        height: 50%;
                        position: relative;

                        .total {
                            position: absolute;
                            display: block;
                            background-image: url("../../static/img/screen/tipbox.png");
                            background-repeat: no-repeat;
                            background-size: 100% auto;
                            background-position: center center;
                            left: 50%;
                            margin-left: -130px;
                            height: 150px;
                            width: 50px;
                            top: 50%;
                            margin-top: -75px;
                            color: #7485eb;
                            font-size: 14px;
                            -webkit-box-sizing: border-box;
                            box-sizing: border-box;
                            padding: 30px 17px 0 14px;
                            line-height: 18px;
                            font-weight: 700;
                        }
                    }

                    .right2 {
                        padding-top: 40px;
                        height: 50%;
                        position: relative;
                    }

                    #right1 {
                        height: 100%;
                        /*background: rgb(110, 110, 255);*/
                    }

                    #right2 {
                        height: 100%;
                        /*background: rgb(110, 110, 255);*/
                    }
                }
            }
        }

        .screenBbottom {
            width: 100%;
            height: 25%;
            padding: 20px;
            position: relative;

            .bottombox {
                position: relative;
                padding: 2px;
                box-sizing: border-box;
                height: 100%;

                .bottom {
                    background-color: rgba(255, 255, 255, 0.1);
                    height: 100%;

                    h3 {
                        position: absolute;
                        top: 10px;
                        width: 100%;
                        text-align: center;
                        line-height: 35px;

                        font-size: 18px;
                        color: #fff;
                        font-weight: 600;
                        text-align: center;
                        margin-left: -20px;
                    }

                    ul {
                        padding-top: 35px;
                        width: 100%;
                        overflow: hidden;
                        height: 100%;

                        li {
                            float: left;
                            height: 100%;
                            padding: 0 20px;
                            box-sizing: border-box;
                            width: 33%;
                            position: relative;
                        }


                        #bottom1 {
                            width: 100%;
                            height: 100%;
                        }


                        #bottom3 {
                            width: 100%;
                            height: 100%;
                        }


                        #bottom2 {
                            width: 100%;
                            height: 100%;
                        }

                    }
                }
            }


        }
    }
</style>
