import AppLink from 'components/AppLink';
import { Box, Button, Container, Heading, Text } from 'theme-ui';

export default function Home() {
  return (
    <Container>
      <Box sx={{ textAlign: 'center' }} mt={5}>
        <Heading mb={3}>Avastars Codex</Heading>
        <Text mb={4}>
          Made for{' '}
          <AppLink href="https://gitcoin.co/hackathon/untitled-nft?">
            Untitled NFT Hackathon
          </AppLink>
        </Text>
        <AppLink href="/codex">
          <Button>Explore</Button>
        </AppLink>
      </Box>
    </Container>
  );
}
