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
var buttonLogoURI = `data:image/svg+xml,%3Csvg width='1025' height='1024' viewBox='0 0 1025 1024' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.015625' width='1024' height='1024' rx='200' fill='url(%23paint0_linear_2205_70745)'/%3E%3Cpath d='M576.767 321.615L517.87 337.398L477.892 188.18C475.053 177.578 464.261 174.998 457.978 176.681C456.016 177.207 454.158 178.127 452.405 179.439L172.503 380.287C153.798 393.717 145.708 416.929 151.704 439.31L158.753 465.62C130.179 501.897 118.48 550.907 131.421 599.208L92.809 455.095C80.2907 408.364 97.7999 359.061 136.964 330.888L417.153 129.541C424.95 124.085 433.56 120.095 442.198 117.779C481.462 107.258 525.32 129.595 536.787 172.397L576.767 321.615Z' fill='white'/%3E%3Cpath d='M901.229 487.953C904.07 498.557 898.138 509.405 887.251 512.743L829.926 528.105C809.116 533.681 786.167 523.417 779.126 503.418C774.686 491.561 776.347 478.911 782.096 468.954C787.164 459.599 795.928 453.04 806.528 450.2L865.818 434.312C877.309 431.654 887.867 438.084 890.709 448.685L901.229 487.953Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M835.092 398.388C856.687 392.601 869.622 370.196 863.835 348.598L859.205 331.32C837.427 250.038 753.292 201.456 672.016 223.237L221.275 344.029C187.901 352.972 160.22 372.174 140.536 397.652C111.96 433.929 100.261 482.939 113.202 531.238L184.007 795.511C205.785 876.793 289.92 925.375 371.196 903.594L821.937 782.801C903.213 761.022 951.789 676.878 930.01 595.593L928.01 588.133C922.226 566.535 899.821 553.599 878.228 559.386L844.069 568.54C806.374 578.642 764.046 565.153 744.447 531.266C728.206 503.631 730.341 472.336 744.817 447.833C755.346 429.019 773.057 415.014 795.044 409.121L835.092 398.388Z' fill='white'/%3E%3Cpath d='M464.287 573.287L475.718 615.952C482.923 642.846 473.333 656.36 445.446 663.833L418.977 670.927C387.315 679.411 365.746 676.197 357.602 645.802C349.428 615.292 366.636 601.671 398.158 593.223L428.776 585.019L428.222 582.952C424.411 568.729 414.436 564.74 395.502 569.814C386.163 572.316 377.487 576.304 366.085 582.004C358.338 585.741 352.405 583.314 350.185 575.031L348.904 570.249C346.999 563.137 349.761 557.414 357.744 553.471C371.084 546.706 381.379 542.013 392.791 538.955C427.942 529.535 454.967 538.502 464.287 573.287ZM439.167 623.804L435.669 610.747L406.87 618.465C391.171 622.672 388.892 627.168 391.454 636.731C393.983 646.171 398.205 648.925 413.772 644.753L429.727 640.478C440.892 637.486 441.49 632.473 439.167 623.804Z' fill='url(%23paint1_linear_2205_70745)'/%3E%3Cpath d='M486.218 466.273L471.656 470.175C465.466 471.834 461.786 478.185 463.436 484.347L504.102 636.13C505.757 642.308 512.117 645.961 518.307 644.302L532.87 640.399C539.06 638.741 542.734 632.399 541.079 626.221L500.414 474.438C498.763 468.276 492.408 464.614 486.218 466.273Z' fill='url(%23paint2_linear_2205_70745)'/%3E%3Cpath d='M683.167 585.484L682.28 584.895L619.987 544.179L654.851 485.552L655.083 485.143C658.836 478.169 655.192 473.144 646.933 473.919C645.714 474.039 644.456 474.269 643.195 474.607L642.909 474.684L630.118 478.111C624.603 479.597 619.473 483.228 617.014 487.574L616.944 487.717L582.009 546.544L558.519 458.868C556.868 452.706 550.505 449.046 544.323 450.703L529.768 454.603C523.579 456.262 519.898 462.613 521.549 468.775L562.214 620.558C563.87 626.736 570.231 630.388 576.42 628.73L590.975 624.829C597.156 623.173 600.84 616.828 599.184 610.65L586.214 562.239L647.931 602.573L648.343 602.842C652.865 605.912 660.02 606.591 666.062 604.69L665.393 604.886L678.177 601.461L677.174 601.712C678.846 601.33 680.431 600.808 681.855 600.119C689.382 596.515 689.96 589.97 683.167 585.484Z' fill='url(%23paint3_linear_2205_70745)'/%3E%3Cpath d='M339.565 505.573L217.352 538.324C211.169 539.981 207.489 546.332 209.14 552.494L211.919 562.867C213.572 569.038 219.935 572.698 226.117 571.041L268.751 559.616L303.643 689.849C305.298 696.027 311.659 699.679 317.848 698.021L332.403 694.121C338.585 692.464 342.268 686.12 340.613 679.942L305.721 549.709L348.331 538.29C354.521 536.631 358.193 530.282 356.54 524.112L353.761 513.738C352.11 507.576 345.755 503.914 339.565 505.573Z' fill='url(%23paint4_linear_2205_70745)'/%3E%3Cpath d='M694.583 424.234C698.079 437.284 690.304 450.701 677.22 454.207C664.136 457.713 650.687 449.984 647.191 436.934C643.695 423.884 651.478 410.466 664.562 406.959C677.646 403.453 691.087 411.184 694.583 424.234Z' fill='url(%23paint5_linear_2205_70745)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_2205_70745' x1='512.016' y1='0' x2='512.016' y2='1024' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23253B84'/%3E%3Cstop offset='1' stop-color='%23192862'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear_2205_70745' x1='392.083' y1='539.144' x2='426.834' y2='668.821' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23253B84'/%3E%3Cstop offset='1' stop-color='%23192862'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint2_linear_2205_70745' x1='478.933' y1='468.225' x2='525.595' y2='642.349' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23253B84'/%3E%3Cstop offset='1' stop-color='%23192862'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint3_linear_2205_70745' x1='580.785' y1='440.932' x2='627.447' y2='615.059' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23253B84'/%3E%3Cstop offset='1' stop-color='%23192862'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint4_linear_2205_70745' x1='278.458' y1='521.948' x2='325.12' y2='696.072' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23253B84'/%3E%3Cstop offset='1' stop-color='%23192862'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint5_linear_2205_70745' x1='664.558' y1='406.96' x2='677.219' y2='454.207' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23253B84'/%3E%3Cstop offset='1' stop-color='%23192862'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%0A`;
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
    iframe.style.height = "700px";
    iframe.style.overflow = "hidden";
    iframe.style.zIndex = "9998";
    iframe.style.border = "none";
    iframe.sandbox.value = "allow-scripts allow-same-origin allow-popups allow-modals allow-forms allow-top-navigation allow-popups-to-escape-sandbox allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation";
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
      iframe.style.top = [window.innerHeight - 700] + "px";
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
          this.setPosition(this.minimizeButton, "10px", "10px", "auto", "auto");
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
          this.setPosition(this.minimizeButton, "10px", "10px", "auto", "auto");
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
        else imgButton.style.left = `${window.innerWidth - imgButton.offsetWidth}px`;
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
        else imgButton.style.left = `${window.innerWidth - imgButton.offsetWidth}px`;
      }
    });
    imgButton.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    document.body.appendChild(imgButton);
    return imgButton;
  }
  toggleIframe() {
    if (this.iframe.style.display === "none") {
      this.iframe.style.display = "block";
      this.minimizeButton.style.display = "none";
      if (this.isMobileDevice()) this.iframe.style.top = [window.innerHeight - 700] + "px";
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
    this.icon = `data:image/svg+xml,%3Csvg width='1025' height='1024' viewBox='0 0 1025 1024' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.015625' width='1024' height='1024' rx='200' fill='url(%23paint0_linear_2205_70745)'/%3E%3Cpath d='M576.767 321.615L517.87 337.398L477.892 188.18C475.053 177.578 464.261 174.998 457.978 176.681C456.016 177.207 454.158 178.127 452.405 179.439L172.503 380.287C153.798 393.717 145.708 416.929 151.704 439.31L158.753 465.62C130.179 501.897 118.48 550.907 131.421 599.208L92.809 455.095C80.2907 408.364 97.7999 359.061 136.964 330.888L417.153 129.541C424.95 124.085 433.56 120.095 442.198 117.779C481.462 107.258 525.32 129.595 536.787 172.397L576.767 321.615Z' fill='white'/%3E%3Cpath d='M901.229 487.953C904.07 498.557 898.138 509.405 887.251 512.743L829.926 528.105C809.116 533.681 786.167 523.417 779.126 503.418C774.686 491.561 776.347 478.911 782.096 468.954C787.164 459.599 795.928 453.04 806.528 450.2L865.818 434.312C877.309 431.654 887.867 438.084 890.709 448.685L901.229 487.953Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M835.092 398.388C856.687 392.601 869.622 370.196 863.835 348.598L859.205 331.32C837.427 250.038 753.292 201.456 672.016 223.237L221.275 344.029C187.901 352.972 160.22 372.174 140.536 397.652C111.96 433.929 100.261 482.939 113.202 531.238L184.007 795.511C205.785 876.793 289.92 925.375 371.196 903.594L821.937 782.801C903.213 761.022 951.789 676.878 930.01 595.593L928.01 588.133C922.226 566.535 899.821 553.599 878.228 559.386L844.069 568.54C806.374 578.642 764.046 565.153 744.447 531.266C728.206 503.631 730.341 472.336 744.817 447.833C755.346 429.019 773.057 415.014 795.044 409.121L835.092 398.388Z' fill='white'/%3E%3Cpath d='M464.287 573.287L475.718 615.952C482.923 642.846 473.333 656.36 445.446 663.833L418.977 670.927C387.315 679.411 365.746 676.197 357.602 645.802C349.428 615.292 366.636 601.671 398.158 593.223L428.776 585.019L428.222 582.952C424.411 568.729 414.436 564.74 395.502 569.814C386.163 572.316 377.487 576.304 366.085 582.004C358.338 585.741 352.405 583.314 350.185 575.031L348.904 570.249C346.999 563.137 349.761 557.414 357.744 553.471C371.084 546.706 381.379 542.013 392.791 538.955C427.942 529.535 454.967 538.502 464.287 573.287ZM439.167 623.804L435.669 610.747L406.87 618.465C391.171 622.672 388.892 627.168 391.454 636.731C393.983 646.171 398.205 648.925 413.772 644.753L429.727 640.478C440.892 637.486 441.49 632.473 439.167 623.804Z' fill='url(%23paint1_linear_2205_70745)'/%3E%3Cpath d='M486.218 466.273L471.656 470.175C465.466 471.834 461.786 478.185 463.436 484.347L504.102 636.13C505.757 642.308 512.117 645.961 518.307 644.302L532.87 640.399C539.06 638.741 542.734 632.399 541.079 626.221L500.414 474.438C498.763 468.276 492.408 464.614 486.218 466.273Z' fill='url(%23paint2_linear_2205_70745)'/%3E%3Cpath d='M683.167 585.484L682.28 584.895L619.987 544.179L654.851 485.552L655.083 485.143C658.836 478.169 655.192 473.144 646.933 473.919C645.714 474.039 644.456 474.269 643.195 474.607L642.909 474.684L630.118 478.111C624.603 479.597 619.473 483.228 617.014 487.574L616.944 487.717L582.009 546.544L558.519 458.868C556.868 452.706 550.505 449.046 544.323 450.703L529.768 454.603C523.579 456.262 519.898 462.613 521.549 468.775L562.214 620.558C563.87 626.736 570.231 630.388 576.42 628.73L590.975 624.829C597.156 623.173 600.84 616.828 599.184 610.65L586.214 562.239L647.931 602.573L648.343 602.842C652.865 605.912 660.02 606.591 666.062 604.69L665.393 604.886L678.177 601.461L677.174 601.712C678.846 601.33 680.431 600.808 681.855 600.119C689.382 596.515 689.96 589.97 683.167 585.484Z' fill='url(%23paint3_linear_2205_70745)'/%3E%3Cpath d='M339.565 505.573L217.352 538.324C211.169 539.981 207.489 546.332 209.14 552.494L211.919 562.867C213.572 569.038 219.935 572.698 226.117 571.041L268.751 559.616L303.643 689.849C305.298 696.027 311.659 699.679 317.848 698.021L332.403 694.121C338.585 692.464 342.268 686.12 340.613 679.942L305.721 549.709L348.331 538.29C354.521 536.631 358.193 530.282 356.54 524.112L353.761 513.738C352.11 507.576 345.755 503.914 339.565 505.573Z' fill='url(%23paint4_linear_2205_70745)'/%3E%3Cpath d='M694.583 424.234C698.079 437.284 690.304 450.701 677.22 454.207C664.136 457.713 650.687 449.984 647.191 436.934C643.695 423.884 651.478 410.466 664.562 406.959C677.646 403.453 691.087 411.184 694.583 424.234Z' fill='url(%23paint5_linear_2205_70745)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_2205_70745' x1='512.016' y1='0' x2='512.016' y2='1024' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23253B84'/%3E%3Cstop offset='1' stop-color='%23192862'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear_2205_70745' x1='392.083' y1='539.144' x2='426.834' y2='668.821' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23253B84'/%3E%3Cstop offset='1' stop-color='%23192862'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint2_linear_2205_70745' x1='478.933' y1='468.225' x2='525.595' y2='642.349' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23253B84'/%3E%3Cstop offset='1' stop-color='%23192862'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint3_linear_2205_70745' x1='580.785' y1='440.932' x2='627.447' y2='615.059' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23253B84'/%3E%3Cstop offset='1' stop-color='%23192862'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint4_linear_2205_70745' x1='278.458' y1='521.948' x2='325.12' y2='696.072' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23253B84'/%3E%3Cstop offset='1' stop-color='%23192862'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint5_linear_2205_70745' x1='664.558' y1='406.96' x2='677.219' y2='454.207' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23253B84'/%3E%3Cstop offset='1' stop-color='%23192862'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%0A`;
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
      var _a;
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
        console.log("Connected:", (_a = this._publicKey) == null ? void 0 : _a.toString());
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
