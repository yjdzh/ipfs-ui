<template>
    <div >

        <!--内容区域-->
        <div class="EVeg"  style="padding: 10px;">
            <span>样例：</span>
            <div>
                <EVpageList :pageTitle="pageTitle" >
                    <div slot="searchBox" class="serach">
                        <Input v-model.trim="serValue">
                            <Select v-model="serSelect" slot="prepend" style="width: 80px">
                                <Option value="day">Day</Option>
                                <Option value="month">Month</Option>
                            </Select>
                            <Button slot="append" icon="ios-search" @click="searchBtn"></Button>
                        </Input>
                    </div>
                    <div slot="btnBox" class="btn">
                        <Button @click="addData" type="success">新增</Button>
                        <Button @click="reflesh" type="info">刷新</Button>
                    </div>
                    <div slot="table">
                        <Table border :columns="thead" :data="tbody" size='small'>
                        </Table>
                    </div>
                    <div slot="pagePage">
                        <Page :total="10" show-elevator show-total/>
                    </div>

                    <div slot="moreBtn">
                        <Button>拓展按钮1</Button>
                        <Button>拓展按钮2</Button>
                    </div>
                </EVpageList>
            </div>
        </div>
        <!--内容区域-->
        <div class="EVeg" style="padding: 10px;">
            <span>代码示例：</span>
            <pre class="EVcode" v-text="`<template>
    <EVpageList :pageTitle='pageTitle' >
                <div slot='searchBox' class='serach'>
            <Input v-model.trim='serValue'>
                <Select v-model='serSelect' slot='prepend' style='width: 80px'>
                    <Option value='day'>Day</Option>
                    <Option value='month'>Month</Option>
                </Select>
                <Button slot='append' icon='ios-search' @click='searchBtn'></Button>
            </Input>
        </div>
        <div slot='btnBox' class=btn'>
            <Button @click='addData' type='success'>新增</Button>
            <Button @click='reflesh' type='info'>刷新</Button>
        </div>
        <div slot='table'>
            <Table border :columns='thead' :data='tbody' size='small'>
            </Table>
        </div>
        <div slot='pagePage'>
            <Page :total='10' show-elevator show-total/>
        </div>
        <div slot='moreBtn'>
            <Button>拓展按钮1</Button>
            <Button>拓展按钮2</Button>
        </div>

        </EVpageList>
<template>

export default {
        data () {
            return {
                thead: [
                    {
                        title: '序号',
                        key: 'id',
                        align: 'center',
                        width: 50
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        render: (h, params) => {
                            return h('span', params.row.name);
                        }
                    }, {
                        title: '性别',
                        key: 'sex',
                        render: (h, params) => {
                            if (params.row.sex === 0) {
                                return h('p', [
                                    h('Icon', {
                                        props: {
                                            type: 'man'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        }
                                    }),
                                    h('span', '男')
                                ]);
                            } else if (params.row.sex === 1) {
                                return h('p', [
                                    h('Icon', {
                                        props: {
                                            type: 'woman'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        }
                                    }),
                                    h('span', '女')
                                ]);
                            } else if (params.row.sex === 2) {
                                return h('p', [
                                    h('Icon', {
                                        props: {
                                            type: 'person'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        }
                                    }),
                                    h('span', '未知')
                                ]);
                            }
                        }
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '地址',
                        key: 'address'
                    },
                    {
                        title: '状态',
                        key: 'states',      //状态为1时开通，状态为0时关闭
                        render: (h, params) => {
                            if (params.row.state === 1) {
                                return h('span', {
                                    attrs: {
                                        type: Number
                                    },
                                    style: {
                                        color: '#1abd6b'  //设置开通状态的颜色
                                    }
                                }, '开通')
                            } else if (params.row.state === 0) {
                                return h('div', {
                                    attrs: {
                                        type: Number
                                    },
                                    style: {
                                        color: '#ccc'   //设置关闭状态的颜色
                                    }
                                }, '关闭')
                            }
                        }
                    },
                    {
                        title: '管理',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                tbody: [
                    {
                        id: 1,
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        state: 1,
                        sex: 1,
                    },
                    {
                        id: 2,
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        state: 0,
                        sex: 0,
                    },
                    {
                        id: 3,
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        state: 0,
                        sex: 1,
                    },
                    {
                        id: 4,
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        state: 1,
                        sex: 2,
                    }
                ],

            }
        },`">
                    </pre>

        </div>
        <!--内容区域-->
        <div class="EVeg" style="padding: 10px;">
            <span>API ：</span>
            <p>porps</p>
            <div class="EVegtb">
                <Table border :columns="columns1" :data="data1"></Table>
            </div>
            <p>slot</p>
            <div class="EVegtb">
                <Table border :columns="columns2" :data="data2"></Table>
            </div>

        </div>
        <!--内容区域-->


    </div>
</template>
<script>


    export default {

        data () {
            return {
                pageTitle: '列表页面demo ',
                serValue: '',
                serSelect: 'day',
                thead: [

                    {
                        title: '序号',
                        key: 'id',
                        align: 'center',
                        width: 50
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        render: (h, params) => {
                            return h('span', params.row.name);
                        }
                    },
                    {
                        title: '性别',
                        key: 'sex',
                        render: (h, params) => {
                            if (params.row.sex === 0) {
                                return h('p', [
                                    h('Icon', {
                                        props: {
                                            type: 'man'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        }
                                    }),
                                    h('span', '男')
                                ]);
                            } else if (params.row.sex === 1) {
                                return h('p', [
                                    h('Icon', {
                                        props: {
                                            type: 'woman'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        }
                                    }),
                                    h('span', '女')
                                ]);
                            } else if (params.row.sex === 2) {
                                return h('p', [
                                    h('Icon', {
                                        props: {
                                            type: 'person'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        }
                                    }),
                                    h('span', '未知')
                                ]);
                            }
                        }
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '地址',
                        key: 'address'
                    },
                    {
                        title: '状态',
                        key: 'states',      //状态为1时开通，状态为0时关闭
                        render: (h, params) => {
                            if (params.row.state === 1) {
                                return h('span', {
                                    attrs: {
                                        type: Number
                                    },
                                    style: {
                                        color: '#1abd6b'  //设置开通状态的颜色
                                    }
                                }, '开通')
                            } else if (params.row.state === 0) {
                                return h('div', {
                                    attrs: {
                                        type: Number
                                    },
                                    style: {
                                        color: '#ccc'   //设置关闭状态的颜色
                                    }
                                }, '关闭')
                            }
                        }
                    },
                    {
                        title: '管理',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                tbody: [
                    {
                        id: 1,
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        state: 1,
                        sex: 1,
                    },
                    {
                        id: 2,
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        state: 0,
                        sex: 0,
                    },
                    {
                        id: 3,
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        state: 0,
                        sex: 1,
                    },
                    {
                        id: 4,
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        state: 1,
                        sex: 2,
                    }
                ],
                columns1: [
                    {
                        title: '属性',
                        key: 'name',
                        width: 100
                    },
                    {
                        title: '说明',
                        key: 'doc'
                    },
                    {
                        title: '类型',
                        key: 'type',
                        width: 200
                    },
                    {
                        title: '默认值',
                        key: 'default',
                        width: 200
                    }
                ],
                data1: [
                    {
                        name: 'pageTitle',
                        doc: '页面导航显示的当前页面名字',
                        type: 'String',
                        default: 'null'
                    },

                ],
                columns2: [
                    {
                        title: '名称',
                        key: 'name',
                        width: 100
                    },
                    {
                        title: '说明',
                        key: 'doc'
                    },

                ],
                data2: [
                    {
                        name: 'searchBox',
                        doc: '搜索框插槽',

                    },
                    {
                        name: 'btnBox',
                        doc: '右上方工具栏按钮插槽',

                    },
                    {
                        name: 'table',
                        doc: '表格内容插槽',

                    },
                    {
                        name: 'EVpagePage',
                        doc: '分页插槽',

                    },
                    {
                        name: 'moreBtn',
                        doc: '拓展按钮插槽',

                    },

                ]
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: '提示信息',
                    content: `Name：${this.tbody[index].name}<br>Age：${this.tbody[index].age}<br>Address：${this.tbody[index].address}<br>states: ${this.tbody[index].states}`
                })
            },
            remove (index) {
                this.tbody.splice(index, 1);
            },
            addData () {
                console.log('新增');
            },
            reflesh () {
                console.log('刷新');
            },
            searchBtn () {
                console.log('搜索');
            }
        }
    }
</script>
