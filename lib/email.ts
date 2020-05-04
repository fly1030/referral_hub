import sg from '@sendgrid/mail'
const apikey = process.env.SENDGRID_API_KEY
if (apikey != null) {
	sg.setApiKey(apikey)
} else {
	throw new Error('Sendgrid email API key is not set')
}
const email = sg
export default email
