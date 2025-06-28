const form = document.getElementById('form')
const firstName = document.getElementById('firstname')
const lastName = document.getElementById('lastname')
const email = document.getElementById('email')
const message = document.getElementById('message')
const toast = document.querySelector('.toast')

let isValidForm = false

form.addEventListener('submit', (e) => {
	e.preventDefault()
	checkInputs()
})

function checkInputs() {
	isValidForm = true

	const firstNameValue = firstName.value.trim()
	const lastNameValue = lastName.value.trim()
	const emailValue = email.value.trim()
	const messageValue = message.value.trim()

	// ✅ QueryType check done inside function
	const queryType = document.querySelector('input[name="queryType"]:checked')
	const queryTypeValue = queryType ? queryType.id : ''

	if (firstNameValue === '') {
		setErrorFor(firstName, 'This field is required')
	}

	if (lastNameValue === '') {
		setErrorFor(lastName, 'This field is required')
	}

	if (emailValue === '') {
		setErrorFor(email, 'This field is required')
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Please enter a valid email address')
	}

	if (queryTypeValue === '') {
		const radioContainer = document.querySelector('.radio__btn-container')
		setErrorFor(radioContainer, 'Please select a query type')
	}

	if (messageValue === '') {
		setErrorFor(message, 'This field is required')
	}

	if (isValidForm) {
		displayToast()
		form.reset()
	}
}

function displayToast() {
	toast.classList.add('visible')

	setTimeout(() => {
		toast.classList.remove('visible')
	}, 10000) // Toast stays for 10 seconds
}

function setErrorFor(input, message) {
	const formControl =
		input.classList.contains('radio__btn') ||
		input.classList.contains('radio__btn-container')
			? input
			: input.parentElement

	const small = formControl.querySelector('small')

	isValidForm = false

	small.innerText = message
	formControl.classList.add('error')
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		email
	)
}
