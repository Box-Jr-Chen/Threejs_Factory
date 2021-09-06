export default {
    name: 'jog',
    props:['element'],
    computed:{
        select_word:function(){
                var self =this;
                var result ='';

                var robot_s =self.$store.state.threejs.equipment_action.equipment_control.robot;
                var axis_s =self.$store.state.threejs.equipment_action.equipment_control.axis;

                self.$store.state.threejs.equipment_action.setting.equipment.forEach(
                    function(robot,robot_index)  {

                            if(robot_index === robot_s)
                            {
                                result =result + robot.name+'-';
                                robot.axis.forEach( function(axis,axis_index){
                                        if(axis_index === axis_s)
                                        {
                                            result =result +axis.name;
                                        }
                                });
                            }

                });

                return result ;
        }
    },
    data(){
           return{
                page_x :0,
                page_y : 0,
                click_move:false,
                robot_control_interval:null
           }
       },
       methods:{
            nested_init()
            {
                var toggler = document.getElementsByClassName("caret");
                var i;

                for (i = 0; i < toggler.length; i++) {
                    toggler[i].addEventListener("click", function() {
                        this.parentElement.querySelector(".nested").classList.toggle("active");
                        this.classList.toggle("caret-down");
                    });
                }
            },
            select_axis(robot_s,axis_s){
                var self =this;
                self.$store.state.threejs.equipment_action.selectedObjects_control =[];
                self.$store.state.threejs.outlinePass.selectedObjects = [];
                self.$store.state.threejs.equipment_action.setting.equipment.forEach(
                    function(robot,robot_index)  {

                            if(robot_index === robot_s)
                            {
                                self.$store.state.threejs.equipment_action.equipment_control.robot =robot_s;
                                robot.axis.forEach( function(axis,axis_index){
                                        if(axis_index === axis_s)
                                        {
                                            self.$store.state.threejs.equipment_action.equipment_control.axis =axis_s;

                                            self.$store.state.threejs.equipment_action.selectedObjects_control.push(self.$store.state.threejs.equipment_action.setting.equipment[robot_s].axis[axis_s]);
                                          //  self.$store.state.threejs.outlinePass.selectedObjects = self.$store.state.threejs.equipment_action.selectedObjects_control;
                                        }
                                });
                            }

                });

            },
            select_cancel(){
                this.$store.state.threejs.equipment_action.equipment_control.robot =-1;
                this.$store.state.threejs.equipment_action.equipment_control.axis =-1;
            },
            robot_contorl_md(select){

                var self =this;

                if(self.$store.state.threejs.equipment_action.equipment_control.robot <0)
                 return;
                if(self.$store.state.threejs.equipment_action.equipment_control.axis <0)
                 return;

                var dir = select;
                this.robot_control_interval = setInterval(() => {
                    self.$store.state.threejs.equipment_action.ControlMove(dir);
                }, 30)
            },
            robot_contorl_mu(){
                clearInterval(this.robot_control_interval);
            },
            robotActive(robot,axis){

                var result =false;
                var self =this;

                var robot_s =  self.$store.state.threejs.equipment_action.equipment_control.robot;
                var axis_s =  self.$store.state.threejs.equipment_action.equipment_control.axis;

                if(robot_s <0)
                    result =false;
                if(axis_s <0)
                    result =false;


                if(robot_s ==robot)
                {
                    if(axis_s ==axis)
                    {
                        result =true;
                    }
                }

                return result;
            },
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

            Click_Close(){
                this.$store.state.select_panel =0;
                this.click_move = false;
                this.$store.state.threejs.enter=false;
                this.$store.state.threejs.Controls_Camera_Abled();
            },
            update_jog: function(event) {
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
       },
       mounted() {
        this.nested_init();
       },
       created(){
       }

}
