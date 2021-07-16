<template>
    <div class="panel_sub"   style="width: 47%;" >
        <p  v-if="!$parent.is_ModifyMode_toolholder_pre">新增刀把</p>
        <p  v-if="$parent.is_ModifyMode_toolholder_pre">修改刀把</p>

        <div class="panel_sub_sub"  v-if="$parent.is_new_life_when_record == false" >
                <div  class="toolholder_pre_cell" style="margin-top:1rem;margin-left:5rem;">

                        <div class="title" v-if="$parent.toolholder_unuse.length >0">
                            <p class="word">空閒刀具 :</p>
                        </div>


                        <div class="context" v-if="$parent.toolholder_unuse.length >0">
                            <select name="刀具編號"  @change="$parent.IdToolholderChange($event)" v-model="$parent.serial_upload_toolholder">
                                　<option v-for="(item,index) in $parent.toolholder_unuse" :key="index" :value="$parent.toolholder_unuse[index].serial">{{$parent.toolholder_unuse[index].serial}}</option>
                            </select>
                        </div>


                        <div class="error_toolholders" v-if="$parent.toolholder_unuse.length <=0"> 沒有閒置刀套</div>

                </div>


                <!-- 新刀把種類設定 -->
                <div  class="toolholder_pre_cell" v-for="(item,index) in $store.state.ToolHolder_TYPES" :key="index" style="margin-top:1rem;margin-left:5rem;">

                        <div class="title">
                            <p class="word">{{$store.state.ToolHolder_TYPES[index].title}} :</p>
                        </div>

                        <div class="context">
                            <select  @change="$parent.TypeChange(index,$event)"  v-model="$parent.toolholder_pre_types[index]"  :disabled="$parent.is_ModifyMode_toolholder"   v-if="$store.state.ToolHolder_TYPES[index].data.length >0">
                                　<option v-for="(item,index_item) in $store.state.ToolHolder_TYPES[index].data" :key="index_item" :value="$store.state.ToolHolder_TYPES[index].data[index_item].code">{{$store.state.ToolHolder_TYPES[index].data[index_item].code}}</option>
                            </select>
                        </div>
                </div>

                <div>
                    <!-- 新刀把種類設定--刀具尺寸 -->
                    <div  class="toolholder_pre_cell" v-for="(item_2,index_toolholder_size) in $parent.toolholder_pre_size" :key="index_toolholder_size" style="margin-top:1rem;margin-left:5rem;">
                            <div class="title">
                                <p class="word">{{$parent.toolholder_pre_size[index_toolholder_size].title}} :</p>
                            </div>

                            <div class="context">
                                    <input type="text"     v-model="$parent.toolholder_pre_size[index_toolholder_size].value">
                            </div>
                    </div>
                </div>
        </div>

        <div class="panel_sub_sub"  v-if="$parent.is_new_life_when_record == true">

            <div style=" position:absolute;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 90%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);">
                    <div style="
                                width:25rem; 
                                font: 1.3rem Microsoft JhengHei;
                                font-weight: 300;">
                         新組合碼  
                         <p style="color:red;">{{$parent.code_life_toolholder}}</p>
                         </div>
                    <div style="margin-right: 19.5rem; 
                                font: 1.3rem Microsoft JhengHei;
                                font-weight: 300;
                         ">設定壽命:</div>
                    <input class="toolholder_maxlife_life" type="text"   :disabled="$parent.is_ModifyMode_toolholder_pre|| $parent.is_ModifyMode_toolholder" oninput = "value=value.replace(/[^\d]/g,'')"  v-model="$parent.life_life_toolholder">
                    <div class="button_g" style="  margin-top: 0.625rem; margin-left:9rem;">
                                <button class="btn Submit_button"  @click="$parent.Add_ToolHolder_life_Cell">提交</button>
                    </div>
            </div>
 

        </div>

        <div class="end"  v-if="$parent.is_new_life_when_record == false">

            <div style="
             float:left;
             margin-left:0.3rem;
             margin-top:0.5rem;
             width:100%;
             height: 56%;">

                <div style="
                float:left;
                color:red;
                padding:0,
                font: 1rem Microsoft JhengHei;
                font-weight: 300;
                ">
                {{$parent.err_Upload_Record_msg}}
                </div>

                <div class="button_g" style="
                float:right;
                margin-bottom: 0.3rem;" v-if="!$parent.is_ModifyMode_toolholder_pre">
                    <button class="btn Submit_button" :disabled="$parent.is_ModifyMode_toolholder||$parent.is_operation_axios_record|| $parent.is_operation_axios_toolholder" @click="$parent.Add_ToolHolder_Pre_Cell">提交</button>
                </div>

                <div class="button_g" style="
                float:right;
                margin-bottom: 0.3rem;
                "  v-if="$parent.is_ModifyMode_toolholder_pre" >
                    <button class="btn Submit_button" :disabled="$parent.is_ModifyMode_toolholder||$parent.is_operation_axios_record|| $parent.is_operation_axios_toolholder" @click="$parent.Patch_ToolHolder_Pre_Cell">修改</button>
                    <button class="btn clear_button" style="margin-right:3px" :disabled="$parent.is_ModifyMode_toolholder||$parent.is_operation_axios_record|| $parent.is_operation_axios_toolholder"  @click="$parent.Cancel_T_Pre_Modify">取消</button>
                </div>
            </div>

            <!-- 刀具編碼 -->
            <div style="
                position: relative;
                float:left;
                margin-left:0.3rem;
                width:100%;
                height: 44%;">

                <p class="title" style="
                    position: absolute;
                    top: 25%;
                    left: 5%;
                    transform: translate(-50%, -50%);">
                    編合碼:
                </p>

                <div style="
                position: absolute;
                color:red;
                width:80%;
                top: 25%;
                left: 50%;
                transform: translate(-50%, -50%);">
                {{$parent.code_upload_toolholder_max}}
                </div>

            </div>



        </div>



        <loading v-if="$parent.is_operation_axios_record"/>


    </div>
</template>
<script>
import loading from '../axios_loading';
export default {
     name: 'New_toolholder',
         components: {
            loading
       },
}
</script>

<style scoped src="../../../../../../sass/toolholder.css">

</style>
