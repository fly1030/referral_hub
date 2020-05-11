import { sendEmail } from '../../lib/email'

export const config = { rpc: true } // enable rpc on this API route
// export a function that needs to be called from the server and the browser
export async function sendCaseClosedEmail(caseInfo: { [key: string]: any }) {
	const result = await sendEmail(
		caseInfo.candidateEmail,
		`Your referral to ${caseInfo.company} has been submitted successfully`,
		<>
			<h2>Congratulations</h2>
			<p>You have been referred to {caseInfo.company}</p>
			<p>Expect the offcial referral confirmation email from {caseInfo.company}</p>
			<p>
				If you don't get them within three days or want to get referred to more companies, visit
				 <a href="https://yesonward.com">YesOnward</a>
			</p>
		</>
	)
}
