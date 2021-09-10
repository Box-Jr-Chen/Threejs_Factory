<template>
    <div>
        <div class="show_black">
            <div class="show">
                {{tool_combine}}
            </div>
        </div>

        <div class="type_black">

            <div class="type_option">
                    <div>加工模式:</div>
                    <select v-model="data_onetool.machining" >
                        <option
                        v-for="(item,index) in $store.state.ToolHolder_Type.machining"
                        :key="index"
                       >{{item.code}}-{{item.description}}</option>
                    </select>
            </div>

            <div class="type_option">
                    <div>刀具材質:</div>
                    <select v-model="data_onetool.material" >
                        <option
                        v-for="(item,index) in $store.state.ToolHolder_Type.material"
                        :key="index"
                       >{{item.code}}-{{item.description}}</option>
                    </select>
            </div>

            <div class="type_option">
                    <div>刀具形式:</div>
                    <select v-model="data_onetool.shark">
                        <option
                         v-for="(item,index) in $store.state.ToolHolder_Type.shank"
                         :key="index"
                         >{{item.code}}-{{item.description}}</option>
                    </select>
            </div>

            <div class="type_option">
                    <div>刀具刃數:</div>
                    <select v-model="data_onetool.sharkamount">
                        <option
                        v-for="(item,index) in $store.state.ToolHolder_Type.shankamount" :key="index"

                        >{{item.code}}-{{item.description}}</option>
                    </select>
            </div>

            <div class="type_option">
                    <div>中心冷卻:</div>
                    <select v-model="data_onetool.cooling">
                            <option
                            v-for="(item,index) in $store.state.ToolHolder_Type.cooling"
                            :key="index"
                            >{{item.code}}-{{item.description}}</option>
                    </select>
            </div>

            <div class="type_option">
                    <div>參數 1:</div>
                    <input class="type_num" v-model="data_onetool.p_1" placeholder="edit me"/>
            </div>

            <div class="type_option">
                    <div>參數 2:</div>
                    <input class="type_num" v-model="data_onetool.p_2" placeholder="edit me"/>
            </div>

            <div class="type_option">
                    <div>參數 3:</div>
                    <input class="type_num" v-model="data_onetool.p_3" placeholder="edit me"/>
            </div>

            <div class="type_option">
                    <div>參數 4:</div>
                    <input class="type_num" v-model="data_onetool.p_4" placeholder="edit me"/>
            </div>

        </div>

        <div class="btn_block">
            <div class="btn_celltool btn_enter">
                確定
            </div>
            <div class="btn_celltool btn_cancel">
                取消
            </div>
        </div>
    </div>
</template>

<script src="./panel_toolholder.js" />

<style lang="scss" scoped>
@import '~@/panel_toolholder.scss';
</style>
