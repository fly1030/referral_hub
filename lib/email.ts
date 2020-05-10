import sg from '@sendgrid/mail'
import { ReactElement } from 'react'
import { renderToString } from 'react-dom/server'
const apikey = process.env.SENDGRID_API_KEY
if (apikey != null) {
	sg.setApiKey(apikey)
} else {
	throw new Error('Sendgrid email API key is not set')
}
export type EmailData = string | { name?: string; email: string }

export const email = sg
const DefaultFrom = {
	name: 'YesOnward',
	email: 'hello@yesonward.com',
}
export async function sendEmail(to: EmailData, subject: string, html: ReactElement, text: string = '<empty>', from: EmailData = DefaultFrom) {
	return await email.send({
		to,
		from,
		subject,
		text,
		html: renderToString(html),
	})
}
