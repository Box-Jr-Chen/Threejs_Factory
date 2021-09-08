<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
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
        $date  = Carbon::now()->toDateTimeString();

        $date = date("Y-m-d H:i:s", strtotime('+8 hours'));

        return  $date;
    }

    function GetOneT($par)
    {
        $query = '';
        switch($par)
        {
            case 't1':
                $query = 't1%';
            break;
            case 't2':
                $query = 't2%';
            break;
            default:
            break;
        }

        return $query;
    }
    public $Table_Name = 'cnc_toolholder';

    public function getdata(Request $request, $arg1){

        $par = $request->route('t');
        $query = $this->GetOneT($par);


        $data  = DB::table($this->Table_Name)
        ->select('cnc_toolholder.id','cnc_toolholder.name','cnc_toolholder.id_toolholder','toolholder.name','toolholder.code','toolholder.life','toolholder.created_at')
        ->leftJoin('toolholder', 'cnc_toolholder.id_toolholder', '=', 'toolholder.id')
        ->where('cnc_toolholder.name', 'like', $query)
        ->get();

        if(!is_null($data))
        {
            return response()->json(array('message'=>'success','data'=>$data),200);
        }
        else
            return response()->json(array('message'=>'none'),404);
     }

    function update(Request $Form)
    {

        if (!isset($Form->name))
        {
            return response()->json('no cnc name',404);
        }
        if (!isset($Form->toolholder))
        {
            return response()->json('no  toolholder id',404);
        }

         $name           =   $Form->name ;
         $id_toolholder =   intval($Form->toolholder) ;
       //  $date          =   $this->date();

        if($id_toolholder ==0)
        {
            $id_toolholder = 0;
        }

        $check_hasId = null;

        if($id_toolholder >0 && !is_null($id_toolholder))
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
            ->where([['name',$name]])
            ->update(
                ["id_toolholder"=> $id_toolholder],
                );

            if($returnValue ==1)
            {
                return response()->json(array('message'=>'更新成功'),202);
            }
            else  if($returnValue ==0)
            {
                return response()->json(array('message'=>'更新錯誤'),404);
            }
        }
   }


}
