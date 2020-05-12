import { ReactNode } from 'react';
import { Card, Button } from 'antd';

const style = {
	entryButton: { backgroundColor: '#148EFB', borderRadius: 7, maxWidth: 300, width: 240, height: 60},
}

function EntryButton(props: { title: string; subtitle: ReactNode; onClick: () => void }) {
	return (
		<Button style={style.entryButton} onClick={props.onClick}>
			<h3 style={{color: '#FFFFFF'}}className="center nowrap">{props.title}</h3>
		</Button>
	)
}

export default EntryButton