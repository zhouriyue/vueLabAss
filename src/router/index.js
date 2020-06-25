import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const addShop = r => require.ensure([], () => r(require('@/page/addShop')), 'addShop');
const addGoods = r => require.ensure([], () => r(require('@/page/addGoods')), 'addGoods');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const shopList = r => require.ensure([], () => r(require('@/page/shopList')), 'shopList');
const foodList = r => require.ensure([], () => r(require('@/page/foodList')), 'foodList');
const orderList = r => require.ensure([], () => r(require('@/page/orderList')), 'orderList');
const adminList = r => require.ensure([], () => r(require('@/page/adminList')), 'adminList');
const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
const newMember = r => require.ensure([], () => r(require('@/page/newMember')), 'newMember');
const uploadImg = r => require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');
const sendMessage = r => require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');
const SysUserList = r => require.ensure([], () => r(require('@/components/sysuser/SysUserList')), 'SysUserList');
const RecruitmentPlanList = r => require.ensure([], () => r(require('@/components/recruitmentplan/RecruitmentPlanList')), 'RecruitmentPlanList');
const EnrollInfo = r => require.ensure([], () => r(require('@/components/enrollinfo/EnrollInfo')), 'EnrollInfo');
const EmployList = r => require.ensure([], () => r(require('@/components/employ/EmployList')), 'EmployList');
const WorkContentList = r => require.ensure([], () => r(require('@/components/workcontent/WorkContentList')), 'WorkContentList');
const RepairApplyList = r => require.ensure([], () => r(require('@/components/repairapply/RepairApplyList')), 'RepairApplyList');
const Register = r => require.ensure([], () => r(require('@/components/Register')), 'Register');
const SystemSet = r => require.ensure([], () => r(require('@/components/SystemSet')), 'SystemSet');


const routes = [
	{
		path: '/',
		component: login
	}, {
        path: '/Register',
        component: Register
    },
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '/',
			component: home,
			meta: [],
		},{
			path: '/SysUserList',
			component: SysUserList,
			meta: ['用户管理', '用户列表'],
		},{
            path: '/RecruitmentPlanList',
            component: RecruitmentPlanList,
            meta: ['招聘计划管理', '招聘计划列表'],
        },{
            path: '/Enrollinfo',
            component: EnrollInfo,
            meta: ['报名信息管理', '报名信息列表'],
        },{
            path: '/EmployList',
            component: EmployList,
            meta: ['报名信息管理', '报名信息列表'],
        },{
            path: '/WorkContentList',
            component: WorkContentList,
            meta: ['工作内容管理', '工作内容列表'],
        },{
            path: '/RepairApplyList',
            component: RepairApplyList,
            meta: ['维修申报管理', '维修申报列表'],
        },{
            path: '/SystemSet',
            component: SystemSet,
            meta: ['系统设置', '系统设置'],
        },{
            path: '/addShop',
            component: addShop,
            meta: ['添加数据', '添加商铺'],
        },{
			path: '/addGoods',
			component: addGoods,
			meta: ['添加数据', '添加商品'],
		},{
			path: '/userList',
			component: userList,
			meta: ['数据管理', '用户列表'],
		},{
			path: '/shopList',
			component: shopList,
			meta: ['数据管理', '商家列表'],
		},{
			path: '/foodList',
			component: foodList,
			meta: ['数据管理', '食品列表'],
		},{
			path: '/orderList',
			component: orderList,
			meta: ['数据管理', '订单列表'],
		},{
			path: '/adminList',
			component: adminList,
			meta: ['数据管理', '管理员列表'],
		},{
			path: '/visitor',
			component: visitor,
			meta: ['图表', '用户分布'],
		},{
			path: '/newMember',
			component: newMember,
			meta: ['图表', '用户数据'],
		},{
			path: '/uploadImg',
			component: uploadImg,
			meta: ['文本编辑', 'MarkDown'],
		},{
			path: '/vueEdit',
			component: vueEdit,
			meta: ['编辑', '文本编辑'],
		},{
			path: '/adminSet',
			component: adminSet,
			meta: ['设置', '管理员设置'],
		},{
			path: '/sendMessage',
			component: sendMessage,
			meta: ['设置', '发送通知'],
		},{
			path: '/explain',
			component: explain,
			meta: ['说明', '说明'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
