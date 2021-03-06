/**
 * Address of the Consul instance we're reading from
 */
export const CONSUL_ADDRESS: string = 'CONSUL_ADDRESS'

/**
 * Datacenter for the KV Store
 */
export const CONSUL_DC: string = 'CONSUL_DC'

/**
 * Consul Keys are a comma separated list of configs to load and merge
 */
export const CONSUL_KEYS: string = 'CONSUL_KEYS'

/**
 * Namespace to prepend to all Consul searches
 */
export const CONSUL_NAMESPACE: string = 'CONSUL_NAMESPACE'

/**
 * Path to local config files
 */
export const CONFIG_PATH: string = 'CONFIG_PATH'

export const NODE_CONFIG_DIR: string = 'NODE_CONFIG_DIR'

/**
 * Backup environment variable to use for config environment
 */
export const CONFIG_ENV: string = 'CONFIG_ENV'

/**
 * The key in the config where we find Vault configuration
 */
export const HVAULT_CONFIG_KEY: string = 'hashicorp-vault'

/**
 * Local folder, relative to cwd, to find configs
 */
export const DEFAULT_CONFIG_PATH: string = 'config'

/**
 * In the event NODE_ENV isn't set, this will be used
 */
export const DEFAULT_ENVIRONMENT: string = 'development'

/**
 * Other than cwd, what directories to search for configs (relative to cwd)
 */
export const CONFIG_SEARCH_PATHS = [
    'src', 'lib', 'main', 'dist', 'app',
]
