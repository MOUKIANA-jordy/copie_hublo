import * as SecureStore from "expo-secure-store";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

type LoginResponse = {
  access: string;
  refresh: string;
};

export async function loginUser(
  email: string,
  password: string
): Promise<void> {
  if (!API_URL) {
    throw new Error("Adresse du serveur non configurée.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  let response: Response;

  try {
    response = await fetch(`${API_URL}/api/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        password,
      }),
      signal: controller.signal,
    });
  } catch {
    throw new Error(
      "Impossible de contacter le serveur MOVA. Vérifiez votre connexion."
    );
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    if (response.status === 401 || response.status === 400) {
      throw new Error("Email ou mot de passe incorrect.");
    }

    throw new Error(`Erreur du serveur (${response.status}).`);
  }

  const data: LoginResponse = await response.json();

  if (!data.access || !data.refresh) {
    throw new Error("Réponse d'authentification invalide.");
  }

  await SecureStore.setItemAsync("mova_access_token", data.access);
  await SecureStore.setItemAsync("mova_refresh_token", data.refresh);
}

