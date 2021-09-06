<template>
    <div class="code_black">
        <div  class="code_cell"  v-for="n in 20" :key="n">
            <div class="title">th{{n}}</div>
            <div class="context">N1.M1.Z1.K1.L0.20.100.10.30.50.330.10</div>
            <div class="delect">
                <div class="btn_list btn_cancel">
                     清除
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./panel_list.js" />

<style lang="scss" scoped>
@import '~@/panel_list.scss';
</style>
