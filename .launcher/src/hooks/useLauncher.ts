import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';

export type LauncherState = 'IDLE' | 'INITIALIZE' | 'LAUNCH' | 'ACTIVE';

export function useLauncher() {
  const [state, setState] = useState<LauncherState>('IDLE');
  const [logs, setLogs] = useState<string[]>([]);
  const [ram, setRam] = useState('4G');
  const [selectedVersion, setSelectedVersion] = useState('1.21.1');
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [installedVersions, setInstalledVersions] = useState<string[]>([]);

  useEffect(() => {
    const unlisten = listen<string>('game-log', (event) => {
      setLogs((prev) => [...prev, event.payload]);
    });

    const fetchVersions = async () => {
      try {
        const versions = await invoke<string[]>('scan_installed_versions');
        if (versions.length > 0) {
          setInstalledVersions(versions);
          setSelectedVersion(versions[0]);
        }
      } catch (e) {
        console.error("Failed to scan versions", e);
      }
    };
    
    fetchVersions();

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
      setLogs(prev => [...prev, `[ERROR] Authentication failed: ${error}`]);
    }
  };

  const handleLaunch = async () => {
    if (state === 'IDLE' || state === 'ACTIVE') return;

    if (state === 'INITIALIZE') {
      try {
        setLogs(['[INFO] Checking dependencies...']);
        const hasMinecraft = await invoke<boolean>('check_minecraft_dir');
        
        if (!hasMinecraft) {
           setLogs(prev => [...prev, '[WARN] .minecraft directory not found or unreachable.']);
        }

        setLogs(prev => [...prev, '[INFO] Downloading version manifest...']);
        await invoke<string>('download_manifest');
        
        setState('LAUNCH');
      } catch (err: unknown) {
        setLogs(prev => [...prev, `[ERROR] Init failed: ${err}`]);
        setState('IDLE');
      }
    } else if (state === 'LAUNCH') {
      try {
        setState('ACTIVE');
        await invoke('launch_game', { version: selectedVersion, ram });
      } catch (err: unknown) {
        setLogs(prev => [...prev, `[ERROR] Launch failed: ${err}`]);
        setState('IDLE');
      }
    }
  };

  const killProcess = () => {
    // A placeholder for killing the actual process logic
    setLogs(prev => [...prev, '[INFO] Process terminated by user.']);
    setState('IDLE');
  };

  return {
    state,
    setState,
    logs,
    selectedVersion,
    setSelectedVersion,
    ram,
    setRam,
    playerName,
    authenticate,
    handleLaunch,
    killProcess,
    installedVersions
  };
}
