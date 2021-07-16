<template>
    <div class="panel">
        <div>
                <div class="block_Up">
                    <button :disabled="is_ModifyMode_toolholder ==true ||is_ModifyMode_toolholder_pre ==true||is_new_life_when_record ==true"  class="btn Btn_Leave" @click="Btn_Leave">x</button>
                </div>
                <div class="panel_1 panel_inner" style="margin-top: 1rem;">

                    <Page_New_toolholder></Page_New_toolholder>
                    <Page_New_record></Page_New_record>
                    <Page_New_Maxlife></Page_New_Maxlife>
                </div>
                <div class="panel_2 panel_inner" style="margin-top: 0.5rem;">

                    <Page_Data_toolholder></Page_Data_toolholder>
                    <Page_Data_record></Page_Data_record>
                    <Page_Data_Maxlife></Page_Data_Maxlife>
                </div>
        </div>

    </div>
</template>
<script>
import { log } from 'three';

import Page_New_toolholder from './Toolholder_new';
import Page_New_record     from './Record_new';
import Page_New_Maxlife     from './Maxlife_new';

import Page_Data_toolholder from './Toolholder_data';
import Page_Data_record from './Record_data';
import Page_Data_Maxlife     from './Maxlife_data';

export default {
     name: 'Type_toolholderData',
         components: {
           Page_New_toolholder,
           Page_New_record,
           Page_New_Maxlife,
           Page_Data_Maxlife,
           Page_Data_toolholder,
           Page_Data_record
       },
     data(){
            return{
                is_ModifyMode_toolholder:false,
                is_ModifyMode_toolholder_pre:false,

                is_operation_axios_toolholder:false,
                is_operation_axios_record:false,
                is_operation_axios_life:false,

                is_toolholder_pre_scrollChange:false, //當scrollChange　時需要
                is_toolholder_life_scrollChange:false, //當scrollChange　時需要

                is_new_life_when_record: false,


                ModifyCell_Toolholder:-1,   //刀套資料
                ModifyCell_Toolholder_Pre:-1,   //刀把資料

                t_pre_scroll_max :1,
                t_pre_scroll_num :1,
                t_pre_scroll_panel_group_now:1,


                t_maxlife_scroll_max :1,
                t_maxlife_scroll_num :1,
                t_maxlife_scroll_panel_group_now:1,


                err_Upload_Toolholder_msg:"",
                err_Upload_Record_msg:"",    //刀把紀錄上傳錯誤訊息
                err_Upload_Maxlife_msg:"",    //刀把紀錄上傳錯誤訊息

                serial_toolholder:"",   //刀套編號
                code_life_toolholder:"",   //CODE編號
                life_life_toolholder:0,   //life生命


                id_upload_toolholder:"",  //要上傳紀錄的刀套ID
                serial_upload_toolholder:"",  //紀錄的刀套ID對應serial
                code_upload_toolholder:"",  //要上傳紀錄的刀套總編號

                t_pre_scroll_panel_count:[],   //刀具紀錄頁面
                t_maxlife_scroll_panel_count:[],   //刀具壽命紀錄頁面

                toolholder:[],
                toolholder_pre:[],
                toolholder_life:[],
                toolholder_unuse:[],
                toolholder_pre_types:[],   //種類
                toolholder_pre_size:[     //刀具尺寸
                    {
                        'title':'刀徑 A',
                        'value':0
                    },
                    {
                        'title':'刀徑 C',
                        'value':0
                    },
                    {
                        'title':'刀徑 E',
                        'value':0
                    },
                    {
                        'title':'刀徑 B',
                        'value':0
                    },
                    {
                        'title':'刀徑 D',
                        'value':0
                    },
                    {
                        'title':'刀徑 F',
                        'value':0
                    },
                    {
                        'title':'刃長 H',
                        'value':0
                    }
                ],
                axios_mode:{
                    'normal':0,
                    'uploade_toolholder':1,
                    'update_toolholder':2,
                    'uploade_toolholder_pre':3,
                    'update_toolholder_pre':4,
                    'datafrash_toolholder':5,
                    'datafrash_toolholder_unuse':6,
                    'scrollChange_toolholder_pre':7
                },
                now_type_title:null,
                fix_reocrd_toolholder:null  //修改紀錄時的刀套資料
            }
        },
    computed:{
        scroll_count()
        {
            var self =this;
             var all = self.t_pre_scroll_max ;
            if(all >0)
            {
                  var cell = all /4;
                  var last = all %4;

            }
        },
        btn_records_g_color_a ()
        {
            return "color: rgb(50, 161, 147);";
        },
        code_upload_toolholder_max(){

            var self =this;

            self.code_upload_toolholder ='';

            self.toolholder_pre_types.forEach(e=>{
                    self.code_upload_toolholder = self.code_upload_toolholder+e+'.';
            });


           self.toolholder_pre_size.forEach((e,index)=>{
                    if(index < self.toolholder_pre_size.length-1)
                            self.code_upload_toolholder = self.code_upload_toolholder + e.value+'.';
                    else
                            self.code_upload_toolholder = self.code_upload_toolholder + e.value;
            });

            return self.code_upload_toolholder;
        }
    },
    methods:{
            TypeChange(index,event){
                var self = this;
                self.$set(self.toolholder_pre_types,index, event.target.value)
            },
            IdToolholderChange(event){   //刀把紀錄 對應的刀套
                var self = this;
                self._idToolholderChange(event.target.value);
            },
            _idToolholderChange(serial){
                var self = this;
                self.toolholder_unuse.forEach((item)=>{
                    if(item.serial == serial)
                    {
                        self.id_upload_toolholder = item.id;
                        self.serial_upload_toolholder = item.serial;

                    }
                });


            },
            Modify_Cell_ToolHolder_Choose(index){   //toolholder
                        this.ModifyCell_Toolholder = index;
                        this.is_ModifyMode_toolholder = true;

                        this.serial_toolholder = this.toolholder[index].serial_no;

            },
            Add_ToolHolder_Cell(){ //toolholder
                     var self = this;
                     var path = self.$store.getters.ApiPath(self.$store.state.p_tool_unpre);

                    if(self.serial_toolholder =="")
                    {
                        self.err_Upload_Toolholder_msg ='請填寫正確資訊';
                        return;
                    }

                     var form ={
                        'serial':self.serial_toolholder
                     };
                     var data ={
                         'path':path,
                         'form':form
                     };


                      self.is_operation_axios_toolholder = true;

                      self.$store.dispatch('AxiosPost',data).then(response =>{
                          self.err_Upload_Toolholder_msg = response.message   ;

                        if(response.message == "新增成功")
                        {
                            self.serial_toolholder ="";
                            self.Refrash_T_Data(()=>{
                                self.T_FinishAxios();
                            });
                        }
                        else
                        {
                            self.T_FinishAxios();
                        }

                      }
                      ).catch(error =>{
                         console.log('異常錯誤 1 :'+error);

                         self.err_Upload_Toolholder_msg = error ;
                         self.T_FinishAxios();
                    });
            },
            Delete_ToolHolder_Cell(index){ //toolholder
                     var self = this;
                     var int  = index;
                     var num  = self.toolholder[int].id ;
                     var path = self.$store.getters.ApiPath(self.$store.state.p_tool_unpre +'/'+ num);

                     var data ={
                         'path':path
                     };

                    self.$store.dispatch('AxiosDelete',data).then(response =>{
                            try {
                                    if(response.message =='刪除成功')
                                    {
                                        self.Refrash_T_Data(()=>{
                                            self.T_FinishAxios();
                                        });
                                    }
                                    else
                                    {
                                      self.T_FinishAxios();
                                    }
                            } catch (error) {
                                    console.log('異常錯誤 2 :'+error);
                                    self.err_Upload_Toolholder_msg = error ;
                                    self.T_FinishAxios();
                            }

                    }).catch(error =>{
                         console.log('異常錯誤 1 :'+error);
                         self.err_Upload_Toolholder_msg = error ;
                         self.T_FinishAxios();
                    });
            },
            Patch_ToolHolder_Cell(){  //toolholder
                     var self = this;
                     var int = self.ModifyCell_Toolholder;
                     var num  = self.toolholder[int].id ;
                     var path = self.$store.getters.ApiPath(self.$store.state.p_tool_unpre +'/'+ num);
                    if(self.serial_toolholder =="")
                    {
                        self.err_Upload_Toolholder_msg ='請填寫正確資訊';
                        return;
                    }

                      var form ={
                        'serial':self.serial_toolholder
                     };
                     var data ={
                         'path':path,
                         'form':form
                     };


                    self.$store.dispatch('AxiosPatch',data).then(response =>{
                            self.err_Upload_Toolholder_msg = response.message   ;
                            if(response.message == "更新成功")
                            {
                                self.serial_toolholder ="";
                                self.Refrash_T_Data(()=>{
                                    self.T_FinishAxios();
                                });
                            }
                            else
                            {
                                 self.T_FinishAxios();
                            }

                    }).catch(error =>{
                          console.log('異常錯誤 1 :'+error);
                          self.err_Upload_Toolholder_msg = error ;
                          self.T_FinishAxios();
                    });

            },
            async Refrash_T_Data(action)  //更新
            {
                var process = await this.refrash_T_promise();

                if(action)
                     action();
            },
            refrash_T_promise()
            {
                var self = this;
                self.is_operation_axios_toolholder = true;
                 return new Promise((resolve,reject) =>{
                       //刀套資料更新
                        self.Get_Toolholder_Data();

                        //沒有使用得刀套更新
                        self.Get_Toolholder_Unuse_Data(()=>{
                        },()=>{
                        });

                        resolve("Refrash toolholder !")
                 });
            },
            T_FinishAxios(){
                var self = this;
                self.WaitS_ToFinishAxios(()=>{
                        self.is_operation_axios_toolholder = false;
                        self.err_Upload_Toolholder_msg = "" ;
                });
            },

            //修改toolholder_Pre
            Modify_Cell_ToolHolder_Pre_Choose(index,item)
            {
                var self = this;

                self.ModifyCell_Toolholder_Pre = index;
                self.is_ModifyMode_toolholder_pre = true;

                var strAry = item.code.split('.');

                //讓值回歸到每個種類還有尺吋
                strAry.forEach((item,index)=>{
                    if(index < self.toolholder_pre_types.length)
                        self.toolholder_pre_types[index] = item;
                    else if((index >= self.toolholder_pre_types.length) && ((index-self.toolholder_pre_types.length) < self.toolholder_pre_size.length))
                    {
                        self.toolholder_pre_size[index-self.toolholder_pre_types.length].value = item;
                    }
                });

                self.Get_Toolholder_serial(item.id_toolholder,(res)=>{
                        if(res.message =='success')
                        {
                             self.fix_reocrd_toolholder={
                                    'id': res.data.id_toolholder,
                                    'serial': res.data.serial_no,
                                    'date': res.data.date_created,
                                };

                           self.toolholder_unuse.push(self.fix_reocrd_toolholder);
                           self.serial_upload_toolholder = self.fix_reocrd_toolholder.serial;

                           self.id_upload_toolholder = self.fix_reocrd_toolholder.id;
                           self.err_Upload_Record_msg = '' ;

                       //    console.log(self.id_upload_toolholder);
                        }
                        else
                        {
                            self.is_ModifyMode_toolholder_pre = false;
                            self.id_upload_toolholder = 0;
                            self.err_Upload_Record_msg = '找不到刀套編號' ;

                        }
                });

            },
            Add_ToolHolder_Pre_Cell(){ //toolholder_pre
                     var self = this;
                     var path = self.$store.getters.ApiPath(self.$store.state.p_tool_pre_record);

                    if(self.id_upload_toolholder =="")
                    {
                        self.err_Upload_Record_msg ='沒有正確刀套編號';
                        return;
                    }

                    if(self.code_upload_toolholder =="")
                    {
                        self.err_Upload_Record_msg ='沒有正確刀把總碼';
                        return;
                    }

                     var form ={
                        'id_toolholder':self.id_upload_toolholder,
                        'code':self.code_upload_toolholder
                     };
                     var data ={
                         'path':path,
                         'form':form
                     };

                      self.is_operation_axios_record =true;

                      self.$store.dispatch('AxiosPost',data).then(response =>{

                          self.err_Upload_Record_msg = response.message   ;

                        if(response.message == "新增成功")
                        {
                            self.toolholder_pre_size.forEach((e)=>{
                                    e.value =0;
                            });


                            // 所有備刀頁面
                            self.Get_Toolholder_pre_record_ScrollMax((response)=>{

                                        //最大頁面數
                                        if(response.message =="success")
                                        {
                                            self.t_pre_scroll_max = response.data;

                                            if(self.t_pre_scroll_max <=0)
                                                        self.t_pre_scroll_panel_group_now =0;

                                            self.T_Record_G_Count(self.t_pre_scroll_panel_group_now);

                                        }

                                        if( self.t_pre_scroll_num <=0)
                                                self.t_pre_scroll_num =1;

                                        self.Refrash_T_Pre_Data(()=>{
                                            self.T_Pre_FinishAxios();
                                        });
                                 });

                            //判斷是否需要輸入新的壽命
                            self.Get_Toolholder_life_single_Data(data.form.code,(response)=>{
                                if(response.message =='success')
                                {

                                    console.log(response);
                                    console.log(data.form.code);
                                
                                    if(response.data ==null)
                                    {
                                        self.is_new_life_when_record = true;
                                        self.code_life_toolholder = data.form.code;
                                    }
                                }
                            },null);
                        }
                        else
                        {
                             self.err_Upload_Record_msg =response.message;
                             self.T_Pre_FinishAxios();
                        }

                      }
                      ).catch(error =>{
                         console.log('異常錯誤 1 :'+error);
                         self.err_Upload_Record_msg = error ;
                         self.T_Pre_FinishAxios();
                    });
            },
            Delete_ToolHolder_Pre_Cell(index){ //toolholder_pre
                     var self = this;
                     var int  = index;
                     var num  = self.toolholder_pre[int].id ;
                     var path = self.$store.getters.ApiPath(self.$store.state.p_tool_pre_record +'/'+ num);

                     var data ={
                         'path':path
                     };


                    self.is_operation_axios_record =true;

                    self.$store.dispatch('AxiosDelete',data).then(response =>{
                            try {
                                    if(response.message =='刪除成功')
                                    {

                                    self.Get_Toolholder_pre_record_ScrollMax((response)=>{

                                            //最大頁面數
                                            if(response.message =="success")
                                            {
                                                self.t_pre_scroll_max = response.data;


                                                if(self.t_pre_scroll_num > (self.t_pre_scroll_max-1))
                                                {
                                                    self.t_pre_scroll_num = self.t_pre_scroll_num -1;
                                                }

                                                //計算頁面群組

                                                var g = Math.floor((self.t_pre_scroll_max-1)/4);
                                                var last = Math.floor((self.t_pre_scroll_max-1)%4);

                                                if(last >0)
                                                    g++;


                                                if(g <=0)   //總頁面小於0 現在頁面等於0
                                                        self.t_pre_scroll_panel_group_now =0;
                                                else if(self.t_pre_scroll_panel_group_now > g)  //現在頁面 大於總頁面 現在頁面等於總頁面的最高質
                                                        self.t_pre_scroll_panel_group_now = g;


                                                self.T_Record_G_Count(self.t_pre_scroll_panel_group_now);

                                                self.Refrash_T_Pre_Data(()=>{
                                                    self.T_Pre_FinishAxios();
                                                });
                                            }
                                    });

                                    }
                                    else
                                    {

                                    }
                            } catch (error) {
                                    console.log('異常錯誤 2 :'+error);
                                    self.err_Upload_Record_msg = error ;
                                    self.T_Pre_FinishAxios();
                            }

                    }).catch(error =>{
                         console.log('異常錯誤 1 :'+error);
                         self.err_Upload_Record_msg = error ;
                         self.T_Pre_FinishAxios();
                    });

            },
            Patch_ToolHolder_Pre_Cell(){
                     var self = this;
                     var int  = self.ModifyCell_Toolholder_Pre;
                     var num  = self.toolholder_pre[int].id ;
                     var path = self.$store.getters.ApiPath(self.$store.state.p_tool_pre_record +'/'+ num);


                      var form ={
                        'id_toolholder':self.id_upload_toolholder,
                        'code':self.code_upload_toolholder,
                     };
                     var data ={
                         'path':path,
                         'form':form
                     };

                    // console.log(form);

                    self.is_operation_axios_record =true;

                    self.$store.dispatch('AxiosPatch',data).then(response =>{

                            self.err_Upload_Record_msg = response.message   ;

                            if(response.message == "更新成功")
                            {
                                self.Refrash_T_Pre_Data(()=>{
                                    self.T_Pre_ModifyToNormal();
                                    self.T_Pre_FinishAxios();

                                    setTimeout(
                                    ()=>{
                                        self.refrash_wavehouse_promise();
                                    },2000);
                                });
                            }
                            else
                            {
                                self.T_Pre_FinishAxios();
                            }

                    }).catch(error =>{
                            console.log('異常錯誤 1 :'+error);
                            self.err_Upload_Record_msg = error ;
                            self.T_Pre_FinishAxios();
                    });
            },

            
            async Refrash_T_Pre_Data(action)  //更新
            {
                var process = await this.refrash_T_Pre_promise();

                if(action)
                     action();
            },
            refrash_T_Pre_promise()
            {
                var self = this;

                return new Promise((resolve,reject) =>{
                    //所有備刀紀錄
                        self.Get_Toolholder_pre_record_Data( self.t_pre_scroll_num,(response)=>{
                            //所有 沒有使用得刀套
                            self.Get_Toolholder_Unuse_Data(()=>{
                                    self._idToolholderChange(self.toolholder_unuse[0].serial);
                            },()=>{
                            });

                        },
                        ()=>{

                        });

                        resolve("Refrash toolholder pre!")
                });
            },
            async Refrash_T_Maxlife_Data(action)  //更新
            {
                var process = await this.refrash_T_Maxlife_promise();

                if(action)
                     action();
            },
            refrash_T_Maxlife_promise(){
                var self = this;

                return new Promise((resolve,reject) =>{
                    //所有備刀紀錄
                        self.Get_Toolholder_life_record_Data( self.t_pre_scroll_num,(response)=>{

                        },
                        ()=>{

                        });

                        resolve("Refrash toolholder maxlife!")
                });
            },
            T_Pre_FinishAxios(){
                var self = this;
                self.WaitS_ToFinishAxios(()=>{
                        self.is_operation_axios_record = false;

                        setTimeout(()=>{
                            self.err_Upload_Record_msg = "" ;
                        },2000);
                });
            },
            T_Pre_ModifyToNormal(){
                var self = this;
                self.ModifyCell_Toolholder_Pre = -1;
                self.is_ModifyMode_toolholder_pre = false;

                self.toolholder_unuse.splice(self.toolholder_unuse.length-1,1);

                self.fix_reocrd_toolholder =null;

                //種類
                for(var i = 0 ; i < self.$store.state.ToolHolder_TYPES.length ; i++)
                {
                    self.$set(self.toolholder_pre_types,i,self.$store.state.ToolHolder_TYPES[i].data[0].code);
                }
                //Size
                self.toolholder_pre_size.forEach((item)=>{
                            item.value =0;
                });
                //空閒刀具
                self._idToolholderChange(self.toolholder_unuse[0].serial);
            },

            //toolholderlife
            Add_ToolHolder_life_Cell(){
                     var self = this;
                     var path = self.$store.getters.ApiPath(self.$store.state.p_tool_life_record);

                     if(self.code_life_toolholder =="")
                    {
                        self.err_Upload_Maxlife_msg ='請填寫正確資訊';
                        return;
                    }
                    if(self.life_life_toolholder <=0)
                    {
                        self.err_Upload_Maxlife_msg ='請填寫正確壽命';
                        return;
                    }

                     var form ={
                        'code':self.code_life_toolholder,
                        'maxlife':self.life_life_toolholder
                     };
                     var data ={
                         'path':path,
                         'form':form
                     };

                        self.is_operation_axios_life = true;

                    self.$store.dispatch('AxiosPost',data).then(response =>{
                        self.err_Upload_Toolholder_msg = response.message   ;
                        if(response.message == "新增成功")
                        {
                            self.code_life_toolholder ="";
                            self.life_life_toolholder =0;
                            self.Refrash_T_Maxlife_Data(()=>{
                                self.T_Maxlife_FinishAxios();

                                self.is_new_life_when_record = false;
                            });
                        }
                        else
                        {
                            self.T_Maxlife_FinishAxios();
                            self.is_new_life_when_record = false;
                        }

                      }
                      ).catch(error =>{
                         console.log('異常錯誤 1 :'+error);

                         self.err_Upload_Toolholder_msg = error ;
                         self.is_new_life_when_record = false;
                         self.T_Maxlife_FinishAxios();
                    });
                     
            },
            T_Maxlife_FinishAxios(){
                var self = this;
                self.WaitS_ToFinishAxios(()=>{
                        self.is_operation_axios_life = false;

                        setTimeout(()=>{
                            self.err_Upload_Maxlife_msg = "" ;
                        },2000);
                });
            },
            Cancel_T_Modify(){
                        this.ModifyCell_Toolholder = -1;
                        this.is_ModifyMode_toolholder = false;
                        this.serial_toolholder = "";
            },
            Cancel_T_Pre_Modify(){
                var self = this;
                self.T_Pre_ModifyToNormal();

            },
            WaitS_ToFinishAxios(action_other)
            {
                var self =this;
                setTimeout(()=>{
                        if(action_other)
                            action_other();
                },1500);
            },
            Btn_Leave()
            {
                   this.$store.state.TMS_select_now_sub = null;
                    this.$parent.Controls_Camera_Abled();
            },
            T_Record_G_Count(Num_G)  //移動 計算 record panel
            {
                var self = this;
                var all  = self.t_pre_scroll_max-1 ;

                self.t_pre_scroll_panel_count = [];
                if(all >0)
                {
                    var cell_total = Math.floor(all/4);
                    var last = all % 4;

                    if(last >0)
                    {
                        cell_total ++;
                    }

                    if(Num_G <= 0 || Num_G >cell_total) {  //當超過頁面範圍
                            return;
                    }

                    // console.log('Num_G:'+Num_G);

                    for(var i =(Num_G-1)*4+1;i<= Num_G*4;i++)
                    {
                            if(Num_G == cell_total)
                            {
                                //代表最後一頁是餘數
                                if(last >0)
                                {
                                    var count = i % 4;

                                    if(count<=0)
                                        count = 4 ;

                                    if(count >last)
                                    continue;
                                }

                                self.t_pre_scroll_panel_count.push(i);
                            }
                            else
                            {
                                self.t_pre_scroll_panel_count.push(i);
                            }
                    }


                }
            },
            T_Maxlife_G_Count(Num_G){
                    var self = this;
                    var all  = self.t_maxlife_scroll_max-1 ;

                    self.t_maxlife_scroll_panel_count = [];
                    if(all >0)
                    {
                        var cell_total = Math.floor(all/4);
                        var last = all % 4;

                        if(last >0)
                        {
                            cell_total ++;
                        }

                        if(Num_G <= 0 || Num_G >cell_total) {  //當超過頁面範圍
                                return;
                        }

                        for(var i =(Num_G-1)*4+1;i<= Num_G*4;i++)
                        {
                                if(Num_G == cell_total)
                                {
                                    //代表最後一頁是餘數
                                    if(last >0)
                                    {
                                        var count = i % 4;

                                        if(count<=0)
                                            count = 4 ;

                                        if(count >last)
                                        continue;
                                    }

                                    self.t_maxlife_scroll_panel_count.push(i);
                                }
                                else
                                {
                                    self.t_maxlife_scroll_panel_count.push(i);
                                }
                        }


                    }
            },
            async Btn_Records_Group_Frash(Num_G)
            {

                var self = this;
                if(Num_G <=0)
                   return;

                self.t_pre_scroll_panel_group_now = Num_G;
                await  self.T_Record_G_Count(self.t_pre_scroll_panel_group_now);

                self.Btn_Records_Frash( self.t_pre_scroll_panel_count[0]);
            },
            async Btn_Records_Frash(Num){
                var self = this;

                if(self.t_pre_scroll_num ==Num) return;

                self.t_pre_scroll_num =Num ;



                 self.Get_Toolholder_pre_record_Data(self.t_pre_scroll_num,(response)=>{

                        if(response.message !='max')
                        {
                            //跳回去
                           // e.target.scrollTop = 0;
                        }

                  },(e)=>{
                      console.log('error --'+e);
                  });

            },
            async Get_Toolholder_Data(action_succes)
            {
                var  self  = this;

                 var path  = self.$store.getters.ApiPath(self.$store.state.p_tool_all);
                 var  data ={
                        'path':path
                     };


                 self.$store.dispatch('AxiosGet',data).then(response =>{

                    var data_toolholder=[];
                    response.data.forEach(item =>{
                            var cell={
                                'id':item.id_toolholder,
                                'serial_no':item.serial_no,
                                'date_created':item.date_created
                            };

                            data_toolholder.push(cell);
                        })

                    //clear memory
                    self.toolholder.forEach(item =>{
                            if(item !=null)
                            {
                                for(var key in item) {
                                        key = null;
                                }
                                item = null;
                            }
                    })

                    self.toolholder = data_toolholder;

                    self.ModifyCell_Toolholder = -1;
                    self.is_ModifyMode_toolholder = false;


                    if(action_succes)
                        action_succes(response);

                 }).catch(error =>{
                         console.log('異常錯誤'+error);
                });
            },
            async Get_Toolholder_Unuse_Data(action_success,action_error)
            {
                    let self = this;
                    var path = self.$store.getters.ApiPath(self.$store.state.p_tool_unpre);
                    var data = {
                        'path':path
                    };

                    self.$store.dispatch('AxiosGet',data).then(response =>{

                        self.toolholder_unuse.forEach(e =>{

                            for(var key in e) {
                                    key = null;
                            }
                            e=null;
                        });
                        self.toolholder_unuse =null;
                        self.toolholder_unuse =[];

                        var Unprepared = [];

                        response.data.forEach(e=>{
                                var item={
                                    'id': e.id_toolholder,
                                    'serial': e.serial_no,
                                    'date': e.date_created,
                                };

                                Unprepared.push(item);
                        });

                        self.toolholder_unuse = Unprepared ;
                        // console.log(self.$store.state.toolholder_unuse);

                        if(action_success !=null)
                                action_success();

                    }).catch(error =>{
                            console.log(error);
                            if(action_error !=null)
                                    action_error();
                    });

            },
            async Get_Toolholder_pre_record_Data(num,action_succes,action_error)
            {
                var  self  = this;


                var  path  = self.$store.getters.ApiPath(self.$store.state.p_tool_pre_record+"/"+num);
                var  data  = {
                        'path':path
                     };

                self.$store.dispatch('AxiosGet',data).then(response =>{


                        if(response.message !='max')
                        {
                            var data_toolholder_record=[];
                            response.data.forEach(item =>{
                                    var cell={
                                        'id':item.id,
                                        'id_toolholder':item.id_toolholder,
                                        'code':item.code,
                                        'date_created':item.date_created,
                                        'date_break':item.date_break,
                                        'life_times':item.life_times,
                                        'isbreak':item.isbreak
                                    };

                                    data_toolholder_record.push(cell);
                            })

                            //clear memory
                            self.toolholder_pre.forEach(item =>{
                                if(item !=null)
                                {
                                    for(var key in item) {
                                            key = null;
                                    }
                                    item = null;
                                }
                            })

                            self.toolholder_pre = data_toolholder_record;

                        //    console.log(self.toolholder_pre);

                            self.ModifyCell_Toolholder = -1;
                            self.is_ModifyMode_toolholder = false;


                        }
                        setTimeout(()=>{
                                self.is_toolholder_pre_scrollChange = false;

                               if(action_succes !=null)
                                    action_succes(response);

                            },1000);

                }).catch(error =>{
                      console.log('error --'+error);

                    if(action_error !=null)
                            action_error(error);
                })
            },
            async Get_Toolholder_life_record_Data(num,action_succes,action_error)
            {
                var  self  = this;
                var  path  = self.$store.getters.ApiPath(self.$store.state.p_tool_life_record+"/"+num);
                var  data  = {
                        'path':path
                     };

                self.$store.dispatch('AxiosGet',data).then(response =>{


                        if(response.message !='max')
                        {
                            var data_toolholder_life=[];
                            response.data.forEach(item =>{
                                    var cell={
                                        'id':item.id_toolholder_maxlife,
                                        'code':item.code,
                                        'maxlife':item.maxlife,
                                        'data_updated':item.data_updated
                                    };

                                    data_toolholder_life.push(cell);
                            })

                            //clear memory
                            self.toolholder_life.forEach(item =>{
                                if(item !=null)
                                {
                                    for(var key in item) {
                                            key = null;
                                    }
                                    item = null;
                                }
                            })

                            self.toolholder_life = data_toolholder_life;


                            self.ModifyCell_Toolholder = -1;
                            self.is_ModifyMode_toolholder = false;

                        }
                        setTimeout(()=>{
                                self.is_toolholder_life_scrollChange = false;

                               if(action_succes !=null)
                                    action_succes(response);

                            },1000);

                }).catch(error =>{
                      console.log('error --'+error);

                    if(action_error !=null)
                            action_error(error);
                })
            },
            async Get_Toolholder_life_single_Data(code,action_succes,action_error)
            {
                var  self  = this;
                var  path  = self.$store.getters.ApiPath(self.$store.state.p_tool_life_one_record+"/"+code);
                var  data  = {
                        'path':path
                     };

                console.log(path);

                self.$store.dispatch('AxiosGet',data).then(response =>{


                     if(action_succes !=null)
                                    action_succes(response);

                }).catch(error =>{
                      console.log('error --'+error);

                    if(action_error !=null)
                            action_error(error);
                })
            },
            async Get_Toolholder_pre_record_ScrollMax(action_succes)
            {
                    var  self  = this;
                    var  path  = self.$store.getters.ApiPath(self.$store.state.p_tool_scrollmax);
                    var  data  ={
                            'path':path
                        };

                    self.$store.dispatch('AxiosGet',data).then(response =>{

                        if(action_succes)
                        {
                            action_succes(response);
                        }


                    }).catch(error =>{
                        console.log('異常錯誤'+error);
                    })
            },
            async Get_Toolholder_maxlife_record_ScrollMax(action_succes)
            {
                    var  self  = this;
                    var  path  = self.$store.getters.ApiPath(self.$store.state.p_tool_life_scrollmax);
                    var  data  ={
                            'path':path
                        };

                    self.$store.dispatch('AxiosGet',data).then(response =>{

                        if(action_succes)
                        {
                            action_succes(response);
                        }


                    }).catch(error =>{
                        console.log('異常錯誤'+error);
                    })
            },
            async Get_Toolholder_serial(index,action_succes){
                    var  self  = this;
                    var  path  = self.$store.getters.ApiPath(self.$store.state.p_tool_g_serial+'/'+index);
                    var  data  ={
                            'path':path
                        };

                    self.$store.dispatch('AxiosGet',data).then(response =>{

                        if(action_succes)
                        {
                            action_succes(response);
                        }


                    }).catch(error =>{
                        console.log('異常錯誤'+error);
                    });
            },

            refrash_wavehouse_promise()
             {
                var self = this;

                return new Promise((resolve,reject) =>{

                    self.$parent.btn_refrash();

                    resolve("Refrash wavehouse!")
                });
             },

            handleScroll(e)
            {

            }
    },
    mounted(){
          var self =this;

          self.$parent.Controls_Camera_Disabled();

          self.now_type_title = self.$store.state.ToolHolder_TYPES[0].title;

          self.types =  self.$store.state.ToolHolder_TYPES[0];

          self.t_pre_scroll_num  = 1;

          self.err_Upload_Toolholder_msg  = "";

          self.is_ModifyMode_toolholder        = false;
          self.is_ModifyMode_toolholder_pre    = false;

        　self.is_toolholder_pre_scrollChange　= false;

          self.is_operation_axios_toolholder = true;
          self.is_operation_axios_record     = true;

          self.is_new_life_when_record= false,
        // 所有刀套資料
        self.Refrash_T_Data(()=>{
               self.T_FinishAxios();

                // 所有備刀頁面
                self.Get_Toolholder_pre_record_ScrollMax((response)=>{

                    //最大頁面數
                        if(response.message =="success")
                        {
                            self.t_pre_scroll_max = response.data;

                            self.t_pre_scroll_panel_group_now = 1;
                            self.T_Record_G_Count(self.t_pre_scroll_panel_group_now);

                        }

                       //所有備刀紀錄
                       self.Refrash_T_Pre_Data(()=>{
                        self.T_Pre_FinishAxios();
                      });
                });

        });

        // 所有壽命頁面
        self.Get_Toolholder_maxlife_record_ScrollMax((response)=>{
                //最大頁面數
                if(response.message =="success")
                {
                    self.t_maxlife_scroll_max = response.data;

                    self.t_maxlife_scroll_panel_group_now = 1;
                    self.T_Maxlife_G_Count(self.t_maxlife_scroll_panel_group_now);
                }

                //所有壽命紀錄
                self.Refrash_T_Maxlife_Data(()=>{
                    self.T_Maxlife_FinishAxios();
                });
        });


        //種類 尺寸初始
          self.toolholder_pre_types =[];
          for(var i = 0 ; i < self.$store.state.ToolHolder_TYPES.length ; i++)
          {
               self.toolholder_pre_types.push(self.$store.state.ToolHolder_TYPES[i].data[0].code);
          }


    }

}
</script>
<style scoped src="../../../../../../sass/toolholder.css">

</style>
