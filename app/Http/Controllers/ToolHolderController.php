<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
class ToolHolderController extends Controller
{


    public $Table_toolholder       = 'toolholder';
    public $count =10;
    function date()
    {
        $date            = Carbon::now()->toDateTimeString();

        $date = date("Y-m-d H:i:s", strtotime('+8 hours'));

        return  $date;
    }

    public function Getdata(Request $request)
    {
        // returns "Foo"
        $par = $request->query('p');
        if(is_null($par))
        {
            return response()->json(array('message'=>'error','data'=>'no page'),200);
        }

        $num = intval($par);
        if($num <=0)
        {
            return response()->json(array('message'=>'error','data'=>'page <1'),200);
        }


        $data  = DB::table($this->Table_toolholder)
        ->offset($this->count * ($num-1))
        ->limit($this->count)
        ->get();
        return response()->json(array('message'=>'success','data'=>$data),200);
    }

    public function GetCount_data()
    {
        $data  = DB::table($this->Table_toolholder)
        ->count();

        if($data <=0)
        {
            return response()->json(array('message'=>'success','data'=>$data),200);
        }
         $result = intval($data/$this->count) ;

         if($this->count % $data >0)
                $result = $result+1;

        return response()->json(array('message'=>'success','data'=>$result),200);
    }

}
