import '../styles/globals.css'
import NextNprogress from 'nextjs-progressbar'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <NextNprogress color='#ffa500' />
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
