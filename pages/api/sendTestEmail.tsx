import email from 'lib/email'

export const config = { rpc: true } // enable rpc on this API route
// export a function that needs to be called from the server and the browser
export async function sendTestEmail() {
	console.log('sending... ');
	const result = await email.send({
		to: 'referralhub0428@gmail.com',
		from: 'hello@yesonward.com',
		subject: 'send send',
		text: 'and easy to do anywhere, even with Node.js',
		html: '<strong>and easy to do anywhere, even with Node.js</strong>',
	})
	console.log('SENT RESULT: ', result)
}
