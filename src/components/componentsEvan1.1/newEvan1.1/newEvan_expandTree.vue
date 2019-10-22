<template>
    <div class="h100 borederR"
         style="border-right: 1px solid #ccc;padding: 0 10px;overflow: auto;position: relative;">
        <Tree :data="treeData" :render="renderContent"></Tree>
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
        methods:{
            renderContent(h, {
                root,
                node,
                data
            }) {
                return h(
                    "span", {
                        style: {
                            display: "inline-block",
                            width: "100%"
                        }
                    }, [
                        h(
                            "span", {
                                class: ["ivu-tree-title" + node.nodeKey, "ivu-tree-title"],
                                on: {
                                    click: () => {
                                        // 获取当前节点信息列表数据
                                        this.treeNodeClickHandle(
                                            "search_LIKE_catalogCode",
                                            data.code
                                        );
                                        let ele = document.getElementsByClassName("ivu-tree-title");
                                        for (let i = 0; i < ele.length; i++) {
                                            ele[i].classList.remove("ivu-tree-title-selected");
                                        }
                                        let el = document.getElementsByClassName(
                                            "ivu-tree-title" + node.nodeKey
                                        );
                                        el[0].classList.add("ivu-tree-title-selected");
                                        this.selectNodeData = data;
                                    }
                                }
                            }, [
                                h("span", {
                                    class: "etitle"
                                }, data.title),
                                h(
                                    "span", {
                                        style: {
                                            display: "inline-block",
                                            width: "110px",
                                            height: "12px"
                                        },
                                        class: "dropdownBox"
                                    }, [
                                        h(
                                            "Dropdown", {
                                                style: {
                                                    marginLeft: "7px"
                                                },
                                                class: "dropdown",
                                                props: {
                                                    placement: "bottom-start"
                                                }
                                            }, [
                                                h(
                                                    "span", {
                                                        on: {
                                                            mouseover: () => {
                                                                let ele = document.getElementsByClassName(
                                                                    "ivu-tree-title"
                                                                );
                                                                for (let i = 0; i < ele.length; i++) {
                                                                    ele[i].classList.remove(
                                                                        "ivu-tree-title-selected"
                                                                    );
                                                                }
                                                                let el = document.getElementsByClassName(
                                                                    "ivu-tree-title" + node.nodeKey
                                                                );
                                                                el[0].classList.add("ivu-tree-title-selected");
                                                                this.selectNodeData = data;
                                                            }
                                                        }
                                                    }, [
                                                        h("Icon", {
                                                            props: {
                                                                type: "navicon-round"
                                                            },
                                                            style: {
                                                                padding: "2px 4px",
                                                                fontSize: "12px"
                                                            }
                                                        })
                                                    ]
                                                ),
                                                h(
                                                    "DropdownMenu", {
                                                        slot: "list"
                                                    }, [
                                                        h('DropdownItem', {
                                                            props: {
                                                                disabled: (data.leaf && data.id != 0) ?
                                                                    (RegExp('c').test(data.catalogRKeys) ? false : true) : true
                                                            }
                                                        }, [
                                                            h('span', {
                                                                on: {
                                                                    click: () => {
                                                                        const disabled = (data.leaf && data.id != 0) ?
                                                                            (RegExp('c').test(data.catalogRKeys) ? false : true) : true

                                                                        if (!disabled) {
                                                                            this.addNews(0);
                                                                        }

                                                                    }
                                                                }
                                                            }, '添加信息')
                                                        ]),
                                                        h(
                                                            "DropdownItem", {
                                                                props: {
                                                                    disabled: data.code.split(",").length >= 4 ? true : this.oprah.bflgl.C ? false : true
                                                                }
                                                            }, [
                                                                h("span", {
                                                                    on: {

                                                                        click: () => {
                                                                            const disabled = data.code.split(",").length >= 4 ? true : this.oprah.bflgl.C ? false : true
                                                                            if (!disabled) {
                                                                                this.addCatalog(data);
                                                                            }
                                                                        }
                                                                    }
                                                                }, "添加下级")
                                                            ]
                                                        ),
                                                        h(
                                                            "DropdownItem", {
                                                                props: {
                                                                    // divided: true,
                                                                    disabled: data.id == 0 ? true : this.oprah.bflgl.U ? false : true
                                                                }
                                                            }, [
                                                                h("span", {
                                                                    on: {
                                                                        click: () => {
                                                                            const disabled = data.id == 0 ? true : this.oprah.bflgl.U ? false : true
                                                                            if (!disabled) {
                                                                                this.editCatalog(data);
                                                                            }
                                                                        }
                                                                    }
                                                                }, "编辑分类")
                                                            ]
                                                        ),
                                                        h(
                                                            "DropdownItem", {
                                                                props: {
                                                                    disabled: data.id == 0 ? true : this.oprah.bflgl.D ? false : true
                                                                }
                                                            }, [
                                                                h("span", {
                                                                    on: {
                                                                        click: () => {
                                                                            const disabled = data.id == 0 ? true : this.oprah.bflgl.D ? false : true
                                                                            if (!disabled) {
                                                                                this.remove(root, node, data);
                                                                            }
                                                                        }
                                                                    }
                                                                }, "删除分类")
                                                            ]
                                                        )
                                                    ]
                                                )
                                            ]
                                        )
                                    ]
                                )
                            ]
                        )
                    ]
                );
            },
        }
    };
</script>
<style lang="less">
    .ivu-tree {
    .ivu-select-dropdown {
        margin-top: -15px;
        margin-left: -2px;
    }
    .ivu-dropdown-menu {
        min-width: 100px;
        margin: 0;
        padding: 0;
    }
    .ivu-dropdown-item {
        margin: 0;
        line-height: normal;
        padding: 7px 16px;
        clear: both;
        color: #495060;
        font-size: 12px !important;
        white-space: nowrap;
        list-style: none;
        cursor: pointer;
        transition: background 0.2s ease-in-out;
    }
    .ivu-dropdown-item-disabled {
        color: #bbbec4;
        cursor: not-allowed;
    }
    .dropdown {
        display: none;
    }
    .etitle {
        padding: 2px 4px;
        border-radius: 3px;
    }
    .ivu-tree-title {
        padding: 0px;
        border-radius: 3px;
    }
    .ivu-tree-title-selected,
    .ivu-tree-title-selected:hover {
        background-color: transparent !important;
        transition: background 0s ease-in-out;
    }
    .ivu-tree-title:hover {
        background-color: transparent !important;
        transition: background 0s ease-in-out;
        & .dropdownBox .dropdown {
              display: inline-block;
          }
        .etitle {
            background-color: #eaf4fe;
        }
    }
    .ivu-tree-title-selected .etitle {
        background-color: #d5e8fc !important;
    }
    position: absolute;
    height: auto;
    overflow-y: unset;
    overflow-x: unset;
    }

</style>
