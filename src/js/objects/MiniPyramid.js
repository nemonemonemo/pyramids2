var MiniPyramid = (function(){

    function MiniPyramid(){
        THREE.Object3D.call(this);

        var geometry = new THREE.CylinderGeometry( 0, 3, 3, 4, 1 );


        for ( var i = 0; i < geometry.faces.length; i ++ ) {
            geometry.faces[ i ].color.setHex( Math.random() * 0xffffff );      

        }


        var material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors , wireframe: false, side:THREE.DoubleSide} );
        //var material = new THREE.MeshBasicMaterial({color: 0x3facc8, wireframe: true});
        this.mesh = new THREE.Mesh(geometry, material);
        //THREE.ExplodeModifier.modify( geometry )
        this.add(this.mesh);


        
    }

    MiniPyramid.prototype = new THREE.Object3D;
    MiniPyramid.prototype.constructor = MiniPyramid;

    MiniPyramid.prototype.update = function() {
       // this.mesh.rotation.y += 0.01;
    };

    return MiniPyramid;
})();