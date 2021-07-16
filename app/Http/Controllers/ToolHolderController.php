<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use DB;
use Carbon\Carbon;
class ToolHolderController extends Controller
{


    public $Table_toolholder       = 'toolholder';
    public $Table_toolholder_pre   = 'toolholder_pre';
    public $Table_toolholder_maxlife   = 'toolholder_maxlife';

    function date()
    {
        $date            = Carbon::now()->toDateTimeString();

        $date = date("Y-m-d H:i:s", strtotime('+8 hours'));

        return  $date;
    }

    public function Getdata()
    {

        $data  = DB::table($this->Table_toolholder)
        ->get();
        return response()->json(array('message'=>'success','data'=>$data),200);
    }

    public function Getdata_Prepare_ScrollMax()
    {
        $this->limit = 10;
        $this->all = DB::table($this->Table_toolholder_pre)
            ->count();

        //check max
        $this->max = ceil($this->all / $this->limit) ;
        $this->remainder = $this->all / $this->limit ;

        if($this->remainder >0)
                $this->max ++;

                return response()->json(array('message'=>'success','data'=>$this->max),200);
    }

    public function Getdata_Maxlife_ScrollMax()
    {
        $this->limit = 10;
        $this->all = DB::table($this->Table_toolholder_maxlife)
            ->count();

        //check max
        $this->max = ceil($this->all / $this->limit) ;
        $this->remainder = $this->all / $this->limit ;

        if($this->remainder >0)
                $this->max ++;

                return response()->json(array('message'=>'success','data'=>$this->max),200);
    }

    public function Getdata_Prepare(Request $request,$arg1)
    {
        $this->limit = 10;
        $this->par = intval($request->route('num'));
        $this->data =[];
        $this->count =0;
        if($this->par >0)
        {
            $this->all = DB::table($this->Table_toolholder_pre)
            ->count();
           //check max
            $this->max = $this->all / $this->limit ;
            $this->remainder = $this->all / $this->limit ;

            if($this->remainder >0)
                         $this->max ++;

            if($this->par > $this->max)
                return response()->json(array('message'=>'max'),200);


            DB::table($this->Table_toolholder_pre)
            ->orderBy('id','desc')
            ->chunk($this->limit, function ($result) {

                $this->count ++;

                if($this->count >= $this->par)
                {
                    foreach($result as $item)
                    {
                        $serial = DB::table($this->Table_toolholder)
                        ->select('serial_no')
                        ->where('id_toolholder', $item->id_toolholder)
                        ->first();
                        $item->id_toolholder = $serial->serial_no ;
                    }

                    $this->data = $result;
                    return false;
                }

            });



        }
        else
        {
            $data = DB::table($this->Table_toolholder_pre)
            ->orderBy('id','asc')
            ->get();
        }

      return response()->json(array('message'=>'success','data'=>$this->data),200);
    }
    public function Getdata_NotPrepare()
    {

        $data_pre  = DB::table($this->Table_toolholder_pre)
        ->select('id_toolholder')
        ->groupBy('id_toolholder')
        ->get();

        $array=[];

        foreach ($data_pre as $value) {
            array_push($array,$value->id_toolholder);
        };

        $data  = DB::table($this->Table_toolholder)
        ->whereNotIn('id_toolholder', $array)
        ->get();

        return response()->json(array('message'=>'success','data'=>$data ),200);
    }

    public function Getdata_Maxlife(Request $request,$arg1)
    {
        $this->limit = 10;
        $this->par = intval($request->route('num'));
        $this->data =[];
        $this->count =0;

        if($this->par >0)
        {
            $this->all = DB::table($this->Table_toolholder_maxlife)
            ->count();
           //check max
            $this->max = $this->all / $this->limit ;
            $this->remainder = $this->all / $this->limit ;

            if($this->remainder >0)
                         $this->max ++;

            if($this->par > $this->max)
                return response()->json(array('message'=>'max'),200);


            DB::table($this->Table_toolholder_maxlife)
            ->orderBy('id_toolholder_maxlife','desc')
            ->chunk($this->limit, function ($result) {

                $this->count ++;

                if($this->count >= $this->par)
                {

                    $this->data = $result;
                    return false;
                }

            });



        }
        else
        {
            $data = DB::table($this->Table_toolholder_maxlife)
            ->orderBy('id_toolholder_maxlife','asc')
            ->get();
        }

        return response()->json(array('message'=>'success','data'=>$this->data),200);
    }

    public function Getdata_Maxlife_single(Request $request,$arg1)
    {
        $this->code = $request->route('code');

        if (!isset($this->code))
        {
            return response()->json(array('message'=>'沒有 code'),200);
        }

        $check  = DB::table($this->Table_toolholder_maxlife)
                ->where('code',$this->code)
                ->first();

            return response()->json(array('message'=>'success','data'=>$check),202);

    }



    public function InsertData_Prepare(Request $request)
    {

        if (!isset($request->id_toolholder))
        {
            return response()->json(array('message'=>'no id_toolholder'),200);
        }
        if (!isset($request->code))
        {
            return response()->json(array('message'=>'no code'),200);
        }

        $id_toolholder = intval($request->id_toolholder) ;
        $code          = $request->code ;
        $date          = $this->date();

        if ($id_toolholder <=0)
        {
            return response()->json(array('message'=>'id_toolholder is less 1'),200);
        }

        //檢查此刀把是否有刀套id
        $check  = DB::table($this->Table_toolholder)
        ->where('id_toolholder', $id_toolholder)
        ->first();

        if ($check ==null)
        {
            return response()->json(array('message'=>'沒有對應刀套'),200);
        }

        //檢查此刀把是否設定
        $check  = DB::table($this->Table_toolholder_pre)
        ->where('id_toolholder', $id_toolholder)
        ->first();

        if ($check !=null)
        {
            return response()->json(array('message'=>'此刀把已經設定'),200);
        }

        $result  = DB::table($this->Table_toolholder_pre)
                ->insert(
                    [
                        'id_toolholder' =>  $id_toolholder,
                        'code' => $code,
                        'date_created'=>$date,
                        'life_times'=>0,
                        'isbreak'=>0,
                    ]);

        if($result ==1)
        {
            return response()->json(array('message'=>'新增成功'),202);
        }
        else  if($result ==0)
        {
            return response()->json(array('message'=>'新增錯誤'),200);
        }

    }

    public function InsertData_NotPrepare(Request $request)
    {
        if (!isset($request->serial))
        {
            return response()->json(array('message'=>'沒有 serial'),200);
        }

        $serial          =  $request->serial ;
        $date            =  $this->date();


        $check  = DB::table($this->Table_toolholder)
                ->where('serial_no',$serial)
                 ->first();

        if($check != null)
        {
            return response()->json(array('message'=>'已有相同名稱'),202);
        }
        else
        {

            $result  = DB::table($this->Table_toolholder)
            ->insert(
                [
                    'serial_no' => $serial,
                    'date_created'=>$date,
                ]);
            if($result ==1)
            {
                return response()->json(array('message'=>'新增成功'),202);
            }
            else  if($result ==0)
            {
                return response()->json(array('message'=>'新增錯誤'),200);
            }
        }

    }

    public function InsertData_Maxlife(Request $request)
    {
        if (!isset($request->code))
        {
            return response()->json(array('message'=>'沒有 code'),200);
        }
        if (!isset($request->maxlife))
        {
            return response()->json(array('message'=>'沒有 maxlife'),200);
        }

        $code          =  $request->code ;
        $maxlife       =  intval($request->maxlife) ;
        $date          =  $this->date();


        $check  = DB::table($this->Table_toolholder_maxlife)
                ->where('code',$code)
                ->first();

        if($check != null)
        {
            return response()->json(array('message'=>'已有相同名稱'),202);
        }
        else
        {

            $result  = DB::table($this->Table_toolholder_maxlife)
            ->insert(
                [
                    'code' => $code,
                    'maxlife' => $maxlife,
                    'data_updated'=>$date,
                ]);

            if($result ==1)
            {
                return response()->json(array('message'=>'新增成功'),202);
            }
            else  if($result ==0)
            {
                return response()->json(array('message'=>'新增錯誤'),200);
            }
        }
    }


    public function UpdateData_NotPrepare(Request $request, $arg1)
    {
        $this->par = intval($request->route('id'));

        if($this->par <=0)
        {
            return response()->json(array('message'=>'編號小於1'),200);
        }


        if (!isset($request->serial))
             return response()->json(array('message'=>'沒有 serial'),200);


        $serial          = $request->serial ;
        $date            =  $this->date();

        $check  = DB::table($this->Table_toolholder)
        ->where('serial_no', $serial)
        ->first();

        if ($check !=null)
        {
            return response()->json(array('message'=>'此刀把已有相同名字'),200);
        }



        $result  = DB::table($this->Table_toolholder)
        ->where('id_toolholder', $this->par)
        ->update(
            [
                'serial_no' => $serial,
                'date_created'=>$date,
            ]
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

    public function UpdateData_Prepare(Request $request, $arg1)
    {
        $this->par = intval($request->route('id'));

        if($this->par <=0)
        {
            return response()->json(array('message'=>'編號小於1'),200);
        }

        if (!isset($request->id_toolholder))
            return response()->json(array('message'=>'沒有 id_toolholder'),200);

        if (!isset($request->code))
            return response()->json(array('message'=>'沒有 code'),200);

        $id_toolholder          =  intval($request->id_toolholder) ;
        $code                   =  $request->code;

        if($id_toolholder <=0)
           return response()->json(array('message'=>'id_toolholder 小於1'),200);


        $check  = DB::table($this->Table_toolholder_pre)
        ->where([
                ['id_toolholder', $id_toolholder],
                ['code', $code]])
        ->first();

        if ($check !=null)
        {
            return response()->json(array('message'=>'設定未有改變'),200);
        }



        $result  = DB::table($this->Table_toolholder_pre)
        ->where('id', $this->par)
        ->update(
                [
                    'id_toolholder' => $id_toolholder,
                    'code'=>$code,
                ]
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

    public function Find_Item(Request $request,$arg1)
    {
        $this->par =$request->route('serial');

        // if($this->par <=0)
        // {
        //     return response()->json(array('message'=>'編號小於1'),200);
        // }

        $data  = DB::table($this->Table_toolholder)
        ->where('serial_no', $this->par)
        ->first();

        if ($data !=null)
                return response()->json(array('message'=>'success','data'=>$data),200);
        else
                return response()->json(array('message'=>'success','data'=>null ),200);
    }

    public function Find_Id(Request $request,$arg1)
    {
        $this->serial = $request->route('serial');

        $data  = DB::table($this->Table_toolholder)
        ->where('serial_no', $this->serial)
        ->first();

        if ($data !=null)
             return response()->json(array('message'=>'success','data'=>$data->id_toolholder ),200);
        else
             return response()->json(array('message'=>'success','data'=>null),200);
    }

    public function DeleteData_NotPrepare(Request $request, $arg1)
    {
        $num = intval($request->route('id'));

        if( $num <=0 )
                return response()->json(array('message'=>'數值錯誤'),400);


        $result  = DB::table($this->Table_toolholder)
        ->where('id_toolholder', $num)
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

    public function DeleteData_Prepare(Request $request, $arg1)
    {
        $num = intval($request->route('id'));


        if( $num <=0 )
                return response()->json(array('message'=>'數值錯誤'),400);



        $result  = DB::table($this->Table_toolholder_pre)
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
