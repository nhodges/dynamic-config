export interface IRemoteOptions {
    [name: string]: any
}

export interface ISchemaMap {
    [key: string]: object
}

export interface IConfigOptions {
    configPath?: string
    configEnv?: string
    remoteOptions?: IRemoteOptions
    resolvers?: Array<ConfigResolver>
    loaders?: Array<IFileLoader>
    translators?: Array<IConfigTranslator>
    schemas?: ISchemaMap
}

export interface IConsulOptions {
    consulAddress?: string
    consulDc?: string
    consulKeys?: string
    consulNamespace?: string
}

export interface IRemoteOverrides {
    key: string
    [name: string]: string
}

export interface IDynamicConfig {
    register(...resolvers: Array<ConfigResolver>): void
    get<T = any>(key?: string): Promise<T>
    getAll(...args: Array<string>): Promise<Array<any>>
    getWithDefault<T = any>(key: string, defaultVal: T): Promise<T>
    getRemoteValue<T>(key: string): Promise<T>
    getSecretValue<T>(key: string): Promise<T>
}

// CONFIG TRANSLATOR TYPES

export interface IConfigTranslator {
    translate(configValue: any): any
}

export type ITranslator = (obj: any) => any

// FILE LOADER TYPES

export interface IFileLoader {
    type: string | Array<string>
    load(filePath: string): Promise<object>
}

export interface ILoadedFile {
    name: string
    config: object
}

// RESOLVER TYPES

export interface IResolverMap {
    names: Set<string>
    all: Map<string, ConfigResolver>
}

export type ConfigResolver =
    IRemoteResolver | ISecretResolver

export type SetFunction = (key: string, value: any) => void

export type RemoteInitializer = (dynamicConfig: IDynamicConfig, remoteOptions?: IRemoteOptions, setValue?: SetFunction) => Promise<any>

export interface IRemoteResolver {
    type: 'remote'
    name: string
    init: RemoteInitializer
    get<T>(key: string, type?: ObjectType): Promise<T>
}

export interface ISecretResolver {
    type: 'secret'
    name: string
    init: RemoteInitializer
    get<T>(key: string, type?: ObjectType): Promise<T>
}

// CONFIG TYPES

export type SourceType =
    'local' | 'remote' | 'secret' | 'env' | 'process'

export interface ISource {
    type: SourceType
    name: string
}

export type ConfigType =
    'root' | ObjectType | DeferredType

export type ObjectType =
    'object' | 'array' | 'string' | 'number' | 'boolean'

export type DeferredType =
    'promise' | 'placeholder'

export type WatchFunction =
    (val: any) => void

export interface IConfigValue {
    type: ConfigType
}

export interface IBaseConfigValue extends IConfigValue {
    source: ISource
    watchers: Array<WatchFunction>
}

export type ConfigValue =
    IRootConfigValue | BaseConfigValue

export type BaseConfigValue =
    IObjectConfigValue | IArrayConfigValue | IPrimitiveConfigValue |
    IPromisedConfigValue | IPlaceholderConfigValue

export interface IConfigProperties {
    [name: string]: BaseConfigValue
}

export interface IRootConfigValue extends IConfigValue {
    type: 'root'
    properties: IConfigProperties
}

export interface IRootConfigValue extends IConfigValue {
    type: 'root'
    properties: IConfigProperties
}

export interface IObjectConfigValue extends IBaseConfigValue {
    type: 'object'
    properties: IConfigProperties
}

export interface IArrayConfigValue extends IBaseConfigValue {
    type: 'array'
    items: Array<any>
}

export interface IPrimitiveConfigValue extends IBaseConfigValue {
    type: 'string' | 'number' | 'boolean'
    value: string | number | boolean
}

export interface IPromisedConfigValue extends IBaseConfigValue {
    type: 'promise'
    value: Promise<any>
}

export interface IPlaceholderConfigValue extends IBaseConfigValue {
    type: 'placeholder'
    value: IConfigPlaceholder
}

// CONFIG PLACEHOLDER TYPES

export type ResolverType =
    'remote' | 'secret'

export interface IResolver {
    name: string
    type: ResolverType
}

/**
 * Config placeholder as it appears in the raw config
 */
export interface IConfigPlaceholder {
    _source: string
    _key: string
    _type?: ObjectType
    _default?: any
}

/**
 * Config placeholder as is resolved after all resolvers have been registered.
 *
 * name - name of remote resolver
 * key - key to fetch from resolver
 * type - type of resolver
 * default - default value if fetching fails
 */
export interface IResolvedPlaceholder {
    resolver: IResolver
    key: string
    type: ObjectType
    default?: any
}

// UTILITY TYPES

export type ObjectUpdate =
    [ Array<string>, Promise<any> ]

export type PromisedUpdate =
    [ Array<string>, Promise<BaseConfigValue> ]

// SCHEMA TYPES

export type ISchema =
    IArraySchema | IObjectSchema | IStringSchema | INumberSchema |
    IBooleanSchema | IAnySchema | IUndefinedSchema

export interface IArraySchema {
    type: 'array'
    items?: ISchema
}

export interface IObjectSchema {
    type: 'object'
    properties?: ISchemaMap
    required?: Array<string>
}

export interface IStringSchema {
    type: 'string'
}

export interface INumberSchema {
    type: 'number'
}

export interface IBooleanSchema {
    type: 'boolean'
}

export interface IAnySchema {}

export interface IUndefinedSchema {
    type: 'undefined'
}
