<template>
    <div :class="classes">
        <span v-if="hasSlot" :class="slotClasses">
            <slot></slot>
        </span>
    </div>
</template>

<script>
    import {oneOf} from 'iview/src/utils/assist';
    const prefixCls = 'ivu-divider';
    export default {
        name: 'divider',
        props: {
            type: {
                type: String,
                default: 'horizontal',
                validator (value) {
                    return oneOf(value, ['horizontal', 'vertical']);
                }
            },
            orientation: {
                type: String,
                default: 'center',
                validator (value) {
                    return oneOf(value, ['left', 'right', 'center']);
                }
            },
            dashed: {
                type: Boolean,
                default: false,
            }
        },
        computed: {
            hasSlot() {
                return !!this.$slots.default;
            },
            classes() {
                return [
                    `${prefixCls}`,
                    `${prefixCls}-${this.type}`,
                    {
                        [`${prefixCls}-with-text-${this.orientation}`]: this.hasSlot,
                        [`${prefixCls}-dashed`]: !!this.dashed
                    }
                ];
            },
            slotClasses() {
                return [
                    `${prefixCls}-inner-text`,
                ];
            }
        }
    };
</script>
<style>
    .ivu-divider, .ivu-divider-vertical {
        margin: 0 8px;
        display: inline-block;
        height: .9em;
        width: 1px;
        vertical-align: middle;
        position: relative;
        top: -.06em
    }

    .ivu-divider-horizontal {
        display: block;
        height: 1px;
        width: 100%;
        margin: 24px 0;
        clear: both
    }

    .ivu-divider-horizontal.ivu-divider-with-text-center, .ivu-divider-horizontal.ivu-divider-with-text-left, .ivu-divider-horizontal.ivu-divider-with-text-right {
        display: table;
        white-space: nowrap;
        text-align: center;
        background: 0 0;
        font-weight: 500;
        color: #17233d;
        font-size: 16px;
        margin: 16px 0
    }

    .ivu-divider-horizontal.ivu-divider-with-text-center:after, .ivu-divider-horizontal.ivu-divider-with-text-center:before, .ivu-divider-horizontal.ivu-divider-with-text-left:after, .ivu-divider-horizontal.ivu-divider-with-text-left:before, .ivu-divider-horizontal.ivu-divider-with-text-right:after, .ivu-divider-horizontal.ivu-divider-with-text-right:before {
        content: "";
        display: table-cell;
        position: relative;
        top: 50%;
        width: 50%;
        border-top: 1px solid #e8eaec;
        -webkit-transform: translateY(50%);
        transform: translateY(50%)
    }

    .ivu-divider-horizontal.ivu-divider-with-text-left, .ivu-divider-horizontal.ivu-divider-with-text-right {
        font-size: 14px
    }

    .ivu-divider-horizontal.ivu-divider-with-text-left .ivu-divider-inner-text, .ivu-divider-horizontal.ivu-divider-with-text-right .ivu-divider-inner-text {
        display: inline-block;
        padding: 0 10px
    }

    .ivu-divider-horizontal.ivu-divider-with-text-left:before {
        top: 50%;
        width: 5%
    }

    .ivu-divider-horizontal.ivu-divider-with-text-left:after, .ivu-divider-horizontal.ivu-divider-with-text-right:before {
        top: 50%;
        width: 95%
    }

    .ivu-divider-horizontal.ivu-divider-with-text-right:after {
        top: 50%;
        width: 5%
    }

    .ivu-divider-inner-text {
        display: inline-block;
        padding: 0 24px
    }

    .ivu-divider-dashed {
        background: 0 0;
        border-top: 1px dashed #e8eaec
    }

    .ivu-divider-horizontal.ivu-divider-with-text-left.ivu-divider-dashed, .ivu-divider-horizontal.ivu-divider-with-text-right.ivu-divider-dashed, .ivu-divider-horizontal.ivu-divider-with-text.ivu-divider-dashed {
        border-top: 0
    }

    .ivu-divider-horizontal.ivu-divider-with-text-left.ivu-divider-dashed:after, .ivu-divider-horizontal.ivu-divider-with-text-left.ivu-divider-dashed:before, .ivu-divider-horizontal.ivu-divider-with-text-right.ivu-divider-dashed:after, .ivu-divider-horizontal.ivu-divider-with-text-right.ivu-divider-dashed:before, .ivu-divider-horizontal.ivu-divider-with-text.ivu-divider-dashed:after, .ivu-divider-horizontal.ivu-divider-with-text.ivu-divider-dashed:before {
        border-style: dashed none none
    }

</style>
