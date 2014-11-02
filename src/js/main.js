var webgl, gui;

  var videoInput = document.getElementById('inputVideo');
  var canvasInput = document.getElementById('inputCanvas');



var ht = new headtrackr.Tracker({ui : true, headPosition : true})
  ht.init(videoInput, canvasInput);
  ht.start();






 

$(document).ready(init);



// setInterval(function(){
//   ht.stop();
//   ht.start();
// }, 2000);




// function handleFaceTrackingEvent(e){

//   console.log("facetrack:: "+(event.x-150));
// }

// document.addEventListener('facetrackingEvent', handleFaceTrackingEvent);


 


function init(){
    webgl = new Webgl(window.innerWidth, window.innerHeight);
    

    // gui = new dat.GUI();
    // // gui.add(webgl.pyramid2.rotation, 'x').step(0.01).min(-Math.PI).max(Math.PI);
    // // gui.add(webgl.pyramid2.rotation, 'y').step(0.01).min(-Math.PI).max(Math.PI);
    // // gui.add(webgl.pyramid2.rotation, 'z').step(0.01).min(-Math.PI).max(Math.PI);
    // gui.close();

    $(window).on('resize', resizeHandler);

    animate();
    $(document).on('facetrackingEvent',  webgl.onHeadMove.bind(webgl));

    $('#activateButton').click(function(){

        if( $('#activateButton').text() == "I think the webcam is broken"){
          ht.stop();
          ht.start();
        }else{
          $(document).on('mousemove',  webgl.onMouseMove.bind(webgl));
          $(this).hide();
        }

    });



  document.addEventListener('headtrackrStatus', 
  function (event) {


    if (event.status == "camera found") {
      $('#activateButton').text("I think the webcam is broken")

       $('#activateButton').css ( "left" , "60%");

       $('#hideShowCam').fadeIn("fast");
       $('#hideShowCam').addClass("animButtonShow");
       

       $('#hideShowCam').click( function(){
         if ($('#hideShowCam').text() =="Please, hide my face!"){
            $('#hideShowCam').text("Please, show my face!");
            $("#inputCanvas").fadeOut("fast");
          }else{
            $('#hideShowCam').text("Please, hide my face!");
            $("#inputCanvas").fadeIn("fast");
          }
       });
    }
     
    if (event.status == "redetecting") {
      webgl.flag = true;
    }
   
  }
);


}



function resizeHandler() {
    webgl.resize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    // webgl.setTracking()
    webgl.render();
}