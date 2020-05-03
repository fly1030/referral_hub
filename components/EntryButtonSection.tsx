import EntryButton from './EntryButton';
import { AlertOutlined, CheckOutlined } from '@ant-design/icons'
import { Divider } from 'antd'
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
        subtitle={
            <span>
                Refer people without exposing your personal info <CheckOutlined className="h2" style={{ color: '#7cb305' }} />.
            </span>
        }
        onClick = {props.onClick}
    />
);

const CandidateEntryButton = (props: {onClick: () => void}) => (
    <EntryButton
        title="I want to be referred"
        subtitle={
            <span>
                Get updates as the referral process progresses <AlertOutlined className="h2" style={{ color: '#f5222d' }} />.
            </span>
        }
        onClick = {props.onClick}
    />
);


function EntryButtonSection(props: {user: User | null, onLeftClick: () => void, onRightClick: () => void}) {           
    const {user, onLeftClick, onRightClick} = props;
    return (
        <div className="flex justify-center">
            <div style={style.entryButtonCont} className="flex flex-row justify-center mt4">
                <ReferrerEntryButton onClick={onLeftClick} />
                <Divider type="vertical" style={{ height: '100%' }} />
                <CandidateEntryButton onClick={onRightClick} />
            </div>
        </div>
    );
}

export default EntryButtonSection