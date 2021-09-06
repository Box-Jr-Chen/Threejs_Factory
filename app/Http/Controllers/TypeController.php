<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
class TypeController extends Controller
{

    /**
     * @SWG\Get(
     *   path="/api/user/login?id={id}&password={password}",
     *   summary="使用者登入",
     *   operationId="使用者登入",
     *   @SWG\Response(response=200, description="成功操作"),
     *   @SWG\Response(response=404, description="找不到網址"),
     *   @SWG\Response(response=500, description="主機錯誤"),
	 *		@SWG\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          type="string"
     *      ),
     * 	 	@SWG\Parameter(
     *          name="password",
     *          in="path",
     *          required=true,
     *          type="string"
     *      ),
     * )
     *
     */
    public $Table_Type     = 'type_toolholder';


    function GetTable($par)
    {
        $query = '';
        switch($par)
        {
            case 'cooling':
                $query = 'L%';
            break;
            case 'machining':
                $query = 'M%';
            break;
            case 'material':
                $query = 'K%';
            break;
            case 'shank':
                $query = 'N%';
            break;
            case 'shankamount':
                $query = 'Z%';
            break;
            default:
            break;
        }

        return $query;
    }

    public function Getdata(Request $request, $arg1)
    {
        $par = $request->route('table');

        $query = $this->GetTable($par);

        if($query =='')
             return response()->json(array('message'=>'no table '.$par),400);


        $data  = DB::table('type_toolholder')
        ->where('code', 'like', $query)
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


        $check  = DB::table('type_toolholder')
        ->where('code', 'like', $table)
        ->get();


        if (isset($check))
        {
            return response()->json(array('message'=>'有同樣號碼'),400);
        }


        $data  = DB::table('type_toolholder')
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
        $num = intval($request->route('id'));

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
