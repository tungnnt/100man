const axios = require('axios');

module.exports = async ({ proxy }) => {
	const headers = {
		Host: 'api.100man.io',
		Accept: '*/*',
		'User-Agent': '100Man/9 CFNetwork/1240.0.4 Darwin/20.5.0',
		'Accept-Language': 'en-us',
		'Accept-Encoding': 'gzip, deflate',
		Connection: 'close',
	};

	const options = {
		url: 'https://api.100man.io/app/setting/cashback-step',
	};

	const response = await axios({
		method: options.method || 'GET',
		url: options.url,
		headers,
		httpsAgent: proxy,
	});

	return response.data;
};
