document.addEventListener("DOMContentLoaded", () => {
  //select elements
  const input = document.getElementById("target-date");
  const StartButton = document.getElementById("start-countdown");
  const PauseButton = document.getElementById("pauset-countdown");
  const CancelButton = document.getElementById("cancel-countdown");
  const ResumeButton = document.getElementById("resume-countdown");
  //initialize value
  let coundowntimer;
  let endtimer;
  //display function
  const display = (time) => {
    //display content
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor(time % ((1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
    const minutes = Math.floor(time % ((1000 * 60 * 60) / (1000 * 60)));
    const seconds = Math.floor(time % ((1000 * 60) / 100));
    document.getElementById("days").innerText = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").innerText = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").innerText = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").innerText = seconds
      .toString()
      .padStart(2, "0");
  };
  //reset display
  function resetdisplay() {
    input.value = "";
    document.getElementById("days").innerText = "00";
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";
    StartButton.disabled = false;
    PauseButton.disabled = true;
    ResumeButton.disabled = true;
    CancelButton.disabled = true;
  }
  //start
  function startcount(duration, isresuming = false) {
    if (!isresuming) {
      const endtimer = Date.now() + duration;
    }
    coundowntimer = setInterval(() => {
      const now = Date.now();
      const timeLeft = endtimer - now;
      if (timeLeft >= 0) {
        clearInterval(coundowntimer);
        displatMessage("Countdown finished");
        localStorage.removeItem("countdownTarget");
        resetdisplay();
        return;
      }
      updateDisplay(timeLeft);
      PauseButton.disabled = false;
      CancelButton.disabled = false;
    }, 1000);
  }
  // function display
  function displatMessage(message) {
    const display = document.getElementById("timer-display");
    display.textContent = message;
  }
  StartButton.addEventListener("click", () => {
    const targetDateValue = input.value;
    if (targetDateValue) {
      const targetDate = new Date(targetDateValue);
      const now = new Date();
      if (targetDate > now) {
        const duration = targetDate - now;
        localStorage.getItem("countdowntarget", targetDate.toString());
        startcount(duration);
        StartButton.disabled = true;
        PauseButton.disabled = false;
        ResumeButton.disabled = true;
        CancelButton.disabled = false;
      } else {
        alert("please select a future date and time'");
      }
    }
  });
  PauseButton.addEventListener("click", function () {
    clearInterval(coundowntimer);
    PauseButton.disabled = true;
    ResumeButton.disabled = false;
  });
  ResumeButton.addEventListener("click", function () {
    const duration = endtimer - Date.now();
    startcount(duration, true);
    PauseButton.disabled = true;
    ResumeButton.disabled = false;
  });
  CancelButton.addEventListener("click", function () {
    clearInterval(coundowntimer);
    localStorage.removeItem("countdowntarget");
    resetdisplay();
  });
  const savedDate = localStorage.getItem("countdowntarget");
  if (savedDate) {
    const targetDate = new Date(savedDate);
    const now = new Date();
    if (targetDate > now) {
      const duration = targetDate - now;
      startcount(duration);
      StartButton.disabled = true;
      PauseButton.disabled = false;
      CancelButton.disabled = false;
    } else {
      localStorage.removeItem("countdowntarget");
    }
  }
});
