const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateElement = document.getElementById('date-picker');

const countdownElement = document.getElementById('countdown');
const countdownElementTitle = document.getElementById('countdown-title');
const countdownElementBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeElement = document.getElementById('complete');
const completeElementInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// set today as min date
const today = new Date().toISOString().split('T')[0];

dateElement.setAttribute('min', today);

// show countdown
const updateDOM = () => {
	countdownActive = setInterval(() => {
		const now = new Date().getTime();
		const distance = countdownValue - now;

		const days = Math.floor(distance / day);
		const hours = Math.floor((distance % day) / hour);
		const minutes = Math.floor((distance % day) / minute);
		const seconds = Math.floor((distance % day) / second);

		inputContainer.hidden = true;

		if (distance < 0) {
			countdownElement.hidden = true;
			clearInterval(countdownActive);
			completeElementInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
			completeElement.hidden = false;
		} else {
			// countdown
			countdownElementTitle.textContent = `${countdownTitle}`;
			timeElements[0].textContent = `${days}`;
			timeElements[1].textContent = `${hours}`;
			timeElements[2].textContent = `${minutes}`;
			timeElements[3].textContent = `${seconds}`;
			completeElement.hidden = true;
			countdownElement.hidden = false;
		}
	}, second);
};

const updateCountdown = (e) => {
	e.preventDefault();
	countdownTitle = e.srcElement[0].value;
	countdownDate = e.srcElement[1].value;
	savedCountdown = { title: countdownTitle, date: countdownDate };
	console.log(savedCountdown);
	localStorage.setItem('countdown', JSON.stringify(savedCountdown));
	// check valid date
	if (countdownDate === '') {
		alert('Date not selected');
	} else {
		countdownValue = new Date(countdownDate).getTime();
		updateDOM();
	}
};

// reset values
const reset = () => {
	countdownElement.hidden = true;
	completeElement.hidden = true;
	inputContainer.hidden = false;
	clearInterval(countdownActive);
	countdownTitle = '';
	countdownDate = '';
	localStorage.removeItem('countdown');
};

const restore = () => {
	if (localStorage.getItem('countdown')) {
		inputContainer.hidden = true;
		savedCountdown = JSON.parse(localStorage.getItem('countdown'));
		countdownTitle = savedCountdown.title;
		countdownDate = savedCountdown.date;
		countdownValue = new Date(countdownDate).getTime();
		updateDOM();
	}
};

// event listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownElementBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

restore();
