<template>
    <div class="Platform">
        <Navbar class="Navbar" :style="{width:this.$store.state.mywidth+'px',height:this.$store.state.nav_height+'px'}"></Navbar>
             <router-view></router-view>
    </div>
</template>

<script src="./Main.js" />

<style lang="scss">
@import '~@/main_sys.scss';
</style>
