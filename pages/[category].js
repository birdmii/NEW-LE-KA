import { useRouter } from 'next/router';
import Cards from '../components/Cards';

const categories = [
  { code: 'design', title: '디자인' },
  { code: 'develop', title: '개발' },
  { code: 'career', title: '커리어' },
  { code: 'marketing', title: '마케팅' },
  { code: 'sci-tech', title: '과학과 기술' },
  { code: 'lifestyle', title: '라이프스타일' },
  { code: 'news', title: '뉴스' },
  { code: 'travel', title: '여행' },
  { code: 'society', title: '사회' },
  { code: 'economy', title: '경제' },
  { code: 'culture', title: '문화' },
];

const Category = ({ newsletters, query }) => {
  const router = useRouter();
  const { category } = router.query;
  let categoryTitle = categories.map((item) => {
    if (item.code === category) return item.title;
  });

  // newsletters = newsletters.filter((item) => {
  //   let isQueryIncluded = false;
  //   if (item.title.includes(query) || item.description.includes(query)) {
  //     isQueryIncluded = true;
  //   }
  //   item.tags.forEach((tag) => {
  //     if(tag.includes(query)) {
  //       isQueryIncluded = true;
  //     }
  //   });

  //   if(isQueryIncluded) {
  //     return item;
  //   }
  // });

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
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const res = await fetch(
    `https://birdmii.github.io/newsletter-api/newsletters.json`,
  );
  let newsletters = await res.json();

  newsletters = newsletters.filter(
    (newsletter) => newsletter.categoriesCode === params.category,
  );
  return {
    props: {
      newsletters,
    },
  };
};

export default Category;
