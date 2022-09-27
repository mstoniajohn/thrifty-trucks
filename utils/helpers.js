import dayjs from 'dayjs';

export const calculateRentalPrice = (type, startTime, endTime) => {
	const trucks = {
		1: 20,
		2: 30,
		3: 40,
		4: 50,
		5: 70,
	};
	const hours = dayjs(endTime).hour() - dayjs(startTime).hour();
	const totalHours = hours % 24;
	const total = trucks[type] * totalHours;
	return `$${total}.00`;
};
