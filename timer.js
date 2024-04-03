//@ts-nocheck
let startTime;
let stopwatchInterval;

const startStopwatch = () => {
  if (!stopwatchInterval) {
    startTime = new Date().getTime();
    stopwatchInterval = setInterval(updateStopwatch, 1000);
  }
};
const updateStopwatch = () => {
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - startTime;
  const seconds = Math.floor(elapsedTime / 1000) % 60;
  const minutes = Math.floor(elapsedTime / 1000 / 60) % 60;
  const hours = Math.floor(elapsedTime / 1000 / 60 / 60);
  const displayTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
  document.getElementById("stopwatch").innerHTML = displayTime;
};

const pad = (number) => {
  return (number < 10 ? "0" : "") + number;
};

export { startStopwatch };
