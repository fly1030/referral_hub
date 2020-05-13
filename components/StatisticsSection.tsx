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

function StatisticsSection() {
	return (
		<div style={style.statsSection} className="flex flex-row justify-center mt2">
			<Row gutter={64}>
				<Col>
					<Statistic title="Referrals Made" style={{ flex: '1 1 33%' }} valueStyle={{ fontSize: 40, fontWeight: 'bold' }} value={101} suffix="+" />
				</Col>
				<Col>
					<Statistic title="Referrers Helping" style={{ flex: '1 1 33%' }} valueStyle={{ fontSize: 40, fontWeight: 'bold' }} value={58} suffix="+" />
				</Col>
				<Col>
					<Statistic title="Companies Represented" style={{ flex: '1 1 33%' }} valueStyle={{ fontSize: 40, fontWeight: 'bold' }} value={20} suffix="+" />
				</Col>
			</Row>
		</div>
	)
}

export default StatisticsSection
