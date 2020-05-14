import PageLogo from "./PageLogo";

function PageFooter() {
    return (
        <div style={{padding: 40, backgroundColor: '#363636', display: 'flex', justifyContent: 'space-between'}}>
            <PageLogo textStyle = {{ cursor: 'pointer', paddingLeft: 8, fontSize: 25,  color: '#FFFFFF'}}/>
            <div style={{
                color: '#FFFFFF',
                display: 'flex', 
                alignItems: 'center',
            }}>
                @2020 Yes Onward. Terms and <a href="https://yesonward.com/privacy"> Privacy</a>
            </div>
        </div>
  );
}

export default PageFooter