<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class cnc_toolholderseed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('cnc_toolholder')->truncate();
        DB::statement("TRUNCATE TABLE cnc_toolholder RESTART IDENTITY");

        //id random
        //獲得warehouse 沒有的刀把
        $id_toolholder  = DB::table('toolholder')
        ->select('toolholder.id')
        ->get();

        $id_toolholder_wh  = DB::table('warehouse_toolholder')
        ->select('warehouse_toolholder.id_toolholder')
        ->where('warehouse_toolholder.id_toolholder', '<>', 0)
        ->get();


        $id_toolholder_match = array();

        foreach ($id_toolholder as $key => $value) {


            foreach ($id_toolholder_wh as $key2 => $value2) {
                if($value !==$value2)
                {
                    array_push($id_toolholder_match, $value  );
                }

            }
        }

        $id_hasuse = array();

        for ($x = 1; $x <= 2; $x+=1) {
            for ($y = 1; $y <= 60; $y+=1) {

                $result ='t';

                if($y <10)
                {
                    $result ='t'.strval($x).'0'.strval($y);
                }
                else
                {
                    $result ='t'.strval($x).strval($y);
                }

                $get_id_t = $id_toolholder_match[rand(0, count($id_toolholder_match)-1)]->id;

                if (in_array($get_id_t, $id_hasuse)) {
                    $get_id_t =0;
                }
                else
                {
                    array_push($id_hasuse, $get_id_t );
                }

                DB::table('cnc_toolholder')->insert([
                    'name' => $result,
                    'id_toolholder' => $get_id_t,
                ]);
            }
        }
    }
}
