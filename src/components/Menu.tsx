import { formatAddress, useWeb3 } from 'providers/Web3Provider';
import { CUSTOM_SIZES, pxToRem } from 'theme';
import { Box, Button, Container, Flex, Text } from 'theme-ui';
import AppLink from './AppLink';
import { AvastarIcon } from './Icons';

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
            <Box>
              <AppLink href="/avadex" sx={{ mr: 4 }}>
                Avadex
              </AppLink>
              <AppLink href="/avastar/[id]" as={`/avastar/${getRandomAvatarId()}`}>
                Random avastar
              </AppLink>
            </Box>
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
      </Container>
    </Flex>
  );
};

export default Menu;
