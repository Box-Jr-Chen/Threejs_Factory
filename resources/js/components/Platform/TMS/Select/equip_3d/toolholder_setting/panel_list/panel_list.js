
export default {
    name: 'panel_list',
    components: {
    },
    computed:{

    },
    data(){
           return{
                pagemax:0,
                page_now:1,
                toolholderdata:[]
           }
       },
    mounted(){
        this.page_now =1;
        this.get_toolholderdata();
    },
    methods:{

            get_toolholderdata:function()
            {
                    var self =this;
                    self.$store.dispatch('A_GetPage_toolholder').
                    then(response =>{

                        if(response !=='error')
                        {
                            self.pagemax = response.data;
                            self.$store.dispatch('A_Get_toolholder',this.page_now).
                            then(response =>{

                                if(response !=='error')
                                {
                                    self.toolholderdata = response.data;
                                }
                            });
                        }
                    });
            },
            changeIndex(index)
            {
                var self =this;
                self.page_now=index;
                self.$store.dispatch('A_Get_toolholder',this.page_now).
                then(response =>{

                    if(response !=='error')
                    {
                        self.toolholderdata = response.data;
                    }
                });
            }
       },
    created(){
       }

}
