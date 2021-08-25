const axios = require('axios');

module.exports = async ({ token, proxy }) => {
	const headers = {
		Host: 'api.100man.io',
		'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
		'User-Agent': '100Man/9 CFNetwork/1240.0.4 Darwin/20.5.0',
		Connection: 'close',
		Accept: '*/*',
		token,
		'Accept-Encoding': 'gzip, deflate',
		'Accept-Language': 'en-us',
	};

	const data = `coin_index=1&type_exchange=register`;

	const options = {
		url: 'https://api.100man.io/app/user/referral-exchange',
		method: 'POST',
	};

	const response = await axios({
		method: options.method || 'GET',
		url: options.url,
		headers,
		data,
		httpsAgent: proxy,
	});

	return response.data;
};
