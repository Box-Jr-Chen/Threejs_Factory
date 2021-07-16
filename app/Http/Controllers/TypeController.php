<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use DB;
class TypeController extends Controller
{


    public $Table_cooling     = 'type_toolholder_cooling';
    public $Table_machining  = 'type_toolholder_machining';
    public $Table_material    = 'type_toolholder_material';
    public $Table_shank       = 'type_toolholder_shank';
    public $Table_shankamount = 'type_toolholder_shankamount';
    public $Table_size        = 'type_toolholder_size';


    function GetTable($par)
    {
        $table = '';
        switch($par)
        {
            case 'cooling':
                $table = $this->Table_cooling;
            break;
            case 'machining':
                $table = $this->Table_machining;
            break;
            case 'material':
                $table = $this->Table_material;
            break;
            case 'shank':
                $table = $this->Table_shank;
            break;
            case 'shankamount':
                $table = $this->Table_shankamount;
            break;
            case 'size':
                $table = $this->Table_size;
            break;
            default:
            break;
        }

        return $table;
    }

    public function Getdata(Request $request, $arg1)
    {
        $par = $request->route('table');

        $table = $this->GetTable($par);

        if($table =='')
             return response()->json(array('message'=>'no table '.$par),400);

         $data  = DB::table($table)
        ->get();

          return response()->json(array('message'=>'success','data'=>$data),200);

    }

    public function InsertData(Request $request, $arg1)
    {
        $par = $request->route('table');

        $table = $this->GetTable($par);

        if($table =='')
             return response()->json(array('message'=>'no table '.$par),400);


        if (!isset($request->code))
        {
            return response()->json(array('message'=>'no code'.$par),400);
        }
        if (!isset($request->description))
        {
            return response()->json(array('message'=>'no description'.$par),400);
        }

        $code = $request->code ;
        $description = $request->description ;

        $check  = DB::table($table)
            ->where('code', $code)
            ->first();

        if (isset($check))
        {
            return response()->json(array('message'=>'有同樣號碼'),400);
        }



        $data  = DB::table($table)
            ->insert(
                [
                    'code' =>  $code,
                    'description' =>$description
                ]);

        if($data ==1)
        {
            return response()->json(array('message'=>'新增成功'),202);
        }
        else  if($data ==0)
        {
            return response()->json(array('message'=>'新增錯誤'),404);
        }

    }

    public function UpdateData(Request $request, $arg1, $arg2)
    {
        $par = $request->route('table');
        $num = $request->route('id');

        if( $num <=0 )
            return response()->json(array('message'=>'數值錯誤'),200);

        $table = $this->GetTable($par);
        if($table =='')
             return response()->json(array('message'=>'錯誤表單: '.$par),200);


        if (!isset($request->code))
            return response()->json(array('message'=>'沒有Code :'.$par),200);

        if (!isset($request->description))
            return response()->json(array('message'=>'沒有描述 :'.$par),4200);


        $result  = DB::table($table)
        ->where('id', $num)
        ->update(
            ["code"         => $request->code,
             "description"  => $request->description],
            );

        if($result ==1)
        {
            return response()->json(array('message'=>'更新成功'),202);
        }
        else  if($result ==0)
        {
            return response()->json(array('message'=>'更新錯誤'),404);
        }

    }

    public function DeleteData(Request $request, $arg1, $arg2)
    {
        $par = $request->route('table');

        $num = intval($request->route('id'));


        if( $num <=0 )
                return response()->json(array('message'=>'數值錯誤'),400);


        $table = $this->GetTable($par);

        if($table =='')
             return response()->json(array('message'=>'no table '.$par),400);


        $result  = DB::table($table)
        ->where('id', $num)
        ->delete();


        if($result ==1)
        {
            return response()->json(array('message'=>'刪除成功'),202);
        }
        else  if($result ==0)
        {
            return response()->json(array('message'=>'刪除錯誤'),200);
        }

    }




}
