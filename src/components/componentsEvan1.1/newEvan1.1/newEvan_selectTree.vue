<template>
    <treeselect v-model="value" :multiple="true" :options="options" />
</template>

<script>
    import Treeselect from '@riophae/vue-treeselect'
    // import the styles
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
	export default {
		name: "selectTree",
        components: { Treeselect },
        data() {
            return {
                // define default value
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
        },
    }
</script>

<style scoped>

</style>
