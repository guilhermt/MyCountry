import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home';
import { NotFoundPage } from './pages/404';
import { CountriesProvider } from './contexts/Countries';
import { CountryPage } from './pages/Country';

const router = createBrowserRouter([
  {
    element: (
      <CountriesProvider>
        <Outlet />
      </CountriesProvider>
    ),
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/countries/:countryId',
        element: <CountryPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
