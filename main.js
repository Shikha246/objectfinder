var SpeechRecognition = window.webkitSpeechRecognition;// webspeechAPI
  
var recognition = new SpeechRecognition(); // new create the instance of the webspeechAPI
objects = [];
status = "";

function preload(){
  // video = createVideo('video.mp4');
}


function setup() {
  canvas = createCanvas(480, 300);
  canvas.center();
  video = createCapture(VIDEO);
	video.hide();
  // video.hide();
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  object_name= document.getElementById("object").value;
  console.log(object_name);
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
  // video.loop();
  // video.speed(1);
  // video.volume(0);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}
function speak(){
  var synth = window.speechSynthesis;

  speak_data = object_name +"Object mentioned found";

  var utterThis = new SpeechSynthesisUtterance(speak_data);

  synth.speak(utterThis);

  
}

function draw() {
  image(video, 0, 0, 480, 300);
      if(status != "")
      {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Objects Detected";
          document.getElementById("object_found").innerHTML = "Object Found : "+ object_name;
          speak();
          fill("#FF0000");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke("#FF0000");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
      }
      else{
        
          document.getElementById("object_found").innerHTML = "Object mentioned not Found  ";
        
      }
}
