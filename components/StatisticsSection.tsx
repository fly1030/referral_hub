import { Statistic, Row, Col } from 'antd'

const style = {
	statsSection: {
		marginTop: 30,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 50,
		paddingRight: 50,
	},
}

function StatisticsSection(props: {
	closedCasesCount: number,
	referrersCount: number,
	companiesCount: number,
}) {
	const {closedCasesCount, referrersCount, companiesCount} = props
	return (
		<div style={style.statsSection} className="flex flex-row justify-center mt2">
			<Row gutter={64}>
				<Col>
					<Statistic 
						title="Referrals Made" 
						style={{ flex: '1 1 33%' }} 
						valueStyle={{ fontSize: 40, fontWeight: 'bold' }} 
						value={100 + closedCasesCount} suffix="+" />
				</Col>
				<Col>
					<Statistic 
						title="Referrers Helping" 
						style={{ flex: '1 1 33%' }} 
						valueStyle={{ fontSize: 40, fontWeight: 'bold' }} 
						value={58 + referrersCount} 
						suffix="+" />
				</Col>
				<Col>
					<Statistic 
						title="Companies Represented" 
						style={{ flex: '1 1 33%' }} 
						valueStyle={{ fontSize: 40, fontWeight: 'bold' }} 
						value={companiesCount} 
						suffix="+" />
				</Col>
			</Row>
		</div>
	)
}

export default StatisticsSection
