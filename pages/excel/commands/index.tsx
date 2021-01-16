import Head from 'next/head'
import dynamic from 'next/dynamic'

const CommandsWrapper = dynamic(import('../../../Components/excel/commandsWrapper'), {
    loading: () => <p>Loading...</p>,
    ssr: false
})

const index = () => {
    return (
    <div>
    <CommandsWrapper></CommandsWrapper>
    </div>)
}

export default index