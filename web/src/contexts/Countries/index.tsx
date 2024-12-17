import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { CountriesData, CountryData } from '@/@types/models';
import { getCountries, getCountry } from '@/services/countries';

interface CountriesContextData {
  countries: Countries;
  handleGetCountry: (countryId: string) => Promise<CountryData | null>
}

type Countries = {
  isLoading: boolean;
  data: CountriesData
};

interface Props {
  children: React.ReactNode;
}

const context = createContext<CountriesContextData>({} as CountriesContextData);

export const CountriesProvider: React.FC<Props> = ({ children }) => {
  const location = useLocation();

  const hasLoaded = useRef(false);

  const [countries, setCountries] = useState<Countries>({
    data: [],
    isLoading: false,
  });

  const handleFetchData = useCallback(async () => {
    setCountries((p) => ({
      ...p,
      isLoading: true,
    }));

    try {
      const countries = await getCountries();

      setCountries({
        data: countries,
        isLoading: false,
      });

      hasLoaded.current = true;
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleGetCountry = useCallback(async (countryId: string) => {
    try {
      const country = await getCountry(countryId);

      return country;
    } catch (e) {
      console.log(e);
      return null;
    }
  }, []);

  useEffect(() => {
    if (hasLoaded.current) return;

    const whiteList = ['/'];

    const path = location.pathname;

    const isAllowed = whiteList.includes(path);

    if (!isAllowed) return;

    handleFetchData();
  }, [location.pathname]);

  const value = useMemo(
    () => ({
      countries,
      handleGetCountry,
    }),
    [
      countries,
      handleGetCountry,
    ]
  );

  return <context.Provider value={value}>{children}</context.Provider>;
};

export const useCountries = () => {
  const ctx = useContext(context);

  if (!ctx) {
    throw new Error('Error inside of useCountries');
  }

  return ctx;
};
