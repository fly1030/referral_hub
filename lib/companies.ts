export const Companies = [
	{ key: 'fb', name: 'Facebook' },
	{ key: 'uber', name: 'Uber' },
	{ key: 'twitter', name: 'Twitter' },
	{ key: 'microsoft', name: 'Microsoft' },
	{ key: 'linkedin', name: 'Linkedin' },
	{ key: 'apple', name: 'Apple' },
	{ key: 'doordash', name: 'DoorDash' },
	{ key: 'airbnb', name: 'AirBnB' },
	{ key: 'google', name: 'Google' },
	{ key: 'netflix', name: 'Netflix' },
]
export type Companies = typeof Companies
export type Company = Companies[number]
