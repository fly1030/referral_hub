import { List, Button, Modal, Form, Select, Input } from 'antd'
import { Companies, Company } from 'lib/companies'
import MainHead from 'components/MainHead'
import { useState } from 'react'

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
type ReferralData = {
	positions: Array<string>
	resume: string
}
function ReferralDialog(props: { company: Company | null; onClose: () => void; onSubmit: (data: ReferralData) => void }) {
	const [formData, setFormData] = useState<ReferralData>(() => {
		return {
			positions: [],
			resume: '',
		}
	})
	return (
		<Modal
			title={
				<div className="flex justify-center items-center">
					<img className="mr1" style={style.logo} src={`/img/logos/${props.company?.key}.png`} />
					<span>{props.company?.name}</span>
				</div>
			}
			visible={props.company != null}
			onOk={() => {
				console.log('REFER')
			}}
			onCancel={props.onClose}
		>
			<Form initialValues={formData} labelAlign="left" labelCol={{ span: 4, offset: 0 }}>
				<Form.Item label="Positions" name="positions" rules={[{ required: true, message: 'Provide your desired positions' }]}>
					<Select mode="multiple" placeholder="Please select" defaultValue={['a10', 'c12']} onChange={() => {}} style={{ width: '100%' }}></Select>
				</Form.Item>
				<Form.Item label="Resume" name="resume" rules={[{ required: true, message: 'Enter a link to your resume' }]}>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	)
}
function Status() {
	const [referCompany, setReferCompany] = useState<Company | null>(null)
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
							<Button type="primary" onClick={() => setReferCompany(item)}>
								Refer me
							</Button>,
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
				<ReferralDialog
					company={referCompany}
					onClose={() => setReferCompany(null)}
					onSubmit={() => {
						console.log('submit!')
					}}
				/>
			</div>
		</>
	)
}

export default Status
