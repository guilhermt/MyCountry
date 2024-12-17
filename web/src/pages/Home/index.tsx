import { Card, Container, SimpleGrid, Text, UnstyledButton } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/common/Layout';
import { useCountries } from '@/contexts/Countries';
import { SimpleCountryData } from '@/@types/models';
import { useIsMobile } from '@/hooks/useIsMobile';

export const HomePage = () => {
  const isMobile = useIsMobile();

  const navigate = useNavigate();

  const { countries } = useCountries();

  const renderCountry = (country: SimpleCountryData) => (
    <UnstyledButton onClick={() => navigate(`countries/${country.code}`)}>
      <Card withBorder bg="gray.1">
        <Text>{country.name}</Text>
      </Card>
    </UnstyledButton>
  );

  return (
    <MainLayout>
      <Container className="module-container">
        <SimpleGrid cols={isMobile ? 2 : 4}>
          {countries.data.map(renderCountry)}
        </SimpleGrid>
      </Container>
    </MainLayout>
  );
};
