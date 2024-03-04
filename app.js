window.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("calc-form");
	if (form) {
		setupIntialValues();

		form.addEventListener("submit", function (e) {
			e.preventDefault();
			update();
		});
	}
});

function getCurrentUIValues() {
	return {
		amount: +document.getElementById("loan-amount").value,
		years: +document.getElementById("loan-years").value,
		rate: +document.getElementById("loan-rate").value,
	};
}

function setupIntialValues() {
	document.getElementById("loan-amount").value = 10000;
	document.getElementById("loan-years").value = 2;
	document.getElementById("loan-rate").value = 5;

	update();
}

function update() {
	const currentUIValues = getCurrentUIValues();
	const monthlyPayment = calculateMonthlyPayment(
		currentUIValues.amount,
		currentUIValues.years,
		currentUIValues.rate
	);
	const resultContainer = document.getElementById(
		"result-container"
	);

	updateMonthly(monthlyPayment);
}

function calculateMonthlyPayment(amount, years, rate) {
	if (amount <= 0 || years <= 0 || rate <= 0) {
		return "0";
	}

	const monthlyRate = rate / 100 / 12;
	const numberOfPayments = years * 12;
	const denominator = Math.pow(
		1 + monthlyRate,
		-numberOfPayments
	);

	const monthlyPayment =
		(amount * monthlyRate) / (1 - denominator);

	return monthlyPayment.toFixed(2);
}

function updateMonthly(monthlyPayment) {
	document.getElementById(
		"monthly-payment"
	).innerText = `${monthlyPayment}`;

	const calculateButton =
		document.getElementById("calc-submit");
	if (calculateButton) {
		calculateButton.addEventListener("click", function (e) {
			document.getElementById(
				"monthly-payment"
			).style.display = "block";
			e.preventDefault();
			update();
		});
	}
}
