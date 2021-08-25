const axios = require('axios');

module.exports = async ({ proxy, token }) => {
	const headers = {
		Host: 'api.100man.io',
		Connection: 'close',
		Accept: '*/*',
		'User-Agent': '100Man/9 CFNetwork/1240.0.4 Darwin/20.5.0',
		'Accept-Language': 'en-us',
		token,
		'Accept-Encoding': 'gzip, deflate',
	};

	const options = {
		url: 'https://api.100man.io/app/orders/count-order-not-exchange',
	};

	const response = await axios({
		method: options.method || 'GET',
		url: options.url,
		headers,
		httpsAgent: proxy,
	});

	return response.data;
};
