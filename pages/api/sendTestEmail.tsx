import { email, sendEmail } from 'lib/email'
import { renderToString } from 'react-dom/server'

export const config = { rpc: true } // enable rpc on this API route
// export a function that needs to be called from the server and the browser
export async function sendTestEmail() {
	console.log('sending... ')
	const result = await sendEmail(
		{
			name: 'Referral Hub',
			email: 'referralhub0428@gmail.com',
		},
		'send send',
		<strong>and easy to do anywhere, even with Node.js</strong>,
	)
	console.log('SENT RESULT: ', result)
}
