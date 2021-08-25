const axios = require('axios');

module.exports = async ({
	deviceID,
	email,
	fullName,
	mobile,
	password,
	refCode,
	proxy,
}) => {
	const headers = {
		Host: 'api.100man.io',
		'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
		Connection: 'close',
		Accept: '*/*',
		'User-Agent': '100Man/9 CFNetwork/1240.0.4 Darwin/20.5.0',
		'Accept-Language': 'en-us',
		'Accept-Encoding': 'gzip, deflate',
	};

	const vFullName = encodeURIComponent(fullName.replace(/\s/g, ' ').trim());

	const data = `device_id=${deviceID}&email=${email}&fullname=${vFullName}&mobile=${mobile}&password=${password}&ref_code=${refCode}`;

	const options = {
		url: 'https://api.100man.io/app/auth/register',
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
