import { Statistic, Row, Col } from 'antd';

const style = {
	entryButtonCont: {
		maxWidth: 1024,
	},
}

function StatisticsSection() {           
    return (
        <div className="flex justify-center">
            <div style={style.entryButtonCont} className="flex flex-row justify-center mt2">
            <Row gutter={128}>
                <Col>
                    <Statistic 
                        title="Referrals Made" 
                        valueStyle={{ fontSize: 30, fontWeight: "bold" }} 
                        value={101} 
                        suffix="+"/>
                </Col>
                <Col>
                    <Statistic 
                        title="Referrers Helping" 
                        valueStyle={{ fontSize: 30, fontWeight: "bold" }}  
                        value={58} 
                        suffix="+"/>
                </Col>
                <Col>
                    <Statistic 
                        title="Companies Represented" 
                        valueStyle={{ fontSize: 30, fontWeight: "bold" }}  
                        value={20} 
                        suffix="+"/>
                </Col>
            </Row>
            </div>
        </div>
    );
}

export default StatisticsSection