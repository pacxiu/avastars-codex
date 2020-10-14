import { useRouter } from 'next/dist/client/router';
import { Box } from 'theme-ui';

const AvastarPage = () => {
  const { query } = useRouter();

  return <Box>Avastar Page for {query.id}</Box>;
};

export default AvastarPage;
