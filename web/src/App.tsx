import '@mantine/core/styles.css';
import {
  CSSVariablesResolver,
  MantineProvider,
  MantineThemeOverride,
  createTheme,
} from '@mantine/core';
import { Router } from './Router';
import { scales } from './contants/scales';
import { useDevices } from './hooks/useDevices';

export default function App() {
  const device = useDevices();

  const scale = scales[device];

  const theme: MantineThemeOverride = createTheme({
    scale,
    primaryColor: 'violet',
  });

  const resolver: CSSVariablesResolver = () => ({
    variables: {},
    light: {
      '--mantine-color-body': '#f5f5f5',
    },
    dark: {},
  });

  return (
    <MantineProvider theme={theme} defaultColorScheme="light" cssVariablesResolver={resolver}>
      <Router />
    </MantineProvider>
  );
}
