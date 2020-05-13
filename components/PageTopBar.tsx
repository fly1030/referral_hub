import { PageHeader, Button } from 'antd'
import { UpSquareFilled } from '@ant-design/icons'

const style = {
	topbar: {
		backgroundColor: '#148EFB', 
		width: 35, 
		height: 35, 
		display: 'flex', 
		alignItems: 'center', 
		justifyContent: 'center',
		verticalAlign: 'center',
		borderRadius: 7,
		paddingTop: 12,
		cursor: 'pointer',
	}
}

function pageLogo() {
	return (
		<div style={style.topbar} onClick={() => (window.location.href = '/')}>
			<div style={{color: '#FFFFFF', fontSize: 40, fontStyle: 'bold'}}>^</div>
		</div>
	)
}

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
				title={
					<div style={{display: 'flex'}}>
						{pageLogo()}
						<span style={{ cursor: 'pointer', paddingLeft: 8, paddingTop: 2, fontSize: 25 }} onClick={() => (window.location.href = '/')}>
							YesOnward
						</span>
					</div>
				}
				extra={secondaryButtonGroup}
			/>
		</div>
	)
}

export default PageTopBar
