<template>
    <div class="panel">
        <div>
                <div class="block_Up">
                    <button :disabled="is_AxiosHandle"  class="btn Btn_Leave" @click="Btn_Leave">x</button>
                </div>
                 <div class="select_inner">
                     <div>
                        <p>選擇種類 :</p>
                        <select :disabled="is_ModifyCellMode||is_AxiosHandle"  name="種類"   v-model="now_type_title" @change="TypeChange($event)" >
                                　<option v-for="(item,index) in $store.state.ToolHolder_TYPES" :key="index" :value="$store.state.ToolHolder_TYPES[index].title">{{$store.state.ToolHolder_TYPES[index].title}}</option>
                        </select>
                     </div>
                </div>
                <div class="panel_inner">

                    <div class="type_interface">
                            <div class="type_interface_inner">
                                <div　class="type_code">
                                      　<label >組合碼: </label>
                                    　　<input type="text" id="code" name="code" v-model="words_code">
                                </div>
                                <div class="type_description">
                                        <label>描述　: </label>
                                        <textarea v-model="words_des" ></textarea>
                                </div>


                                <div class="type_submit">
                                     <button  v-if="!is_ModifyCellMode" class="button Submit_button" @click="Add_Cell">新增</button>
                                     <button  v-if="!is_ModifyCellMode" class="button clear_button" @click="Cancel_modify">清空</button>

                                    　<button  v-if="is_ModifyCellMode" class="button Submit_button" @click="Patch_Cell()">修改</button>
                                      <button  v-if="is_ModifyCellMode" class="button clear_button" @click="Cancel_modify">取消</button>

                                </div>

                                 <div v-if="err_msg" class="err_msg">
                                    {{err_msg}}
                                </div>

                            </div>
                    </div>
                    <div class="database" v-if ="types !=null">

                        <div class="cell"   v-for="(item,index) in types.data" :key="index" :value="types.data[index]">
                            <div class="context">
                                <div class="code">
                                        {{item.code}}
                                </div>
                                <div class="des">
                                        {{item.description}}
                                </div>
                            </div>
                            <div class="modify">
                                    <button   class="btn clear_button"  :disabled="is_ModifyCellMode" style="margin-left: 0.3rem;" @click="Delete_Cell(index)">刪除</button>
                                    <button   class="btn Submit_button" :disabled="is_ModifyCellMode"  @click="Modify_Cell_Choose(index)">修改</button>
                            </div>
                        </div>

                    </div>

                    <div v-if="is_AxiosHandle" class="axios_loading">
                        <img src="../../../../assets/loading.gif" alt="">
                    </div>

                </div>

        </div>

    </div>
</template>
<script>
import { log } from 'three';
export default {
     name: 'Type_add_newtype',
     data(){
            return{
                // is_saveddata:true,
                is_ModifyCellMode:false,
                is_AxiosHandle:false,
                now_type_title:null,
                ModifyCell:-1,
                now_type_num:-1,
                types:null,

                words_code:"",
                words_des:"",
                err_msg:""

            }
        },
    computed:{
         select_able()
         {
             if(this.is_ModifyCellMode || this.is_AxiosHandle ==true)
                return "btn_disable";

               return "btn";
         }
    },
    methods:{
            TypeChange(event){
                var self = this;
               // console.log(event.target.value);

                for(var i=0;i<self.$store.state.ToolHolder_TYPES.length;i++)
                {
                        if(event.target.value ==self.$store.state.ToolHolder_TYPES[i].title)
                        {
                            self.types = null;
                            self.types = self.$store.state.ToolHolder_TYPES[i];
                            self.now_type_num = i;
                        }
                }
            },
            Modify_Cell_Choose(index){
                        this.ModifyCell = index;
                        this.is_ModifyCellMode = true;

                        this.words_code = this.types.data[index].code;
                        this.words_des = this.types.data[index].description;
            },
            Add_Cell(){
                     var self = this;
                     var path = self.$store.getters.ApiPath(self.types.ax_path);

                    if(self.words_code =="" || self.words_des =="")
                    {
                        console.log('請填寫正確資訊');
                        return;
                    }

                     var form ={
                        'code':self.words_code,
                        'description':self.words_des
                     };
                     var data ={
                         'path':path,
                         'form':form
                     };

                     this.is_AxiosHandle = true;
                      self.$store.dispatch('AxiosPost',data).then(response =>{
                      self.Reset_TypesData();
                      self.words_code = "";
                      self.words_des  = "";
                      self.err_msg = "" ;
                      this.WaitS_ToFinishAxios();
                      }
                      ).catch(error =>{
                         console.log('異常錯誤 1 :'+error);

                         self.err_msg = error ;
                         this.WaitS_ToFinishAxios();
                    });
            },
            Delete_Cell(index){
                     var self = this;
                     var int = index;
                     var num  = self.types.data[int].id ;
                     var path = self.$store.getters.ApiPath(self.types.ax_path +'/'+ num);

                     var data ={
                         'path':path
                     };

                    this.is_AxiosHandle = true;
                    self.$store.dispatch('AxiosDelete',data).then(response =>{
                            try {
                                    if(response.message =='刪除成功')
                                    {
                                         self.Reset_TypesData();
                                         self.err_msg = "" ;
                                    }
                                    else
                                    {
                                      //  console.log(response.message);
                                        self.err_msg = response.message ;
                                    }
                                    self.WaitS_ToFinishAxios();
                            } catch (error) {
                                    console.log('異常錯誤 2 :'+error);
                                    self.err_msg = error ;
                                    self.WaitS_ToFinishAxios();
                            }

                    }).catch(error =>{
                         console.log('異常錯誤 1 :'+error);
                         self.err_msg = error ;
                         self.WaitS_ToFinishAxios();
                    });
            },
            Patch_Cell(){
                     var self = this;
                     var int = self.ModifyCell;
                     var num  = self.types.data[int].id ;
                     var path = self.$store.getters.ApiPath(self.types.ax_path +'/'+ num);
                    if(self.words_code =="" || self.words_des =="")
                    {
                        console.log('請填寫正確資訊');
                        return;
                    }

                     var form ={
                        'code':self.words_code,
                        'description':self.words_des
                     };
                     var data ={
                         'path':path,
                         'form':form
                     };

                    self.is_AxiosHandle = true;
                    self.$store.dispatch('AxiosPatch',data).then(response =>{
                            try {
                                    if(response.message =='更新成功')
                                    {
                                         self.Reset_TypesData();
                                         self.words_code = "";
                                         self.words_des  = "";
                                         self.err_msg = "" ;
                                    }
                                    else
                                    {
                                        console.log(response.message);
                                        self.err_msg = response.message ;
                                    }
                                    self.WaitS_ToFinishAxios();
                            } catch (error) {
                                    console.log('異常錯誤 2 :'+error);
                                    self.err_msg = error ;
                                    self.WaitS_ToFinishAxios();
                            }

                    }).catch(error =>{
                         console.log('異常錯誤 1 :'+error);
                          self.err_msg = error ;
                          self.WaitS_ToFinishAxios();
                    });



            },
            async Reset_TypesData()
            {
                var  self  = this;

                if(self.now_type_num <0)
                        return;


                 var path  = self.$store.getters.ApiPath(self.types.ax_path);
                 var  data ={
                        'path':path
                    };

                 self.$store.dispatch('AxiosGet',data).then(response =>{

                      var data=[];
                            response.data.forEach(item =>{
                            var cell={
                                'id':item.id,
                                'code':item.code,
                                'description':item.description
                            };

                            data.push(cell);
                        })

                    //clear memory
                    self.$store.state.ToolHolder_TYPES[self.now_type_num].data.forEach(item =>{
                        if(item !=null)
                        {
                            for(var key in item) {
                                    key = null;
                            }
                            item = null;
                        }
                    })

                    self.$store.state.ToolHolder_TYPES[self.now_type_num].data =data;

                    self.ModifyCell = -1;
                    self.is_ModifyCellMode = false;

                 }).catch(error =>{
                         console.log('異常錯誤'+error);
                });
            },
            WaitS_ToFinishAxios()
            {
                var self =this;
                setTimeout(()=>{
                     self.is_AxiosHandle = false;
                },1500);
            },
            Cancel_modify(){
                        this.ModifyCell = -1;
                        this.is_ModifyCellMode = false;
                        this.words_code = "";
                        this.words_des  = "";
            },
            Clear_type(){

            },
            Btn_Leave()
            {
                   this.$store.state.TMS_select_now_sub = null;
                    this.$parent.Controls_Camera_Abled();
            }
    },
    mounted(){
         this.$parent.Controls_Camera_Disabled();

         this.now_type_title = this.$store.state.ToolHolder_TYPES[0].title;

         this.types =  this.$store.state.ToolHolder_TYPES[0];

         this.now_type_num = 0;

         this.err_msg ="";

         this.is_ModifyCellMode = false;

         this.is_AxiosHandle = false;

        //TODO　異步AXIOS 拉到３Ｄ做

    }

}
</script>
<style scoped>
.panel{
    position:absolute;
    width: 64.25rem;
    height: 40.25rem;
    background: rgb(250, 250, 250);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.panel >div{
    position: relative;
    width:100%;
    height: 100%;

}
.select_inner{
    position: relative;
    /* overflow-y: scroll; */
    border: 1px solid rgb(177, 177, 177);
    width: 97%;
    height: 8%;
    margin-top: 1rem;
    margin-left: 0.8rem;
}
.select_inner >div{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font: 1.4rem Microsoft JhengHei;
    font-weight: 400;
    margin-top: 0.2rem;
}

.select_inner >div >p{
    float: left;
    margin-right: 0.9375rem;
}
.select_inner >div >select{
    float: left;
    text-align: center;
    width: 16.25rem;
}
.panel_inner{
    position: relative;
    /* overflow-y: scroll; */
    border: 1px solid rgb(177, 177, 177);
    width: 97%;
    height: 77%;
    margin-top: 1rem;
    margin-left: 0.8rem;
}
.database{
    float: left;
    overflow:hidden;
    overflow-y: scroll;
    height: 100%;
    width: 40%;
    background: rgb(240, 240, 240);
}

.database > .cell{
    width: 23.5rem;
    height: 5rem;
    padding: 0;
    margin-bottom: 0.3125rem;
    margin-left: 0.5rem;
    border-radius: 5px;
    border: 1px solid rgb(177, 177, 177);
}

.database > .cell >.context{
    width: 70%;
    height:100%;
    padding: 0;
    margin: 0;
    float: left;
    border-right: 1px solid rgb(177, 177, 177);
}
.database > .cell >.context > .code{
    width: 100%;
    height:40%;
    color: black;
    font-size: 1.3rem;
    font-weight: 400;
    padding-left: 0.5rem;
    background: rgb(240, 240, 240);
    border-bottom: 1px solid rgb(177, 177, 177);
}
.database > .cell >.context > .des{
    width: 100%;
    height:60%;
    color: black;
    font-size: 1.3rem;
    font-weight: 400;
    padding-left: 0.5rem;
    padding-top: 0.3rem;
    background: rgb(206, 206, 206);
}
.database > .cell >.modify{
    width: 30%;
    height:100%;
    float: left;
}
.database > .cell >.modify >button{
    width: 3.1rem;
    height:3.1rem;
    font: 1rem Microsoft JhengHei;
    font-weight: 300;
    color: white;
    padding: 0;
    margin-top: 0.9rem;
}


.type_interface{
    position: relative;
    float: left;
    overflow-y: none;
    height: 100%;
    width: 60%;
    background: rgb(248, 248, 248);
}
.type_interface_inner{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20rem;
}
.type_interface_inner > .type_code{
    position: relative;
    float: left;
    width: 100%;
}
.type_interface_inner > .type_code  >label{
    float: left;
    margin-right: 1rem;
    height: auto;
}
.type_interface_inner > .type_code  >input{
    float: left;
    margin-right: 1rem;
    width: 20rem;
    height: auto;
}
.type_interface_inner > .type_description {
    position: relative;
    float: left;
    width: 100%;
}
.type_interface_inner > .type_description >label{
    float: left;
    width: 100%;
}
.type_interface_inner > .type_description >textarea{
    float: left;
    resize : none;
    width: 20rem;
    height: 15rem;
}
.type_interface_inner > .type_submit{
    float: left;
    position: relative;
    width: 100%;
    height: 3.2rem;
    font-size: 1.2rem;
}
.type_interface_inner > .type_submit > .button{
    height:  2rem ;
    width:  5rem;
    cursor: pointer;
    border: 0px solid rgb(177, 177, 177);
    color: white;

}
.type_interface_inner > .type_submit > .button:focus {
   outline:none;
}
type_interface_inner > .type_submit > .button::-moz-focus-inner {
   border: 0;
}

.type_interface_inner > .type_submit > .Submit_button{
    float: right;
    margin-top: 0.3rem;
}

.type_interface_inner > .type_submit > .clear_button{
    float: right;
    margin-top: 0.3rem;
    margin-right: 0.6rem;
}

.Submit_button{
    background: rgb(20, 182, 20);
}
.clear_button{
    background: rgb(219, 71, 13);
}

.Submit_button:active{
    background: rgb(7, 131, 7);
}
.clear_button:active{
    background: rgb(158, 78, 12);
}

.type_interface_inner > .type_submit > .Submit_button  > div > button:active {
  background: rgb(12, 116, 12);
  padding: 0;
  border: none;
}
.type_interface_inner > .type_submit > .Submit_button  > div > button:focus { outline: none; }

.type_cell{
    width: 99%;
    height: 5rem;
    margin-bottom: 0.3125rem;
    margin-left: 0.3rem;
    border: 1px solid rgb(177, 177, 177);
    background: rgb(255, 255, 255);
    border-radius: 5px;
}
.type_cell >.title{
    position: relative;
    float: left;
    height:100%;
    width:40%;
    padding: 0;
    margin: 0;
}
.type_cell >.title >.word{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font: 1.4rem Microsoft JhengHei;
    font-weight: 300;
    padding: 0;
    margin: 0;
}
.type_cell >.context{
    position: relative;
    float: right;
    height:100%;
    width: 60%;
    text-align: center;
}
.type_cell >.context >select{
    position: absolute;
    width:22rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font: 1.6rem Microsoft JhengHei;
    font-weight: 300;
}
.block_Up{
    position: relative;
    width: 100%;
    height: 2.7rem;
}

.block_Down > .Combine_Code{
    margin-left: 0.6rem;
    float: left;
    height: 100%;
}
.block_Down > .Combine_Code > div {
    margin-top: 1rem;
}
.block_Down > .Combine_Code > div > .title{
    float: left;
    font-size: 1.5rem;
}
.block_Down > .Combine_Code > div > .context{
    float: left;
    font-size: 1.55rem;
    color:red;
}

.btn{
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  border: none;
  color: white;
}
.btn_disable{
  text-decoration: none;
  display: inline-block;
  border: none;
  color: white;
}

.Btn_Leave
{
  float: right;
  font-size: 1.3rem;
  background-color: #4CAF50;
  text-align: center;
  margin-right: 3px;
  margin-top: 3px;
  padding-left: 12.5px;
  padding-right: 12.5px;
}
.err_msg
{
    color: red;
    text-align: center;
    font-size: 1rem;
}
.axios_loading{
    position: relative;
    width: 100%;
    height: 100%;
    background: rgba(243, 243, 243, 0.8);
}
.axios_loading > img{
    position: absolute;
    /* width: 100%;
    height: 100%; */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(243, 243, 243, 0.9);
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
