// ------------------------------------------ VARIABLES --------------------------------------- //

// html element vars
var radios = document.getElementsByName("val");
(clock = document.querySelector("#time")),
  (display = document.querySelector("#time"));
(start = document.querySelector("#start")),
  (pause = document.querySelector("#pause")),
  (reset = document.querySelector("#reset"));

// vars that stores the set interval position
var time = 0,
  pausedTime;

// switches to control UX properties of the clock
var isPaused = false,
  isChecked = false,
  isCounting = false;

window.onload = function() {
  checkedSwitch();
  pause.disabled = true;
};

// ------------------------------------------ HTML ON CLICK FUNCTIONS --------------------------------------- //

// start button's on click function
// converts minutes into seconds & calls startTimer function
function startClock() {
  if (isPaused) {
    isPaused = false;
    isCounting = true;
    counting();
    startTimer(pausedTime, display);
  } else {
    time = getInterval();
    var countDownTime = 60 * time;
    isPaused = false;
    isCounting = true;
    counting();
    startTimer(countDownTime, display);
  }
}


// reset to default values
function resetClock() {
  display.textContent = "00:00";
  isPaused = false;
  isCounting = false;
  counting();
  radios.forEach(function(el) {
    el.checked = false;
  });
  isChecked = false;
  checkedSwitch();
}

// function flips the bool switch & modifies the way startClock behaves
function pauseClock() {
  isPaused = true;
  if (isPaused == true) {
    pause.disabled = true;
    start.disabled = false;
    reset.disabled = false;
  }
}

// ------------------------------------------ UX FUNCTIONS --------------------------------------- //
// these functions are called in conjunction with the HTML on click functions in order to
// enable / disable certain elements based on what the clock is doing. This prevents the user
// from breaking the clock or getting any weird outcomes during use.

// disable clock control buttons if no time interval has been chosen
function checkedSwitch() {
  if (isChecked == false) {
    start.disabled = true;
    pause.disabled = true;
    reset.disabled = true;
  } else {
    start.disabled = false;
  }
}

// disable time interval buttons while the clock is running
function counting() {
  if (isCounting == true) {
    // disable radio buttons
    radios.forEach(function(el) {
      el.disabled = true;
    });
    // disable start and enable pause
    start.disabled = true;
    pause.disabled = false;
    reset.disabled = true;
  } else {
    radios.forEach(function(el) {
      el.disabled = false;
    });
    pause.disabled = true;
  }
}



// ------------------------------------------ CLOCK LOGIC --------------------------------------- //

// on click function's for radio buttons
// if the radio button was changed,
// if it is selected, set a variable to hold that button's value
// set the clock to match that value and return that value
function getInterval() {
  radios.forEach(function(el) {
    if (el.checked == true) {
      isChecked = true;
      checkedSwitch();
    }
  });

  var val = 0;
  for (var i = 0, length = radios.length; i < length; i++) {
    radios[i];
    if (radios[i].checked) {
      val = radios[i].value;
      clock.textContent = val + ":00";
      return parseInt(val);
    }
  }
}

// start timer function, takes time to count down from & element to change
// set interval will occur every 1000ms or 1 second.
// the passed in time value from getInterval will go down each tic
// the function formats the time in a readable way and updates the html element each tic

function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  var x = setInterval(function() {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = minutes + ":" + seconds;
    if (isPaused) {
      pausedTime = timer;
      clearInterval(x);
    }
    if (--timer < 0) {
      clearInterval(x);
      // call ajax here to modify iterations completed
    }
  }, 1000);
}

