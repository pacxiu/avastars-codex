import { formatAddress, useWeb3 } from 'providers/Web3Provider';
import { CUSTOM_SIZES, pxToRem } from 'theme';
import { Box, Button, Container, Flex, useThemeUI } from 'theme-ui';
import AppLink from './AppLink';
import { AvastarIcon, DarkMode, DefaultMode } from './Icons';

const ColorMode = () => {
  const { colorMode, setColorMode } = useThemeUI();

  return (
    <Flex
      onClick={() => setColorMode(colorMode === 'default' ? 'dark' : 'default')}
      sx={{
        border: 'normal',
        borderColor: 'primary',
        borderRadius: '1em',
        cursor: 'pointer',
        mr: 2,
      }}
    >
      <Box
        sx={{
          width: pxToRem(18),
          boxSizing: 'content-box',
          fontSize: '0px',
          borderTopLeftRadius: pxToRem(7),
          borderBottomLeftRadius: pxToRem(7),
          padding: `${pxToRem(2)} ${pxToRem(4)}`,
          ...(colorMode === 'dark' && {
            bg: 'primary',
            color: 'background',
          }),
          '> svg': {
            position: 'relative',
            top: '1px',
          },
        }}
      >
        <DarkMode />
      </Box>
      <Box
        sx={{
          width: pxToRem(20),
          boxSizing: 'content-box',
          fontSize: '0px',
          borderTopRightRadius: pxToRem(7),
          borderBottomRightRadius: pxToRem(7),
          padding: `${pxToRem(2)} ${pxToRem(4)}`,
          ...(colorMode === 'default' && {
            bg: 'primary',
            color: 'background',
          }),
        }}
      >
        <DefaultMode />
      </Box>
    </Flex>
  );
};

const Menu = () => {
  const { address, initWeb3 } = useWeb3();

  const getRandomAvatarId = () => 5;

  return (
    <Flex
      as="header"
      sx={{
        py: 3,
        borderBottom: 'normal',
        borderColor: 'primaryAlt',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: CUSTOM_SIZES.menuHeight,
        zIndex: 'menu',
        bg: 'background',
        alignItems: 'center',
      }}
    >
      <Container sx={{ maxWidth: '100%' }}>
        <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <AppLink href="/">
            <Flex sx={{ width: pxToRem(220) }}>
              <AvastarIcon />
            </Flex>
          </AppLink>
          <Flex
            sx={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              maxWidth: pxToRem(700),
              ml: 4,
              flex: 1,
            }}
          >
            <Box color="primary">
              <AppLink href="/avadex" sx={{ mr: 4 }}>
                AvaDex
              </AppLink>
              {/* <AppLink href="/avastar/[id]" as={`/avastar/${getRandomAvatarId()}`}>
                Random avastar
              </AppLink> */}
            </Box>
            <Flex sx={{ alignItems: 'center' }}>
              <ColorMode />
              {address ? (
                <AppLink href="/profile/[address]" as={`/profile/${address}`}>
                  <Button sx={{ fontSize: 3, ml: 3, minWidth: '10.5em' }}>
                    {formatAddress(address)}
                  </Button>
                </AppLink>
              ) : (
                <Button onClick={initWeb3} sx={{ fontSize: 3, ml: 3, minWidth: '10.5em' }}>
                  Connect Wallet
                </Button>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
};

export default Menu;
