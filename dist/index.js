import pino from "pino";
import { Elysia } from "elysia";
import { formatters, serializers } from "./config";
export function logger(options = {}) {
    return plugin(options);
}
export function fileLogger(options) {
    return plugin(options);
}
export function createPinoLogger(options = {}) {
    const log = createPinoLoggerInternal(options);
    log.into = into.bind(log);
    return log;
}
function createPinoLoggerInternal(options) {
    options.level ??= "info";
    options.formatters ??= formatters;
    options.serializers ??= serializers;
    const streamOptions = options;
    if ("file" in options) {
        streamOptions.stream = pino.destination(options.file);
        delete options.file;
    }
    return pino(options, streamOptions.stream);
}
function into(options = {}) {
    const autoLogging = options.autoLogging ?? true;
    delete options.autoLogging;
    const getLog = (ctx) => {
        return typeof options.customProps === "function"
            ? this.child(options.customProps(ctx))
            : this;
    };
    let app = new Elysia({
        name: "@bogeychan/elysia-logger",
        seed: options,
    }).derive({ as: "global" }, (ctx) => {
        const loggerCtx = ctx;
        loggerCtx.isError = false;
        return { log: getLog(loggerCtx) };
    });
    if (autoLogging) {
        return app
            .onRequest((ctx) => {
            ctx.store = { ...ctx.store, startTime: performance.now() };
        })
            .onAfterResponse({ as: "global" }, (ctx) => {
            const loggerCtx = ctx;
            loggerCtx.isError = false;
            const log = getLog(loggerCtx);
            if (log.level == "silent") {
                return;
            }
            if (typeof autoLogging == "object" && autoLogging.ignore(loggerCtx)) {
                return;
            }
            const store = ctx.store;
            store.startTime ??= 0;
            store.endTime = performance.now();
            store.responseTime = store.endTime - store.startTime;
            log.info(ctx);
        })
            .onError({ as: "global" }, (ctx) => {
            const loggerCtx = ctx;
            loggerCtx.isError = true;
            const log = getLog(loggerCtx);
            if (log.level == "silent") {
                return;
            }
            if (typeof autoLogging == "object" && autoLogging.ignore(loggerCtx)) {
                return;
            }
            if (ctx.code === "NOT_FOUND") {
                log.info(ctx);
            }
            else {
                log.error(ctx);
            }
        });
    }
    return app;
}
const plugin = (options) => into.bind(createPinoLoggerInternal(options))(options);
export * from "./config";
export { pino } from "pino";
