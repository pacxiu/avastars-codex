import { Box } from 'theme-ui';

// import Menu from 'components/Menu';
// import Footer from 'components/Footer';

import { pxToRem } from 'theme';
import { WithChildren } from 'types';

const Layout = ({ children }: WithChildren) => (
  <>
    {/* <Menu /> */}
    <Box>Menu</Box>
    <Box as="main" sx={{ pt: pxToRem(125) }}>
      {children}
    </Box>
    <Box>Footer</Box>
    {/* <Footer /> */}
  </>
);

export default Layout;
