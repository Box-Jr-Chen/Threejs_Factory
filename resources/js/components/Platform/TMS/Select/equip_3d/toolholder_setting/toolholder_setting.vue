<template>

                <div class="toolholder_outline"
                @mouseup="Mouseup_stay_panel()"
                @mousedown="Mousedown_stay_panel()"
                v-on:mouseover="Controls_Mouseover()"
                v-on:mouseleave="Controls_Mouseleave()"
                v-on:mousemove="update_wh"
                v-bind:class="{ active_move: click_move }">

                <div class="title">
                    刀把設定
                </div>

                <div class="title_close">
                    <p @click="Click_Close">X</p>
                </div>
                <div class="warpper">

                        <div class="tabs">
                            <label class="tab" id="one-tab" for="one" @click="Click_tab(0)" v-bind:class="{ 'tab_active': select_tab==0 }">刀把輸入</label>
                            <label class="tab" id="two-tab" for="two" @click="Click_tab(1)" v-bind:class="{ 'tab_active': select_tab==1 }">種類設定</label>
                            <label class="tab" id="three-tab" for="three" @click="Click_tab(2)" v-bind:class="{ 'tab_active': select_tab==2 }">刀把列表</label>
                        </div>
                        <div class="panels">

                            <panel_toolholder v-if="select_tab==0"></panel_toolholder>
                            <panel_type v-if="select_tab==1"></panel_type>
                            <panel_list v-if="select_tab==2"></panel_list>
                            <!-- <div class="panel" id="one-panel">
                                <div class="panel-title">Why Learn CSS?</div>
                                <p>Without CSS, every web page would be drab plain text and images that flowed straight down the page. With CSS, you can add color and background images and change the layout of your page — your web pages can feel like works of art!</p>
                            </div>
                            <div class="panel" id="two-panel">
                                <div class="panel-title">Take-Away Skills</div>
                                <p>You will learn many aspects of styling web pages! You’ll be able to set up the correct file structure, edit text and colors, and create attractive layouts. With these skills, you’ll be able to customize the appearance of your web pages to suit your every need!</p>
                            </div>
                            <div class="panel" id="three-panel">
                                <div class="panel-title">Note on Prerequisites</div>
                                <p>We recommend that you complete Learn HTML before learning CSS.</p>
                            </div> -->
                        </div>
                </div>
            </div>
</template>

<script src="./toolholder_setting.js" />

<style lang="scss" scoped>
@import '~@/toolholder_setting.scss';
</style>
