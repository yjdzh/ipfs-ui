import Main from '../pages/Main.vue'

export const local = {
	path: '/',
	name: 'local',
	redirect: '/login',

}
export const Logout = {
	path: '/logout',
	name: 'Logout',
	component: r => require.ensure([], () => r(require('../pages/Logout')), 'logout')
}
export const test = {
	path: '/test',
	name: 'test',
	component: r => require.ensure([], () => r(require('../pages/test')), 'test')
}


export const Login = {
	path: '/login',
	name: 'Login',
	meta: {
		title: '登录'
	},
	component: r => require.ensure([], () => r(require('../pages/Login')), 'login')
}


export const error401 = {
	path: '/error401',
	name: 'error401',
	component: r => require.ensure([], () => r(require('../pages/error/401')), 'error401')
}
export const error404 = {
	path: '/error404',
	name: 'error404',
	component: r => require.ensure([], () => r(require('../pages/error/404')), 'error404')
}
export const error500 = {
	path: '/error500',
	name: 'error500',
	component: r => require.ensure([], () => r(require('../pages/error/500')), 'error500')
}


export const screen = {
	path: '/screen',
	name: 'screen',
	component: r => require.ensure([], () => r(require('../pages/Screen')), 'screen')
}


export const appRouter = {
	path: '/main',
	name: 'Main',
	component: r => require.ensure([], () => r(require('../pages/Main')), 'main'),
	children: [{
			path: '/welcome',
			name: 'welcome-0',
			meta: {
				title: '欢迎页',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('../pages/welcome')), 'welcome-0')
		},

		{
			path: '/mxtgl-msetups',
			name: 'mxtgl-msetups',
			meta: {
				title: '参数设置',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/mxtgl/msetups')),
				'mxtgl-msetups')
		},
		{
			path: '/mcpgl-mproduct',
			name: 'mcpgl-mproduct',
			meta: {
				title: '产品管理',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/mcpgl/mproduct')),
				'mcpgl-mproduct')
		},
		{
			path: '/mcpgl-mproduct-form',
			name: 'mproduct_form',
			meta: {
				title: '产品管理',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/mcpgl/mproduct_form')),
				'mproduct_form')
		},
		{
			path: '/mcpgl-mver',
			name: 'mcpgl-mver',
			meta: {
				title: '版本管理',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/mcpgl/mver')),
				'mcpgl-mver')
		},
		{
			path: '/mcpgl-mver-form',
			name: 'mver_form',
			meta: {
				title: '版本管理',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/mcpgl/mver_form')),
				'mcpgl_form')
		}, {
			path: '/mkcgl-mzone',
			name: 'mkcgl-mzone',
			meta: {
				title: '数据中心管理',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/mkcgl/mzone')),
				'mkcgl-mzone')
		},
		{
			path: '/mkcgl-mzone-form',
			name: 'mzone_form',
			meta: {
				title: '数据中心管理',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/mkcgl/mzone_form')),
				'mzone_form')
		},{
			path: '/mkcgl-mscreem',
			name: 'mkcgl-mscreem',
			meta: {
				title: '大屏设置',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/mkcgl/mscreem_form')),
				'mkcgl-mscreem')
		},
		{
			path: '/msbgl-mdev',
			name: 'msbgl-mdev',
			meta: {
				title: '设备管理',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/msbgl/mdev')),
				'msbgl-mdev')
		},
		{
			path: '/msbgl-mdev-form',
			name: 'mdev_form',
			meta: {
				title: '设备管理',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/msbgl/mdev_form')),
				'mdev_form')
		},
		{
			path: '/msbgl-mstocks',
			name: 'msbgl-mstocks',
			meta: {
				title: '库存管理',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/msbgl/mstocks')),
				'msbgl-mstocks')
		},
		{
			path: '/msbgl-mstocks-form',
			name: 'mstocks_form',
			meta: {
				title: '库存管理',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/msbgl/mstocks_form')),
				'mstocks_form')
		},
		{
			path: '/msbgl-mflows',
			name: 'msbgl-mflows',
			meta: {
				title: '入库流水',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/msbgl/mflows')),
				'msbgl-mflows')
		},
		{
			path: '/msbgl-mflows-form',
			name: 'mflows_form',
			meta: {
				title: '入库流水',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/msbgl/mflows_form')),
				'mflows_form')
		},
		{
			path: '/myhgl-mpuser',
			name: 'myhgl-mpuser',
			meta: {
				title: '用户管理',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/myhgl/mpuser')),
				'myhgl-mpuser')
		},
		{
			path: '/myhgl-mpuser-list',
			name: 'mpuser_list',
			meta: {
				title: '用户管理',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/myhgl/mpuser_list')),
				'mpuser_list')
		},
		{
			path: '/myhgl-musers',
			name: 'myhgl-musers',
			meta: {
				title: '运维用户',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/myhgl/musers')),
				'myhgl-musers')
		},
		{
			path: '/myhgl-musers-form',
			name: 'musers_form',
			meta: {
				title: '运维用户',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/myhgl/musers_form')),
				'musers_form')
		},
		{
			path: '/mddgl-morder',
			name: 'mddgl-morder',
			meta: {
				title: '订单管理',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/mddgl/morder')),
				'mddgl-morder')
		}, {
			path: '/msygl-mzonevir',
			name: 'msygl-mzonevir',
			meta: {
				title: '数据中心钱包',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/msygl/mzonevir')),
				'msygl-mzonevir')
		},
		{
			path: '/msygl-mzonevir-form',
			name: 'mzonevir-form',
			meta: {
				title: '数据中心钱包',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/msygl/mzonevir_form')),
				'mzonevir-form')
		},
		{
			path: '/msygl-malloter',
			name: 'msygl-malloter',
			meta: {
				title: '收益分配',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/msygl/malloter')),
				'msygl-malloter')
		},
		{
			path: '/msygl-malloter-form',
			name: 'malloter-form',
			meta: {
				title: '收益分配',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/msygl/malloter_form')),
				'malloter-form')
		},
		{
			path: '/msygl-mplayrule',
			name: 'msygl-mplayrule',
			meta: {
				title: '活动奖励',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/msygl/mplayrule')),
				'msygl-mplayrule')
		},
		{
			path: '/msygl-mplayrule-form',
			name: 'mplayrule-form',
			meta: {
				title: '活动奖励',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/msygl/mplayrule_form')),
				'mplayrule-form')
		},{
            path: '/msygl-mplayrule-see-form',
            name: 'mplayrule-seeform',
            meta: {
                title: '活动奖励',
                hierarchy: [{
                    base: 'formDemo',
                    app: 'formDemo',
                    fristclass: 'formDemo',
                    floor: 2
                }]
            },
            component: r => require.ensure([], () => r(require('@/components/msygl/mplayrule_seeForm')),
                'mplayrule-form')
        }, {
			path: '/msygl-mmoney',
			name: 'msygl-mmoney',
			meta: {
				title: '收益管理',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/msygl/mmoney')),
				'msygl-mmoney')
		}, {
			path: '/mbzgl-mquestion',
			name: 'mbzgl-mquestion',
			meta: {
				title: '帮助管理',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/mbzgl/mquestion')),
				'mbzgl-mquestion')
		},
		{
			path: '/mbzgl-mquestion-form',
			name: 'mquestion_form',
			meta: {
				title: '帮助管理',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/mbzgl/mquestion_form')),
				'mquestion_form')
		},
		{
			path: '/mtjgl-mcptj',
			name: 'mtjgl-mcptj',
			meta: {
				title: '产品统计',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/mtjgl/mstatistic')),
				'mtjgl-mcptj')
		},{
			path: '/mtjgl-mpuservir',
			name: 'mtjgl-mpuservir',
			meta: {
				title: '客户收益',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/mtjgl/mpuservir')),
				'mtjgl-mpuservir')
		},{
			path: '/mtjgl-mkcsy',
			name: 'mtjgl-mkcsy',
			meta: {
				title: '数据中心收益',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/mtjgl/mkcsy')),
				'mtjgl-mkcsy')
		},{
			path: '/msygl-mtbvir',
			name: 'msygl-mtbvir',
			meta: {
				title: '提币管理',
				hierarchy: [{
					base: 'formDemo',
					app: 'formDemo',
					fristclass: 'formDemo',
					floor: 2
				}]
			},
			component: r => require.ensure([], () => r(require('@/components/msygl/mtbvir')),
				'msygl-mtbvir')
		}


	]
}

export const routers = [
	appRouter, Login, Logout,screen,local, error401, error404, error500, test

]
