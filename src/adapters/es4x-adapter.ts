

import {
    HttpStatus,
    Logger,
    NestApplicationOptions,
    RawBodyRequest,
    RequestMethod,
    StreamableFile,
    VersioningOptions,
    VersioningType,
    VERSION_NEUTRAL,
} from '@nestjs/common';
import { CorsOptions, CorsOptionsDelegate } from '@nestjs/common/interfaces/external/cors-options.interface';

import { AbstractHttpAdapter } from '@nestjs/core/adapters/http-adapter';
import { HttpServer, HttpServerResponse, HttpServerRequest } from '@vertx/core';
import { HttpMethod, HttpServerOptions } from '@vertx/core/options';
import { isNil, isNumber, isObject } from '../utils';

import * as tmp from 'tmp';
import { createReadStream, createWriteStream, PathLike } from 'fs';
import { PathOrFileDescriptor } from 'fs';


export class Es4xAdapter extends AbstractHttpAdapter<HttpServer, HttpServerRequest, HttpServerResponse>  {

    public async close() {
        await this.httpServer.close();
    }


    public listen(port: string | number, callback?: () => void): Promise<void>;
    public listen(port: string | number, hostname: string, callback?: () => void): Promise<void>;
    public async listen(port: any, ...args: any[]): Promise<void> {
        await this.httpServer.listen(isNumber(port) ? port : parseInt(port));
    }
    async initHttpServer(options: NestApplicationOptions) {
        this.httpServer = await vertx.createHttpServer()
            .listen();

    }
    useStaticAssets(aPath: string, options: {prefix?: string}) {
        // TODO
    }
    setViewEngine(engine: string) {
        throw new Error('Method not implemented.');
    }
    getRequestHostname(request: HttpServerRequest): string {
        return request.host();
    }
    getRequestMethod(request: HttpServerRequest): HttpMethod {
        return request.method();
    }
    getRequestUrl(request: HttpServerRequest): string {
        return request.uri();
    }
    status(response: HttpServerResponse, statusCode: number) {
        response.setStatusCode(statusCode);
    }
    async reply(response: HttpServerResponse, body: any, statusCode?: number | undefined) {
        if (statusCode) {
            response.setStatusCode(statusCode);
        }
        if (isNil(body)) {
            await response.send();
        };

        if (body instanceof StreamableFile) {
            const headers = response.headers();
            const streamHeaders = body.getHeaders();
            if (
                !headers.contains('Content-Type') &&
                streamHeaders.type !== undefined
            ) {
                response.putHeader('Content-Type', streamHeaders.type);
            }
            if (
                !headers.contains('Content-Disposition') &&
                streamHeaders.disposition !== undefined
            ) {
                response.putHeader('Content-Disposition', streamHeaders.disposition);
            }
            if (
                !headers.contains('Content-Length') &&
                streamHeaders.length !== undefined
            ) {
                response.putHeader('Content-Length', streamHeaders.length);
            }
            tmp.file({ prefix: 'es4x-nestjs', discardDescriptor:true}, (err: any, path: string) => {

                const f = createWriteStream(path);
                body.getStream().pipe(f);

                response.sendFile(path);
            });
        }


        return isObject(body) ? response.end(JSON.stringify(body)) : response.end(String(body));
    }
    render(response: HttpServerResponse, view: string, options: any) {
        // TODO
    }
    redirect(response: HttpServerResponse, statusCode: number, url: string) {
        response.setStatusCode(301);
        response.putHeader('Location', url)
    }
    setErrorHandler(handler: Function, prefix?: string | undefined) {
        this.httpServer.exceptionHandler(_ => handler());
    }
    setNotFoundHandler(handler: Function, prefix?: string | undefined) {
        this.httpServer.invalidRequestHandler(r => {
            if (isNil(prefix) || r.path().startsWith(prefix!)) {
                handler(r);
            }
        });
    }
    setHeader(response: HttpServerResponse, name: string, value: string) {
        response.putHeader(name, value);
    }
    registerParserMiddleware(prefix?: string | undefined, rawBody?: boolean | undefined) {
        throw new Error('Method not implemented.');
    }
    enableCors(options: CorsOptions | CorsOptionsDelegate<any>, prefix?: string | undefined) {
        // TODO
    }
    async createMiddlewareFactory(requestMethod: RequestMethod):  Promise<(path: string, callback: Function) => any> {
         // TODO


         return;
    }
    getType(): string {
        return 'es4x';
    }

}