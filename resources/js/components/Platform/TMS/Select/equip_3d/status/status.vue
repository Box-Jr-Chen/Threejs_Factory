<template>

                <div class="status_outline"
                v-on:mouseover="Controls_Mouseover()"
                v-on:mouseleave="Controls_Mouseleave()">
                        <div class="title"
                           @mouseup="Mouseup_stay_panel()"
                           @mousedown="Mousedown_stay_panel()"
                           v-on:mousemove="update_wh"
                           v-bind:class="{ active_move: click_move }">
                            設備狀態
                        </div>

                        <div class="title_close">
                            <p @click="Click_Close">X</p>
                        </div>

                        <div class="outline_2">

                            <div  class="outline_status"  v-for="item in getEquiment_status()" :key="item">
                                <div class="pic">
                                    <img :src='item.image' alt="" >
                                </div>
                                <div  class="context">

                                    <div class="connect">
                                        <div class="light">
                                            <div
                                            v-bind:class="{
                                                'led-gray':(item.status=='unconnect'),
                                                'led-green': (item.status=='idle'),
                                                'led-blue': (item.status=='run'),
                                                'led-red': (item.status=='error') }"
                                            ></div>
                                        </div>
                                        <div class="connect_status">
                                             {{status_show(item.status)}}
                                        </div>
                                    </div>

                                    <div class="movestatus">
                                        <div class="move_title">
                                           監測設備 :
                                        </div>
                                        <div class="move_status">
                                             {{item.name}}
                                        </div>
                                    </div>

                                     <div class="movestatus" v-for="item2 in item.detail" :key="item2">
                                        <div class="move_title">
                                           {{item2.title}}
                                        </div>
                                        <div class="move_status">
                                             {{item2.context}}
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

       </div>
</template>


<script src="./status.js" />

<style lang="scss" scoped>
@import '~@/status.scss';
@import '~@/LEDLight.scss';
</style>
