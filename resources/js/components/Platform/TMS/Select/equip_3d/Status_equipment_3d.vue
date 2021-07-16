<template>
    <div id="container">
    <div class="sidebar">
        <div class="sidebar_inner" >
            <sidebar v-on:mouseover="Controls_Camera_Disabled()"  v-on:mouseleave="Controls_Camera_Abled()"></sidebar >
        </div>
    </div>


    <wh>
    </wh>


       <!-- 倉儲狀態
      <div v-if="$store.state.TMS_select_now==$store.state.TMS_select_btns[0]"   class="panel_rightmain" :style="{width:panel_wavehouse_width+'px',left:panel_wavehouse_left +'px'  }">
          <div class="panel_wavehouse_inner"  v-on:mouseover="Controls_Camera_Disabled()"  v-on:mouseleave="Controls_Camera_Abled()">

                <div class="camera_view">
                    <p>倉儲選擇:</p>
                        <select @change="onChange_wavehouse($event)"  v-model="select_wavehouse">
                                <option v-for="(item,index) in type_wavehouse" :key="index" :value="type_wavehouse[index]">{{type_wavehouse[index]}}</option>
                        </select>
                </div>

                <div class="List_wavehouse">
                    <div class="wavehouse_cell"  v-if="camera_now == camera"   v-for="(item, index) in wavehouse_data" :key="index"  v-on:mouseover="cell_WaveHouse_MouseOver(wavehouse_data,index)"  v-on:mouseleave="cell_WaveHouse_MouseLeave(index)">
                        <div class="title">
                            <div v-if="item.id_toolholder" :style="{background:toolholder_title_background(item.id_toolholder.isbreak) }">
                                    <p>{{item.name}}</p>
                            </div>
                                <div v-if="!item.id_toolholder" :style="{background:toolholder_title_background(0) }">
                                    <p>{{item.name}}</p>
                            </div>
                            </div>
                            <div class="context">
                                <div class="code">
                                    <p v-if="item.id_toolholder">{{item.id_toolholder.code}}</p>
                                </div>
                                <div class="down">
                                    <p v-if="item.date_updated">{{item.date_updated}}</p>
                                </div>
                            </div>
                        </div>

                    <div class="wavehouse_cell"  v-if="camera_now == camera_cnc"   v-for="(item, index) in wavehouse_data_cnc" :key="index"  v-on:mouseover="cell_WaveHouse_MouseOver(wavehouse_data_cnc,index)"  v-on:mouseleave="cell_WaveHouse_MouseLeave(index)">
                        <div class="title">
                            <div v-if="item.id_toolholder" :style="{background:toolholder_title_background(item.id_toolholder.isbreak) }">
                                    <p>{{item.name}}</p>
                            </div>
                                <div v-if="!item.id_toolholder" :style="{background:toolholder_title_background(0) }">
                                    <p>{{item.name}}</p>
                            </div>
                            </div>
                            <div class="context">
                                <div class="code">
                                    <p v-if="item.id_toolholder">{{item.id_toolholder.code}}</p>
                                </div>
                                <div class="down">
                                    <p v-if="item.date_updated">{{item.date_updated}}</p>
                                </div>
                            </div>
                        </div>

                    <div class="wavehouse_cell"  v-if="camera_now == camera_cnc02"   v-for="(item, index) in wavehouse_data_cnc2" :key="index"  v-on:mouseover="cell_WaveHouse_MouseOver(wavehouse_data_cnc2,index)"  v-on:mouseleave="cell_WaveHouse_MouseLeave(index)">
                        <div class="title">
                            <div v-if="item.id_toolholder" :style="{background:toolholder_title_background(item.id_toolholder.isbreak) }">
                                    <p>{{item.name}}</p>
                            </div>
                                <div v-if="!item.id_toolholder" :style="{background:toolholder_title_background(0) }">
                                    <p>{{item.name}}</p>
                            </div>
                            </div>
                            <div class="context">
                                <div class="code">
                                    <p v-if="item.id_toolholder">{{item.id_toolholder.code}}</p>
                                </div>
                                <div class="down">
                                    <p v-if="item.date_updated">{{item.date_updated}}</p>
                                </div>
                            </div>
                        </div>

                </div>
          </div>
      </div>-->

      <!-- 設備狀態
      <div v-if="$store.state.TMS_select_now==$store.state.TMS_select_btns[1]"  class="panel_rightmain" :style="{width:panel_wavehouse_width+'px',left:panel_wavehouse_left +'px'  }">
            <div class="panel_wavehouse_inner"  style="margin-top:1.625rem"  v-on:mouseover="Controls_Camera_Disabled()"  v-on:mouseleave="Controls_Camera_Abled()">

                    <div class="pamel_equipment_cell"  v-if="status_equiment.length >0">

                            <div class="title" >
                                刀倉設備
                            </div>

                            <div  class="cell_row">
                                    <div class="cell_row_title">狀態 :</div>
                                    <div>{{status_action()}}</div>
                            </div>

                            <div class="cell_row">
                                    <div class="cell_row_title">動作 :</div>
                                    <div>{{status_flow()}}</div>
                            </div>

                    </div>

                    <div class="pamel_equipment_cell"  v-if="status_equiment.length >0">

                            <div class="title">
                                CNC設備
                            </div>

                            <div  class="cell_row">
                                    <div class="cell_row_title">狀態 :</div>
                                    <div>{{status_cnc1()}}</div>
                            </div>

                            <div class="cell_row">
                                    <div class="cell_row_title">指定刀號 :</div>
                                    <div>{{status_equiment[2].cnc217}}</div>
                            </div>

                    </div>

                    <div class="pamel_equipment_cell"  v-if="status_equiment.length >0">

                            <div class="title">
                                CNC設備 2
                            </div>

                            <div  class="cell_row">
                                    <div class="cell_row_title">狀態 :</div>
                                    <div>{{status_cnc2()}}</div>
                            </div>

                            <div class="cell_row">
                                    <div class="cell_row_title">指定刀號 :</div>
                                    <div>{{status_equiment[2].cnc218}}</div>
                            </div>

                    </div>

            </div>
      </div> -->

    <!-- sub 介面
      <div  v-if="$store.state.TMS_select_now_sub !=null" class="add_toolholder_BG" :style="{
           width:panel_add_toolholder_BG_width+'px',
           height:panel_add_toolholder_BG_height+'px' }">
           <Type_toolholderData  v-if="$store.state.TMS_select_now_sub == $store.state.TMS_select_btns[2].sub[0]"></Type_toolholderData>
        　 <Type_add_newtype  v-if="$store.state.TMS_select_now_sub == $store.state.TMS_select_btns[2].sub[1]"></Type_add_newtype>
     </div> -->

     <!-- loading 介面
     <loading  v-if="isLoadingInit" :style="{width:panel_add_toolholder_BG_width+'px',height:panel_add_toolholder_BG_height+'px' }"/> -->

  </div>
</template>

<script src="./status_equipment_3d.js" />

<style lang="scss">
@import '~@/Status_equipment_3d.scss';
</style>
