import { useRouter } from 'next/router'
import Cards from '../components/Cards'

const search = ({newsletters}) => {
  const router = useRouter();
  const query = router.query.q

  newsletters = newsletters.filter((item) => {
    let isQueryIncluded = false;
    if (item.title.includes(query) || item.description.includes(query)) {
      isQueryIncluded = true;
    }
    item.tags.forEach((tag) => {
      if (tag.includes(query)) {
        isQueryIncluded = true;
      }
    });

    if (isQueryIncluded) {
      return item;
    }
  });

  return (
    <div>
      <Cards category={'검색 결과'} newsletters={newsletters} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch(
    `https://birdmii.github.io/newsletter-api/newsletters.json`,
  );
  const newsletters = await res.json();

  return {
    props: {
      newsletters,
    },
  };
};


export default search
