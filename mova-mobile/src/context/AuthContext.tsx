import * as SecureStore from "expo-secure-store";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  account_type: string;
  is_verified: boolean;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (access: string, refresh: string) => Promise<void>;
  signOut: () => Promise<void>;
  authenticatedFetch: (
    path: string,
    options?: RequestInit
  ) => Promise<Response>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const ACCESS_KEY = "mova_access_token";
const REFRESH_KEY = "mova_refresh_token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const clearSession = useCallback(async () => {
    await Promise.all([
      SecureStore.deleteItemAsync(ACCESS_KEY),
      SecureStore.deleteItemAsync(REFRESH_KEY),
    ]);
    setUser(null);
  }, []);

  const authenticatedFetch = useCallback(
    async (path: string, options: RequestInit = {}) => {
      if (!API_URL) {
        throw new Error("EXPO_PUBLIC_API_URL manquante");
      }

      let access = await SecureStore.getItemAsync(ACCESS_KEY);

      if (!access) {
        throw new Error("Utilisateur non connecté");
      }

      const makeRequest = (token: string) => {
        const headers = new Headers(options.headers);
        headers.set("Authorization", `Bearer ${token}`);

        return fetch(`${API_URL}${path}`, {
          ...options,
          headers,
        });
      };

      let response = await makeRequest(access);

      if (response.status === 401) {
        const refresh = await SecureStore.getItemAsync(REFRESH_KEY);

        if (!refresh) {
          await clearSession();
          throw new Error("Session expirée");
        }

        const refreshResponse = await fetch(
          `${API_URL}/api/auth/refresh/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh }),
          }
        );

        if (!refreshResponse.ok) {
          await clearSession();
          throw new Error("Session expirée");
        }

        const tokens = await refreshResponse.json();

        if (!tokens.access) {
          await clearSession();
          throw new Error("Token invalide");
        }

        await SecureStore.setItemAsync(ACCESS_KEY, tokens.access);

        if (tokens.refresh) {
          await SecureStore.setItemAsync(REFRESH_KEY, tokens.refresh);
        }

        response = await makeRequest(tokens.access);
      }

      return response;
    },
    [clearSession]
  );

  const loadUser = useCallback(async () => {
    try {
      const token = await SecureStore.getItemAsync(ACCESS_KEY);

      if (!token) {
        setUser(null);
        return;
      }

      const response = await authenticatedFetch("/api/auth/me/");

      if (!response.ok) {
        throw new Error(`Erreur profil : ${response.status}`);
      }

      const data: User = await response.json();
      setUser(data);
    } catch (error) {
      console.warn("Chargement session MOVA :", error);
      setUser(null);
    }
  }, [authenticatedFetch]);

  const signIn = useCallback(
    async (access: string, refresh: string) => {
      await SecureStore.setItemAsync(ACCESS_KEY, access);
      await SecureStore.setItemAsync(REFRESH_KEY, refresh);

      await loadUser();
    },
    [loadUser]
  );

  const signOut = useCallback(async () => {
    await clearSession();
  }, [clearSession]);

  useEffect(() => {
    const initialize = async () => {
      try {
        await loadUser();
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [loadUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signOut,
        authenticatedFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth doit être utilisé dans AuthProvider");
  }

  return context;
}
