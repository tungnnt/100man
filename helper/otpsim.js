require('dotenv').config();

const axios = require('axios');

const BASE_URL = 'http://otpsim.com';
const API_KEY = process.env.OTP_SIM_API_KEY;
const SERVICE_ID = 381;

const getAvailableService = async () => {
	const response = await axios.get(
		`${BASE_URL}/api/v2/available-services?apiKey=${API_KEY}`
	);

	return response.data;
};

const createOrder = async () => {
	const response = await axios.get(
		`${BASE_URL}/api/phones/request?token=${API_KEY}&service=${SERVICE_ID}&network=3`
	);

	return response.data;
};

const getServiceMessage = async (orderId) => {
	if (!orderId) throw new Error('Order ID not found.');

	const response = await axios.get(
		`${BASE_URL}/api/sessions/${orderId}?token=${API_KEY}`
	);

	return response.data;
};

module.exports = {
	getAvailableService,
	getServiceMessage,
	createOrder,
};
