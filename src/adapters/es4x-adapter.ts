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

export class Es4xAdapter extends AbstractHttpAdapter {
    close() {
        throw new Error('Method not implemented.');
    }
    initHttpServer(options: NestApplicationOptions) {
        throw new Error('Method not implemented.');
    }
    useStaticAssets(...args: any[]) {
        throw new Error('Method not implemented.');
    }
    setViewEngine(engine: string) {
        throw new Error('Method not implemented.');
    }
    getRequestHostname(request: any) {
        throw new Error('Method not implemented.');
    }
    getRequestMethod(request: any) {
        throw new Error('Method not implemented.');
    }
    getRequestUrl(request: any) {
        throw new Error('Method not implemented.');
    }
    status(response: any, statusCode: number) {
        throw new Error('Method not implemented.');
    }
    reply(response: any, body: any, statusCode?: number | undefined) {
        throw new Error('Method not implemented.');
    }
    render(response: any, view: string, options: any) {
        throw new Error('Method not implemented.');
    }
    redirect(response: any, statusCode: number, url: string) {
        throw new Error('Method not implemented.');
    }
    setErrorHandler(handler: Function, prefix?: string | undefined) {
        throw new Error('Method not implemented.');
    }
    setNotFoundHandler(handler: Function, prefix?: string | undefined) {
        throw new Error('Method not implemented.');
    }
    setHeader(response: any, name: string, value: string) {
        throw new Error('Method not implemented.');
    }
    registerParserMiddleware(prefix?: string | undefined, rawBody?: boolean | undefined) {
        throw new Error('Method not implemented.');
    }
    enableCors(options: CorsOptions | CorsOptionsDelegate<any>, prefix?: string | undefined) {
        throw new Error('Method not implemented.');
    }
    createMiddlewareFactory(requestMethod: RequestMethod): ((path: string, callback: Function) => any) | Promise<(path: string, callback: Function) => any> {
        throw new Error('Method not implemented.');
    }
    getType(): string {
        throw new Error('Method not implemented.');
    }

}