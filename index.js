const getIp = require('./api/get-ip');
const register = require('./api/register');
const verifyOtp = require('./api/verify-otp');
const {
	randomDeviceId,
	randomFirstName,
	randomName,
	randomPhone,
	randomProxy,
	normalizeName,
	randomDate,
} = require('./helper/random');
const { generateMail, fetchMessage } = require('./helper/mail');
const login = require('./api/login');
const signToken = require('./api/register-token');
const { textQuestion } = require('./helper/input');
const cashbackStep = require('./api/cashback-step');
const countNotify = require('./api/count-notify');
const userInfo = require('./api/user-info');
const infoHomepage = require('./api/info-homepage');
const countOrderNotExchange = require('./api/count-order-not-exchange');
const refferalExchange = require('./api/referral-exchange');
const { getServiceMessage, createOrder } = require('./helper/otpsim');
const resendVerify = require('./api/resend-verify');
const verifyOtpPhone = require('./api/verify-otp-phone');

const _parseToken = (result) => {
	result = result.match(/[0-9]{4}/gim);

	return result[0];
};

const _getPhone = async () => {
	let phone = '';

	let orderID = '';

	while (true) {
		const getOTPSIMPhone = await createOrder();

		phone = getOTPSIMPhone.data.phone_number;

		orderID = getOTPSIMPhone.data.session;

		let status = getOTPSIMPhone.message;

		console.log({ statusString: status });

		if (phone && phone.length > 0) break;

		await new Promise((resolve) => setTimeout(resolve, 2000));
	}

	return { raw: phone, mobile: '0' + phone, orderID };
};

const _getOTP = (phone, orderID) => {
	return new Promise((resolve, reject) => {
		const start = new Date();

		const handleFn = async () => {
			const end = new Date() - start;

			if (end > 60000) {
				reject('Time out');
			} else {
				const response = await getServiceMessage(orderID);

				console.log('Đang lấy mã số điện thoại', phone);

				if (response.data.messages) {
					const otp = _parseToken(response.data.messages[0].sms_content);

					resolve(otp);
				} else {
					setTimeout(handleFn, 3000);
				}
			}
		};

		setTimeout(handleFn, 0);
	});
};

setImmediate(async () => {
	while (true) {
		try {
			const deviceID = randomDeviceId();

			const fullName = `${randomFirstName()} ${randomName()}`;

			const userName =
				normalizeName(fullName) + randomDate().replace(/\//gim, '');

			const { email } = await generateMail({ name: userName.slice(0, 15) });

			// const email = await textQuestion({ question: 'Nhập email' });

			// const mobile = randomPhone();

			const { raw, mobile, orderID } = await _getPhone();

			const password = 'Pa55w0rds';

			const refCode = 'KSQYL749';

			const proxy = randomProxy();

			const fbToken = randomDeviceId().toLowerCase();

			const { ip } = await getIp({ proxy });

			console.log({ mobile, orderID, deviceID, email, fullName, ip, fbToken });

			let response = await register({
				deviceID,
				email,
				fullName,
				mobile,
				password,
				refCode,
				proxy,
			});

			const {
				data: { token: registerToken },
			} = response;

			console.log({ registerToken });

			let otp = '';

			while (true) {
				console.log('Fetching messages...');

				response = await fetchMessage({ email });

				const subjectString = response
					.map((message) => message.subject)
					.join('');

				if (/[0-9]{4}/gim.test(subjectString)) {
					otp = subjectString.match(/[0-9]{4}/gim)[0];

					break;
				}
			}

			// const otp = await textQuestion({ question: 'Nhập OTP' });

			console.log({ otp });

			response = await verifyOtp({ otp, registerToken, proxy });

			console.log(response);

			response = await login({ email, deviceID, password, proxy });

			const {
				data: { token },
			} = response;

			console.log({ token });

			response = await signToken({ token, deviceID, fbToken, proxy });

			console.log(response);

			response = await cashbackStep({ proxy });

			response = await countNotify({ token, proxy });

			console.log(response);

			response = await userInfo({ token, proxy });

			console.log(response);

			response = await infoHomepage({ proxy, deviceID });

			response = await countOrderNotExchange({ proxy, token });

			response = await countNotify({ token, proxy });

			console.log(response);

			response = await refferalExchange({ token, proxy });

			console.log(response);

			response = await resendVerify({ token, phone: raw, proxy });

			console.log(response);

			const otpPhone = await _getOTP(raw, orderID);

			console.log({ otpPhone });

			response = await verifyOtpPhone({
				phone: raw,
				proxy,
				token,
				otp: otpPhone,
			});

			console.log(response);

			require('fs').appendFileSync(
				'accounts.txt',
				`${mobile}|${email}|${password}|${deviceID}|${ip}\n`
			);
		} catch (error) {
			console.log(error.message || error);

			continue;
		}
	}
});
