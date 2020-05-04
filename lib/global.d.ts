declare global {
	namespace NodeJS {
		interface ProcessEnv {
			SENDGRID_API_KEY: string
			NODE_ENV: 'development' | 'production'
			PORT?: string
			PWD: string
		}
	}
}
