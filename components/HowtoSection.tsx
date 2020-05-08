import { Row, Col, Card, Steps } from "antd"
const { Step } = Steps;

function HowtoSection() {
    return (
        <div style={{paddingLeft: 60, paddingRight: 60}}>
            <h2 style={{fontSize: 30}}>How does it work: </h2>
            <Row>
                <Col flex={1}>
                    <Card title="For Candidates:" bordered={false}>
                        <Steps direction="vertical">
                            <Step title="Choose companies" description="Select Compaies you're interested in"/>
                            <Step title="Application info"  description="Let us know the interested positions and your latest resume"/>
                            <Step title="That's it!" description="Wait for confirmation email for your referral" />
                        </Steps>
                    </Card>
                </Col>
                <Col flex={1} style={{paddingLeft: 30}}>
                    <Card title="For Referrers:" bordered={false}>
                        <Steps direction="vertical">
                            <Step title="Claim cases" description="Case pages will show you all available cases, claim them!"/>
                            <Step title="Refer"  description="Make the referral using the case information"/>
                            <Step title="Close cases" description="Once you're done come back to mark the case closed" />
                        </Steps>
                    </Card>
                </Col>
            </Row>
        </div>
  );
}

export default HowtoSection