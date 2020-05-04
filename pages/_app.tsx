import 'global.css'

export default function MyApp(props: any) {
	const { Component, pageProps } = props
	return <Component {...pageProps} />
}
