<template>
    <div>
        <div class="show_black">
            <select class="show" v-model="type_select">
                <option value =0>加工模式</option>
                <option value =1>刀具材質</option>
                <option value =2>刀具形式</option>
                <option value =3>刀具刃數</option>
                <option value =4>中心冷卻</option>
            </select>
        </div>

        <div class="type_black">

            <div class="type_option">
                    <div>代碼:</div>
                    <input class="type_code" v-model="data_type.code" />
            </div>
            <div class="type_option">
                    <div>說明:</div>
                    <input class="type_code" v-model="data_type.description"/>
            </div>
        </div>

        <div class="code_black">
            <div  class="code_cell"  v-for="(item,index) in get_typeList()" :key="index">
                <div class="title">{{index+1}}</div>
                <div class="context">{{item.code}}-{{item.description}}</div>
                <div class="delect">
                    <!-- <div class="btn_list btn_cancel">
                        清除
                    </div> -->
                </div>
            </div>
        </div>

        <div class="btn_block">
            <div class="btn_type btn_enter">
                確定
            </div>
            <div class="btn_type btn_cancel">
                取消
            </div>
        </div>
    </div>
</template>

<script src="./panel_type.js" />

<style lang="scss" scoped>
@import '~@/panel_type.scss';
</style>
