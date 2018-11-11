import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Features from './views/nav1/Features.vue'
import Model from './views/nav1/Model.vue'
import Analysis from './views/nav1/Analysis.vue'
import Record from './views/nav2/Record.vue'
import Statistics from './views/nav2/Statistics.vue'
import Plan from './views/nav3/Plan.vue'
import Track from './views/nav3/Track.vue'
import Log from './views/nav4/Log.vue'
import Settings from './views/nav4/Settings.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '辅助诊断',
        iconCls: 'fa fa-stethoscope',//图标样式class
        children: [
            // { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/features', component: Features, name: '特征选择' },
            { path: '/model', component: Model, name: '模型构建'},
            { path: '/analysis', component: Analysis, name: '预测分析'}
            // { path: '/user', component: user, name: '列表' , hidden: true },
        ]
    },
    {
        path: '/data-maintain',
        component: Home,
        name: '数据维护',
        iconCls: 'fa fa-file-excel-o',
        children: [
            { path: '/ele-medical-record', component: Record, name: '电子病历' },
            { path: '/report-statistics', component: Statistics, name: '报表统计' }
        ]
    },
    {
        path: '/patient-manage',
        component: Home,
        name: '患者管理',
        iconCls: 'fa fa-user-md',
        children: [
            { path: '/treatment-plan', component: Plan, name: '诊疗计划' },
            { path: '/disease-track', component: Track, name: '病情跟踪' }
        ]
    },
    {
        path: '/system-settings',
        component: Home,
        name: '系统设置',
        iconCls: 'fa fa-gear',
        children: [
            { path: '/settings', component: Settings, name: '权限设置' },
            { path: '/log-manage', component: Log, name: '日志管理' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
