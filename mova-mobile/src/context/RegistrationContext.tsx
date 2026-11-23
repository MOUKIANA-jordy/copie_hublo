import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

export type SelectedJob = {
  sector: string;
  slug: string;
  name: string;
};

type RegistrationData = {
  sectors: string[];
  jobs: SelectedJob[];

  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  password: string;

  city: string;
  postalCode: string;

  availableNow: boolean;
  days: string[];
  timeSlots: string[];
  distance: number;
};

type RegistrationContextType = {
  data: RegistrationData;

  updateRegistration: (
    values: Partial<RegistrationData>
  ) => void;

  resetRegistration: () => void;
};

const initialData: RegistrationData = {
  sectors: [],
  jobs: [],

  firstName: "",
  lastName: "",
  email: "",
  phone: "",

  password: "",

  city: "",
  postalCode: "",

  availableNow: true,
  days: [],
  timeSlots: [],
  distance: 20,
};

const RegistrationContext =
  createContext<RegistrationContextType | undefined>(
    undefined
  );

export function RegistrationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [data, setData] =
    useState<RegistrationData>(initialData);

  const updateRegistration = (
    values: Partial<RegistrationData>
  ) => {
    setData((current) => ({
      ...current,
      ...values,
    }));
  };

  const resetRegistration = () => {
    setData(initialData);
  };

  return (
    <RegistrationContext.Provider
      value={{
        data,
        updateRegistration,
        resetRegistration,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const context = useContext(RegistrationContext);

  if (!context) {
    throw new Error(
      "useRegistration doit être utilisé dans RegistrationProvider"
    );
  }

  return context;
}
