import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';

export type LoaderType = 'Vanilla' | 'Fabric' | 'NeoForge';

export interface Instance {
  id: string;
  name: string;
  slug: string;
  version: string;
  loader: LoaderType;
  icon?: string;
  time_played: number;
  last_played?: number;
}

export function useInstances() {
  const [instances, setInstances] = useState<Instance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInstances = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedInstances = await invoke<Instance[]>('get_instances');
      setInstances(fetchedInstances);
    } catch (err: unknown) {
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInstances();
  }, []);

  const createInstance = async (instance: Instance) => {
    try {
      await invoke('create_instance', { instance });
      await fetchInstances();
      return { success: true };
    } catch (err) {
      return { success: false, error: String(err) };
    }
  };

  const deleteInstance = async (slug: string) => {
    try {
      await invoke('delete_instance', { slug });
      await fetchInstances();
      return { success: true };
    } catch (err) {
      return { success: false, error: String(err) };
    }
  };

  const updateInstance = async (instance: Instance) => {
    try {
      await invoke('update_instance', { instance });
      await fetchInstances();
      return { success: true };
    } catch (err) {
      return { success: false, error: String(err) };
    }
  };

  return {
    instances,
    isLoading,
    error,
    fetchInstances,
    createInstance,
    deleteInstance,
    updateInstance
  };
}
