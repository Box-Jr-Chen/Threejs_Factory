<template>
        <div class="panel_sub"  style="width: 22%;">
                <!-- title -->
            <p  v-if="!$parent.is_ModifyMode_toolholder ">新增刀套</p>
            <p  v-if="$parent.is_ModifyMode_toolholder">修改刀套</p>

            <div class="context">
                <div style="color:red;
                            width: 13rem;
                            height:2rem;
                            float:left;
                            font: 1rem Microsoft JhengHei;
                            font-weight: 300;">{{$parent.err_Upload_Toolholder_msg}}</div>

                <input class="toolholder_text" type="text"  :disabled="$parent.is_ModifyMode_toolholder_pre||$parent.is_new_life_when_record ==true" v-model="$parent.serial_toolholder">
                <div class="button_g" style="  margin-top: 0.625rem; margin-left:4.5rem;" v-if="!$parent.is_ModifyMode_toolholder " >
                        <button class="btn Submit_button" :disabled="$parent.is_ModifyMode_toolholder_pre|| $parent.is_operation_axios_record||$parent.is_new_life_when_record ==true"  @click="$parent.Add_ToolHolder_Cell">提交</button>
                </div>

                <div class="button_g"  style="  margin-top: 0.625rem; margin-left: 4.5rem;" v-if="$parent.is_ModifyMode_toolholder">
                        <button   class="btn Submit_button" :disabled="$parent.is_ModifyMode_toolholder_pre|| $parent.is_operation_axios_record||$parent.is_new_life_when_record ==true" @click="$parent.Patch_ToolHolder_Cell">修改</button>
                        <button   class="btn clear_button" style="margin-right:3px" :disabled="$parent.is_ModifyMode_toolholder_pre|| $parent.is_operation_axios_record||$parent.is_new_life_when_record ==true" @click="$parent.Cancel_T_Modify">取消</button>
                </div>
            </div>

            <loading v-if="$parent.is_operation_axios_toolholder">
            </loading>

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
