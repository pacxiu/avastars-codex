import { Box, useThemeUI } from 'theme-ui';
import { CUSTOM_SIZES } from 'theme';
import { WithChildren } from 'types';
// import Footer from './Footer',
import Menu from './Menu';

const Layout = ({ children }: WithChildren) => {
  const { colorMode } = useThemeUI();

  return (
    <>
      <Menu />
      <Box
        as="main"
        sx={{
          pt: CUSTOM_SIZES.menuHeight,
          position: 'relative',
          flex: 1,
          '&:after': {
            position: 'absolute',
            display: 'block',
            content: "''",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `url('/static/${
              colorMode === 'dark' ? 'darkBg' : 'bg'
            }.png') no-repeat top center`,
            backgroundAttachment: 'fixed',
            opacity: 0.6,
            zIndex: -1,
          },
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default Layout;
