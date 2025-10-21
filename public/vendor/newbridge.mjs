import "three";
class w {
  constructor(t) {
    this.world = t, this.input = { left: !1, right: !1 }, this.joystickY = 0, this.isPulledBack = !1, this._onKeyDown = this._onKeyDown.bind(this), this._onKeyUp = this._onKeyUp.bind(this), this.addEvents(), this.getMessage();
  }
  getMessage() {
    window.addEventListener("message", (t) => {
      var n, s, a, d, y, r;
      const e = t.data;
      if (!(!e || e.type !== "axis-event")) {
        if (e.event === "keydown" || e.event === "keyup") {
          const i = (((n = e.payload) == null ? void 0 : n.key) || "").toLowerCase().match(/^([a-z]+)(\d+)$/);
          if ((s = e.payload) != null && s.id || (a = e.payload) != null && a.joystick, i && (i[1], parseInt(i[2], 10)), e.event === "keydown") {
            if (e.payload.key === "a1") {
              this.input.left = !0, console.log("left down"), console.log("[AxisBridge] bouton a1 déclenché, unityInst:", window.MyGameInstace || window.unityInstance);
              try {
                const o = window.MyGameInstace || window.unityInstance || null;
                o && typeof o.SendMessage == "function" ? o.SendMessage("JoystickController", "InputA1") : console.warn("[AxisBridge] instance Unity non prête pour SendMessage");
              } catch (o) {
                console.error("[AxisBridge] SendMessage failed:", o);
              }
            }
            e.payload.key === "w2" && (this.input.right = !0, console.log("right down"));
          } else
            e.payload.key === "a1" && (this.input.left = !1, console.log("left up")), e.payload.key === "w2" && (this.input.right = !1, console.log("right up"));
        }
        if (e.event === "joystick:move" && (((d = e.payload) == null ? void 0 : d.joystick) || ((y = e.payload) == null ? void 0 : y.id) || 1) === 1) {
          const i = ((r = e.payload) == null ? void 0 : r.position) || { y: 0 };
          this.joystickY = i.y;
        }
      }
    });
  }
  addEvents() {
    window.addEventListener("keydown", this._onKeyDown), window.addEventListener("keyup", this._onKeyUp);
  }
  _onKeyDown(t) {
    t.code === "ArrowLeft" && (this.input.left = !0), t.code === "ArrowRight" && (this.input.right = !0), t.code === "Space" && this.start();
  }
  _onKeyUp(t) {
    t.code === "ArrowLeft" && (this.input.left = !1), t.code === "ArrowRight" && (this.input.right = !1);
  }
  start(t) {
  }
  destroy() {
    window.removeEventListener("keydown", this._onKeyDown), window.removeEventListener("keyup", this._onKeyUp);
  }
}
export {
  w as default
};
