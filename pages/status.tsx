import { List, Button } from 'antd'
import { Companies } from 'lib/companies'
import MainHead from 'components/MainHead'

const style = {
	list: {
		maxWidth: 1024,
		width: '100%',
	},
	logo: {
		width: 'auto',
		height: 32,
	},
}

function Status() {
	return (
		<>
			<MainHead title="Status" />
			<div className="flex justify-center">
				<List
					style={style.list}
					itemLayout="horizontal"
					dataSource={Companies}
					renderItem={(item) => {
						const actions = [
							<Button type="primary">Refer me</Button>,
							<Button danger type="link">
								Cancel
							</Button>,
						]
						return (
							<List.Item actions={actions}>
								<List.Item.Meta avatar={<img style={style.logo} src={`/img/logos/${item.key}.png`} />} description={item.name} />
							</List.Item>
						)
					}}
				/>
			</div>
		</>
	)
}

export default Status
