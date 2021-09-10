<template>
<div class="job_outline"
        v-on:mouseover="Controls_Mouseover()"
        v-on:mouseleave="Controls_Mouseleave()">

    <div class="job_title"
        @mouseup="Mouseup_stay_panel()"
        @mousedown="Mousedown_stay_panel()"
        v-on:mousemove="update_jog"
        v-bind:class="{ active_move: click_move }"
    >控制器</div>

    <div class="title_close">
        <p @click="Click_Close">X</p>
    </div>

    <div class="job_tree_trbot">
        <div class="selectedmode">
            目前選擇 :
            {{select_word}}
        </div>
        <ul id="myUL">
            <li v-for="(item,index) in $store.state.threejs.equipment_action.setting.equipment" :key="index">
                <span class="caret" @click="select_cancel">{{item.name}}</span>
                <ul class="nested" >
                    <li v-for="(item2,index2) in item.axis" :key="index2" @click="select_axis(index,index2)" v-bind:class="{ 'nestedliunActive': !robotActive(index,index2), 'nestedliActive': robotActive(index,index2) }">{{item2.name}}</li>
                </ul>
            </li>

        </ul>
    </div>
    <div class="job_controller"
    >
        <p>移動控制器</p>
        <div class="set setbg white">
            <nav class="d-pad">
                <a class="up" href="#" @mousedown="robot_contorl_md('u')"    @mouseup="robot_contorl_mu" @mouseleave="robot_contorl_mu"></a>
                <a class="right" href="#" @mousedown="robot_contorl_md('r')" @mouseup="robot_contorl_mu" @mouseleave="robot_contorl_mu"></a>
                <a class="down" href="#" @mousedown="robot_contorl_md('d')" @mouseup="robot_contorl_mu" @mouseleave="robot_contorl_mu"></a>
                <a class="left" href="#" @mousedown="robot_contorl_md('l')" @mouseup="robot_contorl_mu" @mouseleave="robot_contorl_mu"></a>
            </nav>
        </div>
    </div>
</div>
</template>

<script src="./jog.js" />

<style lang="scss">
@import '~@/jog.scss';
</style>
