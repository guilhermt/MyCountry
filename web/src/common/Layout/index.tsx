import { AppShell, Center, Flex, Text, UnstyledButton } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/useIsMobile';

interface Props {
  children: JSX.Element;
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  const isMobile = useIsMobile();

  const navigate = useNavigate();

  return (
    <AppShell
      header={{ height: isMobile ? 55 : 80 }}
    >
      <AppShell.Header>
        <Center h="100%">
          <UnstyledButton onClick={() => navigate('/')}>
            <Flex h="100%" align="center">
              <Text fz={28} fw={600} ta="center" w="100%">
                MyCountry
              </Text>
            </Flex>
          </UnstyledButton>
        </Center>
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
