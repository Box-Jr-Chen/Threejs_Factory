
export default {
    name: 'panel_list',
    components: {
    },
    computed:{
        lastPage_group:function()
        {
            var self =this;
            if(self.pagemax <=0)
            {
                return 0;
            }

            var result = Math.floor(self.pagemax/self.page_group_cell) ;

            if(self.pagemax%self.page_group_cell >0)
                    result = result+1;
            return result;
        }
    },
    data(){
           return{
                pagemax:0,
                page_now:1,
                page_group:1,
                page_group_cell:3,
                toolholderdata:[]
           }
       },
    mounted(){
        this.page_now =1;
        this.page_group =1;
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
            },
            changePageGroup(index){
                this.page_group =  this.page_group + index;
            }
       },
    created(){
       }

}
