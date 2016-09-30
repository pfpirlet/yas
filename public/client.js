// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  var strictMode = 0, 
      running = 0, 
      cpuSequence = [],
      playerSequence = [],
      audio = [],
      restart = 0,
      won = 0,
      ctx,
      buf1, buf2, buf3, buf4, buf5, buf6;
  
  $('#mode').css('cursor', 'pointer'); //pointer cursor
  $('#start').css('cursor', 'pointer');
  $('#counter').css('cursor', 'pointer');
  $('table').css('cursor', 'pointer');
  
  $("#mode").on("click", function(){ //mode button action
    if (running === 0 && strictMode === 0){
      strictMode = 1;
      $("#mode").removeClass('mode_off').addClass('mode_on');
      $("#mode").text("Strict mode on");
    } else if (running === 0 && strictMode === 1){
      strictMode = 0;
      $("#mode").removeClass('mode_on').addClass('mode_off');
      $("#mode").text("Strict mode off");
    }
  });
  
  $("#start").on("click", function(){ //start button action
    if (running === 0){
      $("td").removeClass("td_off");
      $("td").addClass("td");
      running = 1;
      $("#start").text("Stop");
      if (restart === 0){
        playerTurn();
        restart = 1;
      } else if (running === 1 && won === 1){
        won = 0;
        setTimeout(function(){
          cpuPlay(1);
        }, 1500);
      } else {
        cpuPlay(1);
      }
    } else if (running === 1){
      running = 0;
      $("td").addClass("td_off");
      $("td").removeClass("td");
      cpuSequence = []; 
      playerSequence = [];
      setSerie(0);
      $("#start").text("Start");
    } 
  });
  
  //init the sound system 
  function init() { 
    console.log("in init"); 
    try { 
        ctx = new AudioContext(); //is there a better API for this? 
        loadFiles(); 
    } catch(e) { 
        alert('you need webaudio support'); 
    } 
  } 
  window.onload = init; 
  
  function loadFiles() { 
    var req1 = new XMLHttpRequest(),
        req2 = new XMLHttpRequest(),
        req3 = new XMLHttpRequest(),
        req4 = new XMLHttpRequest(),
        req5 = new XMLHttpRequest(),
        req6 = new XMLHttpRequest();
    req1.open("GET","https://cdn.hyperdev.com/us-east-1%3A94933da8-c24d-4aa4-b09b-a34b3f6a354c%2FsimonSound1.mp3",true);
    req2.open("GET","https://cdn.hyperdev.com/us-east-1%3A94933da8-c24d-4aa4-b09b-a34b3f6a354c%2FsimonSound2.mp3",true);
    req3.open("GET","https://cdn.hyperdev.com/us-east-1%3A94933da8-c24d-4aa4-b09b-a34b3f6a354c%2FsimonSound3.mp3",true);
    req4.open("GET","https://cdn.hyperdev.com/us-east-1%3A94933da8-c24d-4aa4-b09b-a34b3f6a354c%2FsimonSound4.mp3",true);
    req5.open("GET","https://cdn.hyperdev.com/us-east-1%3A94933da8-c24d-4aa4-b09b-a34b3f6a354c%2Fhouston_problem.mp3.mp3",true);
    req6.open("GET","https://cdn.hyperdev.com/us-east-1%3A94933da8-c24d-4aa4-b09b-a34b3f6a354c%2FTa%20Da-SoundBible.com-1884170640.mp3",true);
    req1.responseType = "arraybuffer";
    req2.responseType = "arraybuffer";
    req3.responseType = "arraybuffer";
    req4.responseType = "arraybuffer";
    req5.responseType = "arraybuffer";
    req6.responseType = "arraybuffer";
    req1.onload = function() { 
        //decode the loaded data 
        ctx.decodeAudioData(req1.response, function(buffer) { 
            buf1 = buffer; 
        }); 
    }; 
    req2.onload = function() { 
        //decode the loaded data 
        ctx.decodeAudioData(req2.response, function(buffer) { 
            buf2 = buffer; 
        }); 
    };
    req3.onload = function() { 
        //decode the loaded data 
        ctx.decodeAudioData(req3.response, function(buffer) { 
            buf3 = buffer; 
        }); 
    };
    req4.onload = function() { 
        //decode the loaded data 
        ctx.decodeAudioData(req4.response, function(buffer) { 
            buf4 = buffer; 
        }); 
    };
    req5.onload = function() { 
        //decode the loaded data 
        ctx.decodeAudioData(req5.response, function(buffer) { 
            buf5 = buffer; 
        }); 
    };
    req6.onload = function() { 
        //decode the loaded data 
        ctx.decodeAudioData(req6.response, function(buffer) { 
            buf6 = buffer; 
        }); 
    };
    req1.send();
    req2.send();
    req3.send();
    req4.send();
    req5.send();
    req6.send();
  } 
  
  //play the loaded file 
function play(item) { 
    //create a source node from the buffer 
    var src = ctx.createBufferSource();
    if (item == 1) {
      src.buffer = buf1;
    } else if (item == 2) {
      src.buffer = buf2;
    } if (item == 3) {
      src.buffer = buf3;
    } if (item == 4) {
      src.buffer = buf4;
    } if (item == 5) {
      src.buffer = buf5;
    } if (item == 6) {
      src.buffer = buf6;
    }
    //connect to the final output node (the speakers) 
    src.connect(ctx.destination); 
    //play immediately 
    src.start(0); 
} 
  
  function randomTd(){
    return Math.floor((Math.random() * 4) + 1);
  }
  
  function setSerie(value){
    $("#counter").text("Serie of " + value);
  }

  function cpuPlay(flagRandom){
    if (flagRandom === 1) {
      cpuSequence.push(randomTd());
    }
    var waitingTime = 0, tdId;
    cpuSequence.map(function(item){
      console.log("item : " + item);
      setTimeout(function(){
        if (running == 1) {
          $("#td" + item).addClass("td_fake_active");
          play(item);
        }
      }, waitingTime);
      waitingTime = waitingTime + 500;
      setTimeout(function(){
        $("#td" + item).removeClass("td_fake_active");
      }, waitingTime);
      waitingTime = waitingTime + 500;
      console.log("got it");
    });
    setSerie(cpuSequence.length);
    playerSequence = [];
    return false;
  }

  function playerTurn(){
    cpuPlay(1);
      $("td").on("click", function () {
        if (running === 1){
          var location = $(this).attr("tag");
            play(location);
            playerSequence.push(location);
            console.log("cpuSequence: " + cpuSequence);
            console.log("playerSequence: " + playerSequence);
        
            if (playerSequence[playerSequence.length - 1] != cpuSequence[playerSequence.length - 1]){
              badSequence();
            } else if ((playerSequence[playerSequence.length - 1] == cpuSequence[cpuSequence.length - 1]) && (playerSequence.length == cpuSequence.length) && (playerSequence.length == 20)){
              console.log("invoke victory");
              victory();
            } else if ((playerSequence[playerSequence.length - 1] == cpuSequence[cpuSequence.length - 1]) && (playerSequence.length == cpuSequence.length)){
              console.log("invoke cpuPlay");
              setTimeout(function(){
                cpuPlay(1);
              }, 1000);
            } 
        }
      });
  }
  
  function badSequence(){
    console.log("bad sequence !"); //continue here
    if (strictMode === 0){
      running = 0;
      setTimeout(function(){
        play(5);
      }, 500);
      setTimeout(function(){
        cpuPlay(0);
        running = 1;
      }, 3000);
    } else if (strictMode === 1) {
      setTimeout(function(){
        play(5);
      }, 500);
      setTimeout(function(){
      $("#start").click();
      }, 3000);
    }
  }
  
  function victory(){
    won = 1;
    setTimeout(function(){
      play(6);
      var waitingTime = 0;
      [1,2,4,3,1,2,4,3].map(function(item){
        setTimeout(function(){
          if (running === 0){
            $("#td" + item).addClass("td_fake_active");
          }
        }, waitingTime);
        waitingTime = waitingTime + 1500;
        setTimeout(function(){
          $("#td" + item).removeClass("td_fake_active");
        }, waitingTime);
        waitingTime = waitingTime - 500;
        console.log("got it");
      });
    }, 500);
    $("#start").click();
  }
  
});