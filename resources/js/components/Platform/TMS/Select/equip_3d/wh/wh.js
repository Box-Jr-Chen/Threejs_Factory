export default {
    name: 'wh',
    components: {
    },
    props:['element'],
    computed(){

    },
    data(){
           return{
               page_x :0,
               page_y : 0,
               click_move:false,
               select_index:0,
               item_hover:null
           }
       },
       methods:{
                Mouseup_stay_panel(){
                    var self = this;
                    self.click_move = false;
                    self.$store.state.threejs.Controls_Camera_Disabled();
                },
                Mousedown_stay_panel(){
                    this.click_move = true;
                },
                Controls_Mouseover(){
                    var self = this;

                    self.$store.state.threejs.enter=true;

                    if(self.$store.state.threejs.click ==false)
                    {
                        self.$store.state.threejs.Controls_Camera_Disabled();
                    }
                },
                Controls_Mouseleave(){
                    var self = this;
                    self.click_move = false;
                    self.$store.state.threejs.enter=false;

                    self.$store.state.threejs.Controls_Camera_Abled();

                },
                update_wh: function(event) {
                   var self = this;
                if(self.click_move)
                {
                    if(self.page_x !=0 && self.page_y !=0)
                    {
                        var bounder_right = (self.$store.state.width_3d -(self.element[0].offsetWidth/2)) + self.$store.state.bound_x;
                        var bounder_left = (self.element[0].offsetWidth/2) + self.$store.state.bound_x;


                        if(self.$store.state.panel_x <= bounder_right && self.$store.state.panel_x >= bounder_left )
                        {
                            var move_x = self.$store.state.panel_x + (event.pageX-self.page_x) ;

                            if(move_x >=bounder_right)
                                move_x = bounder_right;
                            else if(move_x <= bounder_left)
                                move_x = bounder_left;

                            self.$store.state.panel_x = move_x ;
                        }
                        else if(self.$store.state.panel_x > bounder_right)
                        {
                            self.$store.state.panel_x = bounder_right ;
                        }
                        else if(self.$store.state.panel_x < bounder_left)
                        {
                            self.$store.state.panel_x = bounder_left ;
                        }

                        var bounder_top = self.$store.state.nav_height + (self.element[0].offsetHeight/2);
                        var bounder_bottom = (self.$store.state.height_3d -(self.element[0].offsetHeight/2)) +self.$store.state.nav_height;


                        if(self.$store.state.panel_y <= bounder_bottom && self.$store.state.panel_y >= bounder_top)
                        {
                            var move_y = self.$store.state.panel_y +(event.pageY-self.page_y) ;

                            if(move_y >=bounder_bottom)
                                move_y = bounder_bottom;
                            else if(move_y <= bounder_top)
                                move_y = bounder_top;

                            self.$store.state.panel_y = move_y ;
                        }
                        else if(self.$store.state.panel_y > bounder_bottom)
                        {
                                self.$store.state.panel_y = bounder_bottom ;
                        }
                        else if(self.$store.state.panel_y < bounder_top)
                        {
                                self.$store.state.panel_y = bounder_top ;
                        }
                    }
                }


                    self.page_x = event.pageX;
                    self.page_y = event.pageY;

                },
                Click_Close(){
                    this.$store.state.select_panel =0;
                    this.click_move = false;
                    this.$store.state.threejs.enter=false;
                    this.$store.state.threejs.Controls_Camera_Abled();
                },
                DateTime_Tram(name,datetime){
                    if(name ==='' ||name ===null)
                            return '';

                    return datetime.getFullYear() + "-"  +(datetime.getMonth()+1) + "-"  + datetime.getDate()  + " " +
                    datetime.getHours() + ":" + datetime.getMinutes();

                    // 16-5-2015 9:50
                }
       },
       mounted(){
        var self = this;
        //w1
        self.$store.dispatch('A_GetWarehouse_toolholder','w1').
        then(response =>{
            self.$store.state.ToolHolder.push(response.data);
        });
        //w2
        self.$store.dispatch('A_GetWarehouse_toolholder','w2').
        then(response =>{
            self.$store.state.ToolHolder.push(response.data);
        });
        //w3
        self.$store.dispatch('A_GetWarehouse_toolholder','w3').
        then(response =>{
            self.$store.state.ToolHolder.push(response.data);
        });
        //w4
        self.$store.dispatch('A_GetWarehouse_toolholder','w4').
        then(response =>{
            self.$store.state.ToolHolder.push(response.data);
        });
        //w5
        self.$store.dispatch('A_GetWarehouse_toolholder','w5').
        then(response =>{
            self.$store.state.ToolHolder.push(response.data);
        });
        //w6
        self.$store.dispatch('A_GetWarehouse_toolholder','w6').
        then(response =>{
            self.$store.state.ToolHolder.push(response.data);
        });
        //w7
        self.$store.dispatch('A_GetWarehouse_toolholder','w7').
        then(response =>{
            self.$store.state.ToolHolder.push(response.data);
        });
        //w8
        self.$store.dispatch('A_GetWarehouse_toolholder','w8').
        then(response =>{
            self.$store.state.ToolHolder.push(response.data);
        });
        //w9
        self.$store.dispatch('A_GetWarehouse_toolholder','w9').
        then(response =>{
            self.$store.state.ToolHolder.push(response.data);

        });

       },
       created(){
       }

}
