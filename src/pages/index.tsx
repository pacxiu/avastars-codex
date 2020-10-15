import AppLink from 'components/AppLink';
import { Box, Button, Container, Heading, Text } from 'theme-ui';

export default function Home() {
  return (
    <Container>
      <Box sx={{ textAlign: 'center' }} mt={5}>
        <Heading as="h1">Avastars Codex</Heading>
        <Text sx={{ maxWidth: '50em', mx: 'auto', mt: 3 }}>
          Avastars is the ultimate digital collectibles project for an increasingly booming
          metaverse. Generative, addictive, and open to being used in unprecedented ways, Avastars
          tokens are trailblazers in a new golden era of digital collecting.
        </Text>
        <Box as="ul" sx={{ pl: 0, display: 'inline-block', mt: 4, textAlign: 'left' }}>
          <Heading variant="smallHeading" as="h2" sx={{ textAlign: 'center', mb: 2 }}>
            This website let`s you:
          </Heading>
          <Box as="li">explore Avastars collection with wide variety of filters</Box>
          <Box as="li">see details for given Avastar, in modal and dedicated page</Box>
          <Box as="li">investigate ethereum address on dedicated page</Box>
        </Box>
        <AppLink href="/codex" sx={{ mt: 4, display: 'block' }}>
          <Button>See Avastars Codex</Button>
        </AppLink>
        <Box sx={{ fontSize: 3, mt: 6 }}>
          <Text sx={{}}>
            Made for{' '}
            <AppLink href="https://gitcoin.co/hackathon/untitled-nft?">
              Untitled NFT Hackathon
            </AppLink>
          </Text>
          <Box mt={2}>
            <AppLink href="https://github.com/pacxiu/avastars-codex">Github repo</AppLink>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
