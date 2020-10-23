import AvastarCard from 'components/AvastarCard';
import AvastarDetailedView from 'components/AvastarDetailedView';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import { useDebounce } from 'hooks/useDebounce';
import { useEffect, useState } from 'react';
import { AvastarType, GenderType, RarityType } from 'server/models/AvastarCollection';
import { GetAvastarsQueryParams, requestAvastars } from 'services/api';
import { CUSTOM_SIZES } from 'theme';
import { Box, Button, Checkbox, Container, Flex, Heading, Label, Text } from 'theme-ui';

const GENDER_OPTIONS: { value: GenderType | undefined; label: string }[] = [
  { value: undefined, label: 'Any' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

const RARITY_OPTIONS: { value: RarityType | undefined; label: string }[] = [
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

const Pagination = ({
  pagination,
  onChangePage,
  loading,
}: {
  pagination: any;
  onChangePage: any;
  loading: boolean;
}) => {
  return (
    <Flex sx={{ alignItems: 'center', justifyContent: 'center', mb: 4, mt: 2 }}>
      <Button
        variant="pagination"
        onClick={
          pagination.current === 1 || loading
            ? undefined
            : () => onChangePage(pagination.current - 1)
        }
        disabled={pagination.current === 1 || loading}
      >
        -
      </Button>
      <Text mx={2}>
        {pagination.current} of {pagination.total}
      </Text>
      <Button
        variant="pagination"
        onClick={
          pagination.current === pagination.total || loading
            ? undefined
            : () => onChangePage(pagination.current + 1)
        }
        disabled={pagination.current === pagination.total || loading}
      >
        +
      </Button>
    </Flex>
  );
};

const BATCH_SIZE = 10;

const Avadex = ({ owner }: { owner?: string }) => {
  const [avastars, setAvastars] = useState<AvastarType[] | undefined>(undefined);
  const [total, setTotal] = useState<number | undefined>(undefined);
  const [avastarModal, setAvastarModal] = useState<AvastarType | undefined>(undefined);
  // redeclare from and size to use of use as numbers and then parse as strings to query params
  const [filters, setFilters] = useState<
    Omit<GetAvastarsQueryParams, 'from' | 'size'> & {
      from: number;
      size: number;
    }
  >({
    gender: undefined,
    rarity: undefined,
    series: undefined,
    from: 0,
    size: BATCH_SIZE,
  });
  const [pagination, setPagination] = useState({ current: 1, total: 1 });
  const debouncedFilters = useDebounce(filters, 800);

  useEffect(() => {
    const fetchAvastars = async () => {
      setAvastars(undefined);
      const { data, total } = await requestAvastars({
        ...filters,
        from: filters.from.toString(),
        size: filters.size.toString(),
        owner,
      });

      setAvastars(data);
      setPagination({
        ...pagination,
        ...(filters.from === 0 && { current: 1 }),
        total: total > BATCH_SIZE ? Math.floor(total / BATCH_SIZE + 1) : 1,
      });
      setTotal(total);
    };

    fetchAvastars();
  }, [debouncedFilters]);

  const updateFilters = (updatedFilters: typeof filters) => {
    setFilters({ ...filters, ...updatedFilters, from: 0 });
  };

  const onChangePage = (current: number) => {
    setFilters({
      ...filters,
      from: (current - 1) * +filters.size,
    });
    setPagination({ ...pagination, current });
  };

  return (
    <Box>
      <Filters {...{ filters, updateFilters }} />
      <Box sx={{ ml: CUSTOM_SIZES.filtersWidth }}>
        <Container sx={{ maxWidth: '100%' }}>
          <Box sx={{ textAlign: 'center', my: 3 }}>
            <Heading>Avadex</Heading>
            <Text>Explore avastars with given criteria</Text>
          </Box>
          {avastars === undefined ? (
            <Loader />
          ) : avastars.length > 0 ? (
            <>
              <Text sx={{ fontSize: 6, color: 'primary', textTransform: 'uppercase' }}>
                Avastars ({total})
              </Text>
              <Flex sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                {avastars.map((avastar) => (
                  <AvastarCard {...{ avastar, setAvastarModal }} key={avastar._id} />
                ))}
              </Flex>
              <Pagination {...{ pagination, onChangePage, loading: avastars === undefined }} />
            </>
          ) : (
            <Text>Couldn`t find any avastars matching given criteria.</Text>
          )}
        </Container>
      </Box>
      <Modal onClose={() => setAvastarModal(undefined)} isOpen={avastarModal !== undefined}>
        {avastarModal && (
          <Box my={4}>
            <AvastarDetailedView {...{ avastar: avastarModal }} />
          </Box>
        )}
      </Modal>
    </Box>
  );
};

export default Avadex;
