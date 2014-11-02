var Pyramid = (function(){

    function Pyramid(){
        THREE.Object3D.call(this);

        var geometry = new THREE.CylinderGeometry( 0, 35, 40, 4, 1 );

        var material = new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: false} );
        
        this.mesh = new THREE.Mesh(geometry, material);
       
        this.add(this.mesh);

        this.particles = [];
        this.nbParticles = 100;
        var miniPyramid;

        this.tlExplode = new TimelineMax({onComplete: this.explodeCompleted, onCompleteScope: this});
        for ( var i = 0; i < this.nbParticles; i++ ) {

            miniPyramid = new MiniPyramid();
            miniPyramid.position.set(0, 0,0);
            
            miniPyramid.rotation.y = Math.PI*0.25;
            miniPyramid.mesh.visible = false;

            this.add(miniPyramid);
            this.particles.push(miniPyramid);

            this.tlExplode.to(miniPyramid.position, 2, {
                x: Math.random() * 4000 - 2000, 
                y: Math.random() * 1000 - 500, 
                z: Math.random() * 4000 - 2000,
            }, i * 0.001);
        }     
        this.tlExplode.pause(0);
        
    }

            


    Pyramid.prototype = new THREE.Object3D;
    Pyramid.prototype.constructor = Pyramid;


    Pyramid.prototype.explodeCompleted = function() {
        for ( var i = 0; i < this.nbParticles; i++ ) {
            this.particles[i].mesh.visible = false;
        }
    };

        
    Pyramid.prototype.explode= function(){
       
        this.mesh.visible = false;
        for ( var i = 0; i < this.nbParticles; i++ ) {
            this.particles[i].mesh.visible = true;
        }
        this.tlExplode.play(0);
              
    }

       Pyramid.prototype.rebootPyamid= function(){

        this.mesh.visible = true;


    }


    Pyramid.prototype.update = function() {
      
    };

    return Pyramid;
})();