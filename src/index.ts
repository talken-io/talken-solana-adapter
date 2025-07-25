import type { WalletName } from "@solana/wallet-adapter-base";
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
} from "@solana/wallet-adapter-base";
import {
  PublicKey,
  Transaction,
  TransactionVersion,
  Connection,
  TransactionSignature,
  VersionedTransaction,
} from "@solana/web3.js";
import { TalkenEmbed } from "./talkenEmbed";

export const TalkenWalletName = "Talken" as WalletName<"Talken">;

export class TalkenWalletAdapter extends BaseMessageSignerWalletAdapter {
  name = TalkenWalletName;
  url = "https://wallet.talken.io";
  icon = `data:image/svg+xml,%3Csvg width='1024' height='1024' viewBox='0 0 1024 1024' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23paint0_angular_2264_121180_clip_path)' data-figma-skip-parse='true'%3E%3Cg transform='matrix(0.407915 -0.541751 0.472021 0.468176 494.353 506.654)'%3E%3CforeignObject x='-1116.92' y='-1116.92' width='2233.84' height='2233.84'%3E%3Cdiv xmlns='http://www.w3.org/1999/xhtml' style='background:conic-gradient(from 90deg,rgba(43, 68, 154, 1) 0deg,rgba(27, 44, 104, 1) 28.8deg,rgba(49, 78, 174, 1) 108deg,rgba(27, 43, 103, 1) 180deg,rgba(48, 78, 174, 1) 216deg,rgba(27, 43, 102, 1) 259.2deg,rgba(49, 78, 174, 1) 349.2deg,rgba(43, 68, 154, 1) 360deg);height:100%25;width:100%25;opacity:1'%3E%3C/div%3E%3C/foreignObject%3E%3C/g%3E%3C/g%3E%3Crect width='1024' height='1024' rx='200' data-figma-gradient-fill='%7B&%2334;type&%2334;:&%2334;GRADIENT_ANGULAR&%2334;,&%2334;stops&%2334;:%5B%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.10588235408067703,&%2334;g&%2334;:0.17254902422428131,&%2334;b&%2334;:0.40784314274787903,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.079999998211860657%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.19215686619281769,&%2334;g&%2334;:0.30588236451148987,&%2334;b&%2334;:0.68235296010971069,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.30000001192092896%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.10588235408067703,&%2334;g&%2334;:0.16862745583057404,&%2334;b&%2334;:0.40392157435417175,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.50%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.19104459881782532,&%2334;g&%2334;:0.30635720491409302,&%2334;b&%2334;:0.68374401330947876,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.60000002384185791%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.10588235408067703,&%2334;g&%2334;:0.16862745583057404,&%2334;b&%2334;:0.40000000596046448,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.72000002861022949%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.19215686619281769,&%2334;g&%2334;:0.30588236451148987,&%2334;b&%2334;:0.68235296010971069,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.97000002861022949%7D%5D,&%2334;stopsVar&%2334;:%5B%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.10588235408067703,&%2334;g&%2334;:0.17254902422428131,&%2334;b&%2334;:0.40784314274787903,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.079999998211860657%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.19215686619281769,&%2334;g&%2334;:0.30588236451148987,&%2334;b&%2334;:0.68235296010971069,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.30000001192092896%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.10588235408067703,&%2334;g&%2334;:0.16862745583057404,&%2334;b&%2334;:0.40392157435417175,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.50%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.19104459881782532,&%2334;g&%2334;:0.30635720491409302,&%2334;b&%2334;:0.68374401330947876,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.60000002384185791%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.10588235408067703,&%2334;g&%2334;:0.16862745583057404,&%2334;b&%2334;:0.40000000596046448,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.72000002861022949%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.19215686619281769,&%2334;g&%2334;:0.30588236451148987,&%2334;b&%2334;:0.68235296010971069,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.97000002861022949%7D%5D,&%2334;transform&%2334;:%7B&%2334;m00&%2334;:815.83050537109375,&%2334;m01&%2334;:944.04132080078125,&%2334;m02&%2334;:-385.58316040039062,&%2334;m10&%2334;:-1083.5026855468750,&%2334;m11&%2334;:936.35162353515625,&%2334;m12&%2334;:580.22912597656250%7D,&%2334;opacity&%2334;:1.0,&%2334;blendMode&%2334;:&%2334;NORMAL&%2334;,&%2334;visible&%2334;:true%7D'/%3E%3Cpath d='M722.39 236.07L301.643 236.07C280.359 236.07 263.071 253.303 263.07 274.517L263.068 310.228C263.067 331.471 280.352 348.705 301.637 348.705H448.412L448.387 797.052C448.386 818.321 465.675 835.529 486.981 835.529H537.09C558.372 835.529 575.663 818.321 575.664 797.052L575.689 348.705H722.384C743.694 348.705 760.956 331.471 760.957 310.228L760.959 274.517C760.96 253.303 743.701 236.07 722.39 236.07Z' fill='white'/%3E%3Cpath d='M901.266 200.418C901.264 228.037 878.81 250.418 851.117 250.418C823.424 250.418 800.957 228.037 800.958 200.418C800.96 172.796 823.429 150.418 851.123 150.418C878.816 150.418 901.267 172.796 901.266 200.418Z' fill='white'/%3E%3Cdefs%3E%3CclipPath id='paint0_angular_2264_121180_clip_path'%3E%3Crect width='1024' height='1024' rx='200'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A`;
  readonly supportedTransactionVersions = new Set(["legacy" as TransactionVersion, 0 as TransactionVersion]);

  private _connecting: boolean;
  private _wallet: TalkenEmbed | null;
  private _position: string = "top-right";
  private _publicKey: PublicKey | null;

  private _readyState: WalletReadyState =
    typeof window === "undefined" || typeof document === "undefined"
      ? WalletReadyState.Unsupported
      : WalletReadyState.Installed;

  constructor(config?: { position?: string; url?: string }) {
    super();
    this._connecting = false;
    this._wallet = null;
    this._publicKey = null;
    if (typeof window !== "undefined") window.addEventListener("message", this._handleMessage.bind(this));
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
    if (event.data && event.data.type === "talken") {
      const { command } = event.data;
      if (command === "disconnect") {
        this._connecting = false;
        await this.disconnect();
      }
    }
  }
  async connect(): Promise<void> {
    if (this.connected || this.connecting) return;
    if (this._wallet) throw new WalletConnectionError("Already connected");
    try {
      this._wallet = new TalkenEmbed(this.url);
      const publicKeyData: string = await this._wallet.sendCommand<string>("login", {
        host: window.location.origin,
      });

      if (publicKeyData) {
        let publicKey = new PublicKey(publicKeyData);
        this._publicKey = publicKey;
        this.emit("connect", publicKey);
        if (this?._position) this._wallet.moveModal(this?._position);
        else this._wallet.moveModal();
      } else throw new WalletPublicKeyError("No response from Talken wallet.");
    } catch (error) {
      console.error("Error encountered during connection:", error);
      throw new WalletConnectionError((error as Error).message);
    } finally {
      this._connecting = false;
      console.log("Connected:", this._publicKey?.toString());
      window.parent.postMessage({ type: 'minimizeIframe' }, '*')
    }
  }

  async disconnect(): Promise<void> {
    if (this._wallet) {
      try {
        await this._wallet.disconnect();
        this._wallet = null;
        this._publicKey = null;
        this._connecting = false;
        window.removeEventListener("message", this._handleMessage.bind(this));
        this.emit("disconnect");
        console.log("Talken wallet disconnected.");
      } catch (error) {
        console.error("Error encountered during disconnection:", error);
        throw new WalletDisconnectionError((error as Error).message);
      } finally {
        this._connecting = false;
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
      console.error("Error encountered during transaction submission:", error);
      throw new WalletSendTransactionError((error as Error).message);
    }
  }

  async signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T> {
    if (!this._wallet) throw new WalletNotConnectedError();
    if (isVersionedTransaction(transaction)) {
      const data = transaction.serialize();
      try {
        const signedTransaction: any = await this._wallet.sendCommand<string>("signTransaction", {
          transaction: data,
          host: window.location.origin,
          isVersionedTransaction: true,
        });
        const finalTransaction = VersionedTransaction.deserialize(signedTransaction) as T;
        return finalTransaction;
      } catch (error) {
        console.error("Error encountered during transaction signing:", error);
        throw new WalletSignTransactionError((error as Error).message);
      }
    } else {
      try {
        const data = transaction.serialize({ requireAllSignatures: false, verifySignatures: false }).toString("base64");
        const signedTransaction: any = await this._wallet.sendCommand<string>("signTransaction", {
          transaction: data,
          host: window.location.origin,
          isVersionedTransaction: false,
        });
        const finalTransaction = Transaction.from(Uint8Array.from(signedTransaction)) as T;
        return finalTransaction;
      } catch (error) {
        console.error("Error encountered during transaction signing:", error);
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
      const signedMessage: any = await this._wallet.sendCommand<string>("signMessage", {
        host: window.location.origin,
        message: message,
      });
      const Uint8ArraySignedMessage = Uint8Array.from(signedMessage);
      return Uint8ArraySignedMessage;
    } catch (error) {
      console.error("Error encountered during message signature:", error);
      throw new WalletSignMessageError((error as Error).message);
    }
  }
}
