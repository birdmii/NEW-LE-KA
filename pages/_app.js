import { useState } from 'react';
import { useRouter } from 'next/router'
import Layout from '../components/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?q=${query}`);
  };

  return (
    <Layout handleQuery={handleQuery} handleSubmit={handleSubmit} >
      <Component {...pageProps} query={query} />
    </Layout>
  );
}

export default MyApp;
