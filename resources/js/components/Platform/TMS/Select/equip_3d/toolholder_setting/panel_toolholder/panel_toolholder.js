

import 'vue-select/dist/vue-select.css';

export default {
    name: 'panel_toolholder',
    components: {
    },
    computed:{
        tool_combine(){
            var self = this.data_onetool;
            return self.machining+'.'+self.material+'.'+self.shark+'.'+self.sharkamount+'.'+self.cooling+'.'+self.p_1+'.'+self.p_2+'.'+self.p_3+'.'+self.p_4+'.'+self.p_5+'.'+self.p_6+'.'+self.p_7;
        }
    },
    data(){
           return{
               data_onetool:{
                    machining:' ',
                    material:' ',
                    shark:' ',
                    sharkamount:' ',
                    cooling:' ',
                    p_1:0,
                    p_2:0,
                    p_3:0,
                    p_4:0,
                    p_5:0,
                    p_6:0,
                    p_7:0,
               }
           }
       },
       methods:{
            tool_combine:function(){
                var self = this.data_onetool;
                return self.machining+'.'+self.material+'.'+self.shark+'.'+self.sharkamount+'.'+self.cooling+'.'+self.p_1+'.'+self.p_2+'.'+self.p_3+'.'+self.p_4+'.'+self.p_5+'.'+self.p_6+'.'+self.p_7;
            }

       },
       created(){
       }

}
