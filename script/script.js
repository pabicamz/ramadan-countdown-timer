const dayEl = document.querySelector('.days');
const hourEl = document.querySelector('.hours');
const minuteEl = document.querySelector('.minutes');
const secondEl = document.querySelector('.seconds');
const head = document.querySelector('.section-header');
const liveTimeEl = document.querySelector('.live-time')
console.log(liveTimeEl);

function format(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

let interval;

function countDown(launchingTime) {
  const now = new Date().getTime();
  const t = launchingTime - now;
  // t: the total remaining time in ms
  // the goal is to split it into: Days, Hours, Mins and Secs

  // if it's launchingTime change the header innerHTML to 'Ramadan Mubarak!'
  // and format the day, hour, min and sec element to 00
  if (t < 0) {
    clearInterval(interval);
    head.innerHTML = 'Ramadan Mubarak!';
    [dayEl, hourEl, minuteEl, secondEl].forEach((el) => (el.innerHTML = '00'));
    return;
  }

  // convert it into milliseconds
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;

  dayEl.innerHTML = format(Math.floor(t / oneDay));
  // divide total milliseconds by milliseconds-in-a-day

  hourEl.innerHTML = format(Math.floor((t % oneDay) / oneHour));
  // (t % oneDay) strips away the Days, leaving only the leftover ms after full-days are removed
  // then divide that remainder by oneHour to get whole hours

  minuteEl.innerHTML = format(Math.floor((t % oneHour) / oneMin));
  // (t % oneHour) strips away the Hours(and Days), leaving only the leftover ms after full-hrs are removed
  // then divide it by oneMin to get whole minutes

  secondEl.innerHTML = format(Math.floor((t % oneMin) / 1000));
  // (t % oneMinute) strips away minutes, leaving only the leftover ms after full minutes
  // divide by 1000 to convert ms(millisecond) to second

}

async function init() {
  const launchingTime = new Date('2027-02-17T00:00:00').getTime();

  head.innerHTML = 'Ramadan Countdown';

  countDown(launchingTime);
  interval = setInterval(() => countDown(launchingTime), 1000);
}

init();

// live date & time
function updateLiveTime() {
  const now = new Date();
  const hour = now.getHours();

  const amPm = hour >= 12 ? 'PM' : 'AM'

  const datePart = now.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  const timePart = now.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    // hour12: true
  })

  liveTimeEl.textContent = `${datePart} - ${timePart} ${amPm}`
}

updateLiveTime()
setInterval(updateLiveTime, 1000)