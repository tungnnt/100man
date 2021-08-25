const axios = require('axios');

module.exports = async ({ name, domain = 'inscriptio.in' }) => {
	const headers = {
		authority: 'api.internal.temp-mail.io',
		'sec-ch-ua':
			'"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
		accept: 'application/json, text/plain, */*',
		'application-version': '2.2.13',
		'sec-ch-ua-mobile': '?0',
		'user-agent':
			'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
		'application-name': 'web',
		'content-type': 'application/json;charset=UTF-8',
		origin: 'https://temp-mail.io',
		'sec-fetch-site': 'same-site',
		'sec-fetch-mode': 'cors',
		'sec-fetch-dest': 'empty',
		referer: 'https://temp-mail.io/',
		'accept-language': 'en-US,en;q=0.9,vi;q=0.8,zh-CN;q=0.7,zh;q=0.6',
		cookie:
			'_ga=GA1.2.1397599029.1626323917; __gads=ID=581c3afb3db1d322-2254b9345aca00c2:T=1626323921:RT=1626323921:S=ALNI_MbxpAIbRDHd34zkDVEzS0E7bmgd1w; _gid=GA1.2.2051030648.1629812641; _gat=1',
	};

	const data = {
		name,
		domain,
	};

	const options = {
		url: 'https://api.internal.temp-mail.io/api/v3/email/new',
		method: 'POST',
	};

	const response = await axios({
		method: options.method || 'GET',
		url: options.url,
		headers,
		data,
	});

	return response.data;
};
