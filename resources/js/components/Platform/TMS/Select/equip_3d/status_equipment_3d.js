
import * as THREE from "three";
import { error } from 'three';
import {OBJLoader, MTLLoader} from 'three-obj-mtl-loader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {CSS2DRenderer, CSS2DObject} from 'three-css2drender';
const OrbitControls = require('three-orbit-controls')(THREE);

import sidebar from "./sidebar/sidebar.vue";
import wh from "./wh/wh.vue";
import loading from "./loading/loading.vue";

// 　import Type_add_newtype      from '../Type_add_newtype.vue'
//   import Type_toolholderData   from '../toolholderData/Type_toolholderData.vue'


 export default {
       name: 'status_equipment',
      components: {
            // Type_toolholderData,
            // Type_add_newtype,
            // loading,
            sidebar,
            wh
        },
      data(){
             return{
//                 loader:null,
                   AnimationFrameID:null,
//                 isfirstScreen:false,
                   isLoadingInit:false,
                   modelsize:0.15,
//                 LoadingProcess:{
//                     'Init_ThreeJS':false,
//                     'Update_Wavehouse_Model_Data':{
//                         'Trackholder_wavehouse':false,
//                         'Trackholder_cnc':false,
//                         'Trackholder_cnc2':false
//                     },
//                     'SQL_Types_Data_All':false
//                 },
//                 isfirstScreenadd:0,
//                 raycaster:null,
//                 mouse:null,
//                 select_wavehouse:null,
//                 scene: '',
//                 labelRenderer: '',
//                 light: '',
//                 camera: '',
//                 camera_cnc: '',
//                 camera_cnc02: '',
//                 camera_now: '',
//                 controls: '',
//                 renderer: '',
//                 geometry: '',
//                 material: '',
//                 cube: '',
//                 fov: 60,
//                 biaozhudiv: '',
//                 wavehouse_data:[],
//                 wavehouse_data_cnc:[],
//                 wavehouse_data_cnc2:[],
//                 status_equiment:[],
//                 type_wavehouse:[
//                   '倉儲內格位',
//                   '工具機01',
//                   '工具機02'
//                 ],
//                 model_choose_Mouse:null,
//                 model_toolholder_Ori:null,
//                 color_origin:new THREE.Color("rgb(255, 100, 0)"),
//                 mat_toolholder:
//                     new THREE.MeshPhongMaterial({
//                         ambient: 0x7c8262,
//                         color: "rgb(220, 220, 220)",  // 物件顏色
//                         specular: 0x555555,
//                         shininess: 30
//                     }),
//                 mat_glow_red:
//                     new THREE.ShaderMaterial({
//                         uniforms:
//                         {
//                             "s":   { type: "f", value: -1.0},
//                             "b":   { type: "f", value: 1.0},
//                             "p":   { type: "f", value: 1},
//                             glowColor: { type: "c", value: new THREE.Color("rgb(255, 0, 0)") },
//                         },
//                         vertexShader:   shader_glow.vertexShader,
//                         fragmentShader: shader_glow.fragmentShader,
//                         side: THREE.FrontSide,
//                         blending: THREE.AdditiveBlending,
//                         transparent: true
//                     }),
//                 mat_glow_Origin:
//                     new THREE.ShaderMaterial({
//                         uniforms:
//                         {
//                             "s":   { type: "f", value: -1.0},
//                             "b":   { type: "f", value: 1.0},
//                             "p":   { type: "f", value: 1},
//                             glowColor: { type: "c", value: new THREE.Color("rgb(255, 100, 0)") },
//                         },
//                         vertexShader:   shader_glow.vertexShader,
//                         fragmentShader: shader_glow.fragmentShader,
//                         side: THREE.FrontSide,
//                         blending: THREE.AdditiveBlending,
//                         transparent: true
//                     }),
//                 mat_glow_yellow:
//                     new THREE.ShaderMaterial({
//                         uniforms:
//                         {
//                             "s":   { type: "f", value: -1.0},
//                             "b":   { type: "f", value: 1.0},
//                             "p":   { type: "f", value: 1},
//                             glowColor: { type: "c", value: new THREE.Color("rgb(255, 255, 0)") },
//                         },
//                         vertexShader:   shader_glow.vertexShader,
//                         fragmentShader: shader_glow.fragmentShader,
//                         side: THREE.FrontSide,
//                         blending: THREE.AdditiveBlending,
//                         transparent: true
//                     }),
//                  mat_glow_darkblue:
//                     new THREE.ShaderMaterial({
//                         uniforms:
//                         {
//                             "s":   { type: "f", value: -1.0},
//                             "b":   { type: "f", value: 1.0},
//                             "p":   { type: "f", value: 1},
//                             glowColor: { type: "c", value: new THREE.Color("rgb(0, 50, 50)") },
//                         },
//                         vertexShader:   shader_glow.vertexShader,
//                         fragmentShader: shader_glow.fragmentShader,
//                         side: THREE.FrontSide,
//                         blending: THREE.AdditiveBlending,
//                         transparent: true
//                     }),
             }
         },
      computed:
         {
//             panel_add_toolholder_BG_width: function() {
//                 return this.$store.state.mywidth ;
//             },
//             panel_add_toolholder_BG_height: function() {
//                 return this.$store.state.myheight ;
//             },
//             panel_wavehouse_width: function() {
//                 return this.$store.state.mywidth/3.7 ;
//             },
//             panel_wavehouse_left: function() {

//                 var left =(window.innerWidth-this.$store.state.mywidth)/2 + (this.$store.state.mywidth -(this.$store.state.mywidth/4)) -35 ;

//                 return left;
//             },
         },
      mounted(){
              var self = this;
              const container = document.getElementById('container');
              self.$store.state.threejs.init(container);
              self.animate();
              self.load_CNC_wavehouseModel();
//            self.Init_ThreeJS(()=>{
//                self.LoadingProcess['Init_ThreeJS'] = true;
//                self.check_LoadingProcess();
//            });

//             self.Update_Wavehouse_Model_Data(()=>{
//                 self.check_LoadingProcess();
//             });

//             self.SQL_Types_Data_All(()=>{
//                 self.LoadingProcess['SQL_Types_Data_All'] = true;
//                 self.check_LoadingProcess();
//             });


//             self.$nextTick(() => {
//                 document.getElementById('container').addEventListener('mousedown',self.onDocumentMouseDown);
//             });

//             self.select_wavehouse =  self.type_wavehouse[0];

//             setInterval(()=>{
//                 self.Update_Status();
//             },3000);

     },
//      beforeDestroy(){
//           this.controls.enabled = false;
//           this.clearOb();
//     },
      methods:{
          animate() {
            this.$store.state.threejs.animate();
            this.AnimationFrameID = requestAnimationFrame(this.animate);
           },
           async load_CNC_wavehouseModel()
           {
            var self =this;
            await  self.$store.state.threejs.Load_Model_Data("/static/model/wavehouse/wavehouse_finial.glb",
                function (obj) {
                    obj.name = "wavehouse";
                    obj.scene.scale.set(self.modelsize, self.modelsize, self.modelsize);
                    obj.scene.position.set(0, 0, 0);
                    self.$store.state.threejs.scene.add(obj.scene);
                },
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + "% loaded")
                },
                function (error) {
                    console.error(error, "load error!")
                }
             );
           },
           Controls_Camera_Disabled(){
                var self = this;
                self.$store.state.threejs.controls.enabled = false;
            },
            Controls_Camera_Abled(){
                var self = this;
                self.$store.state.threejs.controls.enabled = true;
            },
//         status_cnc1()
//         {
//             var self = this;
//             var result="";
//             if(self.status_equiment[1].cnc217 ==1)
//             {
//                 result = "啟動叫刀";
//             }
//             else   if(self.status_equiment[1].cnc217 ==2)
//             {
//                 result = "派工流程結束";
//             }
//             else   if(self.status_equiment[1].cnc217 ==2)
//             {
//                 result = "派工異常";
//             }
//                 return result;
//         },
//         status_cnc2()
//         {
//             var self = this;
//             var result="";
//             if(self.status_equiment[1].cnc218 ==1)
//             {
//                 result = "啟動叫刀";
//             }
//             else   if(self.status_equiment[1].cnc218 ==2)
//             {
//                 result = "派工流程結束";
//             }
//             else   if(self.status_equiment[1].cnc218 ==2)
//             {
//                 result = "派工異常";
//             }
//                 return result;
//         },
//         status_action(){
//             var self = this;
//             var result="";

//             if(self.status_equiment[5].action ==0)
//             {
//                 result = "正常";
//             }
//             else   if(self.status_equiment[5].action ==1)
//             {
//                 result = "異常";
//             }
//             else   if(self.status_equiment[5].action ==2)
//             {
//                 result = "CNC異常";
//             }
//                 return result;
//         },
//         status_flow(){
//             var self = this;
//             var result="";

//             if(self.status_equiment[2].action ==0)
//             {
//                 result = "流程結束";
//             }
//             else   if(self.status_equiment[2].action ==1)
//             {
//                 result = "流程啟動";
//             }

//                 return result;
//         },
//       sortItem(x,y){
// 	        return ((x.number==y.number)?0:((x.number>y.number)?1:-1));
//       },
//       toolholder_title_background(isbreak){
//           if(isbreak ===null)
//                 return 'rgba(48, 179, 255, 0.5)';

//             if(isbreak ==1)
//                     return 'rgba(255, 30, 30, 0.5)';

//             return 'rgba(48, 179, 255, 0.5)';
//       },
//       Init_ThreeJS(action) {

//         this.fov =60;
//         初始化相机
//         this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, 1, 1000);
//         this.camera.position.set(-1.2, 48, -100.5);
//         this.camera.lookAt(this.scene.position);
//         初始化相机 CNC
//         this.camera_cnc = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, 1, 1000);
//         this.camera_cnc.position.set(3, 51.5, -61);
//         this.camera_cnc.lookAt(this.scene.position);
//         初始化相机 CNC2
//         this.camera_cnc02 = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
//         this.camera_cnc02.position.set(0, 48.09, -30.94);
//         this.camera_cnc02.lookAt(this.scene.position);

//         this.camera_now = this.camera;



//         if(action)
//             action();

       },
//       render() {
//          this.renderer.render(this.scene, this.camera_now);
//          this.labelRenderer.render(this.scene, this.camera_now);

//         if(this.isfirstScreen ==false)
//         {
//             var width  = document.getElementById("container").clientWidth;
//             var height = document.getElementById("container").clientHeight;

//             this.camera.aspect = width / height;
//             this.camera.updateProjectionMatrix();
//             this.renderer.setSize(width, height);
//             this.labelRenderer.setSize(width, width);

//             this.renderer.setSize(width, height);
//             this.isfirstScreenadd ++;
//             if(this.isfirstScreenadd >=2)
//             {
//                 this.isfirstScreenadd = 0;
//                 this.isfirstScreen = true;
//             }

//         }

//       },
//       Update_Wavehouse_Model_Data(action){
//         let self = this;
//         self.isLoadingInit = true;  //開始讀取
//         self.loader_load("/static/model/wavehouse/wavehouse_finial.glb",function (obj) {
//             obj.name = "wavehouse";
//             obj.scene.scale.set(self.modelsize, self.modelsize, self.modelsize);
//             obj.scene.position.set(0, 0, 0);

//             obj.scene.children.forEach(e => {
//                   if(e.name =='alpha_ob')
//                   {
//                       e.material.opacity     = 0.23;
//                       e.material.transparent = true;
//                       e.material.side = THREE.FrontSide ;
//                       e.renderOrder =2;
//                   }
//                   else if (e.name =='cnc')
//                   {
//                      e.children.forEach(e_c=>{
//                           if(e_c.name =='cnc_01')
//                           {
//                                 e_c.material = new THREE.MeshPhongMaterial({
//                                 ambient: 0x7c8262,
//                                 color: 0x7c8262,  // 物件顏色
//                                 specular: 0x555555,
//                                 shininess: 30
//                               });
//                           }
//                      });

//                   }
//                   else if (e.name =='wavehouse_pos')
//                   {
//                       var i =0;
//                       e.children.forEach(e_t=>{

//                            e_t.position.x = e_t.position.x * self.modelsize ;
//                            e_t.position.y = e_t.position.y * self.modelsize ;
//                            e_t.position.z = e_t.position.z * self.modelsize ;

//                           var one_cell =
//                               {
//                                 'name':e_t.name,
//                                 'pos':e_t.position,
//                                 'id_toolholder':null,
//                                 'date_updated':null,
//                                 'model':null,
//                               };

//                             self.$set(self.wavehouse_data,i,one_cell);
//                           i++;
//                      }
//                      );

//                 Sort
//                 self.wavehouse_data = self.wavehouse_data.sort(function(a, b)
//                 {
//                      var a_int =  parseInt(a.name.replace('wt',''));
//                      var b_int =  parseInt(b.name.replace('wt',''));

//                     return a_int - b_int;
//                 });


//                        更新倉儲資料庫資料
//                     self.SQL_Wave(
//                         data=>{
//                             if(data !=null)
//                             {
//                                 for(i=0;i<self.wavehouse_data.length;i++)
//                                 {

//                                     if(self.wavehouse_data[i].name == data[i].id_warehouse)
//                                     {
//                                         console.log(data[i].id_toolholder_pre);
//                                             var cell                =  self.wavehouse_data[i];
//                                             cell.id_toolholder      = data[i].id;
//                                             cell.date_updated       = data[i].date_updated;

//                                             self.$set(self.wavehouse_data,i,cell);
//                                     }
//                                 }

//                                 更新刀柄模型
//                                 self.Update_Trackholder_wavehouse();
//                             }
//                     },error =>{
//                         if(error !=null)
//                         {
//                             console.log(error);
//                         }
//                     });



//                   }
//                   else if (e.name =='wavehouse_cnc_pos')
//                   {
//                       var i =0;
//                       e.children.forEach(e_t=>{
//                            e_t.position.x = e_t.position.x * self.modelsize ;
//                            e_t.position.y = e_t.position.y * self.modelsize ;
//                            e_t.position.z = e_t.position.z * self.modelsize ;
//                           var one_cell =
//                               {
//                                 'name':e_t.name,
//                                 'pos':e_t.position,
//                                 'id_toolholder':null,
//                                 'date_updated':null,
//                                 'model':null,
//                               };

//                               if(e_t.name[1] == '1')
//                                     self.$set(self.wavehouse_data_cnc,i,one_cell);
//                               else  if(e_t.name[1] == '2')
//                                     self.$set(self.wavehouse_data_cnc2,i-60,one_cell);
//                           i++;
//                      }
//                      );


//                         更新倉儲資料庫資料
//                         self.SQL_Wave_CNC(
//                             data=>{
//                                 if(data !=null)
//                                 {
//                                     for(i=0;i<data.length;i++)
//                                     {
//                                             var s = data[i].cnc_cell.toString()[0] + data[i].cnc_no + data[i].cnc_cell.toString()[1] + data[i].cnc_cell.toString()[2];

//                                         if(data[i].cnc_no ==1)
//                                         {
//                                             if(self.wavehouse_data_cnc[i].name == s)
//                                             {
//                                                 var cell                =  self.wavehouse_data_cnc[i];
//                                                 cell.id_toolholder      = data[i].id;
//                                                 cell.date_updated        = data[i].date_updated;

//                                                 self.$set(self.wavehouse_data_cnc,i,cell);
//                                             }
//                                         }
//                                         else if(data[i].cnc_no ==2)
//                                         {
//                                             var num = i-60;
//                                             if(self.wavehouse_data_cnc2[num].name == s)
//                                             {
//                                                 var cell2                =  self.wavehouse_data_cnc2[num];
//                                                 cell2.id_toolholder      = data[i].id;
//                                                 cell2.date_updated        = data[i].date_updated;

//                                                 self.$set(self.wavehouse_data_cnc2,num,cell2);
//                                             }
//                                         }

//                                     }
//                                         更新刀柄模型
//                                         self.Update_Trackholder_cnc();
//                                     }
//                                 },
//                             error =>{
//                                     if(error !=null)
//                                     {
//                                         console.log(error);
//                                     }
//                             });
//                   }
//               });


//             self.scene.add(obj.scene);
//         });

//       },
//       Update_Trackholder_wavehouse(){
//         let self = this;
//         if(self.model_toolholder_Ori !=null)
//         {

//             self.Clone_Trackholder(self.wavehouse_data,()=>{
//                 self.LoadingProcess['Update_Wavehouse_Model_Data']['Trackholder_wavehouse'] = true;
//                 self.check_LoadingProcess();
//             });
//         }
//         else
//         {
//             self.loader_load("/static/model/wavehouse/trackholder.glb", function (obj) {
//                 obj.name = "trackholder";
//                 obj.scene.scale.set(self.modelsize, self.modelsize, self.modelsize);
//                 obj.scene.position.set(
//                     0,
//                     0,
//                     0);


//                 self.model_toolholder_Ori = obj.scene;

//                 self.Clone_Trackholder(self.wavehouse_data,()=>{
//                         self.LoadingProcess['Update_Wavehouse_Model_Data']['Trackholder_wavehouse'] = true;
//                         self.check_LoadingProcess();
//                 });
//             });
//         }
//       },
//       Update_Trackholder_cnc()
//       {
//             let self = this;

//             if(self.model_toolholder_Ori !=null)
//             {
//                 self.Clone_Trackholder(self.wavehouse_data_cnc,()=>{
//                     self.LoadingProcess['Update_Wavehouse_Model_Data']['Trackholder_cnc'] = true;
//                     self.check_LoadingProcess();
//                 });
//                 self.Clone_Trackholder(self.wavehouse_data_cnc2,()=>{
//                     self.LoadingProcess['Update_Wavehouse_Model_Data']['Trackholder_cnc2'] = true;
//                     self.check_LoadingProcess();
//                 });
//             }
//             else
//             {
//                 self.loader_load("/static/model/wavehouse/trackholder.glb", function (obj) {
//                     obj.name = "trackholder";

//                     obj.scene.scale.set(self.modelsize, self.modelsize, self.modelsize);
//                     obj.scene.position.set(
//                         0,
//                         0,
//                         0);

//                     self.model_toolholder_Ori = obj.scene;
//                     self.Clone_Trackholder(self.wavehouse_data_cnc,()=>{
//                         self.LoadingProcess['Update_Wavehouse_Model_Data']['Trackholder_cnc'] = true;
//                         self.check_LoadingProcess();
//                     });
//                     self.Clone_Trackholder(self.wavehouse_data_cnc2,()=>{
//                         self.LoadingProcess['Update_Wavehouse_Model_Data']['Trackholder_cnc2'] = true;
//                         self.check_LoadingProcess();
//                     });
//                 });
//             }
//       },
//       Update_Status()
//       {
//           let self = this;
//           self.SQL_Status((data)=>{
//              console.log('status:-----------------------');

//                 if(self.status_equiment.length >0)
//                 {
//                      for(var k in  self.status_equiment)
//                     {k =null ;};
//                 }


//               self.status_equiment = data;
//              console.log(self.status_equiment);
//           },null);
//       },
//       Clone_Trackholder(data,action)
//       {
//            let self = this;
//            data.forEach(e =>{
//                  if(e.id_toolholder !==null && typeof e.id_toolholder != "undefined")
//                  {
//                     if(e.model ==null)
//                     {
//                         e.model =  self.model_toolholder_Ori.clone();

//                         e.model.children[0].material = self.mat_toolholder;

//                         if(e.id_toolholder.isbreak ==1)
//                             e.model.children[1].material = self.mat_glow_red;
//                         else
//                             e.model.children[1].material = self.mat_glow_darkblue;


//                         e.model.position = e.pos;
//                         self.scene.add(e.model);
//                     }
//                     else
//                     {
//                         e.model.visible = true;
//                     }
//                  }
//                  else
//                  {
//                      if(e.model !==null)
//                     {
//                          e.model.visible = false;
//                     }

//                  }

//                 if(action)
//                     action();
//            });
//       },
//       onWindowResize() {
//         this.isfirstScreen = false;
//       },
//       cell_WaveHouse_MouseOver(w_d,Num)
//       {

//           this.model_choose_Mouse = w_d[Num];
//           if(this.model_choose_Mouse.id_toolholder ==null)
//                 return;

//           if(this.model_choose_Mouse.id_toolholder.isbreak ==0)
//                 this.model_choose_Mouse.model.children[1].material = this.mat_glow_yellow ;
//           else  if(this.model_choose_Mouse.id_toolholder.isbreak ==1)
//           {
//               this.model_choose_Mouse.model.children[1].material = this.mat_glow_Origin ;
//           }

//       },
//       cell_WaveHouse_MouseLeave(Num)
//       {
//           if(this.model_choose_Mouse ==null)
//                 return;
//           if(this.model_choose_Mouse.id_toolholder ==null)
//                 return;


//           if(this.model_choose_Mouse.id_toolholder.isbreak ==0)
//                this.model_choose_Mouse.model.children[1].material = this.mat_glow_darkblue ;
//           else if(this.model_choose_Mouse.id_toolholder.isbreak ==1)
//                this.model_choose_Mouse.model.children[1].material = this.mat_glow_red ;

//           this.model_choose_Mouse =null;
//       },
//       onChange_wavehouse(event){

//             this.cell_WaveHouse_MouseLeave(0);

//             switch(event.target.value)
//             {
//                 case this.type_wavehouse[0]:
//                       this.camera_now =  this.camera ;

//                       this.fov =60;
//                       this.camera_now.position.set(-1.2, 48, -100.5);
//                       this.camera_now.lookAt(this.scene.position);
//                     break;
//                 case this.type_wavehouse[1]:
//                       this.camera_now =  this.camera_cnc ;
//                     break;
//                 case this.type_wavehouse[2]:
//                      this.camera_now =  this.camera_cnc02 ;
//                     break;
//             }

//             this.select_wavehouse = event.target.value;
//       },
//       clearThree(obj){
//             while(obj.children.length > 0){
//                 this.clearThree(obj.children[0])
//                 obj.remove(obj.children[0]);
//             }
//             if(obj.geometry) obj.geometry.dispose()
//             if(obj.material) obj.material.dispose()
//             if(obj.texture) obj.texture.dispose()
//         },
//       clearArray(data)
//       {
//           for(var k in  data)
//           {
//               if (typeof k === 'object' && k !== null)
//               {
//                   this.clearArray(data)
//               }
//               else
//               {
//                   k = null;
//               }
//           }
//       },
//       async SQL_Wave(Action,Action_error)
//       {
//           let self = this;
//           var path = self.$store.getters.ApiPath(self.$store.state.p_w);

//           var  data ={
//                 'path':path
//             };

//              self.$store.dispatch('AxiosGet',data).then(response =>{
//                 Action(response.data) ;
//           }).catch(error =>{
//                Action_error(error);
//           });

//       },
//       async SQL_Wave_CNC(Action,Action_error)
//       {
//           let self = this;
//           var path = self.$store.getters.ApiPath(self.$store.state.p_wcnc);
//            var  data ={
//                 'path':path
//             };

//            self.$store.dispatch('AxiosGet',data).then(response =>{
//                 Action(response.data) ;
//           }).catch(error =>{
//                Action_error(error);
//           });

//       },
//       async SQL_Types_Data_All(actiocn)
//       {
//           let self = this;

//           self.$store.state.ToolHolder_TYPES.forEach(
//               item =>{
//                   var path = self.$store.getters.ApiPath(item.ax_path);
//                   var  data ={
//                             'path':path
//                     };

//                     self.$store.dispatch('AxiosGet',data).then(response =>{
//                            console.log(response.data) ;

//                           if(response.data.length >0)
//                           {
//                                  var data=[];
//                                  response.data.forEach(item =>{
//                                  var cell={
//                                         'id':item.id,
//                                         'code':item.code,
//                                         'description':item.description
//                                 };

//                                     data.push(cell);
//                                 })

//                             clear memory
//                             item.data.forEach(item =>{
//                                 for(var key in item) {
//                                     key = null;
//                                 }

//                                 item = null;
//                             })

//                             item.data =data;



//                           }

//                          if(actiocn)
//                                 actiocn();

//                     }).catch(error =>{
//                         Action_error(error);
//                     });

//               }
//           );
//       },
//       async loader_load(path,action_s){
//           if(this.loader ==null)
//                 this.loader  = new GLTFLoader();

//         await this.loader.load(path, function (obj) {
//             action_s(obj);
//         }, function (xhr) {
//             console.log((xhr.loaded / xhr.total * 100) + "% loaded")
//         }, function (error) {
//             console.error(error, "load error!")
//         });


//       },
//       async clearOb()
//         {
//             var self= this;
//             await  self.clearThree(self.scene);
//             cancelAnimationFrame(self.AnimationFrameID);
//             self.mat_toolholder =null;
//             self.mat_glow_red =null;
//             self.mat_glow_Origin =null;
//             self.mat_glow_yellow =null;
//             self.mat_glow_darkblue =null;

//             await self.clearArray(self.wavehouse_data);
//             self.wavehouse_data =null;

//             await self.clearArray(self.wavehouse_data_cnc);
//             self.wavehouse_data_cnc =null;

//             await self.clearArray(self.wavehouse_data_cnc2);
//             self.wavehouse_data_cnc2 =null;

//             self.model_choose_Mouse =null;
//             self.model_toolholder_Ori =null;
//             self.light=null;
//             self.raycaster=null;
//             self.mouse=null;
//             self.scene =null;
//             self.camera=null;
//             self.camera_cnc=null;
//             self.camera_cnc02=null;
//             self.camera_now=null;
//             self.renderer=null;
//       },
//       async  SQL_Status(Action,Action_error){
//           let self = this;
//           var path = self.$store.getters.ApiPath(self.$store.state.p_tool_datatransfer1);

//           var  data ={
//                 'path':path
//             };

//              self.$store.dispatch('AxiosGet',data).then(response =>{
//                 Action(response.data) ;
//           }).catch(error =>{
//                Action_error(error);
//           });
//       },
//       check_LoadingProcess()
//       {
//           var self =this;
//           for(var k in self.LoadingProcess)
//           {
//               if(k !='Update_Wavehouse_Model_Data')
//               {
//                   if(self.LoadingProcess[k] ==false)
//                                  return;
//               }
//               else
//               {
//                   var Update_Wavehouse_Model = self.LoadingProcess[k];

//                   for(var k2 in Update_Wavehouse_Model)
//                   {
//                       if(Update_Wavehouse_Model[k2] ==false)
//                                 return ;
//                   }
//               }
//           }

//           setTimeout(
//           ()=>{
//             self.isLoadingInit = false;
//           },500);


//       },
//       async btn_refrash()
//       {
//         var self = this;
//         self.LoadingProcess['Update_Wavehouse_Model_Data']['Trackholder_wavehouse'] = false;
//         self.LoadingProcess['Update_Wavehouse_Model_Data']['Trackholder_cnc'] = false;
//         self.LoadingProcess['Update_Wavehouse_Model_Data']['Trackholder_cnc2'] = false;
//         self.LoadingProcess['SQL_Types_Data_All'] = false;

//         self.isLoadingInit = true;

//         self.Update_Wavehouse_Model_Data(()=>{
//                 self.check_LoadingProcess();
//             });

//         self.SQL_Types_Data_All(()=>{
//                 self.LoadingProcess['SQL_Types_Data_All'] = true;
//                 self.check_LoadingProcess();
//             });
//       }
//     }
    }

