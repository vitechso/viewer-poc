import Head from 'next/head'
import dynamic from 'next/dynamic'

const FunctionsWrapper = dynamic(() => import('@ql/components/excel/functionsWrapper'), {
	loading: () => <p>Loading...</p>,
	ssr: false
});

const index = () => {
	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
				<meta httpEquiv="Expires" content="0" />
			</Head>
			<FunctionsWrapper />
		</>
	)
}

export default index