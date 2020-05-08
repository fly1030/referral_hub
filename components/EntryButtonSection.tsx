import EntryButton from './EntryButton';
import { AlertOutlined, CheckOutlined } from '@ant-design/icons'
import { Divider, Tooltip } from 'antd'
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
    const {user, onLeftClick, onRightClick} = props;
    return (
        <div className="flex justify-center">
            <div style={style.entryButtonCont} className="flex flex-row justify-center mt2">
                <Tooltip title='Get referred to your dream companies with just one click.'>
                    <CandidateEntryButton onClick={onRightClick} />
                </Tooltip>
                <Tooltip title='Refer people without exposing your personal info.'>
                    <ReferrerEntryButton onClick={onLeftClick} />
                </Tooltip>
            </div>
        </div>
    );
}

export default EntryButtonSection