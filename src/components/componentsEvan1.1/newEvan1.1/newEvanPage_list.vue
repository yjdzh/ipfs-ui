<template>
    <div class="EVbase">
        <div :class="pageTitle?'EVbaseBoxT EVbaseBox':'EVbaseBox'">
            <div class="mbxBox">
                <h3 class="crumb-title " v-if="pageTitle">{{pageTitle}}</h3>
            </div>
            <div class="EVcontent">
                <div class="topTool">
                    <div class="EVsearch">
                        <slot name="searchBox"></slot>
                    </div>
                    <div class="EVHsearch">
                        <slot name="Hsearch"></slot>
                    </div>
                    <div class="EVbtn">
                        <slot name="btnBox"></slot>
                    </div>
                </div>
                <div class="table">
                    <slot name="table"></slot>
                </div>
                <div class="bottomTool">
                    <div class="EVpagePage">
                        <slot name="pagePage"></slot>
                    </div>
                    <div class="EVmoreBtn">
                        <slot name="moreBtn"></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EVpageList",
        props: {
            pageTitle: {
                type: String,
                default: null,
                desc: "页面导航显示的当前页面名字"
            },

        }
    }
</script>

<style lang="less" scoped>
    .easylistbox {
        height: 100%;
    }

    .serach_btn {
        *zoom: 1;
        &:after {
            content: ".";
            display: block;
            height: 0;
            visibility: hidden;
            clear: both;
        }
        .serach {
            float: left;
        }
        .btn {
            float: right;
        }
    }

    .topTool {
        overflow: hidden;
    }

    .EVsearch {
        float: left;
        padding: 1px;
        padding-right: 10px;
    }

    .EVHsearch {
        display: inline-block;
        padding: 2px 10px 0px 0px;
    }


</style>
