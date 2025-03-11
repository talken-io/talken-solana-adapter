// @ts-ignore
// import { walletConnect, injected, coinbaseWallet } from "@wagmi/connectors";
// import {
//   Config,
//   ConnectReturnType,
//   SendTransactionParameters,
//   connect,
//   createConfig,
//   disconnect,
//   http,
//   reconnect,
//   sendTransaction,
//   signMessage,
//   switchChain,
//   writeContract,
// } from "@wagmi/core";
// import {
//   mainnet,
//   polygon,
//   optimism,
//   arbitrum,
//   avalanche,
//   base,
//   gnosis,
//   neonMainnet,
//   zora,
//   zkSync,
//   opBNB,
//   linea,
//   bsc,
// } from "@wagmi/core/chains";
// import { appleAuthHelpers } from 'react-apple-signin-auth';

// import { SignableMessage, createClient } from "viem";

// const iframeUrl = "https://wallet.talken.io";
// const iframeUrl = 'http://localhost:3000';
// const buttonLogoURI = "https://wallet.talken.io/icons/TALK.svg";
const buttonLogoURI =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMTQ1NF8xMjQ5MjIpIi8+CjxwYXRoIGQ9Ik0zODYuNzc3IDc3MS4zNjhWODExLjQ3OEMzODYuNzc3IDgzNi43NjEgMzc1LjE4OCA4NDYuMzYxIDM0OC45NjggODQ2LjM2MUgzMjQuMDgxQzI5NC4zMTIgODQ2LjM2MSAyNzYuMTQ2IDgzOC40NzIgMjc2LjE0NiA4MDkuODk3QzI3Ni4xNDYgNzgxLjIxNCAyOTQuNDQzIDc3My4zMTEgMzI0LjA4MSA3NzMuMzExSDM1Mi44NjhWNzcxLjM2OEMzNTIuODY4IDc1Ny45OTcgMzQ1LjA1NSA3NTIuMTUzIDMyNy4yNTMgNzUyLjE1M0MzMTguNDcyIDc1Mi4xNTMgMzA5LjkyNCA3NTMuNjExIDI5OC41ODIgNzU1LjkzMUMyOTAuOTA3IDc1Ny4zODggMjg2LjI3MyA3NTMuODY0IDI4Ni4yNzMgNzQ2LjA3N1Y3NDEuNTgyQzI4Ni4yNzMgNzM0Ljg5NiAyOTAuMDQxIDczMC41MjUgMjk3Ljk3MSA3MjguOTQzQzMxMS4yNjMgNzI2LjE0NSAzMjEuMzk3IDcyNC40NDggMzMyLjEyNyA3MjQuNDQ4QzM2NS4xNzcgNzI0LjQ0OCAzODYuNzc3IDczOC42NjYgMzg2Ljc3NyA3NzEuMzY4Wk0zNTIuODY4IDgwOS43NzRWNzk3LjQ5OUgzMjUuNzkxQzMxMS4wMyA3OTcuNDk5IDMwNy45NzQgODAwLjkwNyAzMDcuOTc0IDgwOS44OTdDMzA3Ljk3NCA4MTguNzcyIDMxMS4wMyA4MjIuMTggMzI1LjY2NyA4MjIuMThIMzQwLjY2OEMzNTEuMTY2IDgyMi4xOCAzNTIuODY4IDgxNy45MjQgMzUyLjg2OCA4MDkuNzc0WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTY2NC40ODMgNzk3LjYyOUw2MTIuMTQ3IDgwMi45NzNDNjE2LjU0MSA4MTYuNTgyIDYyNi41MjIgODIxLjQ0NyA2NDIuNzUyIDgyMS40NDdDNjUwLjY3NSA4MjEuNDQ3IDY2MC4xODMgODIwLjg1MyA2NzAuNjc0IDgxOC4zMDFDNjc4LjYwNCA4MTYuNDczIDY4My4zNjEgODE5Ljg3NCA2ODMuMzYxIDgyNy43NzdWODMxLjQzMkM2ODMuMzYxIDgzNy45ODYgNjgwLjMwNiA4NDIuMjUgNjczLjg0NiA4NDMuOTQ2QzY2MC42NzggODQ3LjQ3NyA2NDkuMTY5IDg0OC41NTEgNjM3LjY4OSA4NDguNTUxQzYwMC43NCA4NDguNTUxIDU3Ni45MTQgODI4LjUwMyA1NzYuOTE0IDc4Ni42NzNDNTc2LjkxNCA3NDcuMTc5IDU5Ni45NTcgNzI0LjQ0OCA2MzcuOTM3IDcyNC40NDhDNjcyLjM0IDcyNC40NDggNjkxLjc3MSA3NDAuNzMzIDY5MS43NzEgNzcxLjExM0M2OTEuNzcxIDc4OC4xMzEgNjg2LjQzOSA3OTUuMzA5IDY2NC40ODMgNzk3LjYyOVpNNjU5LjcwMyA3NjcuOTU5QzY1OS43MDMgNzU2LjQxNiA2NTMuNTQ5IDc1MC4yMTcgNjM3LjkzNyA3NTAuMjE3QzYyMC45ODYgNzUwLjIxNyA2MTIuMTQ3IDc1Ny44NjcgNjEwLjMyMSA3NzguNDE1TDY1MS4yNzkgNzc0LjE1OUM2NTguMzU3IDc3My40MzQgNjU5LjcwMyA3NzIuMDkyIDY1OS43MDMgNzY3Ljk1OVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik00MzEuMTY3IDY4Mi42NThINDE3LjQ3NUM0MTEuNjU1IDY4Mi42NTggNDA2LjkzNCA2ODcuMzY0IDQwNi45MzQgNjkzLjE1N1Y4MzUuODVDNDA2LjkzNCA4NDEuNjU4IDQxMS42NTUgODQ2LjM1NyA0MTcuNDc1IDg0Ni4zNTdINDMxLjE2N0M0MzYuOTg3IDg0Ni4zNTcgNDQxLjcwMSA4NDEuNjU4IDQ0MS43MDEgODM1Ljg1VjY5My4xNTdDNDQxLjcwMSA2ODcuMzY0IDQzNi45ODcgNjgyLjY1OCA0MzEuMTY3IDY4Mi42NThaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNNTc1LjkyMiA4MzMuNTE2TDU3NS4yODIgODMyLjc5MUw1MzAuMjA2IDc4Mi40MzVMNTc0LjU2OSA3MzkuMjA2TDU3NC44NjggNzM4LjkwMkM1NzkuOCA3MzMuNjY3IDU3Ny43ODQgNzI4LjQwMyA1NzAuMzU3IDcyNy4xNDFDNTY5LjI1OSA3MjYuOTYgNTY4LjEwMiA3MjYuODY2IDU2Ni45MTYgNzI2Ljg2Nkg1NjYuNjQ3SDU1NC42MjFDNTQ5LjQzNCA3MjYuODczIDU0NC4wOCA3MjguODUyIDU0MC45MDEgNzMyLjA4Nkw1NDAuODA2IDczMi4xOTVMNDk2LjMzNCA3NzUuNTgzVjY5My4xNTdDNDk2LjMzNCA2ODcuMzY0IDQ5MS42MTIgNjgyLjY1OCA0ODUuOCA2ODIuNjU4SDQ3Mi4xMTVDNDY2LjI5NiA2ODIuNjU4IDQ2MS41NzQgNjg3LjM2NCA0NjEuNTc0IDY5My4xNTdWODM1Ljg1QzQ2MS41NzQgODQxLjY1OCA0NjYuMjk2IDg0Ni4zNTcgNDcyLjExNSA4NDYuMzU3SDQ4NS44QzQ5MS42MTIgODQ2LjM1NyA0OTYuMzM0IDg0MS42NTggNDk2LjMzNCA4MzUuODVWNzkwLjMzOEw1NDAuOTk1IDg0MC4yMjNMNTQxLjI5MyA4NDAuNTU2QzU0NC41MzggODQ0LjMxMiA1NTAuNjU2IDg0Ni41ODkgNTU2LjQwMyA4NDYuMzQyTDU1NS43NyA4NDYuMzU3SDU2Ny43ODlMNTY2Ljg1IDg0Ni4zNDJDNTY4LjQwNyA4NDYuNCA1NjkuOTIgODQ2LjMxNCA1NzEuMzMxIDg0Ni4wNDVDNTc4Ljc4MSA4NDQuNjUzIDU4MC44MjYgODM5LjA0OCA1NzUuOTIyIDgzMy41MTZaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjkzLjI4MiA2ODIuNjU4SDE3OC4zNzRDMTcyLjU2MSA2ODIuNjU4IDE2Ny44NCA2ODcuMzY0IDE2Ny44NCA2OTMuMTU3VjcwMi45MDlDMTY3Ljg0IDcwOC43MSAxNzIuNTYxIDcxMy40MTYgMTc4LjM3NCA3MTMuNDE2SDIxOC40NTlWODM1Ljg1QzIxOC40NTkgODQxLjY1OCAyMjMuMTgxIDg0Ni4zNTcgMjI5IDg0Ni4zNTdIMjQyLjY4NUMyNDguNDk3IDg0Ni4zNTcgMjUzLjIxOSA4NDEuNjU4IDI1My4yMTkgODM1Ljg1VjcxMy40MTZIMjkzLjI4MkMyOTkuMTAyIDcxMy40MTYgMzAzLjgxNiA3MDguNzEgMzAzLjgxNiA3MDIuOTA5VjY5My4xNTdDMzAzLjgxNiA2ODcuMzY0IDI5OS4xMDIgNjgyLjY1OCAyOTMuMjgyIDY4Mi42NThaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNODI1LjEyNCA3NzkuMTU0QzgyNS4xMjQgNzcxLjMxIDgyNC4xMjggNzYzLjY4OSA4MjIuMjIxIDc1Ni40MzhDODE4LjM3MyA3NDEuODQzIDgwNi4zODQgNzI5Ljk1OSA3OTEuNDI2IDcyNy4wMTVDNzgzLjExMSA3MjUuMzg0IDc3NC4zMTYgNzI0LjQ0OCA3NjUuNTEzIDcyNC40NDhDNzU2LjcxIDcyNC40NDggNzQ3Ljk3MyA3MjUuMzYyIDczOS42NTEgNzI3LjAwOEM3MjQuNzMgNzI5Ljk0NCA3MTIuNzMzIDc0MS43OTkgNzA4LjgzNCA3NTYuMzNDNzA2Ljg3NyA3NjMuNjA5IDcwNS45MDIgNzcxLjI3MyA3MDUuOTAyIDc3OS4xNTRWODM2LjExNkM3MDUuOTAyIDg0MS45MTcgNzEwLjYxNiA4NDYuNjE1IDcxNi40MzYgODQ2LjYxNUg3MzAuMTJDNzM1LjkzMyA4NDYuNjE1IDc0MC42NTUgODQxLjkxNyA3NDAuNjU1IDgzNi4xMTZWNzc5LjE1NEM3NDAuNjU1IDc3NC4xOCA3NDEuNDE4IDc2OS4zOCA3NDIuODMgNzY0Ljg3MUw3NDIuOTEgNzY0LjU4OEM3NDQuMjM0IDc2MC4zMzkgNzQ3LjUyMiA3NTYuOTYgNzUxLjcyIDc1NS40OTZMNzUyLjAxMSA3NTUuMzg3Qzc1Ni4zNjggNzUzLjkzNyA3NjAuNjYgNzUzLjE1NCA3NjUuNTEzIDc1My4xNTRDNzcwLjM5NCA3NTMuMTU0IDc3NC43MDkgNzUzLjk0NCA3NzkuMDg4IDc1NS40MTZMNzc5LjI4NCA3NTUuNDg4Qzc4My40NzUgNzU2LjkzOSA3ODYuNzYzIDc2MC4zMDMgNzg4LjA5NSA3NjQuNTNMNzg4LjE5NiA3NjQuODcxQzc4OS42MDggNzY5LjM4IDc5MC4zNjQgNzc0LjE4IDc5MC4zNjQgNzc5LjE1NFY4MzYuMTE2Qzc5MC4zNjQgODQxLjkxNyA3OTUuMDc4IDg0Ni42MTUgODAwLjg5OCA4NDYuNjE1SDgxNC41ODNDODIwLjQxIDg0Ni42MTUgODI1LjExNyA4NDEuOTE3IDgyNS4xMTcgODM2LjExNkw4MjUuMTI0IDc3OS4xNTRaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNODU2LjE2MSA2OTQuNzU5Qzg1Ni4xNjEgNzA3LjAyNyA4NDYuMTg3IDcxNi45NjggODMzLjg4NSA3MTYuOTY4QzgyMS41ODMgNzE2Ljk2OCA4MTEuNjAyIDcwNy4wMjcgODExLjYwMiA2OTQuNzU5QzgxMS42MDIgNjgyLjQ5IDgyMS41ODMgNjcyLjU1IDgzMy44ODUgNjcyLjU1Qzg0Ni4xODcgNjcyLjU1IDg1Ni4xNjEgNjgyLjQ5IDg1Ni4xNjEgNjk0Ljc1OVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik01MzUuNjk5IDI0Ny44NzdMNTA2LjE2MiAyNTUuNzkxTDQ4Ni4xMTMgMTgwLjk2NkM0ODQuNjg5IDE3NS42NSA0NzkuMjc3IDE3NC4zNTYgNDc2LjEyNiAxNzUuMkM0NzUuMTQyIDE3NS40NjQgNDc0LjIxIDE3NS45MjUgNDczLjMzMSAxNzYuNTgzTDMzMi45NTkgMjc3LjI5OEMzMjMuNTc4IDI4NC4wMzIgMzE5LjUyMSAyOTUuNjcyIDMyMi41MjggMzA2Ljg5NUwzMjYuMDYzIDMyMC4wODhDMzExLjczMyAzMzguMjc5IDMwNS44NjYgMzYyLjg1NSAzMTIuMzU2IDM4Ny4wNzVMMjkyLjk5MiAzMTQuODFDMjg2LjcxNCAyOTEuMzc3IDI5NS40OTUgMjY2LjY1NCAzMTUuMTM2IDI1Mi41MjdMNDU1LjY1MiAxNTEuNTYyQzQ1OS41NjIgMTQ4LjgyNiA0NjMuODggMTQ2LjgyNSA0NjguMjEyIDE0NS42NjRDNDg3LjkwMyAxNDAuMzg4IDUwOS44OTggMTUxLjU4OSA1MTUuNjQ5IDE3My4wNTJMNTM1LjY5OSAyNDcuODc3WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTcwNy41NTMgMzY1LjM3NkM3MDguOTc4IDM3MC42OTMgNzA2LjAwMyAzNzYuMTMzIDcwMC41NDMgMzc3LjgwN0w2NzEuNzk0IDM4NS41MUM2NjEuMzU4IDM4OC4zMDYgNjQ5Ljg0OSAzODMuMTU5IDY0Ni4zMTggMzczLjEzMUM2NDQuMDkxIDM2Ny4xODUgNjQ0LjkyNCAzNjAuODQyIDY0Ny44MDcgMzU1Ljg0OUM2NTAuMzQ5IDM1MS4xNTggNjU0Ljc0NCAzNDcuODY5IDY2MC4wNiAzNDYuNDQ1TDY4OS43OTQgMzM4LjQ3OEM2OTUuNTU3IDMzNy4xNDUgNzAwLjg1MiAzNDAuMzY5IDcwMi4yNzcgMzQ1LjY4NUw3MDcuNTUzIDM2NS4zNzZaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTY3NC4zODUgMzIwLjQ2NUM2ODUuMjE1IDMxNy41NjMgNjkxLjcwMiAzMDYuMzI4IDY4OC44IDI5NS40OThMNjg2LjQ3OCAyODYuODM0QzY3NS41NTYgMjQ2LjA3NSA2MzMuMzYyIDIyMS43MTQgNTkyLjYwMiAyMzIuNjM2TDM2Ni41NTMgMjkzLjIwN0MzNDkuODE2IDI5Ny42OTEgMzM1LjkzNCAzMDcuMzIgMzI2LjA2MiAzMjAuMDk2QzMxMS43MzEgMzM4LjI4NyAzMDUuODY0IDM2Mi44NjMgMzEyLjM1NCAzODcuMDgyTDM0Ny44NjMgNTE5LjYwMUMzNTguNzg1IDU2MC4zNiA0MDAuOTc5IDU4NC43MjEgNDQxLjczOSA1NzMuNzk5TDY2Ny43ODggNTEzLjIyOEM3MDguNTQ4IDUwMi4zMDcgNzMyLjkwOSA0NjAuMTEzIDcyMS45ODcgNDE5LjM1M0w3MjAuOTg0IDQxNS42MTJDNzE4LjA4MyA0MDQuNzgyIDcwNi44NDcgMzk4LjI5NSA2OTYuMDE4IDQwMS4xOTdMNjc4Ljg4NyA0MDUuNzg3QzY1OS45ODMgNDEwLjg1MyA2MzguNzU1IDQwNC4wODkgNjI4LjkyNiAzODcuMDk2QzYyMC43ODEgMzczLjIzOSA2MjEuODUyIDM1Ny41NDYgNjI5LjExMiAzNDUuMjU5QzYzNC4zOTIgMzM1LjgyNSA2NDMuMjc0IDMyOC44MDIgNjU0LjMwMSAzMjUuODQ3TDY3NC4zODUgMzIwLjQ2NVpNNDA3LjUwNSAzODcuNzU2QzM5OS40MzIgMzg5LjkxOSAzOTAuOTQzIDM4NS4wMTggMzg4Ljc4IDM3Ni45NDVDMzg2LjYxNiAzNjguODcyIDM5MS41MTcgMzYwLjM4MyAzOTkuNTkxIDM1OC4yMkw1MzcuNDI2IDMyMS4yODZDNTQ1LjQ5OSAzMTkuMTIzIDU1My45ODggMzI0LjAyNCA1NTYuMTUxIDMzMi4wOTdDNTU4LjMxNCAzNDAuMTcgNTUzLjQxMyAzNDguNjU5IDU0NS4zNCAzNTAuODIyTDQwNy41MDUgMzg3Ljc1NloiIGZpbGw9IndoaXRlIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMTQ1NF8xMjQ5MjIiIHgxPSI1MTIiIHkxPSIwIiB4Mj0iNTEyIiB5Mj0iMTAyNCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMjUzQjg0Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE5Mjg2MiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=';

export class TalkenEmbed {
    private iframe: HTMLIFrameElement;
    private iframeOrigin: string;
    private _ready: boolean = false;
    // private authMode: string = "Ethereum";
    // private logoDataURI: string = "Default";
    private buttonLogoURI: string = buttonLogoURI;
    // private onrampMode: string = "Standard";
    private readonly listeners: { [key: string]: (data: any) => void } = {};
    private minimizeButton: HTMLImageElement;
    private readonly commandQueue: {
        command: string;
        data: any;
        resolve: (value: any) => void;
        reject: (reason: any) => void;
    }[] = [];
    // walletConnectSession: any;
    // connectedWalletAddress: string | null = null;
    // connectedChainId: number | null = null;
    // wagmiConfig: Config;

    constructor(url: string) {
        this.handleMessage = this.handleMessage.bind(this);
        window.addEventListener('message', this.handleMessage);
        this.iframeOrigin = new URL(url).origin;
        this.iframe = this.createIframe();
        // set iframe allowtransparency="true" to allow for transparency
        this.iframe.setAttribute('allowtransparency', 'true');
        // this.buttonLogoURI = buttonLogoURI;
        this.minimizeButton = this.createMinimizeButton();
        // this.authMode = authModeAdapter;
        // this.logoDataURI = logoDataURI;

        // const wagmiConfig = createConfig({
        //   chains: [
        //     mainnet,
        //     polygon,
        //     optimism,
        //     arbitrum,
        //     avalanche,
        //     base,
        //     zora,
        //     zkSync,
        //     gnosis,
        //     neonMainnet,
        //     opBNB,
        //     linea,
        //     bsc,
        //   ],
        //   client({ chain }) {
        //     return createClient({
        //       chain,
        //       transport: http(),
        //     });
        //   },
        //   connectors: [
        //     injected({
        //       shimDisconnect: true,
        //     }),
        //     walletConnect({
        //       projectId: "927848f28c257a3e24dacce25127d8d5",
        //       metadata: {
        //         name: "Talken",
        //         description: "Talken Wallet",
        //         url: "https://talken.one",
        //         icons: [logoDataURI],
        //       },
        //       qrModalOptions: {
        //         themeVariables: {
        //           "--wcm-z-index": "2147483647",
        //         },
        //       },
        //     }),
        //     coinbaseWallet({
        //       appName: "Talken",
        //     }),
        //   ],
        // });

        // this.wagmiConfig = wagmiConfig;
    }

    private isMobileDevice(): boolean {
        return window.matchMedia('(max-width: 767px)').matches;
    }

    private createIframe(): HTMLIFrameElement {
        const iframe = document.createElement('iframe');
        iframe.src = this.iframeOrigin;
        iframe.sandbox;
        iframe.style.position = 'fixed';
        iframe.style.top = '50%';
        iframe.style.left = '50%';
        iframe.style.transform = 'translate(-50%, -50%)';
        iframe.style.width = '400px';
        iframe.style.height = '600px';
        iframe.style.overflow = 'hidden';
        iframe.style.zIndex = '9998';
        iframe.style.border = 'none';
        iframe.sandbox.value =
            'allow-scripts allow-same-origin allow-popups allow-modals allow-forms allow-top-navigation allow-popups-to-escape-sandbox allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation';
        iframe.allow = 'clipboard-write; clipboard-read; microphone; camera';
        // allowtransparency="true" on iframe to allow for transparency
        iframe.onload = () => {
            iframe.contentWindow?.postMessage(
                { type: 'initIframe', data: { origin: window.location.origin } },
                this.iframeOrigin
            );
        };
        if (this.isMobileDevice()) {
            // start the iframe from the bottom of the screen where the content ends
            iframe.style.left = '0';
            iframe.style.top = '0';
            iframe.style.top = [window.innerHeight - 600] + 'px';
            iframe.style.width = '100%';
            iframe.style.transform = '';
        }
        document.body.appendChild(iframe);

        return iframe;
    }

    public moveModal(corner: string = 'top-right'): void {
        if (!this.isMobileDevice()) {
            this.iframe.style.transform = '';
            switch (corner) {
                case 'top-left':
                    this.setPosition(this.iframe, '10px', 'auto', '10px', 'auto');
                    this.setPosition(this.minimizeButton, '10px', 'auto', '10px', 'auto');
                    break;
                case 'top-right':
                    this.setPosition(this.iframe, '10px', '10px', 'auto', 'auto');
                    this.setPosition(this.minimizeButton, '10px', '10px', 'auto', 'auto');
                    break;
                case 'bottom-left':
                    this.setPosition(this.iframe, 'auto', 'auto', '10px', '10px');
                    this.setPosition(this.minimizeButton, 'auto', 'auto', '10px', '10px');
                    break;
                case 'bottom-right':
                    this.setPosition(this.iframe, 'auto', '10px', 'auto', '10px');
                    this.setPosition(this.minimizeButton, 'auto', '10px', 'auto', '10px');
                    break;
                case 'center':
                    this.iframe.style.top = '50%';
                    this.iframe.style.left = '50%';
                    this.iframe.style.transform = 'translate(-50%, -50%)';
                    this.minimizeButton.style.display = 'none';
                    // gray out the entire screen behind the iframe and slowly fade in
                    const overlay = document.createElement('div');
                    // give it the id overlay\
                    overlay.id = 'overlay';
                    overlay.style.position = 'fixed';
                    overlay.style.top = '0';
                    overlay.style.left = '0';
                    overlay.style.width = '100%';
                    overlay.style.height = '100%';
                    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                    overlay.style.zIndex = '9998';
                    overlay.style.transition = 'background-color 0.5s ease';
                    document.body.appendChild(overlay);
                    setTimeout(() => {
                        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                    }, 10);
                    // increase z-index of iframe to be above overlay
                    this.iframe.style.zIndex = '9999';
                    // make iframe 100% width and height
                    this.iframe.style.display = 'block';
                    break;
                default:
                    console.error('Invalid corner specified for moveModal method');
                    break;
            }
        } else if (corner === 'center') {
            // gray out the entire screen behind the iframe and slowly fade in
            const overlay = document.createElement('div' as any);
            // give it the id overlay\
            overlay.id = 'overlay';
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            overlay.style.zIndex = '9998';
            overlay.style.transition = 'background-color 0.5s ease';
            document.body.appendChild(overlay);
            setTimeout(() => {
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            }, 10);
            // increase z-index of iframe to be above overlay
            this.iframe.style.zIndex = '9999';
            // make iframe 100% width and height
            this.iframe.style.display = 'block';
        } else {
            switch (corner) {
                case 'top-left':
                    this.setPosition(this.minimizeButton, '10px', 'auto', '10px', 'auto');
                    break;
                case 'top-right':
                    this.setPosition(this.minimizeButton, '10px', '10px', 'auto', 'auto');
                    break;
                case 'bottom-left':
                    this.setPosition(this.minimizeButton, 'auto', 'auto', '10px', '10px');
                    break;
                case 'bottom-right':
                    this.setPosition(this.minimizeButton, 'auto', '10px', 'auto', '10px');
                    break;
            }
        }
    }

    private setPosition(element: HTMLElement, top: string, right: string, left: string, bottom: string): void {
        element.style.top = top;
        element.style.right = right;
        element.style.left = left;
        element.style.bottom = bottom;
    }

    private createMinimizeButton(): HTMLImageElement {
        const imgButton: HTMLImageElement = document.createElement('img');
        imgButton.src = this.buttonLogoURI;
        imgButton.style.position = 'fixed';
        imgButton.style.display = 'none';
        imgButton.style.borderRadius = '50%';
        imgButton.style.borderWidth = '2px'; // Updated border width
        imgButton.style.borderStyle = 'solid';
        imgButton.style.borderColor = 'white'; // Updated border color
        imgButton.style.transition = 'left 0.5s ease'; // Added transition for smooth hover effect

        if (this.isMobileDevice()) {
            imgButton.style.width = '45px';
            imgButton.style.height = '45px';
        } else {
            imgButton.style.width = '55px';
            imgButton.style.height = '55px';
        }
        imgButton.style.zIndex = '2147483647';
        imgButton.style.cursor = 'pointer';
        imgButton.draggable = false; // Prevent default image dragging

        let isDragging: boolean = false;
        let startY: number, initialY: number, startX: number, initialX: number;

        const onMouseMove = (moveEvent: MouseEvent) => {
            imgButton.style.transition = ''; // Disable transition during drag
            const dy = moveEvent.clientY - startY;
            const dx = moveEvent.clientX - startX;
            if (Math.abs(dy) > 5 || Math.abs(dx) > 5) {
                isDragging = true;
                imgButton.style.top = `${Math.min(
                    window.innerHeight - imgButton.offsetHeight,
                    Math.max(0, initialY + dy)
                )}px`;
                imgButton.style.left = `${Math.min(
                    window.innerWidth - imgButton.offsetWidth,
                    Math.max(0, initialX + dx)
                )}px`;
            }
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            if (!isDragging) this.toggleIframe();
            else {
                // Re-enable transition and snap to left or right
                imgButton.style.transition = 'left 0.5s ease';
                const midpoint = window.innerWidth / 2;
                const buttonCenter = imgButton.offsetLeft + imgButton.offsetWidth / 2;
                if (buttonCenter < midpoint) imgButton.style.left = '0px';
                else imgButton.style.left = `${window.innerWidth - imgButton.offsetWidth}px`;
            }
        };

        imgButton.addEventListener('mousedown', (e: MouseEvent) => {
            e.preventDefault(); // Prevent default image dragging behavior
            startY = e.clientY;
            startX = e.clientX;
            initialY = imgButton.offsetTop;
            initialX = imgButton.offsetLeft;
            isDragging = false;

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        imgButton.addEventListener('touchstart', (e: TouchEvent) => {
            e.preventDefault(); // Prevent screen scrolling
            startY = e.touches[0].clientY;
            startX = e.touches[0].clientX;
            initialY = imgButton.offsetTop;
            initialX = imgButton.offsetLeft;
            isDragging = false;
        });

        imgButton.addEventListener('touchmove', (e: TouchEvent) => {
            e.preventDefault(); // Prevent screen scrolling
            imgButton.style.transition = ''; // Disable transition during drag
            const dy = e.touches[0].clientY - startY;
            const dx = e.touches[0].clientX - startX;
            if (Math.abs(dy) > 5 || Math.abs(dx) > 5) {
                isDragging = true;
                imgButton.style.top = `${Math.min(
                    window.innerHeight - imgButton.offsetHeight,
                    Math.max(0, initialY + dy)
                )}px`;
                imgButton.style.left = `${Math.min(
                    window.innerWidth - imgButton.offsetWidth,
                    Math.max(0, initialX + dx)
                )}px`;
            }
        });

        imgButton.addEventListener('touchend', (e: TouchEvent) => {
            e.preventDefault(); // Prevent screen scrolling
            if (!isDragging) this.toggleIframe();
            else {
                // Re-enable transition and snap to left or right
                imgButton.style.transition = 'left 0.5s ease';
                const midpoint = window.innerWidth / 2;
                const buttonCenter = imgButton.offsetLeft + imgButton.offsetWidth / 2;
                if (buttonCenter < midpoint) imgButton.style.left = '0px';
                else imgButton.style.left = `${window.innerWidth - imgButton.offsetWidth}px`;
            }
        });

        imgButton.addEventListener('click', (e: MouseEvent) => {
            e.stopPropagation(); // Prevent click event propagation
        });

        document.body.appendChild(imgButton);
        return imgButton;
    }

    private toggleIframe(): void {
        if (this.iframe.style.display === 'none') {
            this.iframe.style.display = 'block';
            this.minimizeButton.style.display = 'none';
            if (this.isMobileDevice()) this.iframe.style.top = [window.innerHeight - 600] + 'px';
        } else {
            if (this.isMobileDevice()) {
                this.iframe.style.transition = 'top 0.5s ease, transform 0.5s ease';
                this.iframe.style.top = `${window.innerHeight}px`;
                this.iframe.style.transform = 'translate(0, 0)';
            } else this.iframe.style.display = 'none';
            this.minimizeButton.style.display = 'block';
            setTimeout(() => {
                if (this.isMobileDevice()) {
                    this.iframe.style.display = 'none';
                    this.iframe.style.top = '0'; // Reset position for when it is shown again
                    this.iframe.style.transform = ''; // Reset transform
                    this.iframe.style.transition = ''; // Reset transition
                }
            }, 500);
        }
    }

    private handleMessage(event: MessageEvent): void {
        // if (event.origin !== this.iframeOrigin) return;
        const { type, data } = event.data;
        // console.log('Message received11:', type, data);
        if (type === 'minimizeIframe') {
            this.toggleIframe();
            // remove the overlay if it exists
            const overlay = document.getElementById('overlay');
            if (overlay) document.body.removeChild(overlay);
            return;
        }

        if (type === 'disconnect') {
            this.disconnect();
            return;
        }
        // if (type === "googleExternal") {
        //   this.handleGoogleLogin(data);
        //   return;
        // }
        // if (type === "twitterExternal") {

        //   this.handleTwitterAuth(data);
        //   return;
        // }
        // if (type === "onramp") {
        //   this.onRamp(data);
        //   return;
        // }

        // if (type === "connectWalletConnect") {
        //   this.connectWalletConnect();
        //   return;
        // }

        // if (type === "connectInjected") {
        //   this.connectInjected(data.target);
        //   return;
        // }

        // if (type === "connectCoinbase") {
        //   this.connectCoinbaseWallet();
        //   return;
        // }

        // if (type === "switchNetwork") {
        //   this.switchNetwork(data.chainId);
        //   return;
        // }

        // if (type === "autoConnectOnLoad") {
        //   // this.autoConnectOnLoad();
        //   return;
        // }

        // if (type === "signMessage") {
        //   this.signMessage(data.key, data.message);
        //   return;
        // }

        // if (type === "sendTransaction") {
        //   this.sendTransaction(data.key, data.transaction);
        //   return;
        // }

        // if (type === "writeContract") {
        //   this.writeContract(data.key, data.transaction);
        //   return;
        // }

        if (type === 'iframeReady') {
            // this.iframe.contentWindow?.postMessage(
            //   { type: "authMethod", data: { authMode: this.authMode } },
            //   this.iframeOrigin
            // );
            // if (type === "transactionCancelled") {
            //   // do stuff
            // }
            // this.iframe.contentWindow?.postMessage(
            //   { type: "onrampMethod", data: { onrampMode: this.onrampMode } },
            //   this.iframeOrigin
            // );
            // this.iframe.contentWindow?.postMessage(
            //   { type: "logo", data: { logoDataURI: this.logoDataURI } },
            //   this.iframeOrigin
            // );
            this._ready = true;
            this.processQueue();
            return;
        }

        // if (type === "unauthenticated") {
        //   if (this.authMode === "Google" || this.authMode === "Google-Talken") {
        //     this.initGoogleOneTap();
        //   } else if (this.authMode === "Twitter" || this.authMode === "Twitter-Talken") {
        //     // this.connectTwitter();
        //   } else if (this.authMode === "Apple" || this.authMode === "Apple-Talken") {
        //     // this.initAppleSignIn();
        //   }
        // }

        if (this.listeners[type]) this.listeners[type](data);
    }

    private processQueue(): void {
        while (this.commandQueue.length && this._ready) {
            const { command, data, resolve, reject } = this.commandQueue.shift()!;
            const responseType = `${command}Response`;
            if (!this.listeners[responseType]) {
                this.listeners[responseType] = resolve;
                this.iframe.contentWindow?.postMessage({ type: command, data }, this.iframeOrigin);
            }
        }
    }

    // async connectWalletConnect(): Promise<void> {
    //   try {
    //     await this.beforeConnecting();

    //     const res = await connect(this.wagmiConfig, {
    //       connector: walletConnect({
    //         projectId: "927848f28c257a3e24dacce25127d8d5",
    //         metadata: {
    //           name: "Talken",
    //           description: "Talken Wallet",
    //           url: "https://wallet.talken.io",
    //           icons: [this.logoDataURI],
    //         },
    //         qrModalOptions: {
    //           themeVariables: {
    //             "--wcm-z-index": "2147483647",
    //           },
    //         },
    //       }),
    //     });

    //     this.onConnected(res);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }

    // async connectCoinbaseWallet(): Promise<void> {
    //   try {
    //     await this.beforeConnecting();

    //     const res = await connect(this.wagmiConfig, {
    //       connector: coinbaseWallet({
    //         appName: "Talken",
    //       }),
    //     });

    //     this.onConnected(res);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }

    // async connectInjected(target?: string): Promise<void> {
    //   try {
    //     const res = await this.beforeConnecting();

    //     if (res) {
    //       this.onConnected(res as ConnectReturnType<Config>);
    //     } else {
    //       const res = await connect(this.wagmiConfig, {
    //         connector: injected({
    //           /* target: (target ?? "metaMask") as any, */
    //         }),
    //       });

    //       localStorage.setItem("wagmi.injected.shimDisconnect", "true");

    //       this.onConnected(res);
    //     }
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }

    // async autoConnectOnLoad(): Promise<void> {
    //   const res = await this.beforeConnecting();

    //   if (res) {
    //     this.onConnected(res as ConnectReturnType<Config>);
    //   }
    // }

    // async beforeConnecting() {
    //   const reconnectRes = await reconnect(this.wagmiConfig, {
    //     connectors: [
    //       injected(),
    //       walletConnect({
    //         projectId: "927848f28c257a3e24dacce25127d8d5",
    //         metadata: {
    //           name: "Talken",
    //           description: "Talken Wallet",
    //           url: "https://wallet.talken.io",
    //           icons: [this.logoDataURI],
    //         },
    //         qrModalOptions: {
    //           themeVariables: {
    //             "--wcm-z-index": "2147483647",
    //           },
    //         },
    //       }),
    //       coinbaseWallet({
    //         appName: "Talken",
    //       }),
    //     ],
    //   });

    //   let res = null;

    //   if (reconnectRes.length) {
    //     res = await reconnectRes[0].connector.connect();
    //   }

    //   return res;
    // }

    // async initGoogleOneTap() {
    //   const clientId = '896710466843-42ss52pj2o1j9b17477nv73smnu096e2.apps.googleusercontent.com';

    //   const script = document.createElement('script');
    //   script.src = 'https://accounts.google.com/gsi/client';
    //   script.async = true;
    //   script.defer = true;
    //   document.head.appendChild(script);

    //   script.onload = () => {
    //     // @ts-ignore
    //     google.accounts.id.initialize({
    //       client_id: clientId,
    //       callback: this.onGoogleSignIn.bind(this),
    //       auto_select: true,
    //     });

    //     // @ts-ignore
    //     google.accounts.id.prompt((notification) => {
    //       if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
    //         this.googleSignInPopup();
    //         console.log('One Tap prompt was not displayed:', notification);
    //       }
    //     });
    //   };

    //   script.onerror = () => {
    //     this.googleSignInPopup();
    //     console.error('Failed to load the Google One Tap script.');
    //   };
    // }

    // onGoogleSignIn(response: any) {
    //   const id_token = response.credential;
    //   this.handleGoogleLogin(id_token);
    // }

    // googleSignInPopup() {
    //   const clientId = '896710466843-42ss52pj2o1j9b17477nv73smnu096e2.apps.googleusercontent.com';
    //   const redirectUri = "https://wallet.talken.io/callback";
    //   const origin = window.location.href;
    //   const state = encodeURIComponent(origin);
    //   function generateNonce(length: number) {
    //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     let result = '';
    //     const charactersLength = characters.length;
    //     for (let i = 0; i < length; i++) {
    //       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //     }
    //     return result;
    //   }
    //   const nonce = generateNonce(16);

    //   const popup = window.open(
    //     `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&response_type=id_token%20token&scope=email%20profile&redirect_uri=${redirectUri}&state=${state}&nonce=${nonce}`,
    //     'googleSignInPopup',
    //     'width=500,height=600'
    //   );
    // }
    // async initAppleSignIn(): Promise<void> {
    //   const appleSign = document.createElement('script');
    //   appleSign.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
    //   appleSign.async = true;
    //   appleSign.defer = true;
    //   document.head.appendChild(appleSign);
    //   // create a nonce for apple sign in
    //   function generateNonce(length: number) {
    //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     let result = '';
    //     const charactersLength = characters.length;
    //     for (let i = 0; i < length; i++) {
    //       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //     }
    //     return result;
    //   }
    //   if (!localStorage.getItem('appleSignInNonce')) {

    //     const nonce = generateNonce(16);
    //     localStorage.setItem('appleSignInNonce', nonce);

    //     appleAuthHelpers.signIn({
    //       authOptions: {
    //         clientId: 'com.talken.web',
    //         scope: 'email name',
    //         redirectURI: 'https://wallet.talken.io/api1/verifyapple',
    //         state: window.location.href,
    //         usePopup: false,
    //         nonce: nonce,

    //       },
    //     });
    //   } else {
    //     let accessToken: string | null = null;
    //     // fetch from api1 talken to get access token verifytwitter endpoint

    //     async function getToken() {
    //       try {
    //         const response = await fetch(`https://wallet.talken.io/api1/getappletoken`, {
    //           method: 'POST',
    //           headers: {
    //             'Content-Type': 'application/json',
    //           },
    //           body: JSON.stringify({ codeVerifier: localStorage.getItem('appleSignInNonce') }),

    //         });
    //         const data = await response.json();
    //         if (data) {
    //           accessToken = data.supabaseToken;

    //         } else {
    //           console.error('Failed to get token');

    //         }
    //       } catch (e) {
    //         console.error(e);

    //       }

    //     }
    //     const getTheToken = setInterval(async () => {
    //       await getToken();
    //       if (accessToken) {
    //         this.iframe.contentWindow?.postMessage(
    //           {
    //             type: "twitter",
    //             data: {
    //               token: accessToken,
    //             },
    //           },
    //           this.iframeOrigin
    //         );
    //         localStorage.removeItem('appleSignInNonce');
    //         clearInterval(getTheToken);
    //       }
    //     }, 1500);
    //   }
    // }
    // async connectTwitter(): Promise<void> {
    //   const clientId = 'Slo1eVdkSEt0a2dYOE1VU1JCcVk6MTpjaQ';
    //   const redirectUri = "https://wallet.talken.io/callbacktwitter";
    //   const state = encodeURIComponent(window.location.href);

    //   function generateNonce(length: number) {
    //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     let result = '';
    //     const charactersLength = characters.length;
    //     for (let i = 0; i < length; i++) {
    //       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //     }
    //     return result;
    //   }

    //   function generateCodeVerifier(length: number) {
    //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    //     let result = '';
    //     const charactersLength = characters.length;
    //     for (let i = 0; i < length; i++) {
    //       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //     }
    //     return result;
    //   }

    //   async function generateCodeChallenge(verifier: string) {
    //     const encoder = new TextEncoder();
    //     const data = encoder.encode(verifier);
    //     const digest = await crypto.subtle.digest('SHA-256', data);
    //     return btoa(String.fromCharCode(...new Uint8Array(digest)))
    //       .replace(/\+/g, '-')
    //       .replace(/\//g, '_')
    //       .replace(/=+$/, '');
    //   }

    //   const nonce = generateNonce(16);
    //   const codeVerifier = generateCodeVerifier(128);
    //   const codeChallenge = await generateCodeChallenge(codeVerifier);

    //   const firstPopup = window.open(`https://wallet.talken.io/twittercodeverifier?codeVerifier=${codeVerifier}`);
    //   // only continue when firstpopup has closed
    //   await new Promise((resolve) => {
    //     const interval = setInterval(() => {
    //       if (firstPopup?.closed) {
    //         clearInterval(interval);
    //         resolve(null);
    //       }
    //     }, 1000);
    //   })
    //   const codeChallengeMethod = 'S256';
    //   setTimeout(() => {
    //     const popup = window.open(
    //       `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&nonce=${nonce}&scope=tweet.read%20users.read%20offline.access&code_challenge=${codeChallenge}&code_challenge_method=${codeChallengeMethod}`,
    //       'twitterSignInPopup',
    //       'width=500,height=600'
    //     );

    //   }, 1500);
    //   let accessToken: string | null = null;
    //   // fetch from api1 talken to get access token verifytwitter endpoint
    //   const getTheToken = setInterval(async () => {
    //     await getToken();
    //     if (accessToken) {
    //       this.iframe.contentWindow?.postMessage(
    //         {
    //           type: "twitter",
    //           data: {
    //             token: accessToken,
    //           },
    //         },
    //         this.iframeOrigin
    //       );
    //       clearInterval(getTheToken);
    //     }
    //   }, 1500);

    //   async function getToken() {
    //     try {
    //       const response = await fetch(`https://wallet.talken.io/api1/gettwittertoken`, {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ codeVerifier: codeVerifier }),

    //       });
    //       const data = await response.json();
    //       if (data) {
    //         accessToken = data.supabaseToken;

    //       } else {
    //         console.error('Failed to get token');

    //       }
    //     } catch (e) {
    //       console.error(e);

    //     }

    //   }

    // }

    // async handleGoogleLogin(idToken: any) {
    //   this.iframe.contentWindow?.postMessage(
    //     {
    //       type: "googleAuth",
    //       data: {
    //         token: idToken,
    //       },
    //     },
    //     this.iframeOrigin
    //   );
    // }
    // async handleTwitterAuth(idToken: any) {
    //   this.iframe.contentWindow?.postMessage(
    //     {
    //       type: "token",
    //       data: {
    //         token: idToken,
    //       },
    //     },
    //     this.iframeOrigin
    //   );
    // }

    // onRamp(url: string) {
    //   if (document.getElementById("onramp-container")) {
    //     return;
    //   }
    //   const overlay = document.createElement("div");
    //   overlay.style.position = "fixed";
    //   overlay.style.top = "0";
    //   overlay.style.left = "0";
    //   overlay.style.width = "100%";
    //   overlay.style.height = "100%";
    //   overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
    //   overlay.style.zIndex = "9998";
    //   overlay.style.transition = "background-color 0.5s ease";
    //   document.body.appendChild(overlay);

    //   const container = document.createElement("div");
    //   container.id = "onramp-container";
    //   container.style.position = "fixed";
    //   if (this.isMobileDevice()) {
    //     container.style.top = "0";
    //     container.style.left = "0";
    //     container.style.width = "100%";
    //     container.style.height = "100%";
    //     container.style.transform = "";
    //   } else {
    //     container.style.top = "50%";
    //     container.style.left = "50%";
    //     container.style.transform = "translate(-50%, -50%)";
    //     container.style.width = "400px";
    //     container.style.height = "600px";
    //   }

    //   container.style.zIndex = "9999";
    //   container.style.borderRadius = "8px";
    //   container.style.overflow = "hidden";
    //   container.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
    //   container.style.backgroundColor = "#0D1117";
    //   container.style.paddingTop = "45px";

    //   document.body.appendChild(container);

    //   const onrampIframe = document.createElement("iframe");
    //   onrampIframe.src = url;
    //   onrampIframe.style.width = "100%";
    //   onrampIframe.style.height = "100%";
    //   onrampIframe.style.border = "none";
    //   onrampIframe.sandbox.value =
    //     "allow-scripts allow-same-origin allow-popups allow-modals allow-forms allow-top-navigation allow-popups-to-escape-sandbox";
    //   onrampIframe.allow = "clipboard-write; clipboard-read;";
    //   container.appendChild(onrampIframe);

    //   const closeButton = document.createElement("button");
    //   closeButton.innerText = "X";
    //   closeButton.style.position = "absolute";
    //   closeButton.style.top = "5px";
    //   closeButton.style.right = "5px";
    //   closeButton.style.backgroundColor = "transparent";
    //   closeButton.style.color = "white";
    //   closeButton.style.border = "none";
    //   closeButton.style.borderRadius = "50%";
    //   closeButton.style.width = "30px";
    //   closeButton.style.height = "30px";
    //   closeButton.style.cursor = "pointer";
    //   closeButton.style.zIndex = "10000";
    //   container.appendChild(closeButton);

    //   closeButton.addEventListener("click", () => {
    //     document.body.removeChild(container);
    //     document.body.removeChild(overlay);
    //   });

    //   setTimeout(() => {
    //     overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    //   }, 10);
    // }

    // onConnected(res: ConnectReturnType<Config>) {
    //   this.connectedWalletAddress = res.accounts[0];
    //   this.connectedChainId = res.chainId;

    //   this.iframe.contentWindow?.postMessage(
    //     {
    //       type: "connected",
    //       data: {
    //         chainId: res.chainId,
    //         address: res.accounts[0],
    //         host: window.location.host,
    //         origin: window.location.origin,
    //       },
    //     },
    //     this.iframeOrigin
    //   );
    // }

    // async signMessage(key: string, message: SignableMessage) {
    //   try {
    //     console.log("11111111111111!!!")
    //     const signature = await signMessage(this.wagmiConfig, {
    //       message: message,
    //     });

    //     console.log("2222222222222222!!!")
    //     this.iframe.contentWindow?.postMessage(
    //       {
    //         type: "signedMessage",
    //         data: {
    //           key,
    //           message,
    //           signature,
    //         },
    //       },
    //       this.iframeOrigin
    //     );
    //     console.log("33333333333333333!!!")
    //   } catch (e) {
    //     console.error("Failed to sign message", e);
    //   }
    // }

    // async switchNetwork(chainId: number): Promise<void> {
    //   try {
    //     await switchChain(this.wagmiConfig, {
    //       chainId: Number(chainId),
    //     });

    //     this.iframe.contentWindow?.postMessage(
    //       {
    //         type: "switchedNetwork",
    //         data: {
    //           chainId: chainId,
    //         },
    //       },
    //       this.iframeOrigin
    //     );
    //   } catch (e) {
    //     console.error("Failed to switch network, retrying...", e);

    //     setTimeout(async () => {
    //       try {
    //         await switchChain(this.wagmiConfig, {
    //           chainId: Number(chainId),
    //         });

    //         this.iframe.contentWindow?.postMessage(
    //           {
    //             type: "switchedNetwork",
    //             data: {
    //               chainId: chainId,
    //             },
    //           },
    //           this.iframeOrigin
    //         );
    //       } catch (e) {
    //         console.error("Failed to switch network again", e);
    //       }
    //     }, 500);
    //   }
    // }

    // async sendTransaction(
    //   key: string,
    //   transaction: SendTransactionParameters
    // ): Promise<void> {
    //   try {
    //     const hash = await sendTransaction(this.wagmiConfig, transaction);
    //     this.iframe.contentWindow?.postMessage(
    //       {
    //         type: "sentTransaction",
    //         data: {
    //           transaction,
    //           hash,
    //           key,
    //         },
    //       },
    //       this.iframeOrigin
    //     );
    //   } catch (e) {
    //     console.error("Failed to send transaction", e);
    //   }
    // }

    // async writeContract(key: string, transaction: any) {
    //   try {
    //     const hash = await writeContract(this.wagmiConfig, transaction);

    //     this.iframe.contentWindow?.postMessage(
    //       {
    //         type: "sentTransaction",
    //         data: {
    //           transaction,
    //           hash,
    //           key,
    //         },
    //       },
    //       this.iframeOrigin
    //     );
    //   } catch (e) {
    //     console.error("Failed to send transaction", e);
    //   }
    // }

    async disconnect(): Promise<void> {
        // disconnect(this.wagmiConfig);
        // this.connectedWalletAddress = null;
        // this.connectedChainId = null;
        window.removeEventListener('message', this.handleMessage);
        // localStorage.removeItem('appleSignInNonce');
        this.iframe.contentWindow?.postMessage({ type: 'disconnected' }, this.iframeOrigin);
        this.iframe.remove();
        if (this.minimizeButton) this.minimizeButton.remove();
        this._ready = false;
    }

    async sendCommand<T = unknown>(command: string, data: any): Promise<T> {
        if (this.iframe.style.display === 'none') this.toggleIframe();
        if (command === 'signTransaction') {
            // this.moveModal("center");
            // console.log("center")
            this.moveModal('top-right');
            console.log('top-right');
        }
        const responseType = `${command}Response`;
        const origin = window.location.origin;
        return new Promise((resolve, reject) => {
            if (!this._ready) {
                this.commandQueue.push({ command, data, resolve, reject });
                setTimeout(() => {
                    console.log("Talken closed as user didn't respond within time");
                    reject(new Error('Iframe did not respond in time'));
                }, 120000);
            } else {
                if (!this.listeners[responseType]) {
                    this.listeners[responseType] = (responseData: any) => {
                        if (responseData instanceof Error) reject(responseData);
                        else resolve(responseData as T);
                        delete this.listeners[responseType];
                    };
                }
                this.iframe.contentWindow?.postMessage({ type: command, data, origin }, this.iframeOrigin);
            }
        });
    }
}
