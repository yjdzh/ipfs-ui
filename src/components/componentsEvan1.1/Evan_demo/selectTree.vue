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
                        <treeselect v-model="value" :disable-branch-nodes="true"
                                    :show-count="true" :options="options" />

                    </p>

                </div>
                <!--内容区域-->
                <div class="EVeg">
                    <span>代码示例：</span>
                    <pre class="EVcode" v-text="`<template>
     <treeselect v-model='value'
                 :disable-branch-nodes='true'
                 :show-count='true'
                 :options='options' />
<template>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
    components: { Treeselect },
    data () {
        return {
            value: null,
            options: [ {
                id: 'a',
                label: 'a',
                children: [ {
                    id: 'aa',
                    label: 'aa',
                },
                {
                    id: 'ab',
                    label: 'ab',
                } ],
            },
            {
                id: 'b',
                label: 'b',
            },
            {
                id: 'c',
                label: 'c',
            } ],

        }
    }
};`">
                    </pre>

                </div>
                <!--内容区域-->
                <div class="EVeg">
                    <span>API ：</span>
                    <p>第三方组件，
                        API请参考官网 <a href="https://vue-treeselect.js.org/">https://vue-treeselect.js.org/</a></p>


                </div>
                <!--内容区域-->
            </div>
        </div>
    </div>
</template>

<script>
    import Treeselect from '@riophae/vue-treeselect'
    // import the styles
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    export default {
        name: 'selectTree', components: { Treeselect },
        data () {
            return {
                pageTitle: 'EVselectTree 下拉树',

                value: null,
                // define options
                options: [ {
                    id: 'a',
                    label: 'a',
                    children: [ {
                        id: 'aa',
                        label: 'aa',
                    }, {
                        id: 'ab',
                        label: 'ab',
                    } ],
                }, {
                    id: 'b',
                    label: 'b',
                }, {
                    id: 'c',
                    label: 'c',
                } ],

            }
        }
    };
</script>

