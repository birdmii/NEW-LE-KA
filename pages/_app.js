import App from "next/app";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MainLayout from "../components/MainLayout";
import AdminLayout from "../components/AdminLayout";
import "../styles/globals.css";
import * as gtag from '../lib/gtag';
import SkeletonGrid from "../components/SkeletonGrid";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isSearchShow, setSearchShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currCategory, setCategory] = useState("");

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };

    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    router.events.on('routerChangeComplete', handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
      router.events.off('routeChangeComplete', handleRouteChange);
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
    setCategory("");
    router.push(`/search?q=${query}`);
    setSearchShow(false);
  };

  const handleClick = (e) => {
    const clicked = e.target.id;
    const currentCategory = clicked === "" ? "home" : clicked;
    setCategory(currentCategory);
  };

  if (router.pathname === "/admin" || router.pathname === "/login") {
    return (
      <AdminLayout>
        <Component {...pageProps} />;
      </AdminLayout>
    );
  }
  return (
    <MainLayout
      handleQuery={handleQuery}
      handleSubmit={handleSubmit}
      handleShowSearchBar={handleShowSearchBar}
      isSearchShow={isSearchShow}
      handleClick={handleClick}
    >
      {loading ? (
        <SkeletonGrid category={currCategory} />
      ) : (
        <Component {...pageProps} query={query} />
      )}
    </MainLayout>
  );
}

export default MyApp;
