import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import client from '../graphql/apollo-client';
import { store } from '../redux/store';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                <>
                    <Navbar />
                    <Component {...pageProps} />
                </>
            </Provider>
        </ApolloProvider>
    );
}

export default MyApp;
