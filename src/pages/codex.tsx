import AvastarCard from 'components/AvastarCard';
import Loader from 'components/Loader';
import { useDebounce } from 'hooks/useDebounce';
import { useEffect, useState } from 'react';
import { AvastarType, Gender, Rarity } from 'server/models/AvastarCollection';
import { GetAvastarsQueryParams, requestAvastars } from 'services/api';
import { CUSTOM_SIZES } from 'theme';
import { Box, Checkbox, Container, Flex, Heading, Label, Text } from 'theme-ui';

const GENDER_OPTIONS: { value: Gender | undefined; label: string }[] = [
  { value: undefined, label: 'Any' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

const RARITY_OPTIONS: { value: Rarity | undefined; label: string }[] = [
  { value: undefined, label: 'Any' },
  { value: 'common', label: 'Common' },
  { value: 'uncommon', label: 'Uncommon' },
  { value: 'rare', label: 'Rare' },
  { value: 'epic', label: 'Epic' },
  { value: 'legendary', label: 'Legendary' },
];

const SERIES_OPTIONS: { value: string | undefined; label: string }[] = [
  { value: undefined, label: 'Any' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
];

const Filters = ({ filters: { gender, rarity, series }, updateFilters }: any) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        top: CUSTOM_SIZES.menuHeight,
        bg: 'wheat',
        width: CUSTOM_SIZES.filtersWidth,
        p: 2,
      }}
    >
      <Box>Gender</Box>
      <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', mb: 4 }}>
        {GENDER_OPTIONS.map(({ label, value }) => (
          <Box key={label}>
            <Label>
              {label}
              <Checkbox
                onChange={() => updateFilters({ gender: value })}
                checked={gender === value}
              />
            </Label>
          </Box>
        ))}
      </Flex>
      <Box>Rarity</Box>
      <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', mb: 4 }}>
        {RARITY_OPTIONS.map(({ label, value }) => (
          <Box key={label}>
            <Label>
              {label}
              <Checkbox
                onChange={() => updateFilters({ rarity: value })}
                checked={rarity === value}
              />
            </Label>
          </Box>
        ))}
      </Flex>
      <Box>Series</Box>
      <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', mb: 4 }}>
        {SERIES_OPTIONS.map(({ label, value }) => (
          <Box key={label}>
            <Label>
              {label}
              <Checkbox
                onChange={() => updateFilters({ series: value })}
                checked={series === value}
              />
            </Label>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

const CodexPage = () => {
  const [avastars, setAvastars] = useState<AvastarType[] | undefined>(undefined);
  const [total, setTotal] = useState<number | undefined>(undefined);
  const [filters, setFilters] = useState<GetAvastarsQueryParams>({
    gender: undefined,
    rarity: undefined,
    series: undefined,
  });
  const debouncedFilters = useDebounce(filters, 500);

  const updateFilters = (updatedFilters: typeof filters) => {
    setFilters({ ...filters, ...updatedFilters });
  };

  useEffect(() => {
    const fetchAvastars = async () => {
      setAvastars(undefined);
      const { data, total } = await requestAvastars({ ...filters });
      setAvastars(data);
      setTotal(total);
    };

    fetchAvastars();
  }, [debouncedFilters]);

  return (
    <Box>
      <Filters {...{ filters, updateFilters }} />
      <Box sx={{ ml: CUSTOM_SIZES.filtersWidth }}>
        <Container>
          <Box sx={{ textAlign: 'center', mt: 3, mb: 4 }}>
            <Heading>Codex</Heading>
            <Text>Explore avastars with given criteria</Text>
          </Box>
          {avastars === undefined ? (
            <Loader />
          ) : avastars.length > 0 ? (
            <>
              <Text>Avastars ({total})</Text>
              <Flex sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                {avastars.map((avastar) => (
                  <AvastarCard {...avastar} key={avastar._id} />
                ))}
              </Flex>
            </>
          ) : (
            <Text>Couldn`t find any avastars matching given criteria.</Text>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default CodexPage;
