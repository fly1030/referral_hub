import { ReactNode } from 'react';
import { Card } from 'antd';

const style = {
	entryButton: { border: '2px solid lightblue', borderRadius: 10, maxWidth: 300 },
	companyLogos: {
		display: 'flex',
		width: '100%',
	},
}

function EntryButton(props: { title: string; subtitle: ReactNode; onClick: () => void }) {
	props.onClick();
	return (
		<div className="flex flex-column items-center p1">
			<Card hoverable style={style.entryButton}>
				<h2 className="center nowrap">{props.title}</h2>
			</Card>
			<h3 className="mt1 center">{props.subtitle}</h3>
		</div>
	)
}

export default EntryButton