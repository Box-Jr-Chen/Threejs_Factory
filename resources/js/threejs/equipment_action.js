import setting from "@js/threejs/equipment_setting.js";
import * as THREE from "three"

class Equipment_Action {
    constructor(){
        this.setting =  setting.Setting;
        this.equipment_control = {
            'robot':-1,
            'axis':-1,
        };
        this.speed = 0.4;
        this.Material_Error  = new THREE.MeshBasicMaterial({color: "red", wireframe: false});
        this.Material_Run    = new THREE.MeshBasicMaterial({color: "yellow", wireframe: false});
        this.Material_Idle   = new THREE.MeshBasicMaterial({color: "green", wireframe: false});
        this.Material_nor    = null;
        this.selectedObjects_control = [];
    }

    ControlMove(dir) {

        var r_n = this.equipment_control.robot;
        var a_n = this.equipment_control.axis;
        if(r_n <0 || a_n <0)
                return;

        var axis_data = this.setting.equipment[r_n].axis[a_n];

        if(axis_data.instance ==null)
                return;

        if(dir ==='u')
        {
           // console.log('u');
            if(axis_data.dir =='y')
            {
                var value = axis_data.instance.position.y + this.speed;

                if(value >= axis_data.max)
                       value = axis_data.max;

                axis_data.instance.position.y =value;
            }
        }
        else if(dir ==='d')
        {
           // console.log('d');
            if(axis_data.dir =='y')
            {
                var value = axis_data.instance.position.y - this.speed;

                if(value <= axis_data.mix)
                       value = axis_data.mix;

                axis_data.instance.position.y =value;
            }

        }
        else if(dir ==='l')
        {
            //console.log('l');

            if(axis_data.dir =='z')
            {
                var value = axis_data.instance.position.z - this.speed;

                if(value <= axis_data.mix)
                       value = axis_data.mix;

                axis_data.instance.position.z =value;
            }
            else if (axis_data.dir =='x')
            {
                var value = axis_data.instance.position.x - this.speed;

                if(value <= axis_data.mix)
                       value = axis_data.mix;

                axis_data.instance.position.x =value;
            }

        }
        else if(dir ==='r')
        {
           // console.log('r');

           if(axis_data.dir =='z')
           {
               var value = axis_data.instance.position.z + this.speed;

               if(value >= axis_data.max)
                      value = axis_data.max;

               axis_data.instance.position.z =value;
           }
           else if (axis_data.dir =='x')
           {
               var value = axis_data.instance.position.x + this.speed;

               if(value >= axis_data.max)
                      value = axis_data.max;

               axis_data.instance.position.x =value;
           }
        }

    }


    CNC_1_Status(status){

            if(this.Material_nor ===null)
                return;

            if(status===0)
            {
                this.setting.equipment_CNC[0].tip[0].instance.material = this.Material_nor;
                this.setting.equipment_CNC[0].tip[1].instance.material = this.Material_nor;
                this.setting.equipment_CNC[0].tip[2].instance.material = this.Material_Idle;

                this.setting.equipment_CNC[0].tip[0].instance.layers.enable(0);
                this.setting.equipment_CNC[0].tip[1].instance.layers.enable(0);
                this.setting.equipment_CNC[0].tip[2].instance.layers.enable(1);
            }
            else if(status===1)
            {
                this.setting.equipment_CNC[0].tip[0].instance.material = this.Material_nor;
                this.setting.equipment_CNC[0].tip[1].instance.material = this.Material_Run;
                this.setting.equipment_CNC[0].tip[2].instance.material = this.Material_nor;

                this.setting.equipment_CNC[0].tip[0].instance.layers.enable(0);
                this.setting.equipment_CNC[0].tip[1].instance.layers.enable(1);
                this.setting.equipment_CNC[0].tip[2].instance.layers.enable(0);
            }
            else if(status===2)
            {
                this.setting.equipment_CNC[0].tip[0].instance.material = this.Material_Error;
                this.setting.equipment_CNC[0].tip[1].instance.material = this.Material_nor;
                this.setting.equipment_CNC[0].tip[2].instance.material = this.Material_nor;

                this.setting.equipment_CNC[0].tip[0].instance.layers.enable(1);
                this.setting.equipment_CNC[0].tip[1].instance.layers.enable(0);
                this.setting.equipment_CNC[0].tip[2].instance.layers.enable(0);
            }
    }

    CNC_2_Status(status){

        if(this.Material_nor ===null)
            return;


        if(status===0)
        {
            this.setting.equipment_CNC[1].tip[0].instance.material = this.Material_nor;
            this.setting.equipment_CNC[1].tip[1].instance.material = this.Material_nor;
            this.setting.equipment_CNC[1].tip[2].instance.material = this.Material_Idle;

            this.setting.equipment_CNC[1].tip[0].instance.layers.enable(0);
            this.setting.equipment_CNC[1].tip[1].instance.layers.enable(0);
            this.setting.equipment_CNC[1].tip[2].instance.layers.enable(1);
        }
        else if(status===1)
        {
            this.setting.equipment_CNC[1].tip[0].instance.material = this.Material_nor;
            this.setting.equipment_CNC[1].tip[1].instance.material = this.Material_Run;
            this.setting.equipment_CNC[1].tip[2].instance.material = this.Material_nor;

            this.setting.equipment_CNC[1].tip[0].instance.layers.enable(0);
            this.setting.equipment_CNC[1].tip[1].instance.layers.enable(1);
            this.setting.equipment_CNC[1].tip[2].instance.layers.enable(0);
        }
        else if(status===2)
        {
            this.setting.equipment_CNC[1].tip[0].instance.material = this.Material_Error;
            this.setting.equipment_CNC[1].tip[1].instance.material = this.Material_nor;
            this.setting.equipment_CNC[1].tip[2].instance.material = this.Material_nor;

            this.setting.equipment_CNC[1].tip[0].instance.layers.enable(1);
            this.setting.equipment_CNC[1].tip[1].instance.layers.enable(0);
            this.setting.equipment_CNC[1].tip[2].instance.layers.enable(0);
        }
}
}

export default {Equipment_Action :new Equipment_Action()}
