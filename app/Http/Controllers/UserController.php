<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use DB;
class UserController extends Controller
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

       public $Table_Name = 'users';

	public function test(Request $request){

                $id =  $request->input('id');
                $password =  $request->input('password');

		echo ($id.':'.$password);
        }
        public function login(Request $Form){

                if (!isset($Form->name))
                {
                    return response()->json(array('message'=>'no name'),200);
                }
                if (!isset($Form->password))
                {
                    return response()->json(array('message'=>'no password'),200);
                }

                $User  = DB::table($this->Table_Name)
                         ->where([
                             ['name',$Form->name],
                            //  ['password',Hash::make($Form->password)]
                           ])
                         ->first();


                if(!is_null($User))
                {
                    if(Hash::check($Form->password,$User->password))
                    {
                        return response()->json(array('message'=>'success','name'=>$User->name),200);
                    }

                    return response()->json(array('message'=>'fail'),200);
                }
                else
                    return response()->json(array('message'=>'none'),200);
        }

        protected function create(Request $Form)
        {
            if (!isset($Form->name))
            {
                return response()->json('no name',200);
            }
            if (!isset($Form->password))
            {
                return response()->json('no password',200);
            }


            $User  = DB::table($this->Table_Name)
            ->where([
                ['name',$Form->name],
               //  ['password',Hash::make($Form->password)]
              ])
            ->first();

            if(!is_null($User))
            {
                return response()->json(array('message'=>'user account exist'),200);
            }

            $result =   DB::table($this->Table_Name)
            ->insert([
                "name"=>$Form->name,
                "password"=>Hash::make($Form->password)
            ]);

            if ( $result )
            {
                return response()->json(array('message'=>'success'),200);
            }
            else
            {
                return response()->json(array('message'=>'insert error'),200);
            }
        }
}
