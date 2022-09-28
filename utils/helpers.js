import dayjs from 'dayjs';

export const calculateRentalPrice = (type, startTime, endTime) => {
	const trucks = {
		1: 20,
		2: 30,
		3: 40,
		4: 50,
		5: 70,
	};
	const hours = dayjs(endTime).format('H') - dayjs(startTime).format('H');
	const totalHours = hours % 24;
	const total = trucks[type] * totalHours;
	return `$${total}.00`;
};

export const getTruckSize = (truck) => {
	const trucks = {
		1: 'Extra Small',
		2: 'Small',
		3: 40,
		4: 50,
		5: 70,
	};

	return trucks[truck];
};
