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
  icon = `data:image/svg+xml,%3Csvg width='1025' height='1024' viewBox='0 0 1025 1024' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.015625' width='1024' height='1024' rx='200' fill='url(%23paint0_linear_2205_70745)'/%3E%3Cpath d='M576.767 321.615L517.87 337.398L477.892 188.18C475.053 177.578 464.261 174.998 457.978 176.681C456.016 177.207 454.158 178.127 452.405 179.439L172.503 380.287C153.798 393.717 145.708 416.929 151.704 439.31L158.753 465.62C130.179 501.897 118.48 550.907 131.421 599.208L92.809 455.095C80.2907 408.364 97.7999 359.061 136.964 330.888L417.153 129.541C424.95 124.085 433.56 120.095 442.198 117.779C481.462 107.258 525.32 129.595 536.787 172.397L576.767 321.615Z' fill='white'/%3E%3Cpath d='M901.229 487.953C904.07 498.557 898.138 509.405 887.251 512.743L829.926 528.105C809.116 533.681 786.167 523.417 779.126 503.418C774.686 491.561 776.347 478.911 782.096 468.954C787.164 459.599 795.928 453.04 806.528 450.2L865.818 434.312C877.309 431.654 887.867 438.084 890.709 448.685L901.229 487.953Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M835.092 398.388C856.687 392.601 869.622 370.196 863.835 348.598L859.205 331.32C837.427 250.038 753.292 201.456 672.016 223.237L221.275 344.029C187.901 352.972 160.22 372.174 140.536 397.652C111.96 433.929 100.261 482.939 113.202 531.238L184.007 795.511C205.785 876.793 289.92 925.375 371.196 903.594L821.937 782.801C903.213 761.022 951.789 676.878 930.01 595.593L928.01 588.133C922.226 566.535 899.821 553.599 878.228 559.386L844.069 568.54C806.374 578.642 764.046 565.153 744.447 531.266C728.206 503.631 730.341 472.336 744.817 447.833C755.346 429.019 773.057 415.014 795.044 409.121L835.092 398.388Z' fill='white'/%3E%3Cpath d='M464.287 573.287L475.718 615.952C482.923 642.846 473.333 656.36 445.446 663.833L418.977 670.927C387.315 679.411 365.746 676.197 357.602 645.802C349.428 615.292 366.636 601.671 398.158 593.223L428.776 585.019L428.222 582.952C424.411 568.729 414.436 564.74 395.502 569.814C386.163 572.316 377.487 576.304 366.085 582.004C358.338 585.741 352.405 583.314 350.185 575.031L348.904 570.249C346.999 563.137 349.761 557.414 357.744 553.471C371.084 546.706 381.379 542.013 392.791 538.955C427.942 529.535 454.967 538.502 464.287 573.287ZM439.167 623.804L435.669 610.747L406.87 618.465C391.171 622.672 388.892 627.168 391.454 636.731C393.983 646.171 398.205 648.925 413.772 644.753L429.727 640.478C440.892 637.486 441.49 632.473 439.167 623.804Z' fill='url(%23paint1_linear_2205_70745)'/%3E%3Cpath d='M486.218 466.273L471.656 470.175C465.466 471.834 461.786 478.185 463.436 484.347L504.102 636.13C505.757 642.308 512.117 645.961 518.307 644.302L532.87 640.399C539.06 638.741 542.734 632.399 541.079 626.221L500.414 474.438C498.763 468.276 492.408 464.614 486.218 466.273Z' fill='url(%23paint2_linear_2205_70745)'/%3E%3Cpath d='M683.167 585.484L682.28 584.895L619.987 544.179L654.851 485.552L655.083 485.143C658.836 478.169 655.192 473.144 646.933 473.919C645.714 474.039 644.456 474.269 643.195 474.607L642.909 474.684L630.118 478.111C624.603 479.597 619.473 483.228 617.014 487.574L616.944 487.717L582.009 546.544L558.519 458.868C556.868 452.706 550.505 449.046 544.323 450.703L529.768 454.603C523.579 456.262 519.898 462.613 521.549 468.775L562.214 620.558C563.87 626.736 570.231 630.388 576.42 628.73L590.975 624.829C597.156 623.173 600.84 616.828 599.184 610.65L586.214 562.239L647.931 602.573L648.343 602.842C652.865 605.912 660.02 606.591 666.062 604.69L665.393 604.886L678.177 601.461L677.174 601.712C678.846 601.33 680.431 600.808 681.855 600.119C689.382 596.515 689.96 589.97 683.167 585.484Z' fill='url(%23paint3_linear_2205_70745)'/%3E%3Cpath d='M339.565 505.573L217.352 538.324C211.169 539.981 207.489 546.332 209.14 552.494L211.919 562.867C213.572 569.038 219.935 572.698 226.117 571.041L268.751 559.616L303.643 689.849C305.298 696.027 311.659 699.679 317.848 698.021L332.403 694.121C338.585 692.464 342.268 686.12 340.613 679.942L305.721 549.709L348.331 538.29C354.521 536.631 358.193 530.282 356.54 524.112L353.761 513.738C352.11 507.576 345.755 503.914 339.565 505.573Z' fill='url(%23paint4_linear_2205_70745)'/%3E%3Cpath d='M694.583 424.234C698.079 437.284 690.304 450.701 677.22 454.207C664.136 457.713 650.687 449.984 647.191 436.934C643.695 423.884 651.478 410.466 664.562 406.959C677.646 403.453 691.087 411.184 694.583 424.234Z' fill='url(%23paint5_linear_2205_70745)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_2205_70745' x1='512.016' y1='0' x2='512.016' y2='1024' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23253B84'/%3E%3Cstop offset='1' stop-color='%23192862'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear_2205_70745' x1='392.083' y1='539.144' x2='426.834' y2='668.821' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23253B84'/%3E%3Cstop offset='1' stop-color='%23192862'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint2_linear_2205_70745' x1='478.933' y1='468.225' x2='525.595' y2='642.349' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23253B84'/%3E%3Cstop offset='1' stop-color='%23192862'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint3_linear_2205_70745' x1='580.785' y1='440.932' x2='627.447' y2='615.059' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23253B84'/%3E%3Cstop offset='1' stop-color='%23192862'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint4_linear_2205_70745' x1='278.458' y1='521.948' x2='325.12' y2='696.072' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23253B84'/%3E%3Cstop offset='1' stop-color='%23192862'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint5_linear_2205_70745' x1='664.558' y1='406.96' x2='677.219' y2='454.207' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23253B84'/%3E%3Cstop offset='1' stop-color='%23192862'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%0A`;
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
