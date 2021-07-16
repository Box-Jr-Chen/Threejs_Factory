<template>
    <div class="panel_sub"  style="width: 47%;position: relative;" >
        <div  class="record">
                <div class="title" v-if="$parent.t_pre_scroll_max > 0" >備刀紀錄 ({{$parent.t_pre_scroll_num}}/{{$parent.t_pre_scroll_max -1}})</div>
                <div class="title" v-if="$parent.t_pre_scroll_max <=0" >備刀紀錄 (0/0)</div>

                <div class="panel_num" v-if="$parent.t_pre_scroll_panel_count.length >0">

                    <!-- sub -->
                        <p class="l_b btn_records_g" v-if="$parent.t_pre_scroll_panel_group_now >1"  @click="Btn_Records_Group_Frash($parent.t_pre_scroll_panel_group_now -1)"><</p>

                        <div v-for=" (item,index)  in $parent.t_pre_scroll_panel_count"  :key="index">

                            <p @click="$parent.Btn_Records_Frash(item)" class="btn_records_g"  v-bind:class="{'btn_records_g_color_active':$parent.t_pre_scroll_num==item}">{{item}}</p>
                            <p v-if="index < $parent.t_pre_scroll_panel_count.length-1">.</p>

                        </div>

                    <!-- plug -->
                        <p class="r_b btn_records_g" v-if="$parent.t_pre_scroll_panel_group_now  < (($parent.t_pre_scroll_max-1)/4)" @click="$parent.Btn_Records_Group_Frash($parent.t_pre_scroll_panel_group_now +1)">></p>

                </div>
        </div>

            <div
                class="panel_sub_sub2"
                style="margin-left:1.3125rem;
                        padding-top:2rem;
                        padding-bottom:2rem;
                        position: relative;"
                @scroll.passive="$parent.handleScroll">
                <div  v-if="$parent.toolholder_pre.length > 0"   class="cell"   style="width: 44rem; margin-left:1rem;"  v-for="(item,index) in $parent.toolholder_pre" :key="index" :value="$parent.toolholder_pre[index]">

                        <div class="context"  style="width: 80%;">
                            <div style="
                                float:left;
                                border-right: 1px solid rgb(177, 177, 177);
                                font: 1.4rem Microsoft JhengHei;
                                font-weight: 500;
                                padding-right:0.3rem;
                                padding-left:0.3rem;
                                color:white;
                                background:rgb(109, 108, 108);">
                            {{item.id_toolholder}}
                            </div>

                            <div class="code">
                                    <p>{{item.code}}</p>
                            </div>

                            <div style="width:10%;
                                        float: left;
                                        font: 1rem Microsoft JhengHei;
                                        font-weight:600;
                                        background: rgb(206, 206, 206);
                                        border-right: 1px solid rgb(130, 130, 130);">
                                    <div　 style="padding-left:0.63rem;">
                                        創建
                                    </div>
                                    <div style="padding-left:0.63rem;padding-bottom:0.2rem;">
                                        時間
                                    </div>
                            </div>

                            <div class="des2">
                                <div style="width:100%; float: left; font: 1.4rem Microsoft JhengHei;font-weight: 300;">
                                    {{item.date_created}}
                                </div>

                            </div>

                            <div style="width:10%;
                                        float: left;
                                        font: 1rem Microsoft JhengHei;
                                        font-weight: 600;
                                        background: rgb(206, 206, 206);
                                        border-top: 1px solid rgb(130, 130,130);
                                        border-left: 1px solid rgb(130, 130,130);
                                        border-right: 1px solid rgb(130, 130, 130);">
                                    <div　 style="padding-left:0.63rem;">
                                        損壞
                                    </div>
                                    <div style="padding-left:0.63rem;padding-bottom:0.2rem;">
                                        時間
                                    </div>
                            </div>

                            <div class="des2">
                                <div style="width:100%; float: left; font: 1.4rem Microsoft JhengHei;font-weight: 300;">
                                    {{item.date_break}}
                                </div>
                            </div>

                        </div>

                        <div class="modify" style="width: 20%;">
                                <button   class="btn clear_button" style="margin-left:1.2rem;"  :disabled="$parent.is_ModifyMode_toolholder|| $parent.is_ModifyMode_toolholder_pre||$parent.is_operation_axios_record || $parent.is_operation_axios_toolholder||$parent.is_new_life_when_record ==true"  @click="$parent.Delete_ToolHolder_Pre_Cell(index)">刪除</button>
                                <button   class="btn Submit_button" :disabled="$parent.is_ModifyMode_toolholder|| $parent.is_ModifyMode_toolholder_pre||$parent.is_operation_axios_record || $parent.is_operation_axios_toolholder||$parent.is_new_life_when_record ==true"  @click="$parent.Modify_Cell_ToolHolder_Pre_Choose(index,item)">修改</button>
                        </div>
                </div>
            </div>

        <loading v-if="$parent.is_operation_axios_record" />

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
