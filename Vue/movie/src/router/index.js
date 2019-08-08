    import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import axios from 'axios'


// import HelloWorld from '@/components/HelloWorld'
// import User from '@/components/User'
// import ShowText from '@/components/ShowText'
// import RobotTest from '@/components/RobotTest'
import movieDetail from '../pages/movieDetail'
import loginPage from '../pages/loginPage'
import moviesList from '../pages/moviesList'
import registerPage from '../pages/registerPage'
import findPassword from '../pages/findPassword'
import userInfo from '../pages/userInfo'
import newDetail from '../pages/newDetail'



Vue.use(Router)
Vue.use(VueResource) 
Vue.use(axios)


export default new Router({
  routes: [
    {
        path: '/',
        component: resolve => require(['../pages/index'],resolve),
        meta:{
        	title:'home'
        }
    },
    {	
    	path: '/index',
        component: resolve => require(['../pages/index'],resolve),
        meta:{
        	title:'home'
        }

    },
    {//浏览器的url打错，捂脸
    	path:'/movieList',
    	component:moviesList
    },
    {
    	path:'/movieDetail',
    	component:movieDetail
    },
    {
    	path:'/loginPage',
    	component:loginPage
    },
    {
    	path:'/register',
    	component:registerPage
    },
    {
    	path:'/findPassword',
    	component:findPassword
    },
    {
    	path:'/userInfo',
    	component:userInfo
    },
    {
        path:'/newDetail',
        component:newDetail
    }



    // {
    // 	path:'/ShowText',
    // 	component:ShowText
    // },
    // {
    // 	path:'/RobotTest',
    // 	component:RobotTest
    // }

  ]
})
