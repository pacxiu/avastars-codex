import { useRouter } from 'next/dist/client/router';
import { Box } from 'theme-ui';

const ProfilePage = () => {
  const { query } = useRouter();

  return <Box>Profile page for: {query.address}</Box>;
};

export default ProfilePage;
