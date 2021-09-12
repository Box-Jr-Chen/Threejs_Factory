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
            //    btn_select(Num)
            //    {
            //        if(this.$store.state.TMS_select_now == this.$store.state.TMS_select_btns[Num]) return;
            //        this.$store.state.TMS_select_now = this.$store.state.TMS_select_btns[Num];

            //        this.$store.state.TMS_select_now_sub = null;

            //    },
            //    btn_select_sub(item_sub ,Num)
            //    {
            //        if(this.$store.state.TMS_select_now_sub == item_sub[Num]) return;

            //        this.$store.state.TMS_select_now_sub = item_sub[Num];
            //    },
               btn_leave()
               {
                    this.$router.push({path:'/service'}) ;
               },
            //    Controls_Camera_Disabled(){
            //        this.controls.enabled = false;
            //    },
            //    Controls_Camera_Abled(){
            //        this.controls.enabled = true;
            //    },
               Click_panel(panel_num){

                    var self = this;
                    self.$store.state.select_panel = panel_num;
                    self.$store.state.panel_x = self.$store.state.width_3d/1.07;
                    self.$store.state.panel_y = self.$store.state.height_3d/2;

                    if(panel_num ==1)
                        self.$store.state.element_panel = document.getElementsByClassName('wh_outline');
                    else  if(panel_num ==2)
                        self.$store.state.element_panel = document.getElementsByClassName('wh_outline');
                    else  if(panel_num ==3)
                        self.$store.state.element_panel = document.getElementsByClassName('toolholder_outline');
                    else  if(panel_num ==4)
                        self.$store.state.element_panel = document.getElementsByClassName('job_outline');
                    else  if(panel_num ==5)
                        self.$store.state.element_panel = document.getElementsByClassName('status_outline');
               }
       },
       mounted() {

       }

}
