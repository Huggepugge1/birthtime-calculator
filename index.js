const formatter = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
});

const calculate = () => {
	const edd = document.getElementById('edd').value;
	const tob = document.getElementById('tob').value;
	const ga = document.getElementById('ga').value;

	if (edd && tob) {
		const edd_date = new Date(edd);
		const tob_date = new Date(tob);
		if (edd_date == 'Invalid Date' || tob_date == 'Invalid Date') {
			document.getElementById('result').value = 'Invalid Date';
			return;
		}

		const ga = (new Date(edd) - new Date(tob));
		const days = 40 * 7 - Math.floor(ga / (1000 * 60 * 60 * 24)); // Total ga in days
		const weeks = Math.floor(days / 7);
		days = days % 7;

		document.getElementById('result').value = `${weeks} + ${days}`;
	} else if (edd && ga) {
		const edd_date = new Date(edd);
		const ga_array = ga.split(/\s*\+\s*/);
		if (edd_date == 'Invalid Date') {
			document.getElementById('result').value = 'Invalid Date';
			return;
		}

		const days = parseInt(ga_array[0]) * 7 + parseInt(ga_array[1]);
		const tob_date = new Date((days - 40 * 7) * 1000 * 60 * 60 * 24 + edd_date.getTime());

		document.getElementById('result').value = `${formatter.format(tob_date)}`;
	} else if (tob && ga) {
		const tob_date = new Date(tob);
		const ga_array = ga.split(/\s*\+\s*/);
		if (tob_date == 'Invalid Date') {
			document.getElementById('result').value = 'Invalid Date';
			return;
		}

		const days = parseInt(ga_array[0]) * 7 + parseInt(ga_array[1]);
		const edd_date = new Date((40 * 7 - days) * 1000 * 60 * 60 * 24 + tob_date.getTime());

		document.getElementById('result').value = `${formatter.format(edd_date)}`;
	} else if (ga) {
		const ga_array = ga.split(/\s*\+\s*/);
		const days = parseInt(ga_array[0]) * 7 + parseInt(ga_array[1]);
		const edd_date = new Date((40 * 7 - days) * 1000 * 60 * 60 * 24 + Date.now());

		document.getElementById('result').value = `${formatter.format(edd_date)}`;
	} else {
		document.getElementById('result').value = 'Invalid Input';
	}
}
