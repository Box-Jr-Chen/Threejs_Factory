<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class warehouse_toolholderseed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('warehouse_toolholder')->truncate();
        DB::statement("TRUNCATE TABLE warehouse_toolholder RESTART IDENTITY");

        //id random
        $id_toolholder  = DB::table('toolholder')
        ->select('id')
        ->get();

        $id_hasuse = array();


        for ($x = 1; $x <= 8; $x+=1) {
            for ($y = 1; $y <= 30; $y+=1) {

                $result ='w';

                if($y <10)
                {
                    $result ='w'.strval($x).'0'.strval($y);
                }
                else
                {
                    $result ='w'.strval($x).strval($y);
                }

                $get_id_t = $id_toolholder[rand(0, count($id_toolholder)-1)]->id;

                if (in_array($get_id_t, $id_hasuse)) {
                    $get_id_t =0;
                }
                else
                {
                    array_push($id_hasuse, $get_id_t );
                }

                DB::table('warehouse_toolholder')->insert([
                    'name' => $result,
                    'id_toolholder' => $get_id_t,
                ]);
            }
        }

        for ($z = 1; $z <= 16; $z+=1) {

            $result ='w';

            if($z <10)
            {
                $result ='w9'.'0'.strval($z);
            }
            else
            {
                $result ='w9'.strval($z);
            }

            $get_id_t = $id_toolholder[rand(0, count($id_toolholder)-1)]->id;

            if (in_array($get_id_t, $id_hasuse)) {
                $get_id_t =0;
            }
            else
            {
                array_push($id_hasuse, $get_id_t );
            }

            DB::table('warehouse_toolholder')->insert([
                'name' => $result,
                'id_toolholder' => $get_id_t,
            ]);
        }

    }
}
