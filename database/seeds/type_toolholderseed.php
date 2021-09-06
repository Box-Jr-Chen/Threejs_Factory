<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class type_toolholderseed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('type_toolholder')->truncate();
        DB::statement("TRUNCATE TABLE type_toolholder RESTART IDENTITY");

        //Cooling
        DB::table('type_toolholder')->insert([
            'code' => 'L0',
            'description' => 'NO',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'L1',
            'description' => 'YES',
        ]);
        //Machining
        DB::table('type_toolholder')->insert([
            'code' => 'M1',
            'description' => '粗加工',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'M2',
            'description' => '中精加工',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'M3',
            'description' => '精加工',
        ]);
        //material
        DB::table('type_toolholder')->insert([
            'code' => 'K1',
            'description' => '高速鋼',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'K2',
            'description' => '鈷鋼',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'K3',
            'description' => '碳化鎢',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'K4',
            'description' => '刀片',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'K5',
            'description' => '焊刃',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'K6',
            'description' => '陶瓷',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'K7',
            'description' => '多晶鑽石',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'K8',
            'description' => '單晶鑽石',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'K99',
            'description' => '其他',
        ]);
        //shank
        DB::table('type_toolholder')->insert([
            'code' => 'N1',
            'description' => '面銑刀',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'N2',
            'description' => '平銑刀',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'N3',
            'description' => '內圓角銑刀',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'N4',
            'description' => '外圓角銑刀',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'N5',
            'description' => '球型銑刀',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'N6',
            'description' => 'T型銑刀',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'N7',
            'description' => '成型銑刀',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'N8',
            'description' => '銑牙刀',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'N9',
            'description' => '中心鑽',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'N10',
            'description' => '麻花鑽',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'N11',
            'description' => '快速鑽',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'N12',
            'description' => '階梯鑽',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'N13',
            'description' => '鉸孔刀',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'N14',
            'description' => '攻牙刀',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'N15',
            'description' => '搪刀',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'N16',
            'description' => '階梯搪刀',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'N17',
            'description' => '砂輪',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'K98',
            'description' => '自動測頭',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'K99',
            'description' => '特殊刀',
        ]);
        //shankamount
        DB::table('type_toolholder')->insert([
            'code' => 'Z1',
            'description' => '刀量 1',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'Z2',
            'description' => '刀量 2',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'Z3',
            'description' => '刀量 3',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'Z4',
            'description' => '刀量 4',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'Z5',
            'description' => '刀量 5',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'Z6',
            'description' => '刀量 6',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'Z7',
            'description' => '刀量 7',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'Z8',
            'description' => '刀量 8',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'Z9',
            'description' => '刀量 9',
        ]);
        DB::table('type_toolholder')->insert([
            'code' => 'Z10',
            'description' => '刀量 10',
        ]);
    }
}
