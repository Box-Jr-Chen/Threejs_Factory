<template>
    <div id="container">
    <div class="sidebar">
        <div class="sidebar_inner" >
            <sidebar></sidebar >
        </div>
    </div>

    <wh v-if="$store.state.select_panel==1"
    :element="$store.state.element_panel"
    :style="{
        left:(panel_WH_x),
        top:(panel_WH_y)
        }"
    style="
     position:absolute;
     transform: translate(-50%, -50%);"></wh>

    <wh_cnc v-if="$store.state.select_panel==2"
    :element="$store.state.element_panel"
    :style="{
        left:(panel_WH_x),
        top:(panel_WH_y)
    }"
    style="
     position:absolute;
     transform: translate(-50%, -50%);">
    </wh_cnc>


    <toolholder_setting v-if="$store.state.select_panel==3"
    :element="$store.state.element_panel"
    :style="{
        left:(panel_WH_x),
        top:(panel_WH_y)
    }"
    style="
     position:absolute;
     transform: translate(-50%, -50%);"
    >
    </toolholder_setting>

    <jog v-if="$store.state.select_panel==4"
    :element="$store.state.element_panel"
    :style="{
        left:(panel_WH_x),
        top:(panel_WH_y)
    }"
    style="
     position:absolute;
     transform: translate(-50%, -50%);"
    >
    </jog>


    <status v-if="$store.state.select_panel==5"
    :element="$store.state.element_panel"
    :style="{
        left:(panel_WH_x),
        top:(panel_WH_y)
    }"
    style="
     position:absolute;
     transform: translate(-50%, -50%);"
    >

    </status>

     <!-- loading 介面
     <loading  v-if="isLoadingInit" :style="{width:panel_add_toolholder_BG_width+'px',height:panel_add_toolholder_BG_height+'px' }"/> -->


    <notfull  v-if="!$store.state.isFullScreen"/>
    <init_loading v-if="$store.state.isInit_loading"/>
  </div>
</template>

<script src="./status_equipment_3d.js" />

<style lang="scss">
@import '~@/Status_equipment_3d.scss';
</style>
