use serde::{Deserialize, Serialize};
use std::fs;
use std::path::{Path, PathBuf};
use std::sync::Mutex;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub enum LoaderType {
    Vanilla,
    Fabric,
    NeoForge,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Instance {
    pub id: String, // Unique UUID
    pub name: String,
    pub slug: String,    // e.g. "my-survival-world"
    pub version: String, // Minecraft version string (e.g. "1.21.1")
    pub loader: LoaderType,
    pub icon: Option<String>,     // Base64 or local path to icon
    pub time_played: u64,         // In seconds
    pub last_played: Option<u64>, // Unix timestamp
}

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct InstancesConfig {
    pub instances: Vec<Instance>,
}

pub struct InstanceManager {
    config_path: PathBuf,
}

impl InstanceManager {
    pub fn new() -> Self {
        let mut path = dirs::data_dir().unwrap_or_else(|| PathBuf::from("."));
        #[cfg(target_os = "windows")]
        path.push("vesper");
        #[cfg(not(target_os = "windows"))]
        path.push(".vesper");

        path.push("instances");

        // Ensure directory exists
        if !path.exists() {
            let _ = fs::create_dir_all(&path);
        }

        let config_path = path.join("instances.json");

        // Create empty config if it doesn't exist
        if !config_path.exists() {
            let default_config = InstancesConfig::default();
            let _ = fs::write(
                &config_path,
                serde_json::to_string_pretty(&default_config).unwrap(),
            );
        }

        Self { config_path }
    }

    pub fn load_config(&self) -> Result<InstancesConfig, String> {
        let content = fs::read_to_string(&self.config_path).map_err(|e| e.to_string())?;
        serde_json::from_str(&content).map_err(|e| e.to_string())
    }

    pub fn save_config(&self, config: &InstancesConfig) -> Result<(), String> {
        let content = serde_json::to_string_pretty(config).map_err(|e| e.to_string())?;
        fs::write(&self.config_path, content).map_err(|e| e.to_string())
    }

    pub fn get_instances(&self) -> Result<Vec<Instance>, String> {
        let config = self.load_config()?;
        Ok(config.instances)
    }

    pub fn create_instance(&self, instance: Instance) -> Result<(), String> {
        let mut config = self.load_config()?;

        // Ensure slug is unique
        if config.instances.iter().any(|i| i.slug == instance.slug) {
            return Err("Instance with this slug already exists".to_string());
        }

        // Create the instance directory
        let mut instance_dir = self.config_path.parent().unwrap().to_path_buf();
        instance_dir.push(&instance.slug);
        fs::create_dir_all(&instance_dir).map_err(|e| e.to_string())?;

        config.instances.push(instance);
        self.save_config(&config)
    }

    pub fn delete_instance(&self, slug: &str) -> Result<(), String> {
        let mut config = self.load_config()?;
        config.instances.retain(|i| i.slug != slug);
        self.save_config(&config)?;

        // Delete the instance directory
        let mut instance_dir = self.config_path.parent().unwrap().to_path_buf();
        instance_dir.push(slug);
        if instance_dir.exists() {
            let _ = fs::remove_dir_all(&instance_dir);
        }

        Ok(())
    }

    pub fn update_instance(&self, updated_instance: Instance) -> Result<(), String> {
        let mut config = self.load_config()?;
        if let Some(pos) = config
            .instances
            .iter()
            .position(|i| i.id == updated_instance.id)
        {
            // Handle rename of directory if slug changed
            let old_slug = &config.instances[pos].slug;
            if old_slug != &updated_instance.slug {
                let mut base_dir = self.config_path.parent().unwrap().to_path_buf();
                let old_dir = base_dir.join(old_slug);
                let new_dir = base_dir.join(&updated_instance.slug);
                if old_dir.exists() {
                    let _ = fs::rename(old_dir, new_dir);
                }
            }

            config.instances[pos] = updated_instance;
            self.save_config(&config)
        } else {
            Err("Instance not found".to_string())
        }
    }
}
