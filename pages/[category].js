import { useRouter } from 'next/router';
import Cards from '../components/Cards';
import { getCategoryData } from './api/newsletter';

const categories = [
  { code: 'economy', title: '경제' },
  { code: 'education', title: '교육' },
  { code: 'news', title: '뉴스' },
  { code: 'design', title: '디자인' },
  { code: 'lifestyle', title: '라이프스타일' },
  { code: 'marketing', title: '마케팅' },
  { code: 'culture', title: '문화' },
  { code: 'work', title: '일과 노동' },
  { code: 'society', title: '사회' },
  { code: 'tech', title: '테크' },
  { code: 'trend', title: '트렌드' },
];

const Category = ({ newsletters, query }) => {
  const router = useRouter();
  const { category } = router.query;
  let categoryTitle = categories.map((item) => {
    if (item.code === category) return item.title;
  });

  return (
    <div>
      <Cards category={categoryTitle} newsletters={newsletters} />
    </div>
  );
};

export const getStaticPaths = async () => {
  const paths = categories.map((category) => ({
    params: { category: category.code },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const newsletters = await getCategoryData(params.category);

  return {
    props: {
      newsletters,
    },
    revalidate: 10,
  };
};

export default Category;
