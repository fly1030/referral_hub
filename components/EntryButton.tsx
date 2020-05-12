import { ReactNode } from 'react';
import { Card } from 'antd';

const style = {
	entryButton: { border: '2px solid lightblue', borderRadius: 10, maxWidth: 300 , width: 260},
}

function EntryButton(props: { title: string; subtitle: ReactNode; onClick: () => void }) {
	return (
		<div className="flex flex-column items-center p2" onClick={props.onClick}>
			<Card hoverable style={style.entryButton}>
				<h3 className="center nowrap">{props.title}</h3>
			</Card>
			<h3 className="mt1 center">{props.subtitle}</h3>
		</div>
	)
}

export default EntryButton