import * as THREE from "three";
import { error } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
const OrbitControls = require('three-orbit-controls')(THREE);
import shader_glow from '@js/threejs/glow_shader.js';
import shader_phong from "@js/threejs/Phong.js";


class ThreeJs_3D {
    constructor(){
        this.fov = 60;
        this.container = null; //web id container
        this.scene = null;
        this.camera =  null;
        this.light = null;
        this.renderer = null;
        this.raycaster = null;
        this.geometry = null;
        this.loader = null;
        this.mesh_ground = null;
        this.grid_ground = null;
    }

    init(container) //id = container
    {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( '#F0FFF0');
        this.scene.fog = new THREE.Fog( '#F0FFF0', 200, 1000 );
        this.scene.add(new THREE.AmbientLight(0x404040));

        this.light = new THREE.DirectionalLight(0xdfebff, 0.5);//从正上方（不是位置）照射过来的平行光，0.45的强度
        this.light.position.set(50, 200, 100);
        this.light.position.multiplyScalar(0.1);
        this.light.castShadow = true;
        this.scene.add(this.light);

        // ground
        this.mesh_ground = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: '#FFFAFA', depthWrite: false } ) );
        this.mesh_ground.rotation.x = - Math.PI / 2;
        this.mesh_ground.position.y = -100;
        this.mesh_ground.receiveShadow = true;
        this.scene.add( this.mesh_ground );

        this.grid = new THREE.GridHelper( 2000, 40, 0x000000, 0x000000 );
        this.grid.material.opacity = 0.2;
        this.grid.material.transparent = true;
        this.scene.add( this.grid );

        //         初始化相机
        this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(-1.2, 48, -100.5);
        this.camera.lookAt(this.scene.position);


        //         初始化控制器
        this.controls = new OrbitControls(this.camera);
        this.controls.target.set(0, 0, 0);
        this.controls.minDistance = 30;
        this.controls.maxDistance = 400;
        this.controls.maxPolarAngle = Math.PI / 2.3;
        this.controls.update();
        this.controls.enabled = true;


        //         渲染
        this.renderer = new THREE.WebGLRenderer({
          alpha: true,
          sortobjects:false
        });//会在body里面生成一个canvas标签,
        this.renderer.setPixelRatio(window.devicePixelRatio);//为了兼容高清屏幕
        this.renderer.setSize(window.innerWidth, window.innerHeight);
       // const container = document.getElementById('container');
       this.container = container;
       this.container.appendChild(this.renderer.domElement);

       //this.animated =  this.animate();

       this.animate();

       this.loader = new GLTFLoader();

    }

    render() {
            this.renderer.render(this.scene, this.camera);

            var width  = this.container.clientWidth;
            var height = this.container.clientHeight;

            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
    }

    animate()
    {
        this.render();
    }

    async Load_Model_Data(path,action_sucess,action_loding,action_error)
    {
        await this.loader.load(path,
        function (obj) {

           // console.log(this.fov);
           // this.scene.add(obj);

            if(action_sucess !=null)
                action_sucess(obj);
        },
        function (xhr) {
            if(action_loding !=null)
                action_loding(xhr);
           // console.log((xhr.loaded / xhr.total * 100) + "% loaded")
        },
        function (error) {
            if(action_error !=null)
                    action_error(error);
            //console.error(error, "load error!")
        });
    }

}

export default {ThreeJs :new ThreeJs_3D()}
