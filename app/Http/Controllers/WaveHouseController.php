<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
class WaveHouseController extends Controller
{

    function date()
    {
        $date            = Carbon::now()->toDateTimeString();

        $date = date("Y-m-d H:i:s", strtotime('+8 hours'));

        return  $date;
    }

    public $Table_Name = 'warehouse_toolholder';

    function GetOneW($par)
    {
        $query = '';
        switch($par)
        {
            case 'w1':
                $query = 'w1%';
            break;
            case 'w2':
                $query = 'w2%';
            break;
            case 'w3':
                $query = 'w3%';
            break;
            case 'w4':
                $query = 'w4%';
            break;
            case 'w5':
                $query = 'w5%';
            break;
            case 'w6':
                $query = 'w6%';
            break;
            case 'w7':
                $query = 'w7%';
            break;
            case 'w8':
                $query = 'w8%';
            break;
            case 'w9':
                $query = 'w9%';
            break;
            default:
            break;
        }

        return $query;
    }


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


    public function getdata(Request $request, $arg1){

            $par = $request->route('w');
            $query = $this->GetOneW($par);

            if($query =='')
                return response()->json(array('message'=>'no table '.$par),400);


            $data  = DB::table('warehouse_toolholder')
            ->select('warehouse_toolholder.id','warehouse_toolholder.name','warehouse_toolholder.id_toolholder','warehouse_toolholder.id_toolholder','toolholder.name','toolholder.code','toolholder.life')
            ->leftJoin('toolholder', 'warehouse_toolholder.id_toolholder', '=', 'toolholder.id')
            ->where('warehouse_toolholder.name', 'like', $query)
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
        // if (!isset($Form->id))
        // {
        //     return response()->json('no toolholder id',404);
        // }
        if (!isset($Form->name))
        {
            return response()->json('no wavehouse name',404);
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
