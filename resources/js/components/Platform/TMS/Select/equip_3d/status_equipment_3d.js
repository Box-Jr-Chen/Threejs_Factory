

import sidebar from "./sidebar/sidebar.vue";
import wh from "./wh/wh.vue";
import wh_cnc from "./wh_cnc/wh_cnc.vue";
import toolholder_setting from "./toolholder_setting/toolholder_setting.vue";
import jog from "./jog/jog.vue";
import status from "./status/status.vue";
import loading from "./loading/loading.vue";


import * as THREE from "three";
 export default {
       name: 'status_equipment',
       props:['element'],
       components: {
            // Type_toolholderData,
            // Type_add_newtype,
            // loading,
            sidebar,
            wh,
            wh_cnc,
            toolholder_setting,
            jog,
            status
        },
      data(){
             return{
                   AnimationFrameID:null,
//                 isfirstScreen:false,
                   isLoadingInit:false,
                   modelsize:4,
                   element_panel:null
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
                panel_WH_x: function() {
                    return this.$store.state.panel_x +'px';
                },
                panel_WH_y: function() {
                    return this.$store.state.panel_y +'px';
                },
         },
      mounted(){
              var self = this;
              const container = document.getElementById('container');

              self.$store.state.threejs.init(container);
              self.animate();
              self.load_CNC_wavehouseModel();
              self.load_CNC_agvModel();
              self.load_CNC_robot_01Model();
              self.load_CNC_robot_02Model();
              setTimeout(()=>{
                self.$store.state.width_3d  =  container.offsetWidth;
                self.$store.state.height_3d =  container.offsetHeight;
              },100);



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
        beforeDestroy(){
            this.controls.enabled = false;
            this.clearOb();
        },
      methods:{
          animate() {
            this.$store.state.threejs.animate();
            this.AnimationFrameID = requestAnimationFrame(this.animate);
           },
           async load_CNC_wavehouseModel()
           {
            var self =this;
             await  self.$store.state.threejs.Load_Model_Data("/static/model/wavehouse/static/Lali_onlystatic.glb",
                function (obj) {
                    obj.name = "wavehouse";
                    obj.scene.scale.set(self.modelsize, self.modelsize, self.modelsize);
                    obj.scene.position.set(0, 0, 0);

                    var lightscale =self.$store.state.threejs.texturelight;

                    console.log(obj.scene);
                    self.$store.state.threejs.equipment_action.Material_nor =obj.scene.children[1].children[4].material ;
                    self.$store.state.threejs.equipment_action.setting.equipment_CNC[0].tip[2].instance =obj.scene.children[1].children[4];
                    self.$store.state.threejs.equipment_action.setting.equipment_CNC[0].tip[0].instance =obj.scene.children[1].children[5];
                    self.$store.state.threejs.equipment_action.setting.equipment_CNC[0].tip[1].instance =obj.scene.children[1].children[6];

                    self.$store.state.threejs.equipment_action.setting.equipment_CNC[1].tip[2].instance =obj.scene.children[2].children[1];
                    self.$store.state.threejs.equipment_action.setting.equipment_CNC[1].tip[0].instance =obj.scene.children[2].children[2];
                    self.$store.state.threejs.equipment_action.setting.equipment_CNC[1].tip[1].instance =obj.scene.children[2].children[3];


                    obj.scene.children[0].children[0].material.color.r =lightscale;
                    obj.scene.children[0].children[0].material.color.g =lightscale;
                    obj.scene.children[0].children[0].material.color.b =lightscale;

                    obj.scene.children[0].children[1].material.color.r =lightscale;
                    obj.scene.children[0].children[1].material.color.g =lightscale;
                    obj.scene.children[0].children[1].material.color.b =lightscale;

                    obj.scene.children[1].children[1].material.color.r =lightscale;
                    obj.scene.children[1].children[1].material.color.g =lightscale;
                    obj.scene.children[1].children[1].material.color.b =lightscale;

                    obj.scene.children[1].children[2].material.color.r =lightscale;
                    obj.scene.children[1].children[2].material.color.g =lightscale;
                    obj.scene.children[1].children[2].material.color.b =lightscale;

                    obj.scene.children[1].children[3].material.color.r =lightscale;
                    obj.scene.children[1].children[3].material.color.g =lightscale;
                    obj.scene.children[1].children[3].material.color.b =lightscale;

                    var mat_3 = obj.scene.children[3].material;

                    const material = new THREE.MeshPhongMaterial({
                        map: mat_3.map,
                        alphaTest: 0,
                        transparent: true,
                        side: THREE.DoubleSide,
                      });


                    obj.scene.children[3].material.transparent =true;
                    obj.scene.children[3].material.opacity =1;
                    obj.scene.children[3].material =material;

                    self.$store.state.threejs.equipment_action.CNC_1_Status(2);
                    self.$store.state.threejs.equipment_action.CNC_2_Status(0);
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
           async load_CNC_agvModel()
           {
            var self =this;
             await  self.$store.state.threejs.Load_Model_Data("/static/model/wavehouse/static/Lali_agv.glb",
                function (obj) {
                    obj.name = "agv";
                    obj.scene.scale.set(self.modelsize, self.modelsize, self.modelsize);

                    //初始位置
                    var pos = self.$store.state.threejs.equipment_action.setting.equipment[0].init;
                    obj.scene.position.set(pos.x, pos.y, pos.z);

                    var lightscale =self.$store.state.threejs.texturelight;


                    //給予instance
                    self.$store.state.threejs.equipment_action.setting.equipment[0].axis[0].instance = obj.scene.children[0].children[0];
                    self.$store.state.threejs.equipment_action.setting.equipment[0].axis[1].instance = obj.scene.children[0].children[0].children[0];
                    self.$store.state.threejs.equipment_action.setting.equipment[0].axis[2].instance = obj.scene.children[0].children[0].children[0].children[0];

                     obj.scene.children[0].children[0].material.color.r =lightscale;
                     obj.scene.children[0].children[0].material.color.g =lightscale;
                     obj.scene.children[0].children[0].material.color.b =lightscale;


                     var mat = new THREE.MeshPhysicalMaterial({
                        emissive:0xffffff,// emissive默认黑色，设置为白色
                      })

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
           async load_CNC_robot_01Model()
           {
            var self =this;
             await  self.$store.state.threejs.Load_Model_Data("/static/model/wavehouse/static/Lali_robot_01.glb",
                function (obj) {
                    obj.name = "robot_01";
                    obj.scene.scale.set(self.modelsize, self.modelsize, self.modelsize);

                  //初始位置
                  var pos = self.$store.state.threejs.equipment_action.setting.equipment[1].init;
                  obj.scene.position.set(pos.x, pos.y, pos.z);


                    //給予instance
                      self.$store.state.threejs.equipment_action.setting.equipment[1].axis[0].instance = obj.scene.children[0].children[0];
                      self.$store.state.threejs.equipment_action.setting.equipment[1].axis[1].instance = obj.scene.children[0].children[0].children[0];

                    var lightscale =self.$store.state.threejs.texturelight;

                     obj.scene.children[0].children[0].material.color.r =lightscale;
                     obj.scene.children[0].children[0].material.color.g =lightscale;
                     obj.scene.children[0].children[0].material.color.b =lightscale;


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
           async load_CNC_robot_02Model()
           {
            var self =this;
             await  self.$store.state.threejs.Load_Model_Data("/static/model/wavehouse/static/Lali_robot_02.glb",
                function (obj) {
                    obj.name = "robot_02";
                    obj.scene.scale.set(self.modelsize, self.modelsize, self.modelsize);
                                        //初始位置
                    var pos = self.$store.state.threejs.equipment_action.setting.equipment[2].init;
                    obj.scene.position.set(pos.x, pos.y, pos.z);
                    obj.scene.rotation.set(0,  -Math.PI / 2,0);
                  //  console.log(obj.scene);
                    //給予instance
                    self.$store.state.threejs.equipment_action.setting.equipment[2].axis[0].instance = obj.scene.children[0].children[0];
                    self.$store.state.threejs.equipment_action.setting.equipment[2].axis[1].instance = obj.scene.children[0].children[0].children[0];


                    var lightscale =self.$store.state.threejs.texturelight;

                      obj.scene.children[0].children[0].material.color.r =lightscale;
                      obj.scene.children[0].children[0].material.color.g =lightscale;
                      obj.scene.children[0].children[0].material.color.b =lightscale;

                      obj.scene.children[0].children[0].children[0].material.color.r =lightscale;
                      obj.scene.children[0].children[0].children[0].material.color.g =lightscale;
                      obj.scene.children[0].children[0].children[0].material.color.b =lightscale;


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
           eHandler(data) {
            this.width = data.width;
            this.height = data.height;
            this.left = data.left;
            this.top = data.top;
            this.event = data.eventName;
           }
       }
    }

