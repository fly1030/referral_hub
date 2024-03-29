export const LogoCompanies = [
	{ key: 'amazon', name: 'Amazon', careerPage: 'https://www.amazon.jobs/en/'},
	{ key: 'vmware', name: 'Vmware', careerPage: 'https://careers.vmware.com/main/'},
	{ key: 'microsoft', name: 'Microsoft', careerPage: 'https://careers.microsoft.com/us/en'},
	{ key: 'fb', name: 'Facebook', careerPage: 'https://www.facebook.com/careers/jobs'},
	{ key: 'google', name: 'Google', careerPage: 'https://careers.google.com/jobs/results/?company=Google'},
	{ key: 'databricks', name: 'Databricks', careerPage: 'https://databricks.com/company/careers/open-positions'},
	{ key: 'apple', name: 'Apple', careerPage: 'https://jobs.apple.com/en-us/search?location=united-states-USA'},
	{ key: 'linkedin', name: 'Linkedin', careerPage: 'https://www.linkedin.com/company/linkedin/jobs/?src=or-search'},
	{ key: 'doordash', name: 'DoorDash', careerPage: 'https://www.doordash.com/careers/'},
	{ key: 'twitter', name: 'Twitter', careerPage: 'https://careers.twitter.com/en/jobs.html' },
	{ key: 'netflix', name: 'Netflix', careerPage: 'https://jobs.netflix.com/'},
	{ key: 'dropbox', name: 'Dropbox', careerPage: 'https://www.dropbox.com/jobs'},
]
export type LogoCompanies = typeof LogoCompanies
export type LogoCompany = LogoCompanies[number]
