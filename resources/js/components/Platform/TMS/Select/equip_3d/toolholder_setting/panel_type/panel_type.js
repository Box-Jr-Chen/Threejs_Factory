export default {
    name: 'panel_toolholder',
    components: {
    },
    computed:{

    },
    data(){
           return{
                type_select:0,
                data_type:{
                    code:'',
                    description:''
                },

           }
       },
       methods:{
            get_typeList()
            {
                var result =[];
                if(this.type_select ==0)
                    result = this.$store.state.ToolHolder_Type.machining;
                else if(this.type_select ==1)
                    result = this.$store.state.ToolHolder_Type.material;
                else if(this.type_select ==2)
                    result = this.$store.state.ToolHolder_Type.shank;
                else if(this.type_select ==3)
                    result = this.$store.state.ToolHolder_Type.shankamount;
                else if(this.type_select ==4)
                    result = this.$store.state.ToolHolder_Type.cooling;
                return result;
            }

       },
       created(){
       }

}
