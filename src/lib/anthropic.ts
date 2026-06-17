import Anthropic from '@anthropic-ai/sdk';

const STORAGE_KEY = 'kryssbee_anthropic_key';

export function getStoredApiKey(): string {
  return localStorage.getItem(STORAGE_KEY) ?? import.meta.env.VITE_ANTHROPIC_API_KEY ?? '';
}

export function setStoredApiKey(key: string): void {
  if (key) localStorage.setItem(STORAGE_KEY, key);
  else localStorage.removeItem(STORAGE_KEY);
}

export function isApiKeyConfigured(): boolean {
  return Boolean(getStoredApiKey());
}

export function createAnthropicClient(apiKey?: string): Anthropic {
  const key = apiKey ?? getStoredApiKey();
  if (!key) throw new Error('Clé API Anthropic non configurée. Va dans Paramètres pour l\'ajouter.');
  // dangerouslyAllowBrowser is intentional for this personal learning platform
  return new Anthropic({ apiKey: key, dangerouslyAllowBrowser: true });
}
