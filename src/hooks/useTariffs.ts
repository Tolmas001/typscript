import { useState, useEffect, useMemo } from 'react';
import { Tariff } from '@/types/tariff';
import { fetchTariffs } from '@/services/api';

interface UseTariffsReturn {
  tariffs: Tariff[];
  selectedTariff: Tariff | null;
  isLoading: boolean;
  error: string | null;
  selectTariff: (tariff: Tariff) => void;
}

export function useTariffs(): UseTariffsReturn {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [selectedTariff, setSelectedTariff] = useState<Tariff | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTariffs = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTariffs();
        setTariffs(data);

        const bestTariff = data.find((t) => t.is_best);
        if (bestTariff) {
          setSelectedTariff(bestTariff);
        } else if (data.length > 0) {
          setSelectedTariff(data[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tariffs');
      } finally {
        setIsLoading(false);
      }
    };

    loadTariffs();
  }, []);

  const selectTariff = (tariff: Tariff) => {
    setSelectedTariff(tariff);
  };

  return {
    tariffs,
    selectedTariff,
    isLoading,
    error,
    selectTariff,
  };
}