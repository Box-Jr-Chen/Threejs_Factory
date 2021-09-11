<template>
    <div class="init">

         <div class="wh_outline">
             <table class="delcare" style="margin-top:1rem;margin-left:0.3rem;">
                <tr>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <td>1. </td>
                    <td>此軟體為刀把倉儲模擬軟體，刀把由外側倉儲送入工具機內部。</td>
                </tr>
                <tr>
                    <td>2. </td>
                    <td>所有3D模型為非商業使用，不可下載用於商業用途。</td>
                </tr>
                <tr>
                    <td>3. </td>
                    <td>使用者可下載程式碼、但不可轉換成商業用途，可直接使用於自身專案。</td>
                </tr>
                <tr>
                    <td>4. </td>
                    <td>若使用者對本軟體之使用或本合約之條款，有任何問題，歡迎聯繫。</td>
                </tr>
                </table>
                <div class="bar_block">
                    <div class="bar_outline">
                            <div :style="barwidth" class="bar">

                            </div>
                    </div>
                </div>
                <div class="btn_block">
                    <div class="   btn_type btn_enter"  v-bind:class="{ btn_enter_active: (100 * ($store.state.loading_finish.length /16))>=100, btn_enter_unactive: (100 * ($store.state.loading_finish.length /16))<100 }" @click="enter_system">
                        確定
                    </div>
                </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'init',
    computed:{
        barwidth :function(){
           var self = this;
           return 'width :'+(100 * (self.$store.state.loading_finish.length /16))  + '%';
        }

    },
    methods:{
            enter_system(){
                var self =this;

                if((100 * (self.$store.state.loading_finish.length /16)) >=100)
                {
                    self.$store.state.isInit_loading = false;
                    self.$store.state.loading_finish = [];
                    self.$store.state.threejs.Controls_Camera_Abled();
                }
            }
    }
}
</script>

<style lang="scss">
@import '~@/init_loading.scss';
</style>

