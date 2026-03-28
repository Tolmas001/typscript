import { Tariff } from '@/types/tariff';

const API_URL = '/api/tariffs';

export async function fetchTariffs(): Promise<Tariff[]> {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch tariffs: ${response.status}`);
  }

  const data = await response.json();
  return data;
}