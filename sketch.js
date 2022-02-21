var music = new Audio("music.mp3")

function setup() {
  canvas = createCanvas(384, 216);
  canvas.center();
  
  video = createCapture(VIDEO);
  video.position(175)
  video.size(384, 216);
  
  poseNet = ml5.poseNet(video, modelLoaded);
}

function modelLoaded() {
  console.log("Model Loaded");
  poseNet.on('pose', gotPoses);
}

function gotPoses(results, error) {
  if (error) {
    console.error(error);
  } else if (results.length != 0) {
    leftWrist = results[0].pose.leftWrist.y;
    rightWrist = results[0].pose.rightWrist.y;
    //console.log(leftWrist + " " + rightWrist);
    leftWristPos = Number(leftWrist.toFixed(2));
    rightWristPos = Number(rightWrist.toFixed(2));;
    console.log(leftWristPos + " " + rightWristPos);
    document.getElementById("vol").innerHTML = "<b> Left Wrist Position: </b>" + leftWristPos +  "%";
    document.getElementById("speed").innerHTML = "<b>Right Wrist Position: </b>" + rightWristPos +  "%";
    
    speed = leftWristPos/200;
    vol = rightWristPos/300;
    
    music.playbackRate = (speed.toFixed(2));
    music.volume = vol.toFixed(2);
    
    console.log(speed);
    console.log(vol);
    
    music_playing = "";
    
    if (music_playing != "set") {
      music_playing = "set";
      music.play();
    }
  }
}

function draw() {
  background(220);
}

function test_play(confirm) {
  if (confirm == true) {
    music.play();
  }
}

function stop(confirm_stop) {
  if (confirm_stop == true) {
    music.pause();
  }
}