import { PublicConfig } from './types';
interface Result {
    filesGenerated: number;
}
export declare function runTypeChain(publicConfig: PublicConfig): Promise<Result>;
export {};
