<template>
	<EVpageList :pageTitle="pageTitle">
		<div slot="searchBox" class="serach">
			<Input v-model.trim="searchValue" :class="selsctclass">
			<Select v-model="searchType" slot="prepend" style="width: 80px">
				<Option :value="option.value" :label="option.label" v-text="option.label" v-for="option in options" :key="option.index"></Option>
			</Select>
			<Button slot="append" icon="ios-search" @click="dosearch"></Button>
			</Input>
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
<!--             <Button @click="added" type="success">新增</Button> -->
			<!--拓展按钮1-->
		</div>
	</EVpageList>
</template>

<script>
	export default {
		name: "mflows",
		// components: {flows},
		data() {
			var _this = this;
			return {
				api: {
					base: '/mquestion', //请求部分
					access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),
				},
				pageTitle: '帮助管理', //页面标题
				totalpage: 0,
				pagesize: this.Global.pagesize,
				current: 1,
				options: [ //下拉选项
					{
						label: '问题',
						value: 'ques',
					}
				],
				datahead: [{
						align: 'center',
						title: '类型',
						key: 'type',
						width: 100,
						render: function(h, params) {
							return h('span', {
								style: {
									color: function() {
										switch (params.row.type) {
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
								switch (params.row.type) {
									case 0:
										return '新手问题';
										break;
									case 1:
										return '星际特工问题';
										break;

								}
							}()])
						},
					}, {
						align: 'left',
						title: '问题',
						key: 'ques',
						width: 200,
					}, {
						align: 'left',
						title: '回答',
						key: 'replay',
					},
					{
						title: '管理',
						key: 'action',
						width: 120,
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
										type: 'error',
										size: 'small',

									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: function() {
											_this.$Modal.confirm({
												title: '操作确认',
												content: '<p>确认要删除吗？</p>',
												loading: true,
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
														that.$Message.info('删除成功');
														that.$Modal.remove();
														that.refresh()
													}
												},
											});
										}
									}
								}, '删除'),

							])
						}
					}
				],
				databody: [],
				loading: true,
				search: '',
				oprah: {},
				searchType: '',
				searchValue: '',
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
			refresh: function() {
				this.loading = true
				var _this = this;
				//                 this.searchType = 'mfrs'
				//                 this.searchValue = ''
				//                 this.search = ''
				//                 this.current = 1
				this.onchanges(this.current)
			},
			edit: function(params) {
				this.Global.value = '';
				this.Global.type = '';
				this.$router.push({
					name: 'flows_form',
					params: {
						id: params.row.id

					}
				})

			},
			added: function() {
				this.Global.value = '';
				this.Global.type = '';
				this.$router.push({
					name: 'flows_form',
					params: {
						id: -1,

					}
				})

			},
			added: function() {
				this.Global.value = '';
				this.Global.type = '';
				this.$router.push({
					name: 'mquestion_form',
					query: {
						id: -1,

					}
				})

			},

			edit: function (params) {
			    this.Global.value = '';
			    this.Global.type = '';
			    this.$router.push({
			        name: 'mquestion_form',
			        query: {
			            id: params.row.id,

			        }
			    })

			},
			onchanges: function(e) {
				this.loading = true
				this.searchValue = this.search === '' ? '' : this.search
				this.current = e;
				this.Global.fun(this, 'get', {
					base: this.api.base,
					other: '/page?',
					access_token: this.api.access_token
				}, this.searchValue !== '' ? JSON.parse('{"' + 'search_LIKE_' + this.searchType + '":"' + this.searchValue +
					'","page":"' + (this.current - 1) + '","size":"' + this.pagesize + '"}') : {
					page: this.current - 1,
					size: this.pagesize
				}, c)

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
					this.search = this.searchValue
					this.onchanges(1)
				} else if (this.searchValue === '') {
					this.search = ''
					this.onchanges(1)
				} else {
					this.$Message.destroy();
					this.$Message.error('输入条件不合法');
					this.loading = false;
				}
			}
		},
		created: function() {
			this.searchType = 'ques',
				this.refresh()
		},
	}
</script>

<style scoped>

</style>
