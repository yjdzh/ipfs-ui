<template>
	<div>
		<EVpageList :pageTitle="pageTitle">
			<div slot="searchBox" class="serach">
				<Input v-model="searchValue" :class="selsctclass">
				<Select v-model="searchType" slot="prepend" style="width: 80px">
					<Option :value="option.value" :label="option.label" v-text="option.label" v-for="option in options" :key="option.index"></Option>
				</Select>
				<Button slot="append" icon="ios-search" @click="dosearch"></Button>
				</Input>
			</div>


			<div slot="Hsearch" class="Hserach">
				<Button icon="ios-search" type="primary" @click="openHsearch" style="display: inline-block">高级查询
				</Button>
				<Modal v-model="Hsearch" width="500" @on-cancel="HsearchC">
					<p slot="header">
						<span>高级查询</span>
					</p>
					<div>
						<Form :model="formItem" :label-width="80" >
							<Col span="23">
							<FormItem label="用户账号">
								<Input v-model="formItem.search_LIKE_username" placeholder="请输入用户账号"></Input>
							</FormItem>
							</Col>
							<Col span="23">
							<FormItem label="手机号码">
								<Input v-model="formItem.search_LIKE_phone" placeholder="请输入手机号码"></Input>
							</FormItem>
							</Col>
							<Col span="23">
							<FormItem label="用户名称">
								<Input v-model="formItem.search_LIKE_name" placeholder="请输入用户名称"></Input>
							</FormItem>
							</Col>
						</Form>
					</div>
					<div slot="footer">
						<i-button type="ghost" size="large" @click="HsearchC">取消搜索</i-button>
						<i-button type="primary" size="large" @click="HsearchS">确认搜索</i-button>
					</div>
				</Modal>
			</div>


			<div slot="btnBox" class="btn">
				<Button @click="added" type="success">新增</Button>
				<Button @click="refresh" type="info">刷新</Button>
			</div>
			<div slot="table">
				<Table border :columns="datahead" :data="databody" size='small' :loading="loading">
				</Table>
			</div>
			<div slot="pagePage">
				<Page :total="totalpage" show-total show-elevator :page-size="pagesize" @on-change="onchanges" :current="current">
				</Page>
			</div>

			<div slot="moreBtn">
				<!--拓展按钮1-->
			</div>
		</EVpageList>
		<Modal v-model="modal" title="默认配置" class-name="hideenfooter">
			<Form ref="formV" :model="formV" :rules="ruleV" :label-width="0">
				<EVdivider orientation="right">
					<span class="dividertit">编辑配置</span>
					<i-switch size='large' @on-change="switchfunction">
						<span slot='open'>开启</span>
						<span slot='close'>关闭</span>
					</i-switch>
				</EVdivider>
				<FormItem label="" prop="hardInfo" :span="12" v-if="this.switch">
					<Input type="textarea" :autosize="{minRows: 4,maxRows: 10}" v-model="formV.hardInfo" placeholder="请输入配置信息">

					</Input>
				</FormItem>
				<div>
					<pre v-if="!this.switch" v-text="hardInfo"></pre>
				</div>
				<FormItem>
					<Button v-if="this.switch" type="primary" size="large" class="submitbbox" @click="handleSubmit('formV')" :loading="load">提交
					</Button>
				</FormItem>
			</Form>
		</Modal>
		<Modal v-model="defaults.powerShow" width="300" :mask-closable="false" class="powerModal" @on-cancel="" @on-ok="">
			<p slot="header">
				<Icon type="earth"></Icon>
				<span v-text="'设置账号“'+defaults.powerFormTitle + '”的授权'"></span>
				<!--<span :v-show="false" v-text="username"></span>-->
			</p>


			<!--<p class="powerTitle">-->
			<!--<span>分类权限</span>-->
			<!--&lt;!&ndash;<label>&ndash;&gt;-->
			<!--&lt;!&ndash;&lt;!&ndash;<span v-for="(item, index) in defaults.opera" :key="index">&ndash;&gt;&ndash;&gt;-->
			<!--&lt;!&ndash;&lt;!&ndash;<em v-if="item === 'r'" v-text="'访问'"></em>&ndash;&gt;&ndash;&gt;-->
			<!--&lt;!&ndash;&lt;!&ndash;<em v-else-if="item === 'c'" v-text="'添加'"></em>&ndash;&gt;&ndash;&gt;-->
			<!--&lt;!&ndash;&lt;!&ndash;<em v-else-if="item === 'u'" v-text="'修改'"></em>&ndash;&gt;&ndash;&gt;-->
			<!--&lt;!&ndash;&lt;!&ndash;<em v-else-if="item === 'd'" v-text="'删除'"></em>&ndash;&gt;&ndash;&gt;-->
			<!--&lt;!&ndash;&lt;!&ndash;<em v-else-if="item === 'a'" v-text="'审核'"></em>&ndash;&gt;&ndash;&gt;-->

			<!--&lt;!&ndash;&lt;!&ndash;</span>&ndash;&gt;&ndash;&gt;-->
			<!--&lt;!&ndash;<span>&ndash;&gt;-->
			<!--&lt;!&ndash;<em v-text="'全选'"></em>&ndash;&gt;-->
			<!--&lt;!&ndash;</span>&ndash;&gt;-->
			<!--&lt;!&ndash;</label>&ndash;&gt;-->
			<!--</p>-->
			<div class="powerBox" v-if="defaults.powerShow">
				<Tree :data="powerListInit" show-checkbox></Tree>
				<!--<Tree :data="powerList"></Tree>-->
				<!--<Spin size="large" fix v-if="defaults.spinShow"></Spin>-->
			</div>
			<div slot="footer">
				<!--<Button type="error" class="evanBtnBox" size="small" long-->
				<!--@click="submitA(powerListInit,4,username)"-->
				<!--&gt;取消授权-->
				<!--</Button>-->
				<Button type="primary" class="evanBtnBox" size="small" long @click="submitB()">确定授权
				</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	export default {
		name: "musers",

		data() {
			var _this = this;
			const coderhardInfo = function(coder, value, callback) {

				if ((_this.formV.hardInfo !== '')) {
					const str = _this.formV.hardInfo
					if (typeof str == 'string') {
						try {
							var obj = JSON.parse(str);
							if (typeof obj == 'object' && obj) {
								callback();
							} else {
								callback(new Error('JSON格式异常'));
							}

						} catch (e) {

							callback(new Error('JSON格式异常'));
						}
					}

				}

			}
			return {
				search: {},
				Hsearch: false,

				formItem: {
					search_LIKE_username: '',
					search_LIKE_phone: '',
					search_LIKE_name: ''
				},
				api: {
					base: '/musers', //请求部分
					access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),
				},
				defaults: {
					spinShow: true,
					powerShow: false,
					powerFormTitle: '',
					opera: ['opera'],
					appName: ''
				},
				powerListInit: [],
				powerOperaListInit: {},
				oprah: {},


				pageTitle: '运维用户', //页面标题
				totalpage: 0,
				pagesize: this.Global.pagesize,
				current: 1,
				formV: {
					hardInfo: '',
				},
				modal: false,
				switch: false,
				hardInfo: {},
				load: false,
				id: null,
				ruleV: {

					hardInfo: [{
						required: true,
						validator: coderhardInfo,
						trigger: 'blur'
					}],
				},
				options: [ //下拉选项
					{
						label: '用户账号',
						value: 'search_LIKE_username',
					},
				],
				datahead: [

					{
						align: 'left',
						title: '名称',
						key: 'name'
					},
                    {
                    	align: 'left',
                    	title: '数据中心',
                        width: 200,
                        render: function (h, params) {
                            return h('span', [params.row.zoneEntity.name])
                        }
                    },
					{
						align: 'left',
						title: '账号',
						key: 'username',
						width: 150
					},
					{
						align: 'left',
						title: '管理员',
						key: 'isAdmin',
						width: 80,
						render: function(h, params) {
							return h('span', {
								style: {
									color: function() {
										switch (params.row.isAdmin) {
											case 0:
												return '#19be6b';
												break;
											case 1:
												return '#ed3f14';
												break;

										}
									}()
								}
							}, [function() {
								switch (params.row.isAdmin) {
									case 0:
										return '否';
										break;
									case 1:
										return '是';
										break;

								}
							}()])
						},
					},

					{
						align: 'left',
						title: '手机号码',
						key: 'phone',
						width: 120,
					},
					{
						align: 'left',
						title: '状态',
						key: 'status',
						width: 80,
						render: function(h, params) {
							return h('span', {
								style: {
									color: function() {
										switch (params.row.status) {
											case 0:
												return '#ed3f14';
												break;
											case 1:
												return '#19be6b';
												break;

										}
									}()
								}
							}, [function() {
								switch (params.row.status) {
									case 0:
										return '停用';
										break;
									case 1:
										return '启用';
										break;

								}
							}()])
						},
					},


					{
						title: '管理',
						key: 'action',
						width: 180,
						align: 'center',
						render: function(h, params) {
							return h('div', [

								h('Button', {
									props: {
										type: 'primary',
										size: 'small',

									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: function() {
											_this.edit(params)
										}
									}
								}, '编辑'),
								h('Button', {
									props: {
										type: 'primary',
										size: 'small',
										disabled: params.row.isAdmin == 1 ? true : false,
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: function() {
											_this.handlePowerShow(params)
											_this.id = params.row.id
										}
									}
								}, '设置权限'),
								h('Dropdown', [
									h('Button', {
										props: {
											type: 'primary',
											size: 'small',
											disabled: params.row.lineState == 0 ? true : false,
										},
										style: {
											marginRight: '5px'
										}
									}, '更多'),
									h('DropdownMenu', {
										slot: "list"
									}, [

										h('DropdownItem', {
											props: {
												disabled: params.row.isAdmin == 1 ? true : false,
											},
											nativeOn: {
												click: function() {
													if (params.row.isAdmin !== 1) {
														_this.Global.fun(_this, 'get', {
																base: _this.api.base,
																other: '/changeStatus?',
																access_token: _this.api.access_token,
															}, {
																id: params.row.id,
																status: params.row.status == 1 ? '0' : '1',
															},
															function(res, that) {
																if (res.data.status == 1) {
																	that.onchanges(1)
																} else {

																	that.$Message.destroy();
																	that.$Message.error(res.data.msg);

																}

															});
													} else {}
												}
											}
										}, params.row.status == 1 ? '停用' : '启用'),

										h('DropdownItem', {
											props: {
												disabled: false,
											},
											nativeOn: {
												click: function() {
													_this.$Modal.confirm({
														title: '操作确认',
														content: '<p>确认要重置密码吗？</p>',
														closable: true,
														loading: true,
														okText: '重置',
														cancelText: '取消',
														onOk: function() {
															_this.Global.fun(
																_this,
																'get', {
																	base: _this.api.base,
																	other: '/resetPwd?',
																	access_token: _this.api.access_token
																}, {
																	username: params.row.username
																}, c)

															function c(res, that) {
																if (res.data.status == 1) {
																	that.$Message.destroy();
																	that.$Message.success('重置成功');
																	that.$Modal.remove();
																} else {
																	that.$Message.destroy();
																	that.$Message.error(res.data.msg);
																	that.$Modal.remove();
																}
															}

														},
													});
												}
											}
										}, '重置密码'),

										h('DropdownItem', {
											props: {
												disabled: params.row.isAdmin == 1 ? true : false,
											},
											nativeOn: {
												click: (name) => {
													if (params.row.isAdmin !== 1) {
														_this.$Modal.confirm({
															title: '操作确认',
															content: '<p>确认要删除吗？</p>',
															loading: true,
															closable: true,
															onOk: function() {
																_this.Global.fun(
																	_this,
																	'delete', {
																		base: _this.api.base,
																		other: '/' + params.row.id + '?',
																		access_token: _this.api.access_token
																	}, {}, c)

																function c(res, that) {
																	that.$Message.destroy();
																	that.$Message.info(res.data.msg);
																	that.$Modal.remove();
																	that.refresh()
																}

															},
														});
													}
												}
											}
										}, "删除")


									])
								]),

							])
						}
					}
				],
				databody: [],
				loading: true,

				oprah: {},
				searchType: 'search_LIKE_username',
				searchValue: '',
				id: null,
			};
		},
		computed: {
			disabledadd() {
				return false
			},
			selsctclass() {
				return this.options.length === 1 ? 'overhidden' : ''
			}
		},
		methods: {
			openHsearch() {
				this.formItem.search_LIKE_username = ''
				this.formItem.search_LIKE_phone = ''
				this.formItem.search_LIKE_name = ''
				this.Hsearch = true
			},
			HsearchC() {
				this.Hsearch = false

			},
			HsearchS() {
				this.search = {}
				this.search = this.formItem
				if (this.search) {
					for (var k in this.search) {
						if (this.search[k] === '') {
							delete this.search[k]
						}
					}
				}
				this.search = this.search
				this.onchanges(1)
				this.HsearchC()
			},
			// doOperaList () {
			//     this.defaults.opera.push('null')
			//     this.arrayRemove('null')
			//
			// },
			// arrayRemove (val) {
			//     var index = this.defaults.opera.indexOf(val);
			//     if (index > -1) {
			//         this.defaults.opera.splice(index, 1);
			//     }
			// },

			getArrayDo(data, list, t) {

				const l = data.length
				for (var i = 0; i < l; i++) {
					if (data[i].modules == null || data[i].modules == '') {
						if ((data[i].checked)) {
							list.push(data[i].ename)
							if (t && list.indexOf(t) == -1) {
								list.push(t)
							}


						}
					} else {
						const tmp = data[i].ename
						data[i].expand = true
						data[i].children = data[i].modules
						data[i].title = data[i].name
						if ((data[i].checked)) {
							list.push(data[i].ename)
						}
						this.getArrayDo(data[i].children, list, tmp);
					}
				}

			},

			submitB() {
				debugger

				var _this = this
				var list = []
				_this.getArrayDo(_this.powerListInit, list)
				console.log(list)

				this.Global.fun(this, 'post', {
					base: this.api.base,
					other: '/rights?',
					access_token: this.api.access_token,
				}, {
					id: this.id,
					menus: list.join(',')

						,
				}, function(res, that) {
					if (res.data.status == 1) {
						that.$Message.destroy()
						that.$Message.success('设置权限成功')
						that.defaults.powerShow = false
					} else {
						that.$Message.destroy()
						that.$Message.error(res.data.msg);
						that.defaults.powerShow = false
					}
				})


			},


			handlePowerShow(params) {
				var _this = this
				this.tmp = {}
				this.powernode = {}


				this.defaults.spinShow = true;
				this.defaults.powerFormTitle = params.row.username;
				this.username = params.row.username;
				let url = '/musers/rights?' + this.api.access_token + '&id=' + params.row.id;

				this.$http.get(url).then((res) => {


					if (res.data.status === 1) {

						_this.powerOperaListInit = res.data.data.rights
						var temp = [...res.data.data.menu]
						debugger
						_this.getArray(temp)
						console.log(temp)
						_this.powerListInit = temp

						_this.defaults.spinShow = false
						_this.defaults.powerShow = true

					} else {
						_this.$Message.destroy()
						_this.$Message.error(res.data.msg)
					}
				})
			},


			getArray(data, t) {
				const l = data.length
				const k = this.powerOperaListInit.length


				for (var i = 0; i < l; i++) {
					if (data[i].modules == null || data[i].modules == '') {
						data[i].expand = true
						data[i].title = data[i].name
						data[i].checked = false
						if (this.powerOperaListInit.indexOf(data[i].ename) != -1) {
							data[i].checked = true
							t ? t.checked = false : null
						}






					} else {
						data[i].expand = true
						data[i].children = data[i].modules
						data[i].title = data[i].name
						data[i].checked = false
						// for (var j = 0; j < k; j++) {
						//     if (this.powerOperaListInit[j] == data[i].ename) {
						//         data[i].checked = true
						//     }
						// }
						// if (this.powerOperaListInit.indexOf([data[i].ename] + ':r') !== -1) {
						//     data[i].checked = true
						// }

						if (this.powerOperaListInit.indexOf(data[i].ename) != -1) {
							data[i].checked = true
							const t = data[i]
						}
						this.getArray(data[i].children, data[i]);
					}
				}

			},
			//重置，刷新，初始化函数（默认 搜索项相关置空，分页相关数据初始化）


			switchfunction(e) {
				this.switch = e

			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.load = true
						this.Global.submit(this, 'put', {
								base: this.api.base,
								other: '/cfg/' + this.id + '?',
								access_token: this.api.access_token,
							}, {
								cfg: (this.formV.hardInfo.replace(/\\/g, "")).replace(/ \s*/g, "")
							},


							function(res, that) {
								if (res.data.status == 1) {
									that.$Message.destroy();
									that.$Message.success('保存成功');

								} else {
									that.$Message.destroy();
									that.$Message.error('保存失败');

								}
								that.$refs['formV'].resetFields();
								that.load = false
								that.modal = false
							});
					} else {
						this.$Message.error('JSON格式错误');
					}
					this.$Modal.remove()
				})

			},
			refresh: function() {
				this.loading = true
				this.search = {}
				this.searchType = 'search_LIKE_username'
				// this.searchValue = ''
				// this.search = ''
				// this.current = 1
				this.onchanges(this.current)
			},
			edit: function(params) {
				this.Global.value = '';
				this.Global.type = '';
				this.$router.push({
					name: 'musers_form',
					query: {
						id: params.row.id,
						current: this.current,
						search: this.search,

					}
				})

			},
			added: function() {
				this.Global.value = '';
				this.Global.type = '';
				this.$router.push({
					name: 'musers_form',
					query: {
						id: -1,
						current: 1,
						search: '',

					}
				})

			},
			onchanges: function(e) {
				var that = this
				this.loading = true
				this.searchValue = this.search[this.searchType] ? this.search[this.searchType] : ''
				this.current = e;
				this.Global.fun(this, 'get', {
					base: this.api.base,
					other: '/page?',
					access_token: this.api.access_token
				}, function() {
					that.search.page = e - 1
					that.search.size = 10
					return that.search
				}(), c)

				function c(res, that) {
					if (res.data.status === 1) {
						for (var key in res.data.data) {
							if (res.data.data[key] === null) {
								res.data.data[key] = '暂无数据'
							}
						}
						that.totalpage = res.data.data.totalElements;
						that.current = res.data.data.number + 1;
						that.databody = res.data.data.content;
						that.loading = false;
					} else {
						that.$Message.destroy();
						that.$Message.error(res.data.msg);
						that.loading = false;
					}
				}
			},
			oprahfun: function(e) {
				this.Global.oprahfun(this)
			},
			dosearch: function() {
				this.loading = true

				if (this.searchValue.match(this.Regex.regexlist.basesearch)) {
					this.search = {}
					this.search[this.searchType] = this.searchValue
					this.onchanges(1)

				} else if (this.searchValue === '') {
					this.search = {}
					this.onchanges(1)
				} else {
					this.$Message.destroy();
					this.$Message.error('输入条件不合法');
					this.loading = false;
				}
			}
		},
		created: function() {
			this.current = this.$route.query.current ? parseInt(this.$route.query.current) : 1
			this.search = this.$route.query.search ? this.$route.query.search : {}
			this.searchType = 'search_LIKE_username',
				this.loading = true


			this.onchanges(1)
			this.defaults.powerShow = this.show
		},
	}
</script>

<style scoped>

</style>
