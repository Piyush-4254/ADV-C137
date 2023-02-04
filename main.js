video = "";
objects = [];
status = "";

function preload()
{
    video = createVideo('video2.mp4');
    video.hide();
}

function setup()
{
    canvas = createCanvas(480,380);
    canvas.center();
}

function draw()
{
    image(video,0,0,480,380);
    if(status != "")
    {
        objectDetector.detect(video,gotResults);
        for(i = 0; i<objects.length;i++)
        {
            document.getElementById("status").innerHTML = "Status : Object detected";
            document.getElementById("no_of_object").innerHTML = "No.of objects dected are : " + objects.length;

            fill("blue");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("blue");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);    
        }
    }
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML = "Status :  Detecting objects";
}

function modelloaded()
{
    console.log('model is loaded');
    status = true;
    video.loop();
    video.volume(1);
    video.speed(1);
}

function gotResults(error,results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}