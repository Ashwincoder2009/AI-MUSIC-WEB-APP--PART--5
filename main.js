song_1="";
song_2="";
score_leftWrist=0;
score_rightWrist=0;
status1="";
status2="";
status_rightWrist="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
function preload(){
song_1=loadSound("music.mp3");
song_2=loadSound("music2.mp3");
}

function setup(){
canvas=createCanvas(600,400);
canvas.center();

video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotposes);
}

function draw(){
image(video,0,0,600,400);
fill("#FF0000");
stroke("#FF0000");
status2=song_2.isPlaying();
status_rightWrist=status2;
if(score_rightWrist>0.2){
circle(rightWristX,rightWristY,20);
song_1.stop();
if(status_rightWrist==false){
song_2.play();
document.getElementById("song_name").innerHTML="playing peter pan song"
}
}
if(score_leftWrist>0.2){
circle(leftWristX,leftWristY,20);
song_2.stop();
if(status1==false){
song_1.play();
document.getElementById("song_name").innerHTML="playing harrypotter song"
}
}
}
status1=song_1.isPlaying();
status2=song_2.isPlaying();

function modelLoaded(){
console.log('Posenet is initialized');
}

function gotposes(results){
if(results.length>0){
console.log(results);
leftWristX=results[0].pose.leftWrist.x;
leftWristY=results[0].pose.leftWrist.y;
rightWristX=results[0].pose.rightWrist.x;
rightWristY=results[0].pose.rightWrist.y;
score_leftWrist=results[0].pose.keypoints[9].score;
score_rightWrist=results[0].pose.keypoints[10].score;
}
}