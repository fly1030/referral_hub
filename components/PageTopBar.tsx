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
        <Button 
            key={1} 
            onClick={onLogout} 
            style={{borderStyle: 'hidden', borderColor: 'lightblue', borderRadius: 10, backgroundColor: 'lightblue'}}>
            <b>Log out</b>
        </Button>
    ] : [
        <Button 
            key={2} 
            onClick={onLoginClicked}
            style={{borderStyle: 'hidden', borderColor: 'lightblue', borderRadius: 10, backgroundColor: 'lightblue'}}
        >
            <b>Log in</b>
        </Button>
    ]
    return (
    <div className="site-page-header-ghost-wrapper" style={style.topbar}>
        <PageHeader
            ghost={true}
            title={
                <span style={{cursor: 'pointer'}} onClick={() => window.location.href="/"}>YesOnward</span>
            }
            extra={secondaryButtonGroup}
        />
    </div>
  );
}

export default PageTopBar