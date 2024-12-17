import { Card, Container, Flex, Image, SimpleGrid, Stack, Text, UnstyledButton } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MainLayout } from '@/common/Layout';
import { useCountries } from '@/contexts/Countries';
import { CountryData, SimpleCountryData } from '@/@types/models';
import { useIsMobile } from '@/hooks/useIsMobile';

export const CountryPage = () => {
  const isMobile = useIsMobile();

  const { countryId } = useParams();

  const navigate = useNavigate();

  const { countries, handleGetCountry } = useCountries();

  const [country, setCountry] = useState<CountryData | null>(null);

  const fetchCountry = async (id: string) => {
    const res = await handleGetCountry(id);

    if (res) setCountry(res);
  };

  useEffect(() => {
    if (!countryId || country) return;

    fetchCountry(countryId);
  }, [countryId]);

  console.log(country);

  if (!country) return null;

  return (
    <MainLayout>
      <Container className="module-container">
        <Stack>
          <Stack align="center">
            <Text fz={24}>{country.name}</Text>
            <Image h={100} src={country.flag} />
          </Stack>

          <Stack>
            <Text ta="center">Borders</Text>

            <SimpleGrid cols={isMobile ? 2 : 4}>
              {country.borders.map(border => (
                <UnstyledButton onClick={() => navigate(`contries/${border.code}`)}>
                  <Card withBorder>
                    <Text>{border.name}</Text>
                  </Card>
                </UnstyledButton>
              ))}
            </SimpleGrid>
          </Stack>
        </Stack>
      </Container>
    </MainLayout>
  );
};
