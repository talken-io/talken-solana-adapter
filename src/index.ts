import type { WalletName } from '@solana/wallet-adapter-base';
import {
    BaseSignInMessageSignerWalletAdapter,
    WalletConfigError,
    WalletConnectionError,
    WalletDisconnectionError,
    WalletNotConnectedError,
    WalletNotReadyError,
    WalletPublicKeyError,
    WalletReadyState,
    WalletSignInError,
    WalletSignMessageError,
    BaseMessageSignerWalletAdapter,
    isVersionedTransaction,
    WalletSignTransactionError,
    WalletSendTransactionError,
    SendTransactionOptions,
} from '@solana/wallet-adapter-base';
import {
    PublicKey,
    Transaction,
    TransactionVersion,
    Connection,
    TransactionSignature,
    VersionedTransaction,
} from '@solana/web3.js';
import { TalkenEmbed } from './talkenEmbed';

// import type { SolanaSignInInput, SolanaSignInOutput } from '@solana/wallet-standard-features';

// interface TalkenWindow extends Window {}
// declare const window: TalkenWindow;
// export type CustomSolanaSignInInput = SolanaSignInInput | (() => Promise<SolanaSignInInput>);
// type ConnectOutput = { siwsOutput?: SolanaSignInOutput };

export const TalkenWalletName = 'Talken Wallet' as WalletName<'Talken'>;

// export class TalkenWalletAdapter extends BaseSignInMessageSignerWalletAdapter {
export class TalkenWalletAdapter extends BaseMessageSignerWalletAdapter {
    name = TalkenWalletName;
    url = 'https://wallet.talken.io';
    icon = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMTQ1NF8xMjQ5MjIpIi8+CjxwYXRoIGQ9Ik0zODYuNzc3IDc3MS4zNjhWODExLjQ3OEMzODYuNzc3IDgzNi43NjEgMzc1LjE4OCA4NDYuMzYxIDM0OC45NjggODQ2LjM2MUgzMjQuMDgxQzI5NC4zMTIgODQ2LjM2MSAyNzYuMTQ2IDgzOC40NzIgMjc2LjE0NiA4MDkuODk3QzI3Ni4xNDYgNzgxLjIxNCAyOTQuNDQzIDc3My4zMTEgMzI0LjA4MSA3NzMuMzExSDM1Mi44NjhWNzcxLjM2OEMzNTIuODY4IDc1Ny45OTcgMzQ1LjA1NSA3NTIuMTUzIDMyNy4yNTMgNzUyLjE1M0MzMTguNDcyIDc1Mi4xNTMgMzA5LjkyNCA3NTMuNjExIDI5OC41ODIgNzU1LjkzMUMyOTAuOTA3IDc1Ny4zODggMjg2LjI3MyA3NTMuODY0IDI4Ni4yNzMgNzQ2LjA3N1Y3NDEuNTgyQzI4Ni4yNzMgNzM0Ljg5NiAyOTAuMDQxIDczMC41MjUgMjk3Ljk3MSA3MjguOTQzQzMxMS4yNjMgNzI2LjE0NSAzMjEuMzk3IDcyNC40NDggMzMyLjEyNyA3MjQuNDQ4QzM2NS4xNzcgNzI0LjQ0OCAzODYuNzc3IDczOC42NjYgMzg2Ljc3NyA3NzEuMzY4Wk0zNTIuODY4IDgwOS43NzRWNzk3LjQ5OUgzMjUuNzkxQzMxMS4wMyA3OTcuNDk5IDMwNy45NzQgODAwLjkwNyAzMDcuOTc0IDgwOS44OTdDMzA3Ljk3NCA4MTguNzcyIDMxMS4wMyA4MjIuMTggMzI1LjY2NyA4MjIuMThIMzQwLjY2OEMzNTEuMTY2IDgyMi4xOCAzNTIuODY4IDgxNy45MjQgMzUyLjg2OCA4MDkuNzc0WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTY2NC40ODMgNzk3LjYyOUw2MTIuMTQ3IDgwMi45NzNDNjE2LjU0MSA4MTYuNTgyIDYyNi41MjIgODIxLjQ0NyA2NDIuNzUyIDgyMS40NDdDNjUwLjY3NSA4MjEuNDQ3IDY2MC4xODMgODIwLjg1MyA2NzAuNjc0IDgxOC4zMDFDNjc4LjYwNCA4MTYuNDczIDY4My4zNjEgODE5Ljg3NCA2ODMuMzYxIDgyNy43NzdWODMxLjQzMkM2ODMuMzYxIDgzNy45ODYgNjgwLjMwNiA4NDIuMjUgNjczLjg0NiA4NDMuOTQ2QzY2MC42NzggODQ3LjQ3NyA2NDkuMTY5IDg0OC41NTEgNjM3LjY4OSA4NDguNTUxQzYwMC43NCA4NDguNTUxIDU3Ni45MTQgODI4LjUwMyA1NzYuOTE0IDc4Ni42NzNDNTc2LjkxNCA3NDcuMTc5IDU5Ni45NTcgNzI0LjQ0OCA2MzcuOTM3IDcyNC40NDhDNjcyLjM0IDcyNC40NDggNjkxLjc3MSA3NDAuNzMzIDY5MS43NzEgNzcxLjExM0M2OTEuNzcxIDc4OC4xMzEgNjg2LjQzOSA3OTUuMzA5IDY2NC40ODMgNzk3LjYyOVpNNjU5LjcwMyA3NjcuOTU5QzY1OS43MDMgNzU2LjQxNiA2NTMuNTQ5IDc1MC4yMTcgNjM3LjkzNyA3NTAuMjE3QzYyMC45ODYgNzUwLjIxNyA2MTIuMTQ3IDc1Ny44NjcgNjEwLjMyMSA3NzguNDE1TDY1MS4yNzkgNzc0LjE1OUM2NTguMzU3IDc3My40MzQgNjU5LjcwMyA3NzIuMDkyIDY1OS43MDMgNzY3Ljk1OVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik00MzEuMTY3IDY4Mi42NThINDE3LjQ3NUM0MTEuNjU1IDY4Mi42NTggNDA2LjkzNCA2ODcuMzY0IDQwNi45MzQgNjkzLjE1N1Y4MzUuODVDNDA2LjkzNCA4NDEuNjU4IDQxMS42NTUgODQ2LjM1NyA0MTcuNDc1IDg0Ni4zNTdINDMxLjE2N0M0MzYuOTg3IDg0Ni4zNTcgNDQxLjcwMSA4NDEuNjU4IDQ0MS43MDEgODM1Ljg1VjY5My4xNTdDNDQxLjcwMSA2ODcuMzY0IDQzNi45ODcgNjgyLjY1OCA0MzEuMTY3IDY4Mi42NThaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNNTc1LjkyMiA4MzMuNTE2TDU3NS4yODIgODMyLjc5MUw1MzAuMjA2IDc4Mi40MzVMNTc0LjU2OSA3MzkuMjA2TDU3NC44NjggNzM4LjkwMkM1NzkuOCA3MzMuNjY3IDU3Ny43ODQgNzI4LjQwMyA1NzAuMzU3IDcyNy4xNDFDNTY5LjI1OSA3MjYuOTYgNTY4LjEwMiA3MjYuODY2IDU2Ni45MTYgNzI2Ljg2Nkg1NjYuNjQ3SDU1NC42MjFDNTQ5LjQzNCA3MjYuODczIDU0NC4wOCA3MjguODUyIDU0MC45MDEgNzMyLjA4Nkw1NDAuODA2IDczMi4xOTVMNDk2LjMzNCA3NzUuNTgzVjY5My4xNTdDNDk2LjMzNCA2ODcuMzY0IDQ5MS42MTIgNjgyLjY1OCA0ODUuOCA2ODIuNjU4SDQ3Mi4xMTVDNDY2LjI5NiA2ODIuNjU4IDQ2MS41NzQgNjg3LjM2NCA0NjEuNTc0IDY5My4xNTdWODM1Ljg1QzQ2MS41NzQgODQxLjY1OCA0NjYuMjk2IDg0Ni4zNTcgNDcyLjExNSA4NDYuMzU3SDQ4NS44QzQ5MS42MTIgODQ2LjM1NyA0OTYuMzM0IDg0MS42NTggNDk2LjMzNCA4MzUuODVWNzkwLjMzOEw1NDAuOTk1IDg0MC4yMjNMNTQxLjI5MyA4NDAuNTU2QzU0NC41MzggODQ0LjMxMiA1NTAuNjU2IDg0Ni41ODkgNTU2LjQwMyA4NDYuMzQyTDU1NS43NyA4NDYuMzU3SDU2Ny43ODlMNTY2Ljg1IDg0Ni4zNDJDNTY4LjQwNyA4NDYuNCA1NjkuOTIgODQ2LjMxNCA1NzEuMzMxIDg0Ni4wNDVDNTc4Ljc4MSA4NDQuNjUzIDU4MC44MjYgODM5LjA0OCA1NzUuOTIyIDgzMy41MTZaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjkzLjI4MiA2ODIuNjU4SDE3OC4zNzRDMTcyLjU2MSA2ODIuNjU4IDE2Ny44NCA2ODcuMzY0IDE2Ny44NCA2OTMuMTU3VjcwMi45MDlDMTY3Ljg0IDcwOC43MSAxNzIuNTYxIDcxMy40MTYgMTc4LjM3NCA3MTMuNDE2SDIxOC40NTlWODM1Ljg1QzIxOC40NTkgODQxLjY1OCAyMjMuMTgxIDg0Ni4zNTcgMjI5IDg0Ni4zNTdIMjQyLjY4NUMyNDguNDk3IDg0Ni4zNTcgMjUzLjIxOSA4NDEuNjU4IDI1My4yMTkgODM1Ljg1VjcxMy40MTZIMjkzLjI4MkMyOTkuMTAyIDcxMy40MTYgMzAzLjgxNiA3MDguNzEgMzAzLjgxNiA3MDIuOTA5VjY5My4xNTdDMzAzLjgxNiA2ODcuMzY0IDI5OS4xMDIgNjgyLjY1OCAyOTMuMjgyIDY4Mi42NThaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNODI1LjEyNCA3NzkuMTU0QzgyNS4xMjQgNzcxLjMxIDgyNC4xMjggNzYzLjY4OSA4MjIuMjIxIDc1Ni40MzhDODE4LjM3MyA3NDEuODQzIDgwNi4zODQgNzI5Ljk1OSA3OTEuNDI2IDcyNy4wMTVDNzgzLjExMSA3MjUuMzg0IDc3NC4zMTYgNzI0LjQ0OCA3NjUuNTEzIDcyNC40NDhDNzU2LjcxIDcyNC40NDggNzQ3Ljk3MyA3MjUuMzYyIDczOS42NTEgNzI3LjAwOEM3MjQuNzMgNzI5Ljk0NCA3MTIuNzMzIDc0MS43OTkgNzA4LjgzNCA3NTYuMzNDNzA2Ljg3NyA3NjMuNjA5IDcwNS45MDIgNzcxLjI3MyA3MDUuOTAyIDc3OS4xNTRWODM2LjExNkM3MDUuOTAyIDg0MS45MTcgNzEwLjYxNiA4NDYuNjE1IDcxNi40MzYgODQ2LjYxNUg3MzAuMTJDNzM1LjkzMyA4NDYuNjE1IDc0MC42NTUgODQxLjkxNyA3NDAuNjU1IDgzNi4xMTZWNzc5LjE1NEM3NDAuNjU1IDc3NC4xOCA3NDEuNDE4IDc2OS4zOCA3NDIuODMgNzY0Ljg3MUw3NDIuOTEgNzY0LjU4OEM3NDQuMjM0IDc2MC4zMzkgNzQ3LjUyMiA3NTYuOTYgNzUxLjcyIDc1NS40OTZMNzUyLjAxMSA3NTUuMzg3Qzc1Ni4zNjggNzUzLjkzNyA3NjAuNjYgNzUzLjE1NCA3NjUuNTEzIDc1My4xNTRDNzcwLjM5NCA3NTMuMTU0IDc3NC43MDkgNzUzLjk0NCA3NzkuMDg4IDc1NS40MTZMNzc5LjI4NCA3NTUuNDg4Qzc4My40NzUgNzU2LjkzOSA3ODYuNzYzIDc2MC4zMDMgNzg4LjA5NSA3NjQuNTNMNzg4LjE5NiA3NjQuODcxQzc4OS42MDggNzY5LjM4IDc5MC4zNjQgNzc0LjE4IDc5MC4zNjQgNzc5LjE1NFY4MzYuMTE2Qzc5MC4zNjQgODQxLjkxNyA3OTUuMDc4IDg0Ni42MTUgODAwLjg5OCA4NDYuNjE1SDgxNC41ODNDODIwLjQxIDg0Ni42MTUgODI1LjExNyA4NDEuOTE3IDgyNS4xMTcgODM2LjExNkw4MjUuMTI0IDc3OS4xNTRaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNODU2LjE2MSA2OTQuNzU5Qzg1Ni4xNjEgNzA3LjAyNyA4NDYuMTg3IDcxNi45NjggODMzLjg4NSA3MTYuOTY4QzgyMS41ODMgNzE2Ljk2OCA4MTEuNjAyIDcwNy4wMjcgODExLjYwMiA2OTQuNzU5QzgxMS42MDIgNjgyLjQ5IDgyMS41ODMgNjcyLjU1IDgzMy44ODUgNjcyLjU1Qzg0Ni4xODcgNjcyLjU1IDg1Ni4xNjEgNjgyLjQ5IDg1Ni4xNjEgNjk0Ljc1OVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik01MzUuNjk5IDI0Ny44NzdMNTA2LjE2MiAyNTUuNzkxTDQ4Ni4xMTMgMTgwLjk2NkM0ODQuNjg5IDE3NS42NSA0NzkuMjc3IDE3NC4zNTYgNDc2LjEyNiAxNzUuMkM0NzUuMTQyIDE3NS40NjQgNDc0LjIxIDE3NS45MjUgNDczLjMzMSAxNzYuNTgzTDMzMi45NTkgMjc3LjI5OEMzMjMuNTc4IDI4NC4wMzIgMzE5LjUyMSAyOTUuNjcyIDMyMi41MjggMzA2Ljg5NUwzMjYuMDYzIDMyMC4wODhDMzExLjczMyAzMzguMjc5IDMwNS44NjYgMzYyLjg1NSAzMTIuMzU2IDM4Ny4wNzVMMjkyLjk5MiAzMTQuODFDMjg2LjcxNCAyOTEuMzc3IDI5NS40OTUgMjY2LjY1NCAzMTUuMTM2IDI1Mi41MjdMNDU1LjY1MiAxNTEuNTYyQzQ1OS41NjIgMTQ4LjgyNiA0NjMuODggMTQ2LjgyNSA0NjguMjEyIDE0NS42NjRDNDg3LjkwMyAxNDAuMzg4IDUwOS44OTggMTUxLjU4OSA1MTUuNjQ5IDE3My4wNTJMNTM1LjY5OSAyNDcuODc3WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTcwNy41NTMgMzY1LjM3NkM3MDguOTc4IDM3MC42OTMgNzA2LjAwMyAzNzYuMTMzIDcwMC41NDMgMzc3LjgwN0w2NzEuNzk0IDM4NS41MUM2NjEuMzU4IDM4OC4zMDYgNjQ5Ljg0OSAzODMuMTU5IDY0Ni4zMTggMzczLjEzMUM2NDQuMDkxIDM2Ny4xODUgNjQ0LjkyNCAzNjAuODQyIDY0Ny44MDcgMzU1Ljg0OUM2NTAuMzQ5IDM1MS4xNTggNjU0Ljc0NCAzNDcuODY5IDY2MC4wNiAzNDYuNDQ1TDY4OS43OTQgMzM4LjQ3OEM2OTUuNTU3IDMzNy4xNDUgNzAwLjg1MiAzNDAuMzY5IDcwMi4yNzcgMzQ1LjY4NUw3MDcuNTUzIDM2NS4zNzZaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTY3NC4zODUgMzIwLjQ2NUM2ODUuMjE1IDMxNy41NjMgNjkxLjcwMiAzMDYuMzI4IDY4OC44IDI5NS40OThMNjg2LjQ3OCAyODYuODM0QzY3NS41NTYgMjQ2LjA3NSA2MzMuMzYyIDIyMS43MTQgNTkyLjYwMiAyMzIuNjM2TDM2Ni41NTMgMjkzLjIwN0MzNDkuODE2IDI5Ny42OTEgMzM1LjkzNCAzMDcuMzIgMzI2LjA2MiAzMjAuMDk2QzMxMS43MzEgMzM4LjI4NyAzMDUuODY0IDM2Mi44NjMgMzEyLjM1NCAzODcuMDgyTDM0Ny44NjMgNTE5LjYwMUMzNTguNzg1IDU2MC4zNiA0MDAuOTc5IDU4NC43MjEgNDQxLjczOSA1NzMuNzk5TDY2Ny43ODggNTEzLjIyOEM3MDguNTQ4IDUwMi4zMDcgNzMyLjkwOSA0NjAuMTEzIDcyMS45ODcgNDE5LjM1M0w3MjAuOTg0IDQxNS42MTJDNzE4LjA4MyA0MDQuNzgyIDcwNi44NDcgMzk4LjI5NSA2OTYuMDE4IDQwMS4xOTdMNjc4Ljg4NyA0MDUuNzg3QzY1OS45ODMgNDEwLjg1MyA2MzguNzU1IDQwNC4wODkgNjI4LjkyNiAzODcuMDk2QzYyMC43ODEgMzczLjIzOSA2MjEuODUyIDM1Ny41NDYgNjI5LjExMiAzNDUuMjU5QzYzNC4zOTIgMzM1LjgyNSA2NDMuMjc0IDMyOC44MDIgNjU0LjMwMSAzMjUuODQ3TDY3NC4zODUgMzIwLjQ2NVpNNDA3LjUwNSAzODcuNzU2QzM5OS40MzIgMzg5LjkxOSAzOTAuOTQzIDM4NS4wMTggMzg4Ljc4IDM3Ni45NDVDMzg2LjYxNiAzNjguODcyIDM5MS41MTcgMzYwLjM4MyAzOTkuNTkxIDM1OC4yMkw1MzcuNDI2IDMyMS4yODZDNTQ1LjQ5OSAzMTkuMTIzIDU1My45ODggMzI0LjAyNCA1NTYuMTUxIDMzMi4wOTdDNTU4LjMxNCAzNDAuMTcgNTUzLjQxMyAzNDguNjU5IDU0NS4zNCAzNTAuODIyTDQwNy41MDUgMzg3Ljc1NloiIGZpbGw9IndoaXRlIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMTQ1NF8xMjQ5MjIiIHgxPSI1MTIiIHkxPSIwIiB4Mj0iNTEyIiB5Mj0iMTAyNCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMjUzQjg0Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE5Mjg2MiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=`
    readonly supportedTransactionVersions = new Set(['legacy' as TransactionVersion, 0 as TransactionVersion]);

    private _connecting: boolean;
    private _wallet: TalkenEmbed | null;
    private _position: string = 'top-right';
    private _publicKey: PublicKey | null;

    private _readyState: WalletReadyState =
        typeof window === 'undefined' || typeof document === 'undefined'
            ? WalletReadyState.Unsupported
            : WalletReadyState.Installed;

    constructor(config?: { position?: string; url?: string; }) {
        super();
        this._connecting = false;
        this._wallet = null;
        this._publicKey = null;
        if (typeof window !== 'undefined') window.addEventListener('message', this._handleMessage.bind(this));
        if (config?.position) this._position = config.position;
        if (config?.url) this.url = config.url;
    }

    get publicKey() {
        return this._publicKey;
    }

    get connecting() {
        return this._connecting;
    }

    get connected() {
        return !!this._publicKey;
    }

    get readyState() {
        return this._readyState;
    }
    async _handleMessage(event: MessageEvent) {
        if (event.data && event.data.type === 'talken') {
            const { command } = event.data;
            if (command === 'disconnect') {
                this._connecting = false;
                await this.disconnect();
            }
        }
    }
    async connect(): Promise<void> {
        if (this.connected || this.connecting) return;
        if (this._wallet) throw new WalletConnectionError('Already connected');
        try {
            this._wallet = new TalkenEmbed(this.url);
            const publicKeyData: string = await this._wallet.sendCommand<string>('login', {
                host: window.location.origin,
            });

            if (publicKeyData) {
                let publicKey = new PublicKey(publicKeyData);
                this._publicKey = publicKey;
                this.emit('connect', publicKey);
                if (this?._position) this._wallet.moveModal(this?._position);
                else this._wallet.moveModal();
            } else throw new WalletPublicKeyError('No response from Talken wallet.');
        } catch (error) {
            console.error('Error encountered during connection:', error);
            throw new WalletConnectionError((error as Error).message);
        } finally {
            this._connecting = false;
            console.log('Connected:', this._publicKey?.toString());
        }
    }

    async disconnect(): Promise<void> {
        if (this._wallet) {
            try {
                await this._wallet.disconnect();
                this._wallet = null;
                this._publicKey = null;
                this._connecting = false;
                window.removeEventListener('message', this._handleMessage.bind(this));
                this.emit('disconnect');
                console.log('Talken wallet disconnected.');
            } catch (error) {
                console.error('Error encountered during disconnection:', error);
                throw new WalletDisconnectionError((error as Error).message);
            } finally {
                this._connecting = false; // Ensure connecting is also reset
            }
        }
    }

    async sendTransaction<T extends Transaction | VersionedTransaction>(
        transaction: T,
        connection: Connection,
        options: SendTransactionOptions = {}
    ): Promise<TransactionSignature> {
        let signature: TransactionSignature;
        if (!this._wallet) throw new WalletNotConnectedError();
        try {
            if (!isVersionedTransaction(transaction))
                transaction = (await this.prepareTransaction(transaction, connection, options)) as T;
            const signedTx = await this.signTransaction(transaction);
            signature = await connection.sendRawTransaction(signedTx.serialize(), options);
            return signature;
        } catch (error) {
            console.error('Error encountered during transaction submission:', error);
            throw new WalletSendTransactionError((error as Error).message);
        }
    }

    async signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T> {
        if (!this._wallet) throw new WalletNotConnectedError();
        if (isVersionedTransaction(transaction)) {
            const data = transaction.serialize();
            try {
                const signedTransaction: any = await this._wallet.sendCommand<string>('signTransaction', {
                    transaction: data,
                    host: window.location.origin,
                    isVersionedTransaction: true,
                });
                const finalTransaction = VersionedTransaction.deserialize(signedTransaction) as T;
                return finalTransaction;
            } catch (error) {
                console.error('Error encountered during transaction signing:', error);
                throw new WalletSignTransactionError((error as Error).message);
            }
        } else {
            try {
                const data = transaction
                    .serialize({ requireAllSignatures: false, verifySignatures: false })
                    .toString('base64');
                const signedTransaction: any = await this._wallet.sendCommand<string>('signTransaction', {
                    transaction: data,
                    host: window.location.origin,
                    isVersionedTransaction: false,
                });
                const finalTransaction = Transaction.from(Uint8Array.from(signedTransaction)) as T;
                return finalTransaction;
            } catch (error) {
                console.error('Error encountered during transaction signing:', error);
                throw new WalletSignTransactionError((error as Error).message);
            }
        }
    }

    async signAllTransactions<T extends Transaction | VersionedTransaction>(transactions: T[]): Promise<T[]> {
        const signedTransactions: T[] = [];
        for (const transaction of transactions) {
            signedTransactions.push(await this.signTransaction(transaction));
        }
        return signedTransactions;
    }

    async signMessage(message: Uint8Array): Promise<Uint8Array> {
        if (!this._wallet) throw new WalletNotConnectedError();
        try {
            const signedMessage: any = await this._wallet.sendCommand<string>('signMessage', {
                host: window.location.origin,
                message: message,
            });
            const Uint8ArraySignedMessage = Uint8Array.from(signedMessage);
            return Uint8ArraySignedMessage;
        } catch (error) {
            console.error('Error encountered during message signature:', error);
            throw new WalletSignMessageError((error as Error).message);
        }
    }

    // async signIn(input?: CustomSolanaSignInInput): Promise<SolanaSignInOutput> {
    //     // console.log("triggering sign in!");
    //     /* try {
    //         if (!this.connected) {
    //             const output = await this._connect({
    //                 siwsInput: input,
    //             });
    //             const siwsOutput = output?.siwsOutput;
    //             if (input) {
    //                 if (!siwsOutput) {
    //                     throw new Error("No Solana Sign In Output");
    //                 }
    //                 return siwsOutput;
    //             }
    //         }

    //         const wallet = this._wallet;
    //         if (!wallet || !this.connected) throw new WalletNotConnectedError();

    //         const publicKey = this._publicKey;
    //         if (!publicKey) throw new WalletNotConnectedError("no public key found");

    //         try {
    //             const siwsInput =
    //                 typeof input === "function"
    //                     ? input()
    //                     : input
    //                         ? Promise.resolve(input)
    //                         : undefined;
    //             const siwsOutput = null;

    //             return siwsOutput;
    //         } catch (error: any) {
    //             throw new WalletSignInError(error?.message, error);
    //         }
    //     } catch (error: any) {
    //         this.emit("error", error);
    //         throw error;
    //     }
    // } */
    //     // return an empty promise of SolanaSignInOutput
    //     return new Promise((resolve, reject) => {
    //         resolve({} as SolanaSignInOutput);
    //     });
    // }
}
