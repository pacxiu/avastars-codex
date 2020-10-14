import Layout from 'components/Layout';
import { Box } from 'theme-ui';

const Test = ({ message }: { message: string }) => {
  return <>{message}</>;
};

export default function Home() {
  return (
    <Layout>
      <Box>
        <Test message="hey" />
      </Box>
    </Layout>
  );
}
