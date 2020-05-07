import email from '../../lib/email'

export const config = { rpc: true } // enable rpc on this API route
// export a function that needs to be called from the server and the browser
export async function sendClaimedEmail(
    caseInfo: {[key: string]: any},
    referrerEmail: string, 
) {
    console.log('referrerEmail:', referrerEmail);
	const result = await email.send({
		to: referrerEmail,
		from: 'hello@yesonward.com',
		subject: `[Referral Request] - ${caseInfo.candidateEmail}`,
		text: 'and easy to do anywhere, even with Node.js',
		html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    })
    console.log('SENT RESULT: ', result)
}
