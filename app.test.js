describe("calculateMonthlypayment", function () {
	it("should calculate the monthly rate correctly", function () {
		const amount = 10000;
		const years = 2;
		const rate = 5;

		const result = calculateMonthlyPayment(
			amount,
			years,
			rate
		);

		const monthlyRate = rate / 100 / 12;
		const numberOfPayments = years * 12;
		const denominator = Math.pow(
			1 + monthlyRate,
			-numberOfPayments
		);
		const expected =
			(amount * monthlyRate) / (1 - denominator);

		expect(parseFloat(result)).toEqual(
			parseFloat(expected.toFixed(2))
		);
	});

	it("should return a result with 2 decimal places", function () {
		const amount = 10000;
		const years = 2;
		const rate = 5;

		const result = calculateMonthlyPayment(
			amount,
			years,
			rate
		);

		expect(result).toMatch(/^\d+\.\d{2}$/);
	});

	describe("Zero inputs", function () {
		it("should handle zero loan amount", function () {
			const amount = 0;
			const years = 2;
			const rate = 5;

			const result = calculateMonthlyPayment(
				amount,
				years,
				rate
			);

			expect(parseFloat(result)).toBe(0);
		});

		it("should handle zero loan term", function () {
			const amount = 10000;
			const years = 0;
			const rate = 5;

			const result = calculateMonthlyPayment(
				amount,
				years,
				rate
			);

			expect(parseFloat(result)).toBe(0);
		});

		it("should handle zero interest rate", function () {
			const amount = 10000;
			const years = 2;
			const rate = 0;

			const result = calculateMonthlyPayment(
				amount,
				years,
				rate
			);

			expect(parseFloat(result)).toBe(0);
		});
	});
});
