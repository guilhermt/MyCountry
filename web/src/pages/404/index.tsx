import { Container, Text } from '@mantine/core';
import { MainLayout } from '@/common/Layout';

export const NotFoundPage = () => (
  <MainLayout>
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        justifyContent: 'center',
      }}
    >
      <Text fz={30} fw={600}>
      Página não encontrada
      </Text>
    </Container>
  </MainLayout>
);
