import PageLogo from "./PageLogo";

function PageFooter() {
    const tosLink = <a style = {{paddingLeft: 4, paddingRight: 4}} href="https://yesonward.com/privacy">Terms</a>
    const privacyLink = <a style = {{paddingLeft: 4, paddingRight: 4}} href="https://yesonward.com/privacy"> Privacy</a>
    return (
        <div style={{padding: 30, backgroundColor: '#363636', display: 'flex', justifyContent: 'space-between'}}>
            <PageLogo textStyle = {{ cursor: 'pointer', paddingLeft: 8, fontSize: 25,  color: '#FFFFFF'}}/>
            <div style={{
                color: '#FFFFFF',
                display: 'flex', 
                alignItems: 'center',
            }}>
                @2020 Yes Onward. {tosLink} and {privacyLink}
            </div>
        </div>
  );
}

export default PageFooter