import d from "axis-api";
var u, g;
const e = ((u = d) == null ? void 0 : u.default) || ((g = d) == null ? void 0 : g.Axis) || d;
if (!e || typeof e.registerKeys != "function")
  console.warn("[AxisBridge] Axis API introuvable ou invalide :", e);
else {
  let c = function() {
    o.update(), requestAnimationFrame(c);
  }, w = function(n) {
    if (!n || !n.position)
      return;
    const t = 50;
    y.x += t * n.position.x, y.y += t * n.position.y;
    try {
      const s = window.MyGameInstace || window.unityInstance || null;
      s && typeof s.SendMessage == "function" ? (s.SendMessage("JoystickController", "InputJoystick1MoveHandlerX", n.position.x), s.SendMessage("JoystickController", "InputJoystick1MoveHandlerY", n.position.y)) : console.warn("[AxisBridge] Unity instance not ready for joystick move");
    } catch (s) {
      console.error("[AxisBridge] SendMessage failed for joystick1 move:", s);
    }
  }, p = function(n) {
    if (!n || !n.position)
      return;
    const t = 50;
    l.x += t * n.position.x, l.y += t * n.position.y;
  };
  console.log("Axis found"), window.Axis = e, window.__axis__ = window.__axis__ || e, e.registerKeys("q", "a", 1);
  const i = e.buttonManager.getButton("a", 1);
  if (!i)
    console.warn("[AxisBridge] bouton 'a' groupe 1 introuvable");
  else {
    let n = function() {
      console.log("[AxisBridge] bouton a1 déclenché, unityInst:", window.MyGameInstace || window.unityInstance);
      try {
        const t = window.MyGameInstace || window.unityInstance || null;
        t && typeof t.SendMessage == "function" ? t.SendMessage("JoystickController", "InputA1") : console.warn("[AxisBridge] instance Unity non prête pour SendMessage");
      } catch (t) {
        console.error("[AxisBridge] SendMessage failed:", t);
      }
    };
    i.addEventListener("keydown", n), i.addEventListener("down", n), i.addEventListener("press", n);
  }
  e.registerKeys("ArrowLeft", "a", 2);
  const r = e.buttonManager.getButton("a", 2);
  if (!r)
    console.warn("[AxisBridge] bouton 'a' groupe 2 introuvable");
  else {
    let n = function() {
      console.log("[AxisBridge] bouton a2 déclenché, unityInst:", window.MyGameInstace || window.unityInstance);
      try {
        const t = window.MyGameInstace || window.unityInstance || null;
        t && typeof t.SendMessage == "function" ? t.SendMessage("JoystickController", "InputA2") : console.warn("[AxisBridge] instance Unity non prête pour SendMessage");
      } catch (t) {
        console.error("[AxisBridge] SendMessage failed:", t);
      }
    };
    r.addEventListener("keydown", n), r.addEventListener("down", n), r.addEventListener("press", n);
  }
  e.registerKeys("d", "x", 1);
  const a = e.buttonManager.getButton("x", 1);
  if (!a)
    console.warn("[AxisBridge] bouton 'X' groupe 1 introuvable");
  else {
    let n = function() {
      console.log("[AxisBridge] bouton X1 déclenché, unityInst:", window.MyGameInstace || window.unityInstance);
      try {
        const t = window.MyGameInstace || window.unityInstance || null;
        t && typeof t.SendMessage == "function" ? t.SendMessage("JoystickController", "InputX1") : console.warn("[AxisBridge] instance Unity non prête pour SendMessage");
      } catch (t) {
        console.error("[AxisBridge] SendMessage failed:", t);
      }
    };
    a.addEventListener("keydown", n), a.addEventListener("down", n), a.addEventListener("press", n);
  }
  e.registerKeys("z", "i", 1), e.registerKeys("s", "s", 1), e.registerKeys(" ", "w", 1), e.registerKeys("ArrowLeft", "a", 2), e.registerKeys("ArrowRight", "x", 2), e.registerKeys("ArrowUp", "i", 2), e.registerKeys("ArrowDown", "s", 2), e.registerKeys("Enter", "w", 2);
  const o = e.createGamepadEmulator(0);
  c(), e.joystick1.setGamepadEmulatorJoystick(o, 0), e.joystick2.setGamepadEmulatorJoystick(o, 1), e.registerGamepadEmulatorKeys(o, 0, "a", 1), e.registerGamepadEmulatorKeys(o, 1, "x", 1), e.registerGamepadEmulatorKeys(o, 2, "i", 1), e.registerGamepadEmulatorKeys(o, 3, "s", 1);
  const y = { x: 0, y: 0 }, l = { x: 0, y: 0 };
  e.joystick1.addEventListener("joystick:move", w), e.joystick2.addEventListener("joystick:move", p);
}
