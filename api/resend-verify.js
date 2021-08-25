const axios = require('axios');

module.exports = async ({ token, phone, proxy }) => {
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

	const data = `account=%2B84${phone}`;

	const options = {
		url: 'https://api.100man.io/app/user/resend-verify',
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
