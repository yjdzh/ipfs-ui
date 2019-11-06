<template>
    <div>

        <Modal
            v-model="modal1"
            title="收益情况概览"
            width="720px"
            footer-hide

        >


            <div id="chart1"></div>

        </Modal>
    </div>
</template>

<script>
    import echarts from 'echarts'

    export default {

        data() {
            return {
                modal1: false,
                activeid: null,
                xdata: [],
                ydata: [],
            }
        },
        methods: {


            getdata() {
                var th = this
                this.Global.fun(this, 'get', {
                        base: '/mwalletprofit/total/',
                        other: '1561610222429?',
                        // access_token: this.api.access_token,
                        access_token: 'access_token=3e784d9d-76b3-4543-b60f-898f5121ca73',
                    },
                    {},
                    function (res, that) {
                        debugger
                        const st = res.data.status
                        if (st === 1) {
                            const da = res.data.data
                            th.xdata = da.data;
                            const l = da.items.length
                            const label = {

                                normal: {
                                    show: true,
                                    position: 'top'
                                }

                            };
                            const names = []

                            const type = 'line';
                            const areaStyle = {}
                            for (var i = 0; i < l; i++) {
                                names.push(da.items[i].name)
                                da.items[i]['label'] = label
                                da.items[i]['type'] = type
                                da.items[i]['areaStyle'] = areaStyle
                            }


                            th.ydata = da.items;
                            th.line1('chart1', th.xdata, th.ydata)

                        } else {
                            that.$Message.destroy();
                            that.$Message.info(res.data.msg);
                        }


                    })
            },


            line1: function (id, x, y, names) {
                var th = this
                this.chart = echarts.init(document.getElementById(id));
                this.chart.clear();

                const optionData = {
                    title: {
                        text: '近七日收益'
                    },
                    grid: {
                        left: '3%',
                        right: '10%',
                        bottom: '3%',
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'axis',

                    },
                    legend: {
                        data: names
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: x
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: y


                };

                this.chart.setOption(optionData);
            },
        },

        created() {
            this.getdata()
        }
    }
</script>

<style scoped>
    #chart1 {
        width: 700px;
        height: 400px;
    }
</style>
