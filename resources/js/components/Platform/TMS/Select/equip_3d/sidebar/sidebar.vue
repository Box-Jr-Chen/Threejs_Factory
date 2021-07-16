<template>
<!-- 修改 -->
        <!-- <div class="btn_margin_bottom"   v-for="(item, index) in $store.state.TMS_select_btns" :key="index"  @click="btn_select(index)">
            <div class="btn" v-bind:class="[ $store.state.TMS_select_now==$store.state.TMS_select_btns[index]? 'btn_active':'' ]">
                <p>&#8226 {{$store.state.TMS_select_btns[index].title}}</p>
            </div>

            <div  class="btn_sub"  v-if="item.sub != null  && $store.state.TMS_select_now==$store.state.TMS_select_btns[index]"    v-for="(item2, index2) in item.sub" :key="index2"       @click="btn_select_sub(item.sub,index2)">
                <p v-bind:class="[ $store.state.TMS_select_now_sub==item.sub[index2]? 'btn_active_sub':'' ]"> {{item.sub[index2].title}}</p>
            </div>

        </div> -->

        <nav class="menu">
        <input type="checkbox" href="#" class="menu-open" name="menu-open" id="menu-open"/>
        <label class="menu-open-button" for="menu-open">
            <span class="hamburger hamburger-1"></span>
            <span class="hamburger hamburger-2"></span>
            <span class="hamburger hamburger-3"></span>
        </label>

            <a href="#" class="menu-item"> <i class="fa fa-bar-chart"></i> </a>
            <a href="#" class="menu-item"> <i class="fa fa-plus"></i> </a>
            <a href="#" class="menu-item"> <i class="fa fa-heart"></i> </a>
            <a href="#" class="menu-item"> <i class="fa fa-envelope"></i> </a>

            <div class="outline"></div>
        </nav>
</template>

<script src="./sidebar.js" />

<style lang="scss">
@import '~@/sidebar.scss';
</style>
