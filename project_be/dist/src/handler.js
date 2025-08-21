"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/handler.ts
var handler_exports = {};
__export(handler_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(handler_exports);

// src/game.ts
var Game = class {
  static {
    __name(this, "Game");
  }
  slot = [];
  bet = 0;
  spin(bet) {
    this.bet = bet;
    for (let i = 0; i < 3; i++) {
      this.slot[i] = [];
      for (let j = 0; j < 3; j++) {
        this.slot[i][j] = this.randomvar();
      }
    }
    return this.slot;
  }
  evaluate() {
    var and = 0;
    var hash = 0;
    var doll = 0;
    var output = 0;
    switch (this.checkEqualRows(this.slot)) {
      case 1:
        for (var i = 0; i < 3; i++) {
          if (this.rowEqual(this.slot[i])) {
            if (this.slot[i][1] === "&") {
              and++;
            }
            if (this.slot[i][1] === "#") {
              hash++;
            }
            if (this.slot[i][1] === "$") {
              doll++;
            }
          }
        }
        output = (and + 2 * hash + 3 * doll) * this.bet;
        break;
      case 2:
        for (var i = 0; i < 3; i++) {
          if (this.rowEqual(this.slot[i])) {
            if (this.slot[i][1] === "&") {
              and++;
            }
            if (this.slot[i][1] === "#") {
              hash++;
            }
            if (this.slot[i][1] === "$") {
              doll++;
            }
          }
        }
        output = (and + 2 * hash + 3 * doll) * this.bet;
        break;
      case 3:
        for (var i = 0; i < 3; i++) {
          if (this.rowEqual(this.slot[i])) {
            if (this.slot[i][1] === "&") {
              and++;
            }
            if (this.slot[i][1] === "#") {
              hash++;
            }
            if (this.slot[i][1] === "$") {
              doll++;
            }
          }
        }
        output = (and + 2 * hash + 3 * doll) * this.bet;
        break;
      default:
        output = -this.bet;
    }
    return output;
  }
  randomvar() {
    const symb = ["&", "#", "$"];
    const n = Math.floor(Math.random() * symb.length);
    return symb[n];
  }
  rowEqual(arr) {
    return arr.every((val) => val === arr[0]);
  }
  checkEqualRows(matrix) {
    let count = 0;
    for (let row of matrix) {
      if (this.rowEqual(row)) {
        count++;
      }
    }
    return count;
  }
  play(bet) {
    this.spin(bet);
    let amount = this.evaluate();
    let output = {
      slot: this.slot,
      amount
    };
    return output;
  }
};

// src/handler.ts
var handler = /* @__PURE__ */ __name(async (event) => {
  let game = new Game();
  let matrix = game.spin(event.bet);
  let winnings = game.evaluate();
  let output = {
    "slot": matrix,
    "winnings": winnings
  };
  return output;
}, "handler");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2hhbmRsZXIudHMiLCAiLi4vLi4vc3JjL2dhbWUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9nYW1lXCI7XG5cblxuZXhwb3J0IGNvbnN0IGhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IGFueSkgPT4ge1xuICAgIGxldCBnYW1lID0gbmV3IEdhbWUoKTtcblxuICAgIGxldCBtYXRyaXggPSBnYW1lLnNwaW4oZXZlbnQuYmV0KVxuICAgIGxldCB3aW5uaW5ncyA9IGdhbWUuZXZhbHVhdGUoKTtcbiAgICBsZXQgb3V0cHV0ID0ge1xuICAgICAgICBcInNsb3RcIjogbWF0cml4LFxuICAgICAgICBcIndpbm5pbmdzXCI6IHdpbm5pbmdzXG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG59O1xuXG4iLCAiZXhwb3J0IGNsYXNzIEdhbWUge1xuXG4gICAgc2xvdDogc3RyaW5nW11bXSA9IFtdXG4gICAgYmV0OiBudW1iZXIgPSAwXG5cblxuICAgIHNwaW4oYmV0OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5iZXQgPSBiZXRcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuc2xvdFtpXSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAzOyBqKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNsb3RbaV1bal0gPSB0aGlzLnJhbmRvbXZhcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNsb3RcbiAgICB9XG5cbiAgICBldmFsdWF0ZSgpIHtcbiAgICAgICAgdmFyIGFuZCA9IDA7XG4gICAgICAgIHZhciBoYXNoID0gMDtcbiAgICAgICAgdmFyIGRvbGwgPSAwO1xuICAgICAgICB2YXIgb3V0cHV0ID0gMFxuXG4gICAgICAgIHN3aXRjaCAodGhpcy5jaGVja0VxdWFsUm93cyh0aGlzLnNsb3QpKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucm93RXF1YWwodGhpcy5zbG90W2ldKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2xvdFtpXVsxXSA9PT0gXCImXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNsb3RbaV1bMV0gPT09IFwiI1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzaCsrXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zbG90W2ldWzFdID09PSBcIiRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbGwrK1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG91dHB1dCA9IChhbmQgKyAoMiAqIGhhc2gpICsgKDMgKiBkb2xsKSkgKiB0aGlzLmJldDtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvd0VxdWFsKHRoaXMuc2xvdFtpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNsb3RbaV1bMV0gPT09IFwiJlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5kKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zbG90W2ldWzFdID09PSBcIiNcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc2grK1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2xvdFtpXVsxXSA9PT0gXCIkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2xsKytcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvdXRwdXQgPSAoYW5kICsgKDIgKiBoYXNoKSArICgzICogZG9sbCkpICogdGhpcy5iZXQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucm93RXF1YWwodGhpcy5zbG90W2ldKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2xvdFtpXVsxXSA9PT0gXCImXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNsb3RbaV1bMV0gPT09IFwiI1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzaCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2xvdFtpXVsxXSA9PT0gXCIkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2xsKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gKGFuZCArICgyICogaGFzaCkgKyAoMyAqIGRvbGwpKSAqIHRoaXMuYmV0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSAtKHRoaXMuYmV0KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxuXG5cbiAgICByYW5kb212YXIoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3Qgc3ltYjogc3RyaW5nW10gPSBbXCImXCIsIFwiI1wiLCBcIiRcIl07XG4gICAgICAgIGNvbnN0IG46IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHN5bWIubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIHN5bWJbbl07XG4gICAgfVxuXG4gICAgcm93RXF1YWwoYXJyOiBzdHJpbmdbXSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gYXJyLmV2ZXJ5KHZhbCA9PiB2YWwgPT09IGFyclswXSk7XG4gICAgfVxuXG4gICAgY2hlY2tFcXVhbFJvd3MobWF0cml4OiBzdHJpbmdbXVtdKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGNvdW50OiBudW1iZXIgPSAwO1xuICAgICAgICBmb3IgKGxldCByb3cgb2YgbWF0cml4KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yb3dFcXVhbChyb3cpKSB7XG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY291bnQ7XG4gICAgfVxuXG4gICAgcGxheShiZXQ6bnVtYmVyKXtcbiAgICAgICAgdGhpcy5zcGluKGJldClcbiAgICAgICAgbGV0IGFtb3VudCA9IHRoaXMuZXZhbHVhdGUoKVxuICAgICAgICBsZXQgb3V0cHV0ID0ge1xuICAgICAgICAgICAgc2xvdCA6IHRoaXMuc2xvdCxcbiAgICAgICAgICAgIGFtb3VudCA6IGFtb3VudFxuICAgICAg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
