import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ToastProvider, DefaultToastContainer} from 'react-toast-notifications';
import theme from '../theme';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  const Layout = Component.Layout ? Component.Layout : React.Fragment;

  const ToastContainer = props => (
    <DefaultToastContainer
      style={{ marginTop: 70}}
      {...props}
    />
  );

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Todo Tasks</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ToastProvider 
        autoDismiss={true} 
        autoDismissTimeout="3000"
        components={{ ToastContainer }}
      >
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Layout>
                <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
      </ToastProvider>
    </>
  );
}
