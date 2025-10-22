import "three";
class r {
  constructor(e) {
    this.world = e, this.input = { left: !1, right: !1 }, this.joystickY = 0, this.isPulledBack = !1, this._onKeyDown = this._onKeyDown.bind(this), this._onKeyUp = this._onKeyUp.bind(this), this.addEvents(), this.getMessage();
  }
  getMessage() {
  }
  normalizeKey(e) {
    return typeof e == "string" ? e.toLowerCase() : e == null ? "" : String(e).toLowerCase();
  }
  handleAxisKeyDown(e, t) {
    e === "a1" && (this.input.left = !0, console.log("left down"), console.log("[AxisBridge] bouton a1 déclenché, unityInst:", window.MyGameInstace || window.unityInstance), this.sendUnityMessage("InputA1")), e === "w2" && (this.input.right = !0, console.log("right down"));
  }
  handleAxisKeyUp(e, t) {
    e === "a1" && (this.input.left = !1, console.log("left up")), e === "w2" && (this.input.right = !1, console.log("right up"));
  }
  handleJoystickMove(e) {
    if ((e.joystick || e.id || 1) !== 1) return;
    const o = e.position || { x: 0, y: 0 };
    this.joystickY = o.y, this.input.left = !0, console.log("joystickmove"), console.log("movement du joystick, unityInst:", window.MyGameInstace || window.unityInstance);
    try {
      const n = window.MyGameInstace || window.unityInstance || null;
      console.log("Inst joystick :", n), n && typeof n.SendMessage == "function" ? (console.log(typeof o.x, o.x), console.log(o.y)) : console.warn("[AxisBridge] instance Unity non prête pour SendMessage");
    } catch (n) {
      console.error("[AxisBridge] SendMessage failed:", n);
    }
  }
  sendUnityMessage(e) {
    try {
      const t = window.MyGameInstace || window.unityInstance || null;
      console.log("Inst :", t), t && typeof t.SendMessage == "function" ? t.SendMessage("JoystickController", e) : console.warn("[AxisBridge] instance Unity non prête pour SendMessage");
    } catch (t) {
      console.error("[AxisBridge] SendMessage failed:", t);
    }
  }
  addEvents() {
    window.addEventListener("keydown", this._onKeyDown), window.addEventListener("keyup", this._onKeyUp);
  }
  _onKeyDown(e) {
    e.code === "ArrowLeft" && (this.input.left = !0), e.code === "ArrowRight" && (this.input.right = !0), e.code === "Space" && this.start();
  }
  _onKeyUp(e) {
    e.code === "ArrowLeft" && (this.input.left = !1), e.code === "ArrowRight" && (this.input.right = !1);
  }
  start(e) {
  }
  destroy() {
    window.removeEventListener("keydown", this._onKeyDown), window.removeEventListener("keyup", this._onKeyUp);
  }
}
export {
  r as default
};
