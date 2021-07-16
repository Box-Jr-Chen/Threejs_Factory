import Vue from 'vue'
import VueRouter from 'vue-router'

//第一步 導入組件
import ServiceView     from '../components/Platform/Main/Main.vue'
import TMS     from '../components/Platform/TMS/TMS.vue'
import TMS_equipment_3D     from '../components/Platform/TMS/Select/equip_3d/Status_equipment_3d.vue'
Vue.use(VueRouter)
//第三布 定義路由規劃
var routes = [
    {
      path:'/',
      redirect:'/service/tms/status'
    },
    {
        path:'*',
        redirect:'/service/tms/status'
    },
    {
      path:'/service',
      component: ServiceView,
      children:[
        {
            path:'tms',
            component: TMS,
            children:[
              {path:'', redirect:'status'},
              {path:'status', component: TMS_equipment_3D},
            ]
        }
      ]
    }
  ]
//第四部  創建路由對象
var router = new VueRouter({
    mode: 'hash',
  //routes:routes
    routes
})

// //路由守衛
router.beforeEach((to,from,next) => {
    next();
    // const isLogin = localStorage.username ? true:false;

    //  if(to.path =="/login"){
    //        next();
    //  }
    //  else
    //  {
    //      if(isLogin)
    //      {
    //         next();
    //      }
    //      else
    //      {
    //         next('/login');
    //      }
    //  }
  });


export default router
