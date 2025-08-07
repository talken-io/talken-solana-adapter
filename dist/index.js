var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
import {
  WalletConnectionError,
  WalletDisconnectionError,
  WalletNotConnectedError,
  WalletPublicKeyError,
  WalletReadyState,
  WalletSignMessageError,
  BaseMessageSignerWalletAdapter,
  isVersionedTransaction,
  WalletSignTransactionError,
  WalletSendTransactionError
} from "@solana/wallet-adapter-base";
import {
  PublicKey,
  Transaction,
  VersionedTransaction
} from "@solana/web3.js";

// src/talkenEmbed.ts
var buttonLogoURI = `data:image/svg+xml,%3Csvg width='1024' height='1024' viewBox='0 0 1024 1024' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23paint0_angular_2264_121180_clip_path)' data-figma-skip-parse='true'%3E%3Cg transform='matrix(0.407915 -0.541751 0.472021 0.468176 494.353 506.654)'%3E%3CforeignObject x='-1116.92' y='-1116.92' width='2233.84' height='2233.84'%3E%3Cdiv xmlns='http://www.w3.org/1999/xhtml' style='background:conic-gradient(from 90deg,rgba(43, 68, 154, 1) 0deg,rgba(27, 44, 104, 1) 28.8deg,rgba(49, 78, 174, 1) 108deg,rgba(27, 43, 103, 1) 180deg,rgba(48, 78, 174, 1) 216deg,rgba(27, 43, 102, 1) 259.2deg,rgba(49, 78, 174, 1) 349.2deg,rgba(43, 68, 154, 1) 360deg);height:100%25;width:100%25;opacity:1'%3E%3C/div%3E%3C/foreignObject%3E%3C/g%3E%3C/g%3E%3Crect width='1024' height='1024' rx='200' data-figma-gradient-fill='%7B&%2334;type&%2334;:&%2334;GRADIENT_ANGULAR&%2334;,&%2334;stops&%2334;:%5B%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.10588235408067703,&%2334;g&%2334;:0.17254902422428131,&%2334;b&%2334;:0.40784314274787903,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.079999998211860657%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.19215686619281769,&%2334;g&%2334;:0.30588236451148987,&%2334;b&%2334;:0.68235296010971069,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.30000001192092896%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.10588235408067703,&%2334;g&%2334;:0.16862745583057404,&%2334;b&%2334;:0.40392157435417175,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.50%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.19104459881782532,&%2334;g&%2334;:0.30635720491409302,&%2334;b&%2334;:0.68374401330947876,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.60000002384185791%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.10588235408067703,&%2334;g&%2334;:0.16862745583057404,&%2334;b&%2334;:0.40000000596046448,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.72000002861022949%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.19215686619281769,&%2334;g&%2334;:0.30588236451148987,&%2334;b&%2334;:0.68235296010971069,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.97000002861022949%7D%5D,&%2334;stopsVar&%2334;:%5B%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.10588235408067703,&%2334;g&%2334;:0.17254902422428131,&%2334;b&%2334;:0.40784314274787903,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.079999998211860657%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.19215686619281769,&%2334;g&%2334;:0.30588236451148987,&%2334;b&%2334;:0.68235296010971069,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.30000001192092896%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.10588235408067703,&%2334;g&%2334;:0.16862745583057404,&%2334;b&%2334;:0.40392157435417175,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.50%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.19104459881782532,&%2334;g&%2334;:0.30635720491409302,&%2334;b&%2334;:0.68374401330947876,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.60000002384185791%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.10588235408067703,&%2334;g&%2334;:0.16862745583057404,&%2334;b&%2334;:0.40000000596046448,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.72000002861022949%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.19215686619281769,&%2334;g&%2334;:0.30588236451148987,&%2334;b&%2334;:0.68235296010971069,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.97000002861022949%7D%5D,&%2334;transform&%2334;:%7B&%2334;m00&%2334;:815.83050537109375,&%2334;m01&%2334;:944.04132080078125,&%2334;m02&%2334;:-385.58316040039062,&%2334;m10&%2334;:-1083.5026855468750,&%2334;m11&%2334;:936.35162353515625,&%2334;m12&%2334;:580.22912597656250%7D,&%2334;opacity&%2334;:1.0,&%2334;blendMode&%2334;:&%2334;NORMAL&%2334;,&%2334;visible&%2334;:true%7D'/%3E%3Cpath d='M722.39 236.07L301.643 236.07C280.359 236.07 263.071 253.303 263.07 274.517L263.068 310.228C263.067 331.471 280.352 348.705 301.637 348.705H448.412L448.387 797.052C448.386 818.321 465.675 835.529 486.981 835.529H537.09C558.372 835.529 575.663 818.321 575.664 797.052L575.689 348.705H722.384C743.694 348.705 760.956 331.471 760.957 310.228L760.959 274.517C760.96 253.303 743.701 236.07 722.39 236.07Z' fill='white'/%3E%3Cpath d='M901.266 200.418C901.264 228.037 878.81 250.418 851.117 250.418C823.424 250.418 800.957 228.037 800.958 200.418C800.96 172.796 823.429 150.418 851.123 150.418C878.816 150.418 901.267 172.796 901.266 200.418Z' fill='white'/%3E%3Cdefs%3E%3CclipPath id='paint0_angular_2264_121180_clip_path'%3E%3Crect width='1024' height='1024' rx='200'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A`;
var TalkenEmbed = class {
  constructor(url) {
    this._ready = false;
    this.buttonLogoURI = buttonLogoURI;
    this.listeners = {};
    this.commandQueue = [];
    this.handleMessage = this.handleMessage.bind(this);
    window.addEventListener("message", this.handleMessage);
    this.iframeOrigin = new URL(url).origin;
    this.iframe = this.createIframe();
    this.iframe.setAttribute("allowtransparency", "true");
    this.minimizeButton = this.createMinimizeButton();
    this.moveModal("top-right");
  }
  isMobileDevice() {
    return window.matchMedia("(max-width: 767px)").matches;
  }
  createIframe() {
    const iframe = document.createElement("iframe");
    iframe.src = this.iframeOrigin;
    iframe.sandbox;
    iframe.style.position = "fixed";
    iframe.style.top = "50%";
    iframe.style.left = "50%";
    iframe.style.transform = "translate(-50%, -50%)";
    iframe.style.width = "400px";
    iframe.style.height = "675px";
    iframe.style.overflow = "hidden";
    iframe.style.zIndex = "9998";
    iframe.style.border = "none";
    iframe.sandbox.value = "allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-modals allow-forms allow-top-navigation allow-popups-to-escape-sandbox";
    iframe.allow = "clipboard-write; clipboard-read; microphone; camera";
    iframe.onload = () => {
      var _a;
      (_a = iframe.contentWindow) == null ? void 0 : _a.postMessage(
        { type: "initIframe", data: { origin: window.location.origin } },
        this.iframeOrigin
      );
    };
    if (this.isMobileDevice()) {
      iframe.style.left = "0";
      iframe.style.top = "0";
      iframe.style.top = [window.innerHeight - 675] + "px";
      iframe.style.width = "100%";
      iframe.style.transform = "";
    }
    document.body.appendChild(iframe);
    return iframe;
  }
  moveModal(corner = "top-right") {
    if (!this.isMobileDevice()) {
      this.iframe.style.transform = "";
      switch (corner) {
        case "top-left":
          this.setPosition(this.iframe, "10px", "auto", "10px", "auto");
          this.setPosition(this.minimizeButton, "10px", "auto", "10px", "auto");
          break;
        case "top-right":
          this.setPosition(this.iframe, "10px", "10px", "auto", "auto");
          this.setPosition(this.minimizeButton, "65px", "10px", "auto", "auto");
          break;
        case "bottom-left":
          this.setPosition(this.iframe, "auto", "auto", "10px", "10px");
          this.setPosition(this.minimizeButton, "auto", "auto", "10px", "10px");
          break;
        case "bottom-right":
          this.setPosition(this.iframe, "auto", "10px", "auto", "10px");
          this.setPosition(this.minimizeButton, "auto", "10px", "auto", "10px");
          break;
        case "center":
          this.iframe.style.top = "50%";
          this.iframe.style.left = "50%";
          this.iframe.style.transform = "translate(-50%, -50%)";
          this.minimizeButton.style.display = "none";
          const overlay = document.createElement("div");
          overlay.id = "overlay";
          overlay.style.position = "fixed";
          overlay.style.top = "0";
          overlay.style.left = "0";
          overlay.style.width = "100%";
          overlay.style.height = "100%";
          overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
          overlay.style.zIndex = "9998";
          overlay.style.transition = "background-color 0.5s ease";
          document.body.appendChild(overlay);
          setTimeout(() => {
            overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
          }, 10);
          this.iframe.style.zIndex = "9999";
          this.iframe.style.display = "block";
          break;
        default:
          console.error("Invalid corner specified for moveModal method");
          break;
      }
    } else if (corner === "center") {
      const overlay = document.createElement("div");
      overlay.id = "overlay";
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
      overlay.style.zIndex = "9998";
      overlay.style.transition = "background-color 0.5s ease";
      document.body.appendChild(overlay);
      setTimeout(() => {
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      }, 10);
      this.iframe.style.zIndex = "9999";
      this.iframe.style.display = "block";
    } else {
      switch (corner) {
        case "top-left":
          this.setPosition(this.minimizeButton, "10px", "auto", "10px", "auto");
          break;
        case "top-right":
          this.setPosition(this.minimizeButton, "65px", "10px", "auto", "auto");
          break;
        case "bottom-left":
          this.setPosition(this.minimizeButton, "auto", "auto", "10px", "10px");
          break;
        case "bottom-right":
          this.setPosition(this.minimizeButton, "auto", "10px", "auto", "10px");
          break;
      }
    }
  }
  setPosition(element, top, right, left, bottom) {
    element.style.top = top;
    element.style.right = right;
    element.style.left = left;
    element.style.bottom = bottom;
  }
  createMinimizeButton() {
    const imgButton = document.createElement("img");
    imgButton.src = this.buttonLogoURI;
    imgButton.style.position = "fixed";
    imgButton.style.display = "none";
    imgButton.style.transition = "left 0.5s ease";
    if (this.isMobileDevice()) {
      imgButton.style.width = "45px";
      imgButton.style.height = "45px";
    } else {
      imgButton.style.width = "55px";
      imgButton.style.height = "55px";
    }
    imgButton.style.zIndex = "2147483647";
    imgButton.style.cursor = "pointer";
    imgButton.draggable = false;
    let isDragging = false;
    let startY, initialY, startX, initialX;
    const onMouseMove = (moveEvent) => {
      imgButton.style.transition = "";
      const dy = moveEvent.clientY - startY;
      const dx = moveEvent.clientX - startX;
      if (Math.abs(dy) > 5 || Math.abs(dx) > 5) {
        isDragging = true;
        imgButton.style.top = `${Math.min(window.innerHeight - imgButton.offsetHeight, Math.max(0, initialY + dy))}px`;
        imgButton.style.left = `${Math.min(window.innerWidth - imgButton.offsetWidth, Math.max(0, initialX + dx))}px`;
      }
    };
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      if (!isDragging) this.toggleIframe();
      else {
        imgButton.style.transition = "left 0.5s ease";
        const midpoint = window.innerWidth / 2;
        const buttonCenter = imgButton.offsetLeft + imgButton.offsetWidth / 2;
        if (buttonCenter < midpoint) imgButton.style.left = "0px";
        else imgButton.style.left = `${window.innerWidth - imgButton.offsetWidth - 15}px`;
      }
    };
    imgButton.addEventListener("mousedown", (e) => {
      e.preventDefault();
      startY = e.clientY;
      startX = e.clientX;
      initialY = imgButton.offsetTop;
      initialX = imgButton.offsetLeft;
      isDragging = false;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
    imgButton.addEventListener("touchstart", (e) => {
      e.preventDefault();
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
      initialY = imgButton.offsetTop;
      initialX = imgButton.offsetLeft;
      isDragging = false;
    });
    imgButton.addEventListener("touchmove", (e) => {
      e.preventDefault();
      imgButton.style.transition = "";
      const dy = e.touches[0].clientY - startY;
      const dx = e.touches[0].clientX - startX;
      if (Math.abs(dy) > 5 || Math.abs(dx) > 5) {
        isDragging = true;
        imgButton.style.top = `${Math.min(window.innerHeight - imgButton.offsetHeight, Math.max(0, initialY + dy))}px`;
        imgButton.style.left = `${Math.min(window.innerWidth - imgButton.offsetWidth, Math.max(0, initialX + dx))}px`;
      }
    });
    imgButton.addEventListener("touchend", (e) => {
      e.preventDefault();
      if (!isDragging) this.toggleIframe();
      else {
        imgButton.style.transition = "left 0.5s ease";
        const midpoint = window.innerWidth / 2;
        const buttonCenter = imgButton.offsetLeft + imgButton.offsetWidth / 2;
        if (buttonCenter < midpoint) imgButton.style.left = "0px";
        else imgButton.style.left = `${window.innerWidth - imgButton.offsetWidth - 15}px`;
      }
    });
    imgButton.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    document.body.appendChild(imgButton);
    return imgButton;
  }
  requestStorageAccess() {
    return document.hasStorageAccess().then((hasAccess) => {
      if (hasAccess) return Promise.resolve();
      else return document.requestStorageAccess();
    }).catch((reason) => {
      console.log("Some promise have failed, reason=", reason);
    });
  }
  toggleIframe() {
    this.requestStorageAccess().catch(() => {
      console.log("Storage access request failed, but continuing...");
    });
    if (this.iframe.style.display === "none") {
      this.iframe.style.display = "block";
      this.minimizeButton.style.display = "none";
      if (this.isMobileDevice()) this.iframe.style.top = [window.innerHeight - 675] + "px";
    } else {
      if (this.isMobileDevice()) {
        this.iframe.style.transition = "top 0.5s ease, transform 0.5s ease";
        this.iframe.style.top = `${window.innerHeight}px`;
        this.iframe.style.transform = "translate(0, 0)";
      } else this.iframe.style.display = "none";
      this.minimizeButton.style.display = "block";
      setTimeout(() => {
        if (this.isMobileDevice()) {
          this.iframe.style.display = "none";
          this.iframe.style.top = "0";
          this.iframe.style.transform = "";
          this.iframe.style.transition = "";
        }
      }, 500);
    }
  }
  handleMessage(event) {
    const { type, data } = event.data;
    if (type === "minimizeIframe") {
      this.toggleIframe();
      const overlay = document.getElementById("overlay");
      if (overlay) document.body.removeChild(overlay);
      return;
    }
    if (type === "disconnect") {
      this.disconnect();
      return;
    }
    if (type === "iframeReady") {
      this._ready = true;
      this.processQueue();
      return;
    }
    if (this.listeners[type]) this.listeners[type](data);
  }
  processQueue() {
    var _a;
    while (this.commandQueue.length && this._ready) {
      const { command, data, resolve, reject } = this.commandQueue.shift();
      const responseType = `${command}Response`;
      if (!this.listeners[responseType]) {
        this.listeners[responseType] = resolve;
        (_a = this.iframe.contentWindow) == null ? void 0 : _a.postMessage({ type: command, data }, this.iframeOrigin);
      }
    }
  }
  disconnect() {
    return __async(this, null, function* () {
      var _a;
      window.removeEventListener("message", this.handleMessage);
      (_a = this.iframe.contentWindow) == null ? void 0 : _a.postMessage({ type: "disconnected" }, this.iframeOrigin);
      this.iframe.remove();
      if (this.minimizeButton) this.minimizeButton.remove();
      this._ready = false;
    });
  }
  sendCommand(command, data) {
    return __async(this, null, function* () {
      if (this.iframe.style.display === "none") this.toggleIframe();
      if (command === "signTransaction") {
        this.moveModal("top-right");
        console.log("top-right");
      }
      const responseType = `${command}Response`;
      const origin = window.location.origin;
      return new Promise((resolve, reject) => {
        var _a;
        if (!this._ready) {
          this.commandQueue.push({ command, data, resolve, reject });
          setTimeout(() => {
            console.log("Talken closed as user didn't respond within time");
            reject(new Error("Iframe did not respond in time"));
          }, 12e4);
        } else {
          if (!this.listeners[responseType]) {
            this.listeners[responseType] = (responseData) => {
              if (responseData instanceof Error) reject(responseData);
              else resolve(responseData);
              delete this.listeners[responseType];
            };
          }
          (_a = this.iframe.contentWindow) == null ? void 0 : _a.postMessage({ type: command, data, origin }, this.iframeOrigin);
        }
      });
    });
  }
};

// src/index.ts
var TalkenWalletName = "Talken";
var TalkenWalletAdapter = class extends BaseMessageSignerWalletAdapter {
  constructor(config) {
    super();
    this.name = TalkenWalletName;
    this.url = "https://wallet.talken.io";
    this.icon = `data:image/svg+xml,%3Csvg width='1024' height='1024' viewBox='0 0 1024 1024' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23paint0_angular_2264_121180_clip_path)' data-figma-skip-parse='true'%3E%3Cg transform='matrix(0.407915 -0.541751 0.472021 0.468176 494.353 506.654)'%3E%3CforeignObject x='-1116.92' y='-1116.92' width='2233.84' height='2233.84'%3E%3Cdiv xmlns='http://www.w3.org/1999/xhtml' style='background:conic-gradient(from 90deg,rgba(43, 68, 154, 1) 0deg,rgba(27, 44, 104, 1) 28.8deg,rgba(49, 78, 174, 1) 108deg,rgba(27, 43, 103, 1) 180deg,rgba(48, 78, 174, 1) 216deg,rgba(27, 43, 102, 1) 259.2deg,rgba(49, 78, 174, 1) 349.2deg,rgba(43, 68, 154, 1) 360deg);height:100%25;width:100%25;opacity:1'%3E%3C/div%3E%3C/foreignObject%3E%3C/g%3E%3C/g%3E%3Crect width='1024' height='1024' rx='200' data-figma-gradient-fill='%7B&%2334;type&%2334;:&%2334;GRADIENT_ANGULAR&%2334;,&%2334;stops&%2334;:%5B%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.10588235408067703,&%2334;g&%2334;:0.17254902422428131,&%2334;b&%2334;:0.40784314274787903,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.079999998211860657%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.19215686619281769,&%2334;g&%2334;:0.30588236451148987,&%2334;b&%2334;:0.68235296010971069,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.30000001192092896%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.10588235408067703,&%2334;g&%2334;:0.16862745583057404,&%2334;b&%2334;:0.40392157435417175,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.50%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.19104459881782532,&%2334;g&%2334;:0.30635720491409302,&%2334;b&%2334;:0.68374401330947876,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.60000002384185791%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.10588235408067703,&%2334;g&%2334;:0.16862745583057404,&%2334;b&%2334;:0.40000000596046448,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.72000002861022949%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.19215686619281769,&%2334;g&%2334;:0.30588236451148987,&%2334;b&%2334;:0.68235296010971069,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.97000002861022949%7D%5D,&%2334;stopsVar&%2334;:%5B%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.10588235408067703,&%2334;g&%2334;:0.17254902422428131,&%2334;b&%2334;:0.40784314274787903,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.079999998211860657%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.19215686619281769,&%2334;g&%2334;:0.30588236451148987,&%2334;b&%2334;:0.68235296010971069,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.30000001192092896%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.10588235408067703,&%2334;g&%2334;:0.16862745583057404,&%2334;b&%2334;:0.40392157435417175,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.50%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.19104459881782532,&%2334;g&%2334;:0.30635720491409302,&%2334;b&%2334;:0.68374401330947876,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.60000002384185791%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.10588235408067703,&%2334;g&%2334;:0.16862745583057404,&%2334;b&%2334;:0.40000000596046448,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.72000002861022949%7D,%7B&%2334;color&%2334;:%7B&%2334;r&%2334;:0.19215686619281769,&%2334;g&%2334;:0.30588236451148987,&%2334;b&%2334;:0.68235296010971069,&%2334;a&%2334;:1.0%7D,&%2334;position&%2334;:0.97000002861022949%7D%5D,&%2334;transform&%2334;:%7B&%2334;m00&%2334;:815.83050537109375,&%2334;m01&%2334;:944.04132080078125,&%2334;m02&%2334;:-385.58316040039062,&%2334;m10&%2334;:-1083.5026855468750,&%2334;m11&%2334;:936.35162353515625,&%2334;m12&%2334;:580.22912597656250%7D,&%2334;opacity&%2334;:1.0,&%2334;blendMode&%2334;:&%2334;NORMAL&%2334;,&%2334;visible&%2334;:true%7D'/%3E%3Cpath d='M722.39 236.07L301.643 236.07C280.359 236.07 263.071 253.303 263.07 274.517L263.068 310.228C263.067 331.471 280.352 348.705 301.637 348.705H448.412L448.387 797.052C448.386 818.321 465.675 835.529 486.981 835.529H537.09C558.372 835.529 575.663 818.321 575.664 797.052L575.689 348.705H722.384C743.694 348.705 760.956 331.471 760.957 310.228L760.959 274.517C760.96 253.303 743.701 236.07 722.39 236.07Z' fill='white'/%3E%3Cpath d='M901.266 200.418C901.264 228.037 878.81 250.418 851.117 250.418C823.424 250.418 800.957 228.037 800.958 200.418C800.96 172.796 823.429 150.418 851.123 150.418C878.816 150.418 901.267 172.796 901.266 200.418Z' fill='white'/%3E%3Cdefs%3E%3CclipPath id='paint0_angular_2264_121180_clip_path'%3E%3Crect width='1024' height='1024' rx='200'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A`;
    this.supportedTransactionVersions = /* @__PURE__ */ new Set(["legacy", 0]);
    this._position = "top-right";
    this._readyState = typeof window === "undefined" || typeof document === "undefined" ? WalletReadyState.Unsupported : WalletReadyState.Installed;
    this._connecting = false;
    this._wallet = null;
    this._publicKey = null;
    if (typeof window !== "undefined") window.addEventListener("message", this._handleMessage.bind(this));
    if (config == null ? void 0 : config.position) this._position = config.position;
    if (config == null ? void 0 : config.url) this.url = config.url;
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
  _handleMessage(event) {
    return __async(this, null, function* () {
      if (event.data && event.data.type === "talken") {
        const { command } = event.data;
        if (command === "disconnect") {
          this._connecting = false;
          yield this.disconnect();
        }
      }
    });
  }
  connect() {
    return __async(this, null, function* () {
      if (this.connected || this.connecting) return;
      if (this._wallet) throw new WalletConnectionError("Already connected");
      try {
        this._wallet = new TalkenEmbed(this.url);
        const publicKeyData = yield this._wallet.sendCommand("login", {
          host: window.location.origin
        });
        if (publicKeyData) {
          let publicKey = new PublicKey(publicKeyData);
          this._publicKey = publicKey;
          this.emit("connect", publicKey);
          if (this == null ? void 0 : this._position) this._wallet.moveModal(this == null ? void 0 : this._position);
          else this._wallet.moveModal();
        } else throw new WalletPublicKeyError("No response from Talken wallet.");
      } catch (error) {
        console.error("Error encountered during connection:", error);
        throw new WalletConnectionError(error.message);
      } finally {
        this._connecting = false;
      }
    });
  }
  disconnect() {
    return __async(this, null, function* () {
      if (this._wallet) {
        try {
          yield this._wallet.disconnect();
          this._wallet = null;
          this._publicKey = null;
          this._connecting = false;
          window.removeEventListener("message", this._handleMessage.bind(this));
          this.emit("disconnect");
          console.log("Talken wallet disconnected.");
        } catch (error) {
          console.error("Error encountered during disconnection:", error);
          throw new WalletDisconnectionError(error.message);
        } finally {
          this._connecting = false;
        }
      }
    });
  }
  sendTransaction(_0, _1) {
    return __async(this, arguments, function* (transaction, connection, options = {}) {
      let signature;
      if (!this._wallet) throw new WalletNotConnectedError();
      try {
        if (!isVersionedTransaction(transaction))
          transaction = yield this.prepareTransaction(transaction, connection, options);
        const signedTx = yield this.signTransaction(transaction);
        signature = yield connection.sendRawTransaction(signedTx.serialize(), options);
        return signature;
      } catch (error) {
        console.error("Error encountered during transaction submission:", error);
        throw new WalletSendTransactionError(error.message);
      }
    });
  }
  signTransaction(transaction) {
    return __async(this, null, function* () {
      if (!this._wallet) throw new WalletNotConnectedError();
      if (isVersionedTransaction(transaction)) {
        const data = transaction.serialize();
        try {
          const signedTransaction = yield this._wallet.sendCommand("signTransaction", {
            transaction: data,
            host: window.location.origin,
            isVersionedTransaction: true
          });
          const finalTransaction = VersionedTransaction.deserialize(signedTransaction);
          return finalTransaction;
        } catch (error) {
          console.error("Error encountered during transaction signing:", error);
          throw new WalletSignTransactionError(error.message);
        }
      } else {
        try {
          const data = transaction.serialize({ requireAllSignatures: false, verifySignatures: false }).toString("base64");
          const signedTransaction = yield this._wallet.sendCommand("signTransaction", {
            transaction: data,
            host: window.location.origin,
            isVersionedTransaction: false
          });
          const finalTransaction = Transaction.from(Uint8Array.from(signedTransaction));
          return finalTransaction;
        } catch (error) {
          console.error("Error encountered during transaction signing:", error);
          throw new WalletSignTransactionError(error.message);
        }
      }
    });
  }
  signAllTransactions(transactions) {
    return __async(this, null, function* () {
      const signedTransactions = [];
      for (const transaction of transactions) {
        signedTransactions.push(yield this.signTransaction(transaction));
      }
      return signedTransactions;
    });
  }
  signMessage(message) {
    return __async(this, null, function* () {
      if (!this._wallet) throw new WalletNotConnectedError();
      try {
        const signedMessage = yield this._wallet.sendCommand("signMessage", {
          host: window.location.origin,
          message
        });
        const Uint8ArraySignedMessage = Uint8Array.from(signedMessage);
        return Uint8ArraySignedMessage;
      } catch (error) {
        console.error("Error encountered during message signature:", error);
        throw new WalletSignMessageError(error.message);
      }
    });
  }
};
export {
  TalkenWalletAdapter,
  TalkenWalletName
};
