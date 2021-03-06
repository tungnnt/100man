const axios = require('axios');
const { randomIPHeader } = require('../random');

module.exports = async ({ email }) => {
	const ipHeader = randomIPHeader();

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
		origin: 'https://temp-mail.io',
		'sec-fetch-site': 'same-site',
		'sec-fetch-mode': 'cors',
		'sec-fetch-dest': 'empty',
		referer: 'https://temp-mail.io/',
		'accept-language': 'en-US,en;q=0.9,vi;q=0.8,zh-CN;q=0.7,zh;q=0.6',
		...ipHeader,
	};

	const options = {
		url: `https://api.internal.temp-mail.io/api/v3/email/${email}/messages`,
	};

	const response = await axios({
		method: options.method || 'GET',
		url: options.url,
		headers,
	});

	return response.data.map((message) => ({
		html: message.body_html,
		subject: message.subject,
	}));
};
