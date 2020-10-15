import { Box, Image, Text } from 'theme-ui';

const Loader = () => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Image src="/static/loader.gif" />
      <Text color="primary">Loading...</Text>
    </Box>
  );
};

export default Loader;
