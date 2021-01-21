import dynamic from 'next/dynamic'

const CommandsWrapper = dynamic(import('@ql/components/excel/commandsWrapper'), {
	loading: () => <p>Loading...</p>,
	ssr: false
})

const index = () => {
	return (
		<div>
			<CommandsWrapper></CommandsWrapper>
		</div>
	)
}

export default index