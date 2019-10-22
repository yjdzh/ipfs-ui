<template>
    <div class="EVbase">
        <div :class="pageTitle?'EVbaseBoxT EVbaseBox':'EVbaseBox'">
            <div class="mbxBox">
                <h3 class="crumb-title " v-if="pageTitle">{{pageTitle}}</h3>
            </div>
            <div class="EVcontent">
                <!--内容区域-->
                <div class="EVeg">
                    <span>样例：</span>
                    <p class="EVeg">
                        <Col span="8">
                        <EVinputNumber v-model="value1" :min='0' :max='100' ></EVinputNumber>
                        </Col>
                    </p>
                </div>
                <!--内容区域-->
                <div class="EVeg">
                    <span>代码示例：</span>
                    <pre class="EVcode" v-text="`<template>
    <EVinputNumber  v-model='value1' :min='0' :max='100' ></EVinputNumber>
<template>

export default {
    data () {
        return {
            value1:'1'
        }
    }
};
`">
                    </pre>
                </div>
                <!--内容区域-->
                <div class="EVeg">
                    <span>API ：</span>
                    <p>改进了接收值，改进后接收值可以为数字和字符，赋值无需转换（以前只能数数字）
                        其他API请参考官网 <a href="http://v2.iviewui.com/components/input-number">http://v2.iviewui.com/components/input-number</a></p>
                </div>
                <!--内容区域-->
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'inputNumber',
        data () {
            return {

                pageTitle: 'EVinputNumber 数字输入框',

                value1:'1'

            }
        }
    };
</script>

