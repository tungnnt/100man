const _messages = require('./_messages');
const _new = require('./_new');

module.exports = {
	generateMail: ({ name, domain }) => _new({ name, domain }),
	fetchMessage: ({ email }) => _messages({ email }),
};
