import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Layout from '../components/Layout';
import '../styles/globals.css';
import * as gtag from '../lib/gtag';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const [isSearchShow, setSearchShow] = useState(false);

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routerChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  const handleShowSearchBar = () => {
    setSearchShow(!isSearchShow);
  }

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?q=${query}`);
    setSearchShow(false);
  };

  return (
    <Layout handleQuery={handleQuery} handleSubmit={handleSubmit} handleShowSearchBar={handleShowSearchBar} isSearchShow={isSearchShow}>
      <Component {...pageProps} query={query} />
    </Layout>
  );
}

export default MyApp;
