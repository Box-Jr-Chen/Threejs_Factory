<template>
<div class="toolholder_black">
    <div class="code_black">
        <div  class="code_cell"  v-for="(item,n) in toolholderdata" :key="n">
            <div class="title">{{item.name}}</div>
            <div class="context">{{item.code}}</div>
            <div class="delect">
                <div class="btn_list btn_cancel">
                     修改
                </div>
            </div>
        </div>
    </div>

    <div class="page_black">
        <div class="page_last_page">
            <div v-if="page_group >1" @click="changePageGroup(-1)">&lt;&lt;</div>
        </div>
        <div class="page_black_cell" v-for="index in pagemax" :key="index">
            <p class="page"
            v-if=" index > page_group_cell *(page_group-1) &&  index <= page_group_cell *page_group"
             v-bind:class="{ active_page: page_now ==(index) }"
             @click="changeIndex(index)">{{index}}</p>
            <p class="point"
            v-if=" index > page_group_cell *(page_group-1) &&  index < page_group_cell *page_group"
            >
                .
            </p>
        </div>
        <div class="page_last_page">
            <div v-if="pagemax >0 && page_group < lastPage_group" @click="changePageGroup(1)">
                &gt;&gt;
            </div>
        </div>
    </div>
</div>

</template>

<script src="./panel_list.js" />

<style lang="scss" scoped>
@import '~@/panel_list.scss';
</style>
