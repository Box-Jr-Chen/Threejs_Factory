<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class toolholderseed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('toolholder')->truncate();
        DB::statement("TRUNCATE TABLE toolholder RESTART IDENTITY");
        //Random code
        //cooling
            $cooling  = DB::table('type_toolholder')
            ->select('code')
            ->where('code', 'like', 'L%')
            ->get();
        //machining
            $machining  = DB::table('type_toolholder')
            ->select('code')
            ->where('code', 'like', 'M%')
            ->get();
        //material
            $material  = DB::table('type_toolholder')
            ->select('code')
            ->where('code', 'like', 'K%')
            ->get();
        //shank
            $shank  = DB::table('type_toolholder')
            ->select('code')
            ->where('code', 'like', 'N%')
            ->get();
        //shankamount
            $shankamount  = DB::table('type_toolholder')
            ->select('code')
            ->where('code', 'like', 'Z%')
            ->get();

        $length_cool        = count($cooling);
        $length_machining   = count($machining);
        $length_material    = count($material);
        $length_shank       = count($shank);
        $length_shankamount = count($shankamount);

        for ($y = 1; $y <= 30; $y+=1) {

            $result ='t';

            if($y <10)
            {
                $result ='th0'.strval($y);
            }
            else
            {
                $result ='th'.strval($y);
            }

            $now = date_create()->format('Y-m-d H:i:s');

            $get_cooling =  $cooling[rand(0, $length_cool-1)]->code;
            $get_machining =  $machining[rand(0, $length_machining-1)]->code;
            $get_material =  $material[rand(0, $length_material-1)]->code;
            $get_shank =  $shank[rand(0, $length_shank-1)]->code;
            $get_shankamount =  $shankamount[rand(0, $length_shankamount-1)]->code;

            $p1 = strval(rand(5, 100));
            $p2 =strval(rand(5, 100));
            $p3 =strval(rand(5, 100));
            $p4 =strval(rand(5, 100));

            $code = $get_cooling .'.'.$get_machining.'.'.$get_material.'.'.$get_shank.'.'.$get_shankamount.'.'.$p1.'.'.$p2.'.'.$p3.'.'.$p4;

            DB::table('toolholder')->insert([
                'name' => $result,
                'code' => $code,
                'life' =>100,
                'maxlife'=>100,
                'isbreak' =>false,
                'created_at' =>$now
            ]);
        }


    }
}
