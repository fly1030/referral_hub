import { Select } from 'antd'
const MAX_COUNT = 3
function JobIDSelector(props: { jobIDs: Array<string>; onSelectorChange: (value: Array<string>) => void; careerPage?: string }) {
	return (
		<div className="flex flex-column">
			<Select
				value={props.jobIDs}
				dropdownClassName="display-none"
				mode="tags"
				placeholder="Job links"
				onChange={(jobIDs: Array<string>) => {
					if (jobIDs.length <= MAX_COUNT) {
						props.onSelectorChange(jobIDs)
					}
				}}
			></Select>
			{props.careerPage && (
				<a href={props.careerPage} target="_blank">
					Company's Jobs Board
				</a>
			)}
		</div>
	)
}

export default JobIDSelector
