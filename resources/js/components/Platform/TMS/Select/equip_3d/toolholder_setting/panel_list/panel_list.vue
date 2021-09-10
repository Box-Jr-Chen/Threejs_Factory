<template>
<div class="toolholder_black">
    <div class="code_black">
        <div  class="code_cell"  v-for="(item,n) in toolholderdata" :key="n">
            <div class="title">{{item.name}}</div>
            <div class="context">{{item.code}}</div>
            <div class="delect">
                <!-- <div class="btn_list btn_cancel">
                     清除
                </div> -->
            </div>
        </div>
    </div>

    <div class="page_black">
        <div class="page_black_cell" v-for="index in pagemax" :key="index">
            <p class="page" v-bind:class="{ active_page: page_now ==(index) }" @click="changeIndex(index)">{{index}}</p>
            <p class="point" v-if="index < pagemax">
                .
            </p>
        </div>
    </div>
</div>

</template>

<script src="./panel_list.js" />

<style lang="scss" scoped>
@import '~@/panel_list.scss';
</style>
