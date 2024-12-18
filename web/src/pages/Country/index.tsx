import { Box, Card, Container, Flex, Image, LoadingOverlay, ScrollAreaAutosize, SimpleGrid, Stack, Text, UnstyledButton } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AreaChart } from '@mantine/charts';
import { MainLayout } from '@/common/Layout';
import { useCountries } from '@/contexts/Countries';
import { CountryData } from '@/@types/models';
import { useIsMobile } from '@/hooks/useIsMobile';

export const CountryPage = () => {
  const isMobile = useIsMobile();

  const { countryId } = useParams();

  const navigate = useNavigate();

  const { handleGetCountry } = useCountries();

  const [country, setCountry] = useState<CountryData | null>(null);

  const [notFound, setNotFound] = useState(false);

  const formatPopulation = (value: number): string => {
    if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
    return value.toString();
  };

  const fetchCountry = async (id: string) => {
    const res = await handleGetCountry(id);

    if (!res) {
      setCountry(null);
      setNotFound(true);
      return;
    }

    setCountry(res);
  };

  const renderBorders = () => {
    if (!country?.borders.length) return null;

    return (
      <ScrollAreaAutosize h={350}>
        <Stack>
          <Text ta="center" fz={22} fw={500}>Borders</Text>

          <SimpleGrid cols={isMobile ? 2 : 4}>
            {country.borders.map(border => (
              <UnstyledButton onClick={() => {
                navigate(`/countries/${border.code}`);
                setCountry(null);
              }}
              >
                <Card withBorder>
                  <Text>{border.name}</Text>
                </Card>
              </UnstyledButton>
            ))}
          </SimpleGrid>
        </Stack>
      </ScrollAreaAutosize>
    );
  };

  useEffect(() => {
    if (countryId && !country) fetchCountry(countryId);
  }, [countryId, country]);

  if (!country) {
    return (
      <MainLayout>
        <Container className="module-container" pos="relative">
          {notFound && <Text>Ops! We could not find the data for this country</Text>}

          <Box w="100%" bg="red" mt="80dvh">
            <LoadingOverlay visible overlayProps={{ opacity: 0 }} />
          </Box>

        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container className="module-container">
        <Stack w="100%">
          <Flex gap={isMobile ? 20 : 200} align={isMobile ? 'center' : 'start'} justify="center" direction={isMobile ? 'column' : 'row'}>
            <Flex align="center" direction={isMobile ? 'column-reverse' : 'row'} gap={20}>
              <Image h={70} w="fit-content" fit="contain" src={country.flag} />

              <Text fz={28} fw={500}>{country.name}</Text>
            </Flex>

            {renderBorders()}
          </Flex>

          <Stack align="center" mt={isMobile ? 20 : 0}>
            <Text fz={28} fw={500}>Population</Text>

            <AreaChart
              h={400}
              data={country.population}
              dataKey="year"
              series={[
                { name: 'value', color: 'indigo.6', label: 'population' },
              ]}
              curveType="natural"
              tickLine="none"
              yAxisProps={{
                tickFormatter: formatPopulation, // Format Y-axis values
              }}
            />
          </Stack>

        </Stack>
      </Container>
    </MainLayout>
  );
};
