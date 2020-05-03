import { PageHeader, Button, Descriptions } from 'antd';

const style = {
	topbar: { backgroundColor: 'lightblue'},
}

function PageTopBar(props: {
    isLoggedIn: boolean, 
    onLogout: () => void, 
    onLoginClicked: () => void,
}) {
    const {isLoggedIn, onLogout, onLoginClicked} = props;
    const secondaryButtonGroup = isLoggedIn ? [
        <Button key={1} onClick={onLogout}>
            Log out
        </Button>
    ] : [
        <Button key={2} onClick={onLoginClicked}>
            Log in
        </Button>
    ]
    return (
    <div className="site-page-header-ghost-wrapper" style={style.topbar}>
        <PageHeader
            ghost={true}
            title="YesOnward"
            extra={secondaryButtonGroup}
        />
    </div>
  );
}

export default PageTopBar