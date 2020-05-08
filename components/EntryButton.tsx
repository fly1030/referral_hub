import { ReactNode } from 'react';
import { Card } from 'antd';

const style = {
	entryButton: { border: '2px solid lightblue', borderRadius: 10, maxWidth: 300 , width: 300},
}

function EntryButton(props: { title: string; subtitle: ReactNode; onClick: () => void }) {
	return (
		<div className="flex flex-column items-center p1" onClick={props.onClick}>
			<Card hoverable style={style.entryButton}>
				<h2 className="center nowrap">{props.title}</h2>
			</Card>
			<h3 className="mt1 center">{props.subtitle}</h3>
		</div>
	)
}

export default EntryButton