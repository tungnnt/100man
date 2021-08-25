const axios = require('axios');

module.exports = async ({ proxy }) => {
	const config = {
		method: 'get',
		url: 'https://api.ipify.org/?format=json',
		httpsAgent: proxy,
	};

	const response = await axios(config);

	return response.data;
};
