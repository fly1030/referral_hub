import { PageHeader, Button } from 'antd'
import PageLogo from './PageLogo'

function PageTopBar(props: { isLoggedIn: boolean; onLogout: () => void; onLoginClicked: () => void }) {
	const { isLoggedIn, onLogout, onLoginClicked } = props
	const secondaryButtonGroup = isLoggedIn ? (
		<>
			<a href="/cases">
				<b>My Cases</b>
			</a>
			<Button onClick={onLogout}>
				<b>Log out</b>
			</Button>
		</>
	) : (
		<Button onClick={onLoginClicked}>
			<b>Log in</b>
		</Button>
	)
	return (
		<div className="site-page-header-ghost-wrapper">
			<PageHeader
				ghost={true}
				title={<PageLogo />}
				extra={secondaryButtonGroup}
			/>
		</div>
	)
}

export default PageTopBar
