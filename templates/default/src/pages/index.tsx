import { I_PAGE_DATA } from 'types';

interface IProps {
  pageData: I_PAGE_DATA;
}

export default function Index({ pageData }: IProps) {
  return (
    <>
      <section className="w-full min-h-screen flex items-center justify-center">
        <h1 className="text-9xl">{pageData.title}</h1>
      </section>
    </>
  );
}

export const getStaticProps = async (ctx: { locale: string }) => {
  const pageData: I_PAGE_DATA = {
    title: 'Hello Brink!',
  };

  return {
    props: {
      pageData,
    },
    revalidate: 100,
  };
};
