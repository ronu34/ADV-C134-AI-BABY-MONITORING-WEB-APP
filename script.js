img = "";
statu = "";
object = [];

function preload() {
    song = loadSound("alarm.mp3");
}

function setup() {
    canvas = createCanvas(380,380);
    canvas.center();


    
    video = createCapture(VIDEO);
    
    video.size(380,380);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Staus : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded");
    statu = true;
    objectDetector.detect(video,Results);
}

function Results(error, results) {
    if (error) {
        console.error(error);
    }
    else{
        console.log(results);
        object = results;
    }

}

function draw() {
    image(video, 0, 0, 380, 380);
    if (statu != "") {
        r = random(255);
        g = random(255);
        b = random(255);
              
        
        for (i=0; i < object.length; i++) {
            if(object[i].label == "person") {
                document.getElementById("status").innerHTML = "Status : Baby Found";
                document.getElementById("numbr_of_object").innerHTML = "Number of objects detected are : " + object.length;
                fill(r,g,b);
                percent = floor(object[i].confidence * 100);
                text(object[i].label + " " + percent + "% " , object[i].x, object[i].y);
                noFill();
                stroke(r,g,b);
                rect(object[i].x + 15 , object[i].y + 15 , object[i].width , object[i].height);
            }
            else{
                document.getElementById("status").innerHTML = "Status : Baby not found Found";
                song.play();
            }
            
        }
    }
}