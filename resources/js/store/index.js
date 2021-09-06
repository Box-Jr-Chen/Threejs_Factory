import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import ThreeJs from '@js/threejs/threejs.js';
import Program_Robot from '@js/program_robot/program_robot.js';
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
        program_robot :Program_Robot.Program_Robot,
        select_panel:0,
        element_panel:null, //panel組件



        baseUrlApi:'http://127.0.0.1:8001/api',
        p_w: '/wavehouse',
        p_wcnc:'/wavehouse_cnc',
        p_tool_unpre:'/toolholder/unprepared',
        p_tool_pre_record:'/toolholder/prepared',
        p_tool_life_record:'/toolholder/maxlife',
        p_tool_life_one_record:'/toolholder/maxlife/single',
        p_tool_all:'/toolholder',  //所有刀套
        p_tool_scrollmax:'/toolholder/scrollmax',
        p_tool_life_scrollmax:'/toolholder/scrollmax_life',
        p_tool_g_serial:'/toolholder/serial',
        p_tool_datatransfer1:'/datatransfer1',
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
        ToolHolder_Unprepared:[

        ]


    },
    getters:{
        ApiPath: (state)=> (sub)  => {
            return state.baseUrlApi +sub ;
       }
    },
    mutations: {
           StorageUser(state,UserName){
            localStorage.setItem('username',UserName);
           }
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
        async A_GetWarehouse_toolholder(state,data){

        }
    },
    modules: {
    }
  })
