import AvastarCard from 'components/AvastarCard';
import AvastarDetailedView from 'components/AvastarDetailedView';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import { useDebounce } from 'hooks/useDebounce';
import { formatAddress } from 'providers/Web3Provider';
import { useEffect, useState } from 'react';
import { AvastarType } from 'server/models/AvastarCollection';
import { requestAvastars } from 'services/api';
import { CUSTOM_SIZES } from 'theme';
import { Box, Button, Container, Flex, Heading, Text } from 'theme-ui';
import Filters, { FiltersType, RARITY_OPTIONS, TRAIT_NAME_OPTIONS } from './Filters';

const Pagination = ({
  pagination,
  onChangePage,
  loading,
}: {
  pagination: {
    current: number;
    total: number;
  };
  onChangePage: (current: number) => void;
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
  const [filters, setFilters] = useState<FiltersType>({
    gender: undefined,
    rarity: undefined,
    series: undefined,
    from: 0,
    size: BATCH_SIZE,
    traitRarityCountRarity: RARITY_OPTIONS[0],
    traitRarityCountRange: [0, 12],
    traits: undefined,
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
        traitRarityCountRarity: filters.traitRarityCountRarity.value,
        traitRarityCountRange: filters.traitRarityCountRange.map((el) => el.toString()),
        traits: filters.traits
          ? filters.traits
              .filter((trait) => trait.value !== undefined)
              .map((trait) => trait.value as string)
          : undefined,
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

  const updateFilters = (updatedFilters: Partial<FiltersType>) => {
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
            <Heading>{owner ? `Profile for ${formatAddress(owner)}` : 'AvaDex'}</Heading>
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
