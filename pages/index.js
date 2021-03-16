import Cards from '../components/Cards';

export default function Home({ newsletters, query }) {
  // newsletters = newsletters.filter((item) => {
  //   let isQueryIncluded = false;
  //   if (item.title.includes(query) || item.description.includes(query)) {
  //     isQueryIncluded = true;
  //   }
  //   item.tags.forEach((tag) => {
  //     if (tag.includes(query)) {
  //       isQueryIncluded = true;
  //     }
  //   });

  //   if (isQueryIncluded) {
  //     return item;
  //   }
  // });
  return (
    <div>
      <Cards category={'모두보기'} newsletters={newsletters} />
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(
    `https://birdmii.github.io/newsletter-api/newsletters.json`,
  );
  const newsletters = await res.json();

  let m = newsletters.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = newsletters[m];
    newsletters[m] = newsletters[i];
    newsletters[i] = t;
  }
  return {
    props: {
      newsletters,
    },
  };
};
