import { AppShell, Flex, Text } from '@mantine/core';
import { useIsMobile } from '@/hooks/useIsMobile';

interface Props {
  children: JSX.Element;
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <AppShell
      header={{ height: isMobile ? 55 : 80 }}
    >
      <AppShell.Header>
        <Flex h="100%" align="center">
          <Text fz={28} fw={600} ta="center" w="100%">
            MyCountry
          </Text>
        </Flex>
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
