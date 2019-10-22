<template>
    <div id="jsoneditor" style="height: auto"></div>
</template>

<script>

    export default {
        name: 'jsoneditor',
        props: {
            value: {
                type: [String, Object],
                default: '',

            },

        },
        data () {
            return {
                editor: {},
                container: {},
                options: {}

            }
        },
        mounted () {
            this.options = {
                search: false,
                mainMenuBar: false,
                navigationBar: false,
                statusBar: false,
                colorPicker: false,
                onChange: this.onChanges,
                mode: 'code'
            }
            this.container = document.getElementById("jsoneditor")
            this.editor = new this.JSONeditor(this.container, this.options)
            if (this.value) {

                this.editor.set(typeof (this.value) == 'String' ? JSON.parse(this.value) : this.value)
            }


        }, methods: {
            getjson () {
                if (this.editor) {

                    return this.editor.get()
                }
                else {
                    return {}
                }

            },
            onChanges () {

                var val = this.getjson()
                // console.log(val)
                this.$emit('change', val)
            }

        },
        watch: {
            value () {

                if (this.editor) {
                    if (this.value) {
                        this.editor.update(
                            typeof (this.value) == 'String' ? JSON.parse(this.value) : this.value)
                    } else {
                        this.editor.update({})
                    }

                }
                else {
                    return
                }

            }
        }


    }
    ;
</script>

<style>
    /*.jsoneditor-contextmenu, .jsoneditor-dragarea {*/
    /*display: none;*/
    /*}*/

    /*.jsoneditor-tree > tbody > tr > td:nth-child(1) {*/
    /*display: none;*/
    /*}*/

    /*.jsoneditor-tree > tbody > tr > td:nth-child(2) {*/

    /*width: 10px;*/
    /*}*/
    div.jsoneditor-tree div.jsoneditor-tree-inner {
        padding-bottom: 30px;
    }

    div.jsoneditor-menu > button.jsoneditor-repair {
        background-position: -96px -96px;
        display: none;
    }
</style>



