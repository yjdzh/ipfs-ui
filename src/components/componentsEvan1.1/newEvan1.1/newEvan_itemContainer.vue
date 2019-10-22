<template>
<Col :span="span">
    <FormItem :label="label" :prop="prop">
        <div class="evaninline">
            <div class="ivu-input-group-prepend evan-prepend">
                <slot name="prepend"></slot>
            </div>
            <div>
                <slot></slot>
            </div>
            <div class="ivu-input-group-append evan-append">
                <slot name="append"></slot>
            </div>
        </div>

    </FormItem>
</Col>

</template>
<script>

    export default {
        name: 'EVitemContainer',

        props: {
            label:{ type: String,
                default: '',
                desc: "表单此项显示的名字"},
            prop:{ type: String,
                default: '',
                desc: "对应校验的名字"},
            span:{ type: Number,
                default: 24,
                desc: "布局"}
        },

    };
</script>
