import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import ThreeJs from '@js/threejs/threejs.js';
import store from '@js/store'
Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        nav_height:0,
        mywidth:0,
        myheight:0,
        width_3d:0, //3d內的長寬
        height_3d:0,
        panel_x:0,
        panel_y:0,
        bound_x:0,
        bound_y:0,
        threejs :ThreeJs.ThreeJs,
        //program_robot :Program_Robot.Program_Robot,
        select_panel:0,
        element_panel:null, //panel組件
        isFullScreen:false,
        isInit_loading:true,

        loading_finish:[],

        baseUrlApi:'https://wh-toolholder-3d.herokuapp.com/api',
     //   baseUrlApi:'http://127.0.0.1:8000/api',
        p_w: '/warehouse',
        p_wcnc:'/cnc',
        p_type:'/type',  //種類
        p_toolholder:'/toolholder',  //刀把資料
        p_toolholderPage:'/toolholder/page',  //刀把資料
        TMS_select_now:null,
        TMS_select_now_sub:null,
        ToolHolder_TYPES:[
            {
                'title':'刀具型式',
                'ax_path':'/type/shank',
                'now_type':'now_type_shank',
                'data':[
                ]
            },
            {
                'title':'刀具加工',
                'ax_path':'/type/machining',
                'now_type':'now_type_machining',
                'data':[
                ]
            },
            {
                'title':'刃數',
                'ax_path':'/type/shankamount',
                'now_type':'now_type_shankamount',
                'data':[
                ]
            },
            {
                'title':'刀具材質',
                'ax_path':'/type/material',
                'now_type':'now_type_material',
                'data':[
                ]
            },
            {
                'title':'中心冷卻',
                'ax_path':'/type/cooling',
                'now_type':'now_type_cooling',
                'data':[
                ]
            },
        ],


        ToolHolder_wh:[

        ],

        ToolHolder_Cnc:[

        ],

        ToolHolder_Type:{
            'cooling':[],
            'machining':[],
            'material':[],
            'shank':[],
            'shankamount':[],
        }
    },
    getters:{
        ApiPath: (state)=> (sub)  => {
            return state.baseUrlApi +sub ;
       }
    },
    mutations: {
        //    StorageUser(state,UserName){
        //     localStorage.setItem('username',UserName);
        //    }
    },
    actions: {
        async AxiosGet(state,data){
            return  await axios.get(data.path).then(response =>{
                 return response.data;
            }).catch(error => {
                 return Promise(error);
            })
        },
        async AxiosPost(state,data){

            return  await axios.post(data.path,data.form).then(response =>{
                 return response.data;
            }).catch(error => {
                 return Promise.rejecte(error);
            })
        },
        async AxiosPatch(state,data){   //測試

            return  await axios.patch(data.path,data.form).then(response =>{
                 return response.data;
            }).catch(error => {
                 return Promise.rejecte(error);
            })
        },
        async AxiosDelete(state,data){   //測試
            return  await axios.delete(data.path).then(response =>{
                 return response.data;
            }).catch(error => {
                 return error ;
            })
        },
        async A_GetWarehouse_toolholder(state,checkdata){
            var self= this;
            var data = {
              'path': self.state.baseUrlApi + self.state.p_w+"/"+checkdata
            };

            state
            return await store
                .dispatch('AxiosGet', data)
                .then(response => {
                  return  response;
                }
                ).catch(error => {
                  console.error(error);
                  return "error";
                });
        },
        async A_GetCnc_toolholder(state,checkdata){
            var self= this;
            var data = {
              'path': self.state.baseUrlApi + self.state.p_wcnc+"/"+checkdata
            };

            state
            return await store
                .dispatch('AxiosGet', data)
                .then(response => {
                  return  response;
                }
                ).catch(error => {
                  console.error(error);
                  return "error";
                });
        },
        async A_GetType_toolholder(state,checkdata){
            var self= this;
            var data = {
              'path': self.state.baseUrlApi + self.state.p_type+"/"+checkdata
            };

            state
            return await store
                .dispatch('AxiosGet', data)
                .then(response => {
                  return  response;
                }
                ).catch(error => {
                  console.error(error);
                  return "error";
                });
        },
        async A_GetPage_toolholder(state){
            var self= this;
            var data = {
              'path': self.state.baseUrlApi + self.state.p_toolholderPage
            };

            state
            return await store
                .dispatch('AxiosGet', data)
                .then(response => {
                  return  response;
                }
                ).catch(error => {
                  console.error(error);
                  return "error";
                });
        },
        async A_Get_toolholder(state,checkdata){
            var self= this;
            var data = {
              'path': self.state.baseUrlApi + self.state.p_toolholder+'?p='+checkdata
            };

            state
            return await store
                .dispatch('AxiosGet', data)
                .then(response => {
                  return  response;
                }
                ).catch(error => {
                  console.error(error);
                  return "error";
                });
        },
    },
    modules: {
    }
  })
