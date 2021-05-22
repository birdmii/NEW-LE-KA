import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import '../styles/globals.css';
// import pageView from '../lib/gtag';
import SkeletonGrid from '../components/SkeletonGrid';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isSearchShow, setSearchShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currCategory, setCategory] = useState('');

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };

    // const handleRouteChange = (url) => {
    //   pageView(url);
    // };
    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);
    // router.events.on('routerChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
      // router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const handleShowSearchBar = () => {
    setSearchShow(!isSearchShow);
  };

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCategory('');
    router.push(`/search?q=${query}`);
    setSearchShow(false);
  };

  const handleClick = (e) => {
    const clicked = e.target.id;
    const currentCategory = clicked === '' ? 'home' : clicked;
    setCategory(currentCategory);
  }

  return (
    <Layout
      handleQuery={handleQuery}
      handleSubmit={handleSubmit}
      handleShowSearchBar={handleShowSearchBar}
      isSearchShow={isSearchShow}
      handleClick={handleClick}
    >
      {loading ? <SkeletonGrid category={currCategory}/> : <Component {...pageProps} query={query} />}
    </Layout>
  );
}

export default MyApp;
