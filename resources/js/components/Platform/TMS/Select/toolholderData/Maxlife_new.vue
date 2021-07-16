<template>
        <div class="panel_sub"  style="width: 31%;">
                <!-- title -->
            <p>新增刀把壽命</p>

            <div class="context2">
                <div style="color:red;
                            width: 13rem;
                            height:1rem;
                            float:left;
                            font: 1rem Microsoft JhengHei;
                            font-weight: 300;">{{$parent.err_Upload_Maxlife_msg}}</div>

                <div>
                    <p style="margin-right: 20.5rem; font: 1.3rem Microsoft JhengHei;font-weight: 300;">組合碼 :</p>
                </div>
                <input class="toolholder_maxlife_code" type="text"  :disabled="$parent.is_ModifyMode_toolholder_pre|| $parent.is_ModifyMode_toolholder||$parent.is_new_life_when_record" v-model="$parent.code_life_toolholder">

                <div>
                    <p style=" margin-top: 1rem; margin-right: 19rem; font: 1.3rem Microsoft JhengHei;font-weight: 300;">最大壽命 : </p>
                </div>

                <input class="toolholder_maxlife_life" type="text"   :disabled="$parent.is_ModifyMode_toolholder_pre|| $parent.is_ModifyMode_toolholder ||$parent.is_new_life_when_record" oninput = "value=value.replace(/[^\d]/g,'')"  v-model="$parent.life_life_toolholder">
                <div class="button_g" style="  margin-top: 0.625rem; margin-left:13.5rem;">
                        <button class="btn Submit_button" :disabled="$parent.is_ModifyMode_toolholder_pre|| $parent.is_ModifyMode_toolholder|| $parent.is_operation_axios_life||$parent.is_new_life_when_record"  @click="$parent.Add_ToolHolder_life_Cell">提交</button>
                </div>

            </div>

            <loading v-if="$parent.is_operation_axios_life">
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
