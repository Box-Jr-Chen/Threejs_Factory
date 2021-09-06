<template>
        <nav class="menu">
        <input type="checkbox" href="#" class="menu-open" name="menu-open" id="menu-open"/>
        <label class="menu-open-button" for="menu-open">
            <span class="hamburger hamburger-1"></span>
            <span class="hamburger hamburger-2"></span>
            <span class="hamburger hamburger-3"></span>
        </label>
            <a href="#" class="menu-item" v-bind:class="{ active_panel: ($store.state.select_panel==1) }">
                <i class="fa"  @click="Click_panel(1)">
                    <img class="img_icon" src='~@images/wh_toolholder.png' alt="">
                </i>
                <div class="tooltiptext"><img class="img_icon_tip" src='~@images/sidebar_1.png' alt=""></div>
            </a>

            <a href="#" class="menu-item" v-bind:class="{ active_panel: ($store.state.select_panel==2) }">
                <i class="fa" @click="Click_panel(2)">
                    <img class="img_icon" src='~@images/wh_cnc.png' alt="">
                </i>
                <div class="tooltiptext"><img class="img_icon_tip" src='~@images/sidebar_2.png' alt=""></div>
            </a>

            <a href="#" class="menu-item" v-bind:class="{ active_panel: ($store.state.select_panel==3) }">
                <i class="fa" @click="Click_panel(3)"><img class="img_icon" src='~@images/toolholder_2.png' alt="">
                </i>
                <div class="tooltiptext"><img class="img_icon_tip" src='~@images/sidebar_3.png' alt=""></div>
            </a>
            <a href="#" class="menu-item" v-bind:class="{ active_panel: ($store.state.select_panel==4) }">
                <i class="fa" @click="Click_panel(4)">
                    <img class="img_icon" src='~@images/jog.png' alt="">
                </i>
                <div class="tooltiptext"><img class="img_icon_tip" src='~@images/sidebar_4.png' alt=""></div>
            </a>
            <a href="#" class="menu-item" v-bind:class="{ active_panel: ($store.state.select_panel==5) }">
                <i class="fa" @click="Click_panel(5)">
                    <img class="img_icon" src='~@images/life.png' alt="">
                </i>
                <div class="tooltiptext"><img class="img_icon_tip" src='~@images/sidebar_5.png' alt=""></div>
            </a>
            <div class="outline"></div>
        </nav>
</template>

<script src="./sidebar.js" />

<style lang="scss">
@import '~@/sidebar.scss';
</style>
