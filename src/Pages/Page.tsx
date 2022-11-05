import { useQuery } from '@apollo/client';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { useParams } from 'react-router-dom';
import { pageQuery } from '../graphql/queries';

const Page = () => {
  const { slug } = useParams();
  const { loading, error, data } = useQuery(pageQuery, {
    variables: {
      slug: slug
    }
  });

  if (error) {
    console.log(error);
  };

  return (
    <>
      {!loading && data.pages.map((page: any) => {
        return (
          <div key={page.id}>
            <h2>{page.title}</h2>
            <RichText content={page.content.raw} />
          </div>
        );
      })}
    </>
  );
};
export default Page;