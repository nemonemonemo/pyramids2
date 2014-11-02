var Webgl = (function(){

    function Webgl(width, height){
        // Basic three.js setup
        this.scene = new THREE.Scene();
        
        this.camera = new THREE.PerspectiveCamera(20, width / height, 1, 10000);
        //this.camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 100, 1000 );
        this.distance = 500; 
        this.camera.position.z = this.distance;

        this.camera.lookAt(new THREE.Vector3(0,0,0));

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0xb5cbd3);
        $('.three').append(this.renderer.domElement);


        // this.controls = new THREE.TrackballControls( this.camera );

        // this.controls.rotateSpeed = 1.0;
        // this.controls.zoomSpeed = 1.2;
        // this.controls.panSpeed = 0.8;

        // this.controls.noZoom = false;
        // this.controls.noPan = false;

        // this.controls.staticMoving = true;
        // this.controls.dynamicDampingFactor = 0.3;

        // this.controls.keys = [ 65, 83, 68 ];

        
        this.pyramid = new Pyramid();
        this.pyramid.position.set(0, 0, 0);
        this.pyramid.rotation.x = Math.PI;
        this.pyramid.rotation.y = Math.PI*0.25;
        this.scene.add(this.pyramid);

        

        this.pyramid2 = new Pyramid();
        this.pyramid2.position.set(-40, 0, 0);
        this.pyramid2.rotation.y = Math.PI*0.25;
        this.scene.add(this.pyramid2);



        this.pyramid3 = new Pyramid();
        this.pyramid3.position.set(40, 0, 0);
        this.pyramid3.rotation.y = Math.PI*0.25;
        this.scene.add(this.pyramid3);

        this.flag= true;
       

        this.light = new THREE.PointLight( 0xffffff, 1, 1000 );
        this.light.position.set( 0, 200, 0 );
        this.scene.add( this.light );

        this.light2 = new THREE.PointLight( 0xffffff, 1, 1000 );
        this.light2.position.set( 0, -200, 0 );
        this.scene.add( this.light2 );


        


        this.composer = new THREE.EffectComposer( this.renderer );
        this.composer.addPass( new THREE.RenderPass( this.scene, this.camera ) );


        this.hblur = new THREE.ShaderPass( THREE.HorizontalBlurShader );
        this.hblur.uniforms.h.value = 1/6000;
        this.composer.addPass( this.hblur );


        this.vignette = new THREE.ShaderPass( THREE.VignetteShader );
        this.vignette.uniforms.darkness.value = 0.8;
        this.vignette.renderToScreen = true;
        this.composer.addPass( this.vignette );


        this.oldPosX = this.camera.position.x;

        this.smoothCam = this.camera.position.x;

        this.valueIntroPyramid = (3*Math.PI)+Math.PI*0.25;

        this.animPyramid(this.pyramid, 0.5, -this.valueIntroPyramid);

        this.animPyramid(this.pyramid2, 0.3, this.valueIntroPyramid);

        this.animPyramid(this.pyramid3, 0.8, this.valueIntroPyramid);
        

        
   
    }



   Webgl.prototype.onMouseMove= function(event){
    mouseX = (event.clientX - window.innerWidth/2) / window.innerWidth/2;
    mouseY = (event.clientY - window.innerHeight/2) / window.innerHeight/2;
    this.camera.position.x = Math.sin(mouseX * Math.PI) * this.distance;
    this.camera.position.y = - Math.sin(mouseY * Math.PI) * this.distance;
    this.camera.lookAt(new THREE.Vector3(0,0,0));


    console.log(mouseY);

     if (this.flag== true && mouseX < -0.24 ){
        console.log("left");
        this.flag = false;
        this.pyramid.explode();
        this.pyramid2.explode();
        this.pyramid3.explode();



    }

    if (this.flag== true && mouseX >0.24  ){
        console.log("left");
        this.flag = false;
        this.pyramid.explode();
        this.pyramid2.explode();
        this.pyramid3.explode();



    }



    if (this.flag== true && mouseY < -0.24  ){
        console.log("left");
        this.flag = false;
        this.pyramid.explode();
        this.pyramid2.explode();
        this.pyramid3.explode();
       
        
        
    }



    if (this.flag== true && mouseY >0.24  ){
        console.log("left");
        this.flag = false;
        this.pyramid.explode();
        this.pyramid2.explode();
        this.pyramid3.explode();
    }



    if((mouseX > -0.24 && mouseX <0.24 && mouseY > -0.24 && mouseY < 0.24)){
    this.flag = true;
    console.log("eventX ::"+event.x)
    this.pyramid.rebootPyamid();
    this.pyramid2.rebootPyamid();
    this.pyramid3.rebootPyamid();

    }

   
}



    Webgl.prototype.animPyramid= function(pyramid, delay, animY ) {


        TweenLite.to(pyramid.rotation ,1.2, {
            y : animY,
            delay: delay,
            ease:Power2.easeOut
         
        });
    }





    Webgl.prototype.resize = function(width, height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    };



    Webgl.prototype.onHeadMove= function(e){

       
        eventX = event.x;
        webcamWidth = 320/2;
        ratioX = window.innerWidth / webcamWidth; 
        posHeadX = ratioX*event.x;

        this.destValueX = (event.x-webcamWidth)*ratioX;

        eventY = event.y;
        webcamHeight = 240/2;
        ratioY = window.innerWidth / webcamHeight; 
        posHeadX = ratioY*event.Y;

        this.destValueY = (event.y-webcamHeight)*ratioY;


        
        //console.log("widthEvent ::"+event.x)
         
        //this.smoothCam += (this.destValue - this.smoothCam) * 0.1;
        this.camera.position.x = this.destValueX;
        this.camera.position.y = this.destValueY;

        

        this.camera.lookAt(new THREE.Vector3(0,0,0));
        

         if (this.flag== true && event.x <50 ){
            console.log("left");
            this.flag = false;
            this.pyramid.explode();
            this.pyramid2.explode();
            this.pyramid3.explode();
           
            
            
        }

        if (this.flag== true && event.x >280 ){
            console.log("left");
            this.flag = false;
            this.pyramid.explode();
            this.pyramid2.explode();
            this.pyramid3.explode();
           
            
            
        }


        if (this.flag== true && event.y <50 ){
            console.log("left");
            this.flag = false;
            this.pyramid.explode();
            this.pyramid2.explode();
            this.pyramid3.explode();
           
            
            
        }



        if (this.flag== true && event.y >190 ){
            console.log("left");
            this.flag = false;
            this.pyramid.explode();
            this.pyramid2.explode();
            this.pyramid3.explode();
        }


        if((event.x <280 && event.x>50 && event.y <190 && event.y>50)){
            this.flag = true;
            console.log("eventX ::"+event.x)
            this.pyramid.rebootPyamid();
            this.pyramid2.rebootPyamid();
            this.pyramid3.rebootPyamid();
        
        }

        // if (this.flag== true && this.camera.position.x< -(window.innerWidth/2)){
            
        //     console.log("right");
        //     this.flag = false;

            
        //    this.pyramid.explode();
        //    this.pyramid2.explode();
        //    this.pyramid3.explode();
        
        
            
        // }



            
        

  


    }

    

    Webgl.prototype.render = function() { 

        var audio = new Audio('../../styles/sounds/effect.mp3');
        

        //TWEEN.update();
 
         //oldPosX = this.camera.position.x;
   
        //this.renderer.render(this.scene, this.camera);
        this.composer.render();
        //this.controls.update();


        newPosX = this.camera.position.x;
        dist =this.oldPosX - newPosX;
        this.oldPosX = newPosX;
        this.audioFlag = true;
        if (dist <0){
            dist = -(dist);

            if ( this.audioFlag == true && dist >300){
                this.audioFlag =false;
                audio.play();
            }

        }else{

            if ( this.audioFlag == true && dist >300){
                this.audioFlag =false;
                audio.play();
            }
        }


    };

    return Webgl;

})();