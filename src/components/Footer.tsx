import { Box, Container } from 'theme-ui';
import AppLink from './AppLink';

const Footer = () => {
  return (
    <Box as="footer" py={3}>
      <Container>
        Official website: <AppLink href="https://avastars.io/">https://avastars.io/</AppLink>
      </Container>
    </Box>
  );
};

export default Footer;
