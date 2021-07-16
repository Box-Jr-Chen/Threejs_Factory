<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use DB;
use Carbon\Carbon;
class DatatransferController extends Controller
{
    public $Table_datatransfer       = 'datatransfer1';

    public function Getdata()
    {

        $data  = DB::table($this->Table_datatransfer)
        ->get();
        return response()->json(array('message'=>'success','data'=>$data),200);
    }

}
