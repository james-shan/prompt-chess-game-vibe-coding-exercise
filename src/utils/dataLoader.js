import Papa from 'papaparse';
import yaml from 'js-yaml';

/**
 * Load and parse the CSV file with tournament standings
 */
export async function loadStandings() {
  try {
    const response = await fetch('/data/final_standings.csv');
    const text = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim(),
        complete: (results) => {
          const data = results.data.map(row => ({
            Rank: parseInt(row.Rank),
            Player: row.Player.trim(),
            Rating_Mu: parseFloat(row.Rating_Mu),
            Rating_Sigma: parseFloat(row.Rating_Sigma),
            Wins: parseInt(row.Wins),
            Draws: parseInt(row.Draws),
            Losses: parseInt(row.Losses),
            Games: parseInt(row.Games),
            Win_Rate: parseFloat(row.Win_Rate),
          }));
          resolve(data);
        },
        error: (error) => reject(error),
      });
    });
  } catch (error) {
    console.error('Error loading standings:', error);
    throw error;
  }
}

/**
 * Extract player name from YAML filename
 * Example: "mutolovincent_660111_25380863_config.yml" -> "mutolovincent"
 */
export function extractPlayerName(filename) {
  return filename.split('_')[0].toLowerCase();
}

/**
 * Load a specific player's YAML config file by trying to fetch it
 * We'll try common filename patterns based on the player name
 */
export async function loadPlayerConfig(playerName) {
  const normalizedName = playerName.toLowerCase();
  
  // List of known YAML filenames - in production, you'd get this from an API
  // For now, we'll try to fetch with a pattern or use a manifest
  try {
    // Try fetching directly - Vite will serve files from public/data
    // We need to know the exact filename, so we'll create a mapping
    const response = await fetch(`/data/prompt_collection/${normalizedName}_*.yml`);
    
    if (!response.ok) {
      // If direct fetch fails, return null - we'll handle gracefully
      return null;
    }
    
    const text = await response.text();
    const config = yaml.load(text);
    return config;
  } catch (error) {
    // File might not exist or have different naming - return null
    return null;
  }
}

/**
 * Create a player config cache that loads YAML files on demand
 * Since we can't list directory contents, we'll try to load when needed
 */
const playerConfigCache = new Map();

/**
 * Get player config with caching
 */
export async function getPlayerConfig(playerName, yamlFiles) {
  if (playerConfigCache.has(playerName)) {
    return playerConfigCache.get(playerName);
  }
  
  // Find matching YAML file
  const normalizedName = playerName.toLowerCase();
  const matchingFile = yamlFiles?.find(file => 
    file.toLowerCase().startsWith(normalizedName + '_')
  );
  
  if (!matchingFile) {
    return null;
  }
  
  try {
    const response = await fetch(`/data/prompt_collection/${matchingFile}`);
    if (!response.ok) {
      return null;
    }
    const text = await response.text();
    const config = yaml.load(text);
    playerConfigCache.set(playerName, config);
    return config;
  } catch (error) {
    console.error(`Error loading config for ${playerName}:`, error);
    return null;
  }
}

