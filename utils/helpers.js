export const calculateRentalPrice = (type, hours) => {
	const trucks = {
		1: 20,
		2: 30,
		3: 40,
		4: 50,
		5: 70,
	};
	const total = trucks[type.toString()] * hours;
	return `$${total}.00`;
};
