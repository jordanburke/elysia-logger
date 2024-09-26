import pino from "pino";
import { Elysia } from "elysia";
import type { ElysiaLogger, StandaloneLoggerOptions, ElysiaFileLoggerOptions, ElysiaStreamLoggerOptions, _INTERNAL_Writeonly, _INTERNAL_ElysiaLoggerPlugin, _INTERNAL_ElysiaLoggerPluginAutoLoggingState, _INTERNAL_ElysiaLoggerPluginAutoLoggingEnabledOptions, _INTERNAL_ElysiaLoggerPluginAutoLoggingDisabledOptions } from "./types";
export declare function logger(options?: _INTERNAL_ElysiaLoggerPluginAutoLoggingEnabledOptions<ElysiaStreamLoggerOptions>): _INTERNAL_ElysiaLoggerPlugin<_INTERNAL_ElysiaLoggerPluginAutoLoggingState>;
export declare function logger(options?: _INTERNAL_ElysiaLoggerPluginAutoLoggingDisabledOptions<ElysiaStreamLoggerOptions>): _INTERNAL_ElysiaLoggerPlugin;
export declare function fileLogger(options: _INTERNAL_ElysiaLoggerPluginAutoLoggingEnabledOptions<ElysiaFileLoggerOptions>): _INTERNAL_ElysiaLoggerPlugin<_INTERNAL_ElysiaLoggerPluginAutoLoggingState>;
export declare function fileLogger(options: _INTERNAL_ElysiaLoggerPluginAutoLoggingDisabledOptions<ElysiaFileLoggerOptions>): _INTERNAL_ElysiaLoggerPlugin;
export declare function createPinoLogger(options?: StandaloneLoggerOptions): ElysiaLogger<Elysia<"", false, {
    decorator: {};
    store: {};
    derive: {
        readonly log: pino.Logger<never, boolean>;
    };
    resolve: {};
}, {
    type: {};
    error: {};
}, {
    schema: {};
    macro: {};
    macroFn: {};
}, {}, {
    derive: {};
    resolve: {};
    schema: {};
}, {
    derive: {};
    resolve: {};
    schema: {};
}> | _INTERNAL_ElysiaLoggerPlugin<_INTERNAL_Writeonly<_INTERNAL_ElysiaLoggerPluginAutoLoggingState>>>;
export * from "./config";
export type { InferContext } from "./types";
export { pino } from "pino";
