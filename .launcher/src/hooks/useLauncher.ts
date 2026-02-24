import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';

import { v4 as uuidv4 } from 'uuid';

export type LauncherState = 'IDLE' | 'INITIALIZE' | 'LAUNCH' | 'ACTIVE';

export type LoaderType = 'Vanilla' | 'Fabric' | 'NeoForge';

export interface Instance {
  id: string;
  name: string;
  slug: string;
  version: string;
  loader: LoaderType;
  icon: string | null;
  time_played: number;
  last_played: number | null;
}

export function useLauncher() {
  const [state, setState] = useState<LauncherState>('IDLE');
  const [ram, setRam] = useState('4G');
  
  // Real instances state
  const [instances, setInstances] = useState<Instance[]>([]);
  const [selectedInstanceId, setSelectedInstanceId] = useState<string | null>(null);

  const [playerName, setPlayerName] = useState<string | null>(null);
  const [installedVersions, setInstalledVersions] = useState<string[]>([]);

  const fetchInstances = async () => {
    try {
      const fetched = await invoke<Instance[]>('get_instances');
      setInstances(fetched);
      if (fetched.length > 0 && !selectedInstanceId) {
        setSelectedInstanceId(fetched[0].id);
      } else if (fetched.length === 0) {
        setSelectedInstanceId(null);
      }
    } catch (e) {
      console.error("Failed to fetch instances", e);
    }
  };

  useEffect(() => {
    const unlisten = listen<string>('game-log', (event) => {
      console.log(event.payload);
    });

    const init = async () => {
      try {
        const fetched = await invoke<Instance[]>('get_instances');
        setInstances(fetched);
        if (fetched.length > 0 && !selectedInstanceId) {
          setSelectedInstanceId(fetched[0].id);
        } else if (fetched.length === 0) {
          setSelectedInstanceId(null);
        }

        const versions = await invoke<string[]>('scan_installed_versions');
        if (versions.length > 0) {
          setInstalledVersions(versions);
        }
      } catch (e) {
        console.error("Failed to init", e);
      }
    };
    
    init();

    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  const authenticate = async () => {
    try {
      const name = await invoke<string>('start_microsoft_oauth');
      if (name) {
        setPlayerName(name);
      }
    } catch (error) {
      console.error("Auth failed:", error);
    }
  };

  const createInstance = async (name: string, slug: string, version: string, loader: LoaderType) => {
    const newInstance: Instance = {
      id: uuidv4(),
      name,
      slug,
      version,
      loader,
      icon: null,
      time_played: 0,
      last_played: null,
    };
    
    await invoke('create_instance', { instance: newInstance });
    await fetchInstances();
    setSelectedInstanceId(newInstance.id);
  };

  const deleteInstance = async (slug: string) => {
    await invoke('delete_instance', { slug });
    await fetchInstances();
  };

  const handleLaunch = async () => {
    if (state === 'IDLE' || state === 'ACTIVE') return;

    if (state === 'INITIALIZE') {
      try {
        console.log('[INFO] Checking dependencies...');
        const hasMinecraft = await invoke<boolean>('check_minecraft_dir');
        
        if (!hasMinecraft) {
           console.log('[WARN] .minecraft directory not found or unreachable.');
        }

        console.log('[INFO] Downloading version manifest...');
        await invoke<string>('download_manifest');
        
        setState('LAUNCH');
      } catch (err: unknown) {
        console.error(`[ERROR] Init failed: ${err}`);
        setState('IDLE');
      }
    } else if (state === 'LAUNCH') {
      try {
        const selectedInstance = instances.find(i => i.id === selectedInstanceId);
        if (!selectedInstance) throw new Error("No instance selected");

        setState('ACTIVE');
        await invoke('launch_game', { version: selectedInstance.version, ram });
      } catch (err: unknown) {
        console.error(`[ERROR] Launch failed: ${err}`);
        setState('IDLE');
      }
    }
  };

  const killProcess = () => {
    // A placeholder for killing the actual process logic
    console.log('[INFO] Process terminated by user.');
    setState('IDLE');
  };

  return {
    state,
    setState,
    instances,
    selectedInstanceId,
    setSelectedInstanceId,
    createInstance,
    deleteInstance,
    ram,
    setRam,
    playerName,
    authenticate,
    handleLaunch,
    killProcess,
    installedVersions
  };
}
