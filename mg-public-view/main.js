const $form = document.querySelector('#subscription-form');
const $toast = document.querySelector('.toast');
const regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;

document.addEventListener('submit', async e => {
	if (e.target === $form) {
		e.preventDefault();

		let name = e.target.name.value;
		let email = e.target.email.value;

		if (!name || !email) {
			return showToast('warning', 'Todos los campos son requeridos!');
		}

		if (!regexEmail.test(email)) {
			return showToast('warning', 'Ingresa un email válido!');
		}

		try {
			let options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
				body: JSON.stringify({
					name,
					email,
				}),
			};
			const res = await fetch('http://localhost:7124/api/v1/users', options);
			const json = await res.json();
			if (res.status === 400) {
				return showToast('warning', json.msg);
			}
			showToast('success', 'Registro exitoso!');
		} catch (error) {
			console.error(error);
			showToast('warning', error.message);
		}
	}
});

const showToast = (modifier, msg) => {
	$toast.innerHTML = '';
	let text = document.createTextNode(msg);
	$toast.appendChild(text);
	$toast.classList.add(`toast--${modifier}`);
	setTimeout(() => {
		$toast.classList.remove(`toast--${modifier}`);
	}, 3000);
};

// ********** Countdown **********

let minute = 1000 * 60;
let hour = minute * 60;
let day = hour * 24;
let timer;

const countdown = () => {
	let distance = new Date('08/09/2023 00:00 AM') - new Date();

	let days = Math.floor(distance / day);
	let hours = Math.floor((distance % day) / hour);
	let minutes = Math.floor((distance % hour) / minute);

	document.querySelector('#days').innerHTML = days;
	document.querySelector('#hours').innerHTML = hours;
	document.querySelector('#minutes').innerHTML = minutes;
};

timer = setInterval(countdown, 1000);
