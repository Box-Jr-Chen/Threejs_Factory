import * as THREE from "three";
import { error } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
const OrbitControls = require('three-orbit-controls')(THREE);
import shader_glow from '@js/threejs/glow_shader.js';
import shader_phong from "@js/threejs/Phong.js";
import equipment_action from "@js/threejs/equipment_action.js";

class ThreeJs_3D {
    constructor(){
        this.fov = 60;
        this.texturelight = 4.5;
        this.container = null; //web id container
        this.scene = null;
        this.camera =  null;
        this.controls =  null;
        this.renderPass = null;
        this.bloomPass = null;
        this.outlinePass = null;
        this.bloomComposer =null;
        this.bloomLayer =null;
        this.composer = null;
        this.light = null;
        this.hemiLight =null;
        this.renderer = null;
        this.raycaster = null;
        this.geometry = null;
        this.loader = null;
        this.mesh_ground = null;
        this.grid_ground = null;
        this.click = false;
        this.enter = false;

        this.vertexShadertext_glow ="varying vec2 vUv;"+
        "void main() {"+
            "vUv = uv;"+
            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );"+
        "}";
        this.fragmentshadertext_glow =
        "uniform sampler2D baseTexture; " +
        "uniform sampler2D bloomTexture; " +
        "varying vec2 vUv;"+
        "void main() {" +
            "gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );"+
        "}";
        this.darkMaterial = new THREE.MeshBasicMaterial( { color: "black" } );
        this.ENTIRE_SCENE = 0;
        this.BLOOM_SCENE = 1;
        this.bloomLayer = new THREE.Layers();
        this.materials = {};

        this.equipment_action = equipment_action.Equipment_Action;
    }

    init(container) //id = container
    {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( "rgb(60, 60, 60)");
        //this.scene.fog = new THREE.Fog( "rgb(225, 225, 225)", 200, 1000 );
        this.scene.add(new THREE.AmbientLight(0x404040));


        // this.hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444,0.4 );
        // this.hemiLight.position.set( 20, 20, -80 );

        // this.scene.add( this.hemiLight );

        // const helper = new THREE.HemisphereLightHelper( this.hemiLight, 5 );
        // this.scene.add( helper );

        // this.light = new THREE.DirectionalLight( 0xffffff,0.4 );
        // this.light.position.set( 0, 20, 0 );
        // this.scene.add( this.light );




        // ground
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
        this.controls.minDistance = 280;
        this.controls.maxDistance = 400;
        this.controls.maxPolarAngle = Math.PI / 2.05;
        this.controls.update();
        this.controls.enablePan = false;
        // this.controls.addEventListener('mousedown',(evt )=>{
        //     console.log('click');
        // } ,false);
        this.controls.enabled = true;


        //renderPass
         this.renderPass = new RenderPass(this.scene, this.camera);
        //bloomPass
        this.bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
        this.bloomPass.threshold = 0.25;
        this.bloomPass.strength = 0.7;
        this.bloomPass.radius = 0.3;
        this.bloomPass.renderToScreen = true;

        //outlinePass
        this.outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), this.scene, this.camera );
        this.outlinePass.edgeStrength = 3;
        this.outlinePass.edgeGlow = 0.5;
        this.outlinePass.edgeThickness = 2;
        this.outlinePass.pulsePeriod = 2;
        //TODO
        this.outlinePass.visibleEdgeColor.set( '#ffffff' );
        this.outlinePass.hiddenEdgeColor.set( '#190a05' );
        //         渲染
        this.renderer = new THREE.WebGLRenderer({
          alpha: true,
          sortobjects:false
        });//会在body里面生成一个canvas标签,
        this.renderer.setPixelRatio(window.devicePixelRatio);//为了兼容高清屏幕
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.gammaInput = true
        this.renderer.gammaOutput = true
        this.renderer.toneMappingExposure = Math.pow( 0.9, 4.0 )


        this.renderer.domElement.addEventListener('mousedown', (e)=>{
           this.click = true;
         });
        this.renderer.domElement.addEventListener('mouseup', ()=>{
            this.click = false;

            if(this.enter ==true)
            {
                this.Controls_Camera_Disabled();
            }
            else
            {
                this.Controls_Camera_Abled();
            }
         });



        //composer
        this.bloomComposer = new EffectComposer( this.renderer )
        this.bloomComposer.setSize( window.innerWidth, window.innerHeight )
        this.bloomComposer.renderToScreen = false;
        this.bloomComposer.addPass( this.renderPass )
        this.bloomComposer.addPass( this.bloomPass )


        const finalPass = new ShaderPass(
            new THREE.ShaderMaterial( {
                uniforms: {
                    baseTexture: { value: null },
                    bloomTexture: { value: this.bloomComposer.renderTarget2.texture }
                },
                vertexShader: this.vertexShadertext_glow,
                fragmentShader: this.fragmentshadertext_glow,
                defines: {}
            } ), "baseTexture"
        );
        finalPass.needsSwap = true;

        this.composer = new EffectComposer( this.renderer )
        this.composer.setSize( window.innerWidth, window.innerHeight )
        this.composer.addPass( this.renderPass );
        this.composer.addPass( finalPass );
        this.composer.addPass( this.outlinePass );


        this.bloomLayer = new THREE.Layers();
        this.bloomLayer.set( this.BLOOM_SCENE );

       this.container = container;
       this.container.appendChild(this.renderer.domElement);


       this.animate();

       this.loader = new GLTFLoader();

    }

    render() {
            this.renderBloom( true );
            this.composer.render();

           // this.renderer.render(this.scene, this.camera);

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
    renderBloom( mask ) {

        if ( mask === true ) {

            this.scene.traverse( (obj)=>{
                var self =this;
               if ( obj.isMesh && self.bloomLayer.test( obj.layers ) === false ) {

                    self.materials[ obj.uuid ] = obj.material;
                   obj.material = self.darkMaterial;

               }
            } );
            this.bloomComposer.render();
            this.scene.traverse( (obj)=>{
                    if ( this.materials[ obj.uuid ] ) {

                        obj.material = this.materials[ obj.uuid ];
                        delete this.materials[ obj.uuid ];

                    }
            } );

        } else {

            this.camera.layers.set( this.BLOOM_SCENE );
            this.bloomComposer.render();
            this.camera.layers.set( this.ENTIRE_SCENE );

        }

    }


    restoreMaterial( obj ) {

        // if ( this.materials[ obj.uuid ] ) {

        //     obj.material = this.materials[ obj.uuid ];
        //     delete this.materials[ obj.uuid ];

        // }

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

    Controls_Camera_Disabled(){
         this.controls.enabled = false;
     }

     Controls_Camera_Abled(){
        this.controls.enabled = true;
     }
     control_start()
     {
         console.log("start!!!");
     }
}

export default {ThreeJs :new ThreeJs_3D()}
