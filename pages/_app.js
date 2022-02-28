import appConfig from '../config.json';
import Head from 'next/head';


function GlobalStyle() {
    return (
        <style global jsx>{`
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                list-style: none;
                transition: background-image .4s;
            }
            /* visited link */
            a:visited {
            color: white;
            }
            /* unvisited link */
            a:link {
            color: white;
            }
            body {
                font-family: 'Open Sans', sans-serif;
            }           
            html, body, #__next {
                min-height: 100vh;
                display: flex;
                flex: 1;
            }
            #__next {
                flex: 1;
            }
            #__next > * {
                flex: 1;
            }
            
        `}</style>
    );
}



export default function MyApp({ Component, pageProps }) {
    // console.log(pageProps);
    console.log("all pages");
    return(
        <>
            <Head>
                <meta charSet="utf-8" />
                <link rel="icon" href="images/favicon-16x16.png" />
                <title>Fun With Chats</title>
            </Head>
            
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
    
}