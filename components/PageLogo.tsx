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
    },
    
    textStyle: {
        cursor: 'pointer', paddingLeft: 8, paddingTop: 2, fontSize: 25
    },
}


function PageLogo(props: {textStyle?: {[key: string]: any}}) {
	return (
        <div style={{display: 'flex'}}>
            <div style={style.topbar} onClick={() => (window.location.href = '/')}>
			    <div style={{color: '#FFFFFF', fontSize: 40, fontStyle: 'bold'}}>^</div>
		    </div>
            <span style={props.textStyle ?? style.textStyle} onClick={() => (window.location.href = '/')}>
                YesOnward
            </span>
        </div>
	)
}

export default PageLogo