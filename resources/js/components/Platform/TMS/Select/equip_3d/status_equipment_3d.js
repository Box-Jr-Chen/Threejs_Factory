

import sidebar from "./sidebar/sidebar.vue";
import wh from "./wh/wh.vue";
import wh_cnc from "./wh_cnc/wh_cnc.vue";
import toolholder_setting from "./toolholder_setting/toolholder_setting.vue";
import jog from "./jog/jog.vue";
import status from "./status/status.vue";
import notfull from "./notfull/notfull.vue";
import init_loading from "./init_loading/init_loading.vue";
import loading from "./loading/loading.vue";


import * as THREE from "three";
import { MeshPhongMaterial } from "three";
 export default {
       name: 'status_equipment',
       props:['element'],
       components: {
            // loading,
            sidebar,
            wh,
            wh_cnc,
            toolholder_setting,
            jog,
            status,
            notfull,
            init_loading
        },
      data(){
             return{
                   AnimationFrameID:null,
//                 isfirstScreen:false,
                   isLoadingInit:false,
                   modelsize:4,
                   element_panel:null,
                   isFullScreen:false,
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
              self.load_Point_Toolholder_project();

              self.load_Type_Toolholder();
              setTimeout(()=>{
                self.$store.state.width_3d  =  container.offsetWidth;
                self.$store.state.height_3d =  container.offsetHeight;
                self.$store.state.threejs.Controls_Camera_Disabled();
              },100);

              //檢查有沒有此吋改變
              self.isFullScreen = true;

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

                   // console.log(obj.scene);
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


                    //完成
                    self.$store.state.loading_finish.push(true);
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

                    //完成
                    self.$store.state.loading_finish.push(true);
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

                    //完成
                    self.$store.state.loading_finish.push(true);
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

                    //完成
                    self.$store.state.loading_finish.push(true);
                },
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + "% loaded")
                },
                function (error) {
                    console.error(error, "load error!")
                }
             );
           },
           async load_CNC_toolholderModel()
           {
            var self =this;
             await  self.$store.state.threejs.Load_Model_Data("/static/model/wavehouse/static/Lali_toolholder.glb",
                function (obj) {
                    obj.name = "Lali_toolholder";
                    obj.scene.scale.set(self.modelsize, self.modelsize, self.modelsize);
                    //初始位置

                    //console.log(obj.scene);
                    self.$store.state.threejs.equipment_action.setting.toolholder =  obj.scene.children[0];
                    self.$store.state.threejs.equipment_action.Material_toolholder = obj.scene.children[0].material;
                    //outline
                    self.$store.state.threejs.equipment_action.Material_toolholder_select =
                    new THREE.ShaderMaterial({
                        uniforms:
                        {
                            "s":   { type: "f", value: -1.0},
                            "b":   { type: "f", value: 1.0},
                            "p":   { type: "f", value: 1},
                            glowColor: { type: "c", value: new THREE.Color("rgb(255, 0, 0)") },
                        },
                        vertexShader:   self.$store.state.threejs.equipment_action.vertexShadertext_outline,
                        fragmentShader: self.$store.state.threejs.equipment_action.fragmentshadertext_outline,
                        side: THREE.FrontSide,
                        blending: THREE.AdditiveBlending,
                        transparent: true
                    })

                    var lightscale =self.$store.state.threejs.texturelight;

                      obj.scene.children[0].material.color.r =lightscale;
                      obj.scene.children[0].material.color.g =lightscale;
                      obj.scene.children[0].material.color.b =lightscale;

                    //self.$store.state.threejs.scene.add(obj.scene);

                    //完成
                    self.$store.state.loading_finish.push(true);
                },
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + "% loaded")
                },
                function (error) {
                    console.error(error, "load error!")
                }
             );
           },
           async load_CNC_projectModel()
           {
            var self =this;
             await  self.$store.state.threejs.Load_Model_Data("/static/model/wavehouse/static/Lali_project.glb",
                function (obj) {
                    obj.name = "Lali_project";
                    obj.scene.scale.set(self.modelsize, self.modelsize, self.modelsize);
                    //初始位置
                    //console.log('project');
                   // console.log(obj.scene);
                    self.$store.state.threejs.equipment_action.setting.project = obj.scene.children[0];

                    var lightscale =self.$store.state.threejs.texturelight;

                      obj.scene.children[0].material.color.r =lightscale;
                      obj.scene.children[0].material.color.g =lightscale;
                      obj.scene.children[0].material.color.b =lightscale;

                    //self.$store.state.threejs.scene.add(obj.scene);

                    //完成
                    self.$store.state.loading_finish.push(true);
                },
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + "% loaded")
                },
                function (error) {
                    console.error(error, "load error!")
                }
             );
           },
           async load_Point_Toolholder_project(){
                var self =this;
                await  self.$store.state.threejs.Load_Model_Data("/static/model/wavehouse/static/Lali_point.glb",
                 function (obj) {
                    obj.name = "point";
                    obj.scene.scale.set(self.modelsize, self.modelsize, self.modelsize);
                    //初始位置
                    //console.log(obj);


                    var wavehouse =obj.scene.children[0];
                    var cnc       =obj.scene.children[1];
                    var project   = obj.scene.children[2];
                    var cnc_pro_pos =obj.scene.children[3];
                    //倉庫刀把位置
                    wavehouse.children.forEach(function(wh_once,index){
                        wh_once.children.forEach(
                            function(cell,index2){
                                self.$store.state.threejs.equipment_action.setting.point_wh_toolholder[index].pos.push(cell.position);
                            }
                        );
                    });
                    //CNC刀把位置
                    cnc.children.forEach(function(wh_once,index){
                        wh_once.children.forEach(
                            function(cell,index2){
                                self.$store.state.threejs.equipment_action.setting.point_cnc_toolholder[index].pos.push(cell.position);
                            }
                        );
                    });
                    //project位置
                    project.children.forEach(function(pro_once,index){
                                self.$store.state.threejs.equipment_action.setting.point_project.push(pro_once.position);
                    });
                    //cnc_pro_pos位置
                    cnc_pro_pos.children.forEach(function(pro_once,index){
                        self.$store.state.threejs.equipment_action.setting.point_cnc_move.push(pro_once.position);
                    });
                    //完成
                    self.$store.state.loading_finish.push(true);


                },
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + "% loaded")
                },
                function (error) {
                    console.error(error, "load error!")
                }
                );

                //讀取倉庫跟CNC刀把資料
                 await  this.load_CNC_toolholderModel();
                 await  this.load_CNC_projectModel();
                 await  this.load_WH_Toolholder();
                 await  this.load_CNC_Toolholder();
                 await  this.instance_toolholder();
                 await  this.instance_project();
            },
            //instance
            async instance_toolholder()
            {
                var self = this;

                //wh
                var toolholder_instance =[];
                for(var i=0;i<self.$store.state.ToolHolder_wh.length;i++){
                    var toolholder_instance_one =[];
                    for(var j=0;j< self.$store.state.ToolHolder_wh[i].length;j++){

                        var toolholder_cell =  self.$store.state.ToolHolder_wh[i][j];
                            toolholder_instance_one.push(null);
                            if(toolholder_cell.name!==null && toolholder_cell.name!=='' && toolholder_cell.name!=='null')
                            {
                                //有刀把才複製
                                var clone = self.$store.state.threejs.equipment_action.setting.toolholder.clone();
                                var pos   = self.$store.state.threejs.equipment_action.setting.point_wh_toolholder[i].pos[j];
                                clone.position.set(pos.x*4,pos.y*4,pos.z*4);
                                clone.scale.set(self.modelsize, self.modelsize, self.modelsize);

                                var lightscale =self.$store.state.threejs.texturelight;

                                clone.material.color.r =lightscale/1.5;
                                clone.material.color.g =lightscale/1.5;
                                clone.material.color.b =lightscale/1.5;

                                toolholder_instance_one[j] = clone ;

                                self.$store.state.threejs.scene.add(clone);

                            }
                    };
                    toolholder_instance.push(toolholder_instance_one);
                };
                self.$store.state.threejs.equipment_action.setting.toolholders.wh= toolholder_instance;
                //cnc
                var toolholder_instance_cnc =[];
                for(var i=0;i<self.$store.state.ToolHolder_Cnc.length;i++){
                    var toolholder_instance_one_cnc =[];
                    for(var j=0;j< self.$store.state.ToolHolder_Cnc[i].length;j++){

                        var toolholder_cell =  self.$store.state.ToolHolder_Cnc[i][j];
                            toolholder_instance_one_cnc.push(null);
                            if(toolholder_cell.name!==null && toolholder_cell.name!=='' && toolholder_cell.name!=='null')
                            {
                                //有刀把才複製
                                var clone = self.$store.state.threejs.equipment_action.setting.toolholder.clone();
                                var pos   = self.$store.state.threejs.equipment_action.setting.point_cnc_toolholder[i].pos[j];
                                clone.position.set(pos.x*4,pos.y*4,pos.z*4);
                                clone.scale.set(self.modelsize, self.modelsize, self.modelsize);


                                var lightscale =self.$store.state.threejs.texturelight;

                                clone.material.color.r =lightscale/1.5;
                                clone.material.color.g =lightscale/1.5;
                                clone.material.color.b =lightscale/1.5;


                                self.$store.state.threejs.scene.add(clone);
                                toolholder_instance_one_cnc[j]=clone;
                            }
                    };

                    toolholder_instance_cnc.push(toolholder_instance_one_cnc);
                };
                self.$store.state.threejs.equipment_action.setting.toolholders.cnc = toolholder_instance_cnc;

                //完成
                self.$store.state.loading_finish.push(true);
            },
            async instance_project(){
                var self = this;
                //project
                for(var i=0;i<self.$store.state.threejs.equipment_action.setting.point_project.length;i++){

                        var project_cell =  self.$store.state.threejs.equipment_action.setting.point_project[i];

                                //複製
                                var clone = self.$store.state.threejs.equipment_action.setting.project.clone();
                               /// var pos   = self.$store.state.threejs.equipment_action.setting.point_wh_toolholder[i].pos[j];
                                clone.position.set(project_cell.x*4,project_cell.y*4,project_cell.z*4);
                                clone.scale.set(self.modelsize, self.modelsize, self.modelsize);

                                var lightscale =self.$store.state.threejs.texturelight;

                                clone.material.color.r =lightscale/1.2;
                                clone.material.color.g =lightscale/1.2;
                                clone.material.color.b =lightscale/1.2;


                                self.$store.state.threejs.equipment_action.setting.projects.push(clone);
                                self.$store.state.threejs.scene.add(clone);

                };

                //完成
                self.$store.state.loading_finish.push(true);
            },
            //DATA
           async load_WH_Toolholder(){
                var self = this;
                //w1
                self.$store.state.ToolHolder_wh =[];
                var w =['w1','w2','w3','w4','w5','w6','w7','w8','w9'];

                for(var i=0;i<w.length;i++)
                {
                    await  self.$store.dispatch('A_GetWarehouse_toolholder',w[i]).
                    then(response =>{
                        self.$store.state.ToolHolder_wh.push(response.data);
                        //console.log();
                    });
                }
                //完成
                self.$store.state.loading_finish.push(true);
           },
           async load_CNC_Toolholder(){
            var self = this;

            var t =['t1','t2'];

            for(var i=0;i<t.length;i++)
            {
                await  self.$store.dispatch('A_GetCnc_toolholder',t[i]).
                then(response =>{
                    self.$store.state.ToolHolder_Cnc.push(response.data);
                });
            }
            //完成
            self.$store.state.loading_finish.push(true);
           },
           async load_Type_Toolholder(){
            var self = this;

            var type = ['cooling','machining','material','shank','shankamount'];

            type.forEach(e =>{
                self.$store.dispatch('A_GetType_toolholder',e).
                then(response =>{

                    if(response !=='error')
                    {

                        if(e==='cooling')
                          self.$store.state.ToolHolder_Type.cooling =response.data;
                        else if(e==='machining')
                          self.$store.state.ToolHolder_Type.machining =response.data;
                        else if(e==='material')
                          self.$store.state.ToolHolder_Type.material =response.data;
                        else if(e==='shank')
                          self.$store.state.ToolHolder_Type.shank =response.data;
                        else if(e==='shankamount')
                          self.$store.state.ToolHolder_Type.shankamount =response.data;


                          self.$store.state.loading_finish.push(true);
                    }
                });
            });
           },

           eHandler(data) {
            this.width = data.width;
            this.height = data.height;
            this.left = data.left;
            this.top = data.top;
            this.event = data.eventName;
           },

       }
    }

