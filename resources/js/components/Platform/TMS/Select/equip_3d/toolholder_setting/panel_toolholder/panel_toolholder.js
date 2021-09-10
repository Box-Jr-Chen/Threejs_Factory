

import 'vue-select/dist/vue-select.css';

export default {
    name: 'panel_toolholder',
    components: {
    },
    computed:{

        tool_combine:function(){
            var result = '';
            var self = this.data_onetool;

            var machining =self.machining.split('-')[0];
            var material =self.material.split('-')[0];
            var shark =self.shark.split('-')[0];
            var sharkamount =self.sharkamount.split('-')[0];
            var cooling =self.cooling.split('-')[0];

            if(machining !=='')
                result = result +machining+'.';
            if(material !=='')
                result = result +material+'.';
            if(shark !=='')
                result = result +shark+'.';
            if(sharkamount !=='')
                result = result +sharkamount+'.';
            if(cooling !=='')
                result = result +cooling+'.';

            result = result +self.p_1+'.'+self.p_2+'.'+self.p_3+'.'+self.p_4;

            return result;
        }
    },
    data(){
           return{
               data_onetool:{
                    machining:'',
                    material:'',
                    shark:'',
                    sharkamount:'',
                    cooling:'',
                    p_1:0,
                    p_2:0,
                    p_3:0,
                    p_4:0
               }
           }
       },
       methods:{
       },
       created(){
       }

}
