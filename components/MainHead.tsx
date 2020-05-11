import Head from 'next/head'

type Props = {
	title: string
}
export default function MainHead(props: Props) {
	return (
		<Head>
			<title>{props.title}</title>
			<link rel="icon" type="image/png" href="/img/logos/icons8-up-squared-80.png"/>
			<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
			<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.2.0/antd.min.css" />
			<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/basscss/8.1.0/css/basscss.min.css" />
			<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/brands.min.css" />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		</Head>
	)
}
