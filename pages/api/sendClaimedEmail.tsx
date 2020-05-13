import { sendEmail } from '../../lib/email'
import { renderToString } from 'react-dom/server'

export const config = { rpc: true } // enable rpc on this API route
// export a function that needs to be called from the server and the browser
export async function sendClaimedEmail(caseInfo: { [key: string]: any }, referrerEmail: string) {
	const result = await sendEmail(
		referrerEmail,
		`[${caseInfo.company} Referral Request] - Candidate: ${caseInfo.candidateEmail}`,
		<>
			<h2>Thanks for helping with the referral</h2>
			<p>Below are some details about the case,</p>
			<table>
				<tr>
					<td>Candidate Name:</td>
					<td>{caseInfo.candidateName}</td>
				</tr>
				<tr>
					<td>Candidate Email:</td>
					<td>{caseInfo.candidateEmail}</td>
				</tr>
				<tr>
					<td>Company interested:</td>
					<td>{caseInfo.company}</td>
				</tr>
				<tr>
					<td>Positions interested:</td>
					<td>{caseInfo.positions}</td>
				</tr>
				<tr>
					<td>Resume link:</td>
					<td>{caseInfo.resume}</td>
				</tr>
				<tr>
					<td>Additional Info:</td>
					<td>{caseInfo.comments}</td>
				</tr>
			</table>
			<p>
				Please try make the referral in three business days and mark the case closed <a href="https://yesonward.com/cases">here</a>
			</p>
			<p>
				To see all your cases, visit <a href="https://yesonward.com/cases">YesOnward</a>
			</p>
		</>
	)
}
