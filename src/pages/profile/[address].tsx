import { useRouter } from 'next/dist/client/router';
import { Box, Container, Heading } from 'theme-ui';
import { utils } from 'ethers';
import { useEffect, useState } from 'react';
import Codex from 'components/Codex';
import Loader from 'components/Loader';

const ProfilePage = () => {
  const [isAddress, setIsAddress] = useState<boolean | undefined>(undefined);
  const { query } = useRouter();

  useEffect(() => {
    if (query.address) {
      setIsAddress(utils.isAddress(query.address as string));
    }
  }, [query]);

  return isAddress === true ? (
    <Codex owner={query.address as string} />
  ) : (
    <Container sx={{ mt: 3, textAlign: 'center' }}>
      {isAddress === undefined ? null : (
        <Heading variant="mediumHeading">{query.address} is not valid Ethereum address</Heading>
      )}
    </Container>
  );
};

export default ProfilePage;
