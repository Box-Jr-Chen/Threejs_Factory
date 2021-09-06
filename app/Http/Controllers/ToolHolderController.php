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


}
