import { WalletName, BaseMessageSignerWalletAdapter, WalletReadyState, SendTransactionOptions } from '@solana/wallet-adapter-base';
import { TransactionVersion, PublicKey, Transaction, VersionedTransaction, Connection, TransactionSignature } from '@solana/web3.js';

declare const TalkenWalletName: WalletName<"Talken">;
declare class TalkenWalletAdapter extends BaseMessageSignerWalletAdapter {
    name: WalletName<"Talken">;
    url: string;
    icon: string;
    readonly supportedTransactionVersions: Set<TransactionVersion>;
    private _connecting;
    private _wallet;
    private _position;
    private _publicKey;
    private _readyState;
    constructor(config?: {
        position?: string;
        url?: string;
    });
    get publicKey(): PublicKey | null;
    get connecting(): boolean;
    get connected(): boolean;
    get readyState(): WalletReadyState;
    _handleMessage(event: MessageEvent): Promise<void>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    sendTransaction<T extends Transaction | VersionedTransaction>(transaction: T, connection: Connection, options?: SendTransactionOptions): Promise<TransactionSignature>;
    signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T>;
    signAllTransactions<T extends Transaction | VersionedTransaction>(transactions: T[]): Promise<T[]>;
    signMessage(message: Uint8Array): Promise<Uint8Array>;
}

export { TalkenWalletAdapter, TalkenWalletName };
