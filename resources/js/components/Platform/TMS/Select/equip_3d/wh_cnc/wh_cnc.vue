<template>

                <div class="wh_outline"
                @mouseup="Mouseup_stay_panel()"
                @mousedown="Mousedown_stay_panel()"
                v-on:mouseover="Controls_Mouseover()"
                v-on:mouseleave="Controls_Mouseleave()"
                v-on:mousemove="update_wh"
                v-bind:class="{ active_move: click_move }">
                        <div class="title">
                            工具機刀把倉儲
                        </div>

                        <div class="title_close">
                            <p @click="Click_Close">X</p>
                        </div>

                        <div class="combo_row">
                            <div class="combo_row_title">
                                工具機倉儲 :
                            </div>
                            <div class="combo" >
                                    <select v-model="select_index">
                                        <option value="0">CNC 01</option>
                                        <option value="1">CNC 02</option>
                                    </select>
                            </div>
                        </div>

                        <div class="toolholder_detail">
                                <div class="detail" v-if="item_hover !== null && item_hover.name !== null">
                                    <div class="detail_title">
                                            刀把編號 :
                                    </div>
                                    <div class="detail_context">
                                            {{item_hover.name}}
                                    </div>
                                </div>

                                <div class="detail" v-if="item_hover !== null && item_hover.name !== null">
                                    <div class="detail_title">
                                            刀具組合 :
                                    </div>
                                    <div class="detail_context">
                                           {{item_hover.code}}
                                    </div>
                                </div>

                                <div class="detail" v-if="item_hover !== null && item_hover.name !== null">
                                    <div class="detail_context">
                                             刀把壽命 : {{item_hover.life}}
                                    </div>
                                </div>
                        </div>

                        <div class="data_block">
                            <div class="data_outline">
                                <div class="data_inline">

                                    <div class="data_inline_cell"   v-for="(item, n)  in $store.state.ToolHolder_Cnc[select_index]"
                                    :key="n"
                                    @mouseover="GetItem_hover(item)">
                                            <div class="data_inline_number">
                                                {{n+1}}
                                            </div>
                                            <div class="data_inline_context">
                                                <div style="border-bottom: 1px solid rgb(120, 120, 120);color:white;  margin-top: -4px; height:55%">
                                                   {{DateTime_Tram(item.name,new Date(item.created_at))}}
                                                </div>
                                                <div style="color:white; margin-top: -2px; height:45%">
                                                    {{item.name}}
                                                </div>
                                            </div>
                                    </div>



                                </div>
                            </div>
                        </div>
                </div>
</template>

<script src="./wh_cnc.js" />

<style lang="scss" scoped>
@import '~@/wh_cnc.scss';
</style>
