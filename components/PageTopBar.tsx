import { PageHeader, Button, Descriptions } from 'antd'
import { useRouter } from 'next/router'

const style = {
	topbar: { backgroundColor: 'lightblue' },
}

function PageTopBar(props: { isLoggedIn: boolean; onLogout: () => void; onLoginClicked: () => void }) {
	const { isLoggedIn, onLogout, onLoginClicked } = props
	const secondaryButtonGroup = isLoggedIn ? (
		<>
			<a href="/cases">
				<b>My Cases</b>
			</a>
			<a onClick={onLogout}>
				<b>Log out</b>
			</a>
		</>
	) : (
		<a onClick={onLoginClicked}>
			<b>Log in</b>
		</a>
	)
	return (
		<div className="site-page-header-ghost-wrapper" style={style.topbar}>
			<PageHeader
				ghost={true}
				title={
					<span style={{ cursor: 'pointer' }} onClick={() => (window.location.href = '/')}>
						YesOnward
					</span>
				}
				extra={secondaryButtonGroup}
			/>
		</div>
	)
}

export default PageTopBar
