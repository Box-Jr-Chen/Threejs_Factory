export default {
    name: 'sidebar_tms',
    data(){
           return{
               select_btns:[
                   'wavehouse',
                   'status',
                   'type_toolholder'
               ],
               select_now : null
           }
       },
       methods:{
               btn_select(Num)
               {
                   if(this.$store.state.TMS_select_now == this.$store.state.TMS_select_btns[Num]) return;
                   this.$store.state.TMS_select_now = this.$store.state.TMS_select_btns[Num];

                   this.$store.state.TMS_select_now_sub = null;

               },
               btn_select_sub(item_sub ,Num)
               {
                   if(this.$store.state.TMS_select_now_sub == item_sub[Num]) return;

                   this.$store.state.TMS_select_now_sub = item_sub[Num];
               },
               btn_leave()
               {
                    this.$router.push({path:'/service'}) ;
               },
               Controls_Camera_Disabled(){
                   this.controls.enabled = false;
               },
               Controls_Camera_Abled(){
                   this.controls.enabled = true;
               },
       },
       created(){
           // if( this.$router.currentRoute.path === '/service/tms/status_3d')
           // {
           //     this.select_now =this.select_btns[1];
           // }
           // else if( this.$router.currentRoute.path === '/service/tms/toolholder')
           // {
           //     this.select_now =this.select_btns[2];
           // }

           this.$store.state.TMS_select_now = this.$store.state.TMS_select_btns[0];

       }

}
