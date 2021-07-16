<template>
    <div class="panel_sub"  style="width: 22%;">

        <p>刀套資料</p>

            <div class="panel_sub_sub2" style=" margin-left:0.5rem; padding-top:1.25rem;  padding-bottom:1.25rem;">
                <div  v-if="$parent.toolholder.length > 0"   class="cell"   style="width: 20rem; margin-left:1rem;"  v-for="(item,index) in $parent.toolholder" :key="index" :value="$parent.toolholder[index]">
                    <div class="context"  style="width: 65%;">
                        <div class="code">
                                {{item.serial_no}}
                        </div>
                        <div class="des">
                                {{item.date_created}}
                        </div>
                    </div>


                    <div class="modify" style="width: 35%;">
                            <button   class="btn clear_button"  :disabled="$parent.is_ModifyMode_toolholder || $parent.is_ModifyMode_toolholder_pre|| $parent.is_operation_axios_record||$parent.is_new_life_when_record ==true" style="margin-left: 0.3rem;" @click="$parent.Delete_ToolHolder_Cell(index)">刪除</button>
                            <button   class="btn Submit_button" :disabled="$parent.is_ModifyMode_toolholder || $parent.is_ModifyMode_toolholder_pre|| $parent.is_operation_axios_record||$parent.is_new_life_when_record ==true"  @click="$parent.Modify_Cell_ToolHolder_Choose(index)">修改</button>
                    </div>
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
