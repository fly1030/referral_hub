export const Companies = [
	{ key: 'amazon', name: 'Amazon', careerPage: 'https://www.amazon.jobs/en/'},
	{ key: 'fb', name: 'Facebook', careerPage: 'https://www.facebook.com/careers/jobs'},
	{ key: 'google', name: 'Google', careerPage: 'https://careers.google.com/jobs/results/?company=Google'},
	{ key: 'twitter', name: 'Twitter', careerPage: 'https://careers.twitter.com/en/jobs.html' },
	{ key: 'doordash', name: 'DoorDash', careerPage: 'https://www.doordash.com/careers/'},
	{ key: 'databricks', name: 'Databricks', careerPage: 'https://databricks.com/company/careers/open-positions'},
	{ key: 'hulu', name: 'Hulu', careerPage: 'https://careers.hulu.com/search-jobs' },
	// Above refers are active! Put them up
	{ key: 'pinterest', name: 'Pinterest', careerPage: 'https://www.pinterestcareers.com/jobs/search'},
	{ key: 'vmware', name: 'Vmware', careerPage: 'https://careers.vmware.com/main/'},
	{ key: 'microsoft', name: 'Microsoft', careerPage: 'https://careers.microsoft.com/us/en'},
	{ key: 'apple', name: 'Apple', careerPage: 'https://jobs.apple.com/en-us/search?location=united-states-USA'},
	{ key: 'airbnb', name: 'AirBnB', careerPage: 'https://careers.airbnb.com/positions/'},
	{ key: 'dropbox', name: 'Dropbox', careerPage: 'https://www.dropbox.com/jobs'},
	{ key: 'instacart', name: 'Instacart', careerPage: 'https://instacart.careers/current-openings/'},
	{ key: 'linkedin', name: 'Linkedin', careerPage: 'https://www.linkedin.com/company/linkedin/jobs/?src=or-search'},
	{ key: 'netflix', name: 'Netflix', careerPage: 'https://jobs.netflix.com/'},
	{ key: 'servicenow', name: 'ServiceNow', careerPage: 'https://www.servicenow.com/careers.html'},
	{ key: 'capitalone', name: 'Capital One', careerPage: 'https://www.servicenow.com/careers.html'},
	{ key: 'oracle', name: 'Oracle', careerPage: 'https://www.capitalonecareers.com/'},
	{ key: 'uber', name: 'Uber', careerPage: 'https://www.uber.com/us/en/careers/list/' },
	{ key: 'ibm', name: 'Ibm', careerPage: 'https://careers.ibm.com/'},
	{ key: 'rivian', name: 'Rivian', careerPage: 'https://rivian.com/careers/' },
	{ key: 'ti', name: 'Ti', careerPage: 'https://careers.ti.com/applicant-login/' },
	{ key: 'lacework', name: 'Lacework', careerPage: 'https://www.lacework.com/careers/?p=job'},
]
export type Companies = typeof Companies
export type Company = Companies[number]
