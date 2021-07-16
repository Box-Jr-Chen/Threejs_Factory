<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use DB;
use Carbon\Carbon;
class WaveHouseCNCController extends Controller
{
        /**
     * @SWG\Get(
     *   path="/api/wavehouse/get
     *   summary="讀取倉儲資料",
     *   operationId="讀取倉儲資料",
     *   @SWG\Response(response=200, description="成功操作"),
     *   @SWG\Response(response=404, description="找不到資料"),
     * )
     *
     */
    function date()
    {
        $date            = Carbon::now()->toDateTimeString();

        $date = date("Y-m-d H:i:s", strtotime('+8 hours'));

        return  $date;
    }


    public $Table_Name = 'warehouse_cnc';

    public function getdata(){

                $Table_Name_2 = 'toolholder_pre';

                $data  = DB::table($this->Table_Name)
                         ->get();

                foreach ($data as $value) {

                     if(!is_null($value->id))
                     {
                         $data_toolholder  = DB::table($Table_Name_2)
                         ->where([
                             ['id',$value->id],
                           ])
                         ->first();

                         $value->id = $data_toolholder;
                     }
                }



                if(!is_null($data))
                {
                    return response()->json(array('message'=>'success','data'=>$data),200);
                }
                else
                    return response()->json(array('message'=>'none'),404);
        }

    function update(Request $Form)
    {
        if (!isset($Form->num))
        {
            return response()->json('no wavehouse num',404);
        }
        if (!isset($Form->id_toolholder))
        {
            return response()->json('no toolholder_id',404);
        }

         $num           =   $Form->num ;
         $id_toolholder =   intval($Form->id_toolholder) ;
         $date          =   $this->date();

        if($id_toolholder ==0)
        {
            $id_toolholder = null;
            $date = null;
        }

        $check_hasId = null;

        if(!is_null($id_toolholder))
        {
            $check_hasId = DB::table($this->Table_Name)
            ->where([['id_toolholder',$id_toolholder]])
            ->first();
        }

        if(!is_null($check_hasId))
        {
            return response()->json(array('message'=>'刀把已存入其他格位'),202);
        }
        else
        {
            $returnValue = DB::table($this->Table_Name)
            ->where([['num',$num]])
            ->update(
                ["id_toolholder"=> $id_toolholder,
                 "update_date"  => $date],
                );

            if($returnValue ==1)
            {
                return response()->json(array('message'=>'update success'),202);
            }
            else  if($returnValue ==0)
            {
                return response()->json(array('message'=>'更新錯誤'),404);
            }
        }
   }


}
