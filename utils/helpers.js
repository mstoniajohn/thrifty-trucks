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
		3: 'Medium',
		4: 'Large',
		5: 'Extra Large',
	};

	return trucks[truck];
};
export const getTruckImage = (truck) => {
	const trucks = {
		1: '/1.png',
		2: '/2.png',
		3: '/3.png',
		4: '/4.png',
		5: '/5.png',
	};

	return trucks[truck];
};
