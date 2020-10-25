import AvastarDetailedView from 'components/AvastarDetailedView';
import Loader from 'components/Loader';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { AvastarType } from 'server/models/AvastarCollection';
import { requestAvastar } from 'services/api';
import { Box, Container, Heading, Text } from 'theme-ui';

const AvastarPage = () => {
  const { query } = useRouter();
  const [avastar, setAvastar] = useState<AvastarType | null | undefined>(undefined);

  useEffect(() => {
    if (query.id) {
      const fetchAvastar = async () => {
        setAvastar(undefined);
        const { data } = await requestAvastar({ id: query.id as string });
        setAvastar(data);
      };

      fetchAvastar();
    }
  }, [query.id]);

  return (
    <Container mt={avastar === undefined ? 6 : 4}>
      {avastar !== undefined ? (
        avastar ? (
          <AvastarDetailedView {...{ avastar }} />
        ) : (
          <Text sx={{ textAlign: 'center' }}>Couldn`t find data for avastar {query.id}</Text>
        )
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default AvastarPage;
