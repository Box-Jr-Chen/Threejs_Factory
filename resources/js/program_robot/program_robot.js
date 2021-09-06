class Program_Robot {
    constructor(){
        this.equiment_status =
        [
           {
               'name':'工具機 01',
               'image':'cnc.png',
               'status':'unconnect',
               'detail':[
                   {
                       'title':'動作狀態 :',
                       'context':'等待連線'
                   },
                   {
                    'title':'加工工件 :',
                    'context':'無'
                   },
                   {
                    'title':'加工工序 :',
                    'context':'無'
                   }
               ]
           },
           {
            'name':'工具機 02',
            'image':'cnc.png',
            'status':'unconnect',
            'detail':[
                {
                    'title':'動作狀態 :',
                    'context':'等待連線'
                },
                {
                 'title':'加工工件 :',
                 'context':'無'
                },
                {
                 'title':'加工工序 :',
                 'context':'無'
                }
                ]
            },
            {
                'name':'倉儲機器人',
                'image':'robot01.png',
                'status':'unconnect',
                'detail':[
                    {
                        'title':'動作狀態 :',
                        'context':'等待連線'
                    },
                    {
                     'title':'提取工件 :',
                     'context':'無'
                    },
                    ]
            },
            {
                'name':'刀倉機器人',
                'image':'robot02.png',
                'status':'unconnect',
                'detail':[
                    {
                        'title':'動作狀態 :',
                        'context':'等待連線'
                    },
                    {
                     'title':'提取工件 :',
                     'context':'無'
                    },
                    ]
            },
            {
                'name':'龍門機器人',
                'image':'robot03.png',
                'status':'unconnect',
                'detail':[
                    {
                        'title':'動作狀態 :',
                        'context':'等待連線'
                    },
                    {
                     'title':'提取工件 :',
                     'context':'無'
                    },
                    ]
            },
        ];
    }
}

export default {Program_Robot :new Program_Robot()}
