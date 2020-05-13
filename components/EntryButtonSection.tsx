import EntryButton from './EntryButton';
import { Divider, Tooltip, Row, Col } from 'antd'
import { User } from 'firebase';

const style = {
	entryButtonCont: {
		maxWidth: 1024,
	},
	entryButton: { border: '2px solid lightblue', borderRadius: 10, maxWidth: 300 },
	companyLogos: {
		display: 'flex',
		width: '100%',
	},
	logo: {
		width: 'auto',
		height: 32,
	},
}

const ReferrerEntryButton = (props: {onClick: () => void}) => (
    <EntryButton
        title="I can refer people"
        subtitle={null}
        onClick = {props.onClick}
    />
);

const CandidateEntryButton = (props: {onClick: () => void}) => (
    <EntryButton
        title="I want to be referred"
        subtitle={null}
        onClick = {props.onClick}
    />
);


function EntryButtonSection(props: {user: User | null, onLeftClick: () => void, onRightClick: () => void}) {           
    const {onLeftClick, onRightClick} = props;
    return (
        <div className="flex justify-center">
            <Row style={style.entryButtonCont} className="flex flex-row mt2">
                <Col style={{paddingRight: 10}}>
                    <Tooltip title='Get referred to your dream companies with just one click.'>
                        <CandidateEntryButton onClick={onRightClick} />
                    </Tooltip>
                </Col>
                <Col>
                <Tooltip title='Refer people without exposing your personal info.'>
                    <ReferrerEntryButton onClick={onLeftClick} />
                </Tooltip>
                </Col>
            </Row>
        </div>
    );
}

export default EntryButtonSection