
let timestamp_start = new Date("2019-01-01").getTime();
let timestamp_now = new Date().getTime();
let secondsLeft = (timestamp_now - timestamp_start) / 1000;
let root = document.documentElement;
root.style.setProperty('--seconds-left', `${secondsLeft}s`);