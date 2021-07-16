<template>
    <div class="panel_sub"  style="width: 31%;position: relative;" >
        <div  class="maxlife">
                <div class="title" v-if="$parent.t_maxlife_scroll_max > 0" >壽命紀錄 ({{$parent.t_maxlife_scroll_num}}/{{$parent.t_maxlife_scroll_max -1}})</div>
                <div class="title" v-if="$parent.t_maxlife_scroll_max <=0" >壽命紀錄 (0/0)</div>

                <div class="panel_num" v-if="$parent.t_maxlife_scroll_panel_count.length >0">

                    <!-- sub -->
                        <p class="l_b btn_records_g" v-if="$parent.t_maxlife_scroll_panel_group_now >1"  @click="Btn_Records_Group_Frash($parent.t_maxlife_scroll_panel_group_now -1)"><</p>

                        <div v-for=" (item,index)  in $parent.t_maxlife_scroll_panel_count"  :key="index">

                            <p @click="$parent.Btn_Records_Frash(item)" class="btn_records_g"  v-bind:class="{'btn_records_g_color_active':$parent.t_maxlife_scroll_num==item}">{{item}}</p>
                            <p v-if="index < $parent.t_maxlife_scroll_panel_count.length-1">.</p>

                        </div>

                    <!-- plug -->
                        <p class="r_b btn_records_g" v-if="$parent.t_maxlife_scroll_panel_group_now  < (($parent.t_maxlife_scroll_max-1)/4)" @click="$parent.Btn_Records_Group_Frash($parent.t_maxlife_scroll_panel_group_now +1)">></p>

                </div>
        </div>

        <div
            class="panel_sub_sub3"
            style="margin-left:1.3125rem;
                    padding-top:2rem;
                    padding-bottom:2rem;
                    position: relative;"
            @scroll.passive="$parent.handleScroll">
            <div  v-if="$parent.toolholder_life.length > 0"   class="cell"   style="width: 28.5rem; margin-left:1rem;"  v-for="(item,index) in $parent.toolholder_life" :key="index" :value="$parent.toolholder_life[index]">

                        <div class="context"  style="width: 100%;">
                                <div class="code">
                                        <p>{{item.code}}</p>
                                </div>

                                <div style="width:12.5%;
                                            float: left;
                                            font: 1rem Microsoft JhengHei;
                                            font-weight:600;
                                            background: rgb(206, 206, 206);
                                            border-right: 1px solid rgb(130, 130, 130);">
                                        <div　 style="padding-left:0.63rem;">
                                            最大
                                        </div>
                                        <div style="padding-left:0.63rem;padding-bottom:0.2rem;">
                                            壽命
                                        </div>
                                </div>

                                <div class="des2">
                                    <div style="width:100%; float: left; font: 1.4rem Microsoft JhengHei;font-weight: 300;">
                                        {{item.maxlife}}
                                    </div>

                                </div>
                          </div>
            
            </div>
        </div>

        <loading v-if="$parent.is_operation_axios_life" />

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
