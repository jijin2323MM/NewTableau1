import r from "axis-api";
var d, c;
const e = ((d = r) == null ? void 0 : d.default) || ((c = r) == null ? void 0 : c.Axis) || r;
if (!e || typeof e.registerKeys != "function")
  console.warn("[AxisBridge] Axis API introuvable ou invalide :", e);
else {
  let a = function() {
    s.update(), requestAnimationFrame(a);
  };
  console.log("Axis found"), window.Axis = e, window.__axis__ = window.__axis__ || e, e.registerKeys("q", "a", 1);
  const o = e.buttonManager.getButton("a", 1);
  if (!o)
    console.warn("[AxisBridge] bouton 'a' groupe 1 introuvable");
  else {
    let t = function() {
      console.log("[AxisBridge] bouton a1 déclenché, unityInst:", window.MyGameInstace || window.unityInstance);
      try {
        const n = window.MyGameInstace || window.unityInstance || null;
        n && typeof n.SendMessage == "function" ? n.SendMessage("JoystickController", "InputA1") : console.warn("[AxisBridge] instance Unity non prête pour SendMessage");
      } catch (n) {
        console.error("[AxisBridge] SendMessage failed:", n);
      }
    };
    o.addEventListener("keydown", t), o.addEventListener("down", t), o.addEventListener("press", t);
  }
  e.registerKeys("ArrowLeft", "a", 2);
  const i = e.buttonManager.getButton("a", 2);
  if (!i)
    console.warn("[AxisBridge] bouton 'a' groupe 2 introuvable");
  else {
    let t = function() {
      console.log("[AxisBridge] bouton a2 déclenché, unityInst:", window.MyGameInstace || window.unityInstance);
      try {
        const n = window.MyGameInstace || window.unityInstance || null;
        n && typeof n.SendMessage == "function" ? n.SendMessage("JoystickController", "InputA2") : console.warn("[AxisBridge] instance Unity non prête pour SendMessage");
      } catch (n) {
        console.error("[AxisBridge] SendMessage failed:", n);
      }
    };
    i.addEventListener("keydown", t), i.addEventListener("down", t), i.addEventListener("press", t);
  }
  e.registerKeys("d", "x", 1), e.registerKeys("z", "i", 1), e.registerKeys("s", "s", 1), e.registerKeys(" ", "w", 1), e.registerKeys("ArrowLeft", "a", 2), e.registerKeys("ArrowRight", "x", 2), e.registerKeys("ArrowUp", "i", 2), e.registerKeys("ArrowDown", "s", 2), e.registerKeys("Enter", "w", 2);
  const s = e.createGamepadEmulator(0);
  a(), e.joystick1.setGamepadEmulatorJoystick(s, 0), e.joystick2.setGamepadEmulatorJoystick(s, 1), e.registerGamepadEmulatorKeys(s, 0, "a", 1), e.registerGamepadEmulatorKeys(s, 1, "x", 1), e.registerGamepadEmulatorKeys(s, 2, "i", 1), e.registerGamepadEmulatorKeys(s, 3, "s", 1);
}
