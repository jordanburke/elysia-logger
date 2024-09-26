import type { pino } from "pino";
import type { Context, Elysia, RouteSchema, ErrorHandler, SingletonBase, EphemeralType } from "elysia";
export interface StreamLoggerOptions extends BaseLoggerOptions {
    stream?: pino.DestinationStream;
}
export interface ElysiaStreamLoggerOptions extends StreamLoggerOptions, ElysiaLoggerOptions {
}
export interface FileLoggerOptions extends BaseLoggerOptions {
    file: string | number | pino.DestinationStream | NodeJS.WritableStream;
}
export interface ElysiaFileLoggerOptions extends FileLoggerOptions, ElysiaLoggerOptions {
}
export type StandaloneLoggerOptions = StreamLoggerOptions | FileLoggerOptions;
export type LoggerOptions = StandaloneLoggerOptions & ElysiaLoggerOptions;
export type ErrorContext<T extends Record<string, Error> = {}, Route extends RouteSchema = RouteSchema, Singleton extends SingletonBase = SingletonBase, Ephemeral extends EphemeralType = EphemeralType, Volatile extends EphemeralType = EphemeralType> = Parameters<ErrorHandler<T, Route, Singleton, Ephemeral, Volatile>>[0];
export type ElysiaLoggerContext<Route extends RouteSchema = {}, Singleton extends SingletonBase = SingletonBase> = ({
    isError: false;
} & Context<Route, Singleton>) | ({
    isError: true;
} & ErrorContext);
export type ElysiaLoggerOptions = {
    customProps?: (ctx: ElysiaLoggerContext) => object;
    autoLogging?: boolean | {
        ignore: (ctx: ElysiaLoggerContext) => boolean;
    };
};
export interface ElysiaLogger<E = Elysia> extends Logger {
    into(options?: _INTERNAL_ElysiaLoggerPluginAutoLoggingEnabledOptions<ElysiaLoggerOptions>): _INTERNAL_ElysiaLoggerPlugin<_INTERNAL_ElysiaLoggerPluginAutoLoggingState>;
    into(options?: _INTERNAL_ElysiaLoggerPluginAutoLoggingDisabledOptions<ElysiaLoggerOptions>): _INTERNAL_ElysiaLoggerPlugin;
    into(options?: ElysiaLoggerOptions): E;
}
interface BaseLoggerOptions extends pino.LoggerOptions {
}
export type Logger = pino.Logger & BaseLoggerOptions;
export type InferContext<T> = T extends Elysia<infer _Path, infer _Scoped, infer Singleton, infer Definitions, infer _Metadata, infer _Routes, infer Ephemeral, infer Volatile> ? ({
    isError: false;
} & Context<RouteSchema, {
    decorator: Partial<Singleton["decorator"]>;
    store: Partial<Singleton["store"]>;
    derive: Partial<Singleton["derive"] & Ephemeral["derive"] & Volatile["derive"]>;
    resolve: Partial<Singleton["resolve"] & Ephemeral["resolve"] & Volatile["resolve"]>;
}>) | ({
    isError: true;
} & ErrorContext<Definitions["error"], RouteSchema, {
    decorator: Partial<Singleton["decorator"]>;
    store: Partial<Singleton["store"]>;
    derive: Partial<Singleton["derive"] & Ephemeral["derive"] & Volatile["derive"]>;
    resolve: Partial<Singleton["resolve"] & Ephemeral["resolve"] & Volatile["resolve"]>;
}>) : never;
export type _INTERNAL_Writeonly<T> = {
    -readonly [P in keyof T]: T[P];
};
export type _INTERNAL_ElysiaLoggerPluginAutoLoggingState = {
    readonly startTime?: number;
    readonly endTime?: number;
    readonly responseTime?: number;
};
export type _INTERNAL_ElysiaLoggerPlugin<Store extends Elysia["store"] = Elysia["store"]> = Elysia<"", false, {
    store: Store;
    derive: {
        readonly log: Logger;
    };
    decorator: {};
    resolve: {};
}>;
export type _INTERNAL_ElysiaLoggerPluginAutoLoggingEnabledOptions<Options extends BaseLoggerOptions & ElysiaLoggerOptions> = Omit<Options, "autoLogging"> & {
    autoLogging?: true | {
        ignore: (ctx: ElysiaLoggerContext) => boolean;
    };
};
export type _INTERNAL_ElysiaLoggerPluginAutoLoggingDisabledOptions<Options extends BaseLoggerOptions & ElysiaLoggerOptions> = Omit<Options, "autoLogging"> & {
    autoLogging: false | boolean;
};
export {};
