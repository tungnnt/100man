const axios = require('axios');

module.exports = async ({ otp, registerToken, proxy }) => {
	const headers = {
		Host: 'api.100man.io',
		'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
		Connection: 'close',
		Accept: '*/*',
		'User-Agent': '100Man/9 CFNetwork/1240.0.4 Darwin/20.5.0',
		'Accept-Language': 'en-us',
		'Accept-Encoding': 'gzip, deflate',
	};

	const data = `otp=${otp}&token=${registerToken}`;

	const options = {
		url: 'https://api.100man.io/app/auth/register/verify-otp',
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
