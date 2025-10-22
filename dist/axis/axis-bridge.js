// axis-bridge.js
import AxisModule from "axis-api";

const Axis = AxisModule?.default || AxisModule?.Axis || AxisModule;

if (!Axis || typeof Axis.registerKeys !== "function") {
  console.warn("[AxisBridge] Axis API introuvable ou invalide :", Axis);
} else {
  console.log("Axis found");
  // On expose Axis sur window pour que Unity y accède
  window.Axis = Axis;
  window.__axis__ = window.__axis__ || Axis;

  Axis.registerKeys("q", "a", 1);
  const buttonA1 = Axis.buttonManager.getButton('a', 1);
  if (!buttonA1) {
    console.warn("[AxisBridge] bouton 'a' groupe 1 introuvable");
  } else {
    function sendSelectA() {
      console.log("[AxisBridge] bouton a1 déclenché, unityInst:", window.MyGameInstace || window.unityInstance);
      try {
        const inst = window.MyGameInstace || window.unityInstance || null;
        if (inst && typeof inst.SendMessage === "function") {
          // envoyer le nom de la méthode sans parenthèses
          inst.SendMessage("JoystickController", "InputA1");
        } else {
          console.warn("[AxisBridge] instance Unity non prête pour SendMessage");
        }
      } catch (e) {
        console.error("[AxisBridge] SendMessage failed:", e);
      }
    }
    buttonA1.addEventListener('keydown', sendSelectA);
    buttonA1.addEventListener('down', sendSelectA);
    buttonA1.addEventListener('press', sendSelectA);
  }

  // --- ajout pour a2 (ArrowLeft -> groupe 2) ---
  Axis.registerKeys("ArrowLeft", "a", 2);
  const buttonA2 = Axis.buttonManager.getButton('a', 2);
  if (!buttonA2) {
    console.warn("[AxisBridge] bouton 'a' groupe 2 introuvable");
  } else {
    function sendMoveLeft() {
      console.log("[AxisBridge] bouton a2 déclenché, unityInst:", window.MyGameInstace || window.unityInstance);
      try {
        const inst = window.MyGameInstace || window.unityInstance || null;
        if (inst && typeof inst.SendMessage === "function") {
          // appel avec paramètre string pour appeler HandleKeyboardMove2D(string)
          inst.SendMessage("JoystickController", "InputA2");
        } else {
          console.warn("[AxisBridge] instance Unity non prête pour SendMessage");
        }
      } catch (e) {
        console.error("[AxisBridge] SendMessage failed:", e);
      }
    }
    buttonA2.addEventListener('keydown', sendMoveLeft);
    buttonA2.addEventListener('down', sendMoveLeft);
    buttonA2.addEventListener('press', sendMoveLeft);
  }

  Axis.registerKeys("d", "x", 1);
   const buttonX1 = Axis.buttonManager.getButton('x', 1);
  if (!buttonX1) {
    console.warn("[AxisBridge] bouton 'X' groupe 1 introuvable");
  } else {
    function sendMoveLeft() {
      console.log("[AxisBridge] bouton X1 déclenché, unityInst:", window.MyGameInstace || window.unityInstance);
      try {
        const inst = window.MyGameInstace || window.unityInstance || null;
        if (inst && typeof inst.SendMessage === "function") {
          // appel avec paramètre string pour appeler HandleKeyboardMove2D(string)
          inst.SendMessage("JoystickController", "InputX1");
        } else {
          console.warn("[AxisBridge] instance Unity non prête pour SendMessage");
        }
      } catch (e) {
        console.error("[AxisBridge] SendMessage failed:", e);
      }
    }
    buttonX1.addEventListener('keydown', sendMoveLeft);
    buttonX1.addEventListener('down', sendMoveLeft);
    buttonX1.addEventListener('press', sendMoveLeft);
  }
  Axis.registerKeys("z", "i", 1);
  Axis.registerKeys("s", "s", 1);
  Axis.registerKeys(" ", "w", 1);

  Axis.registerKeys("ArrowLeft", "a", 2);
  Axis.registerKeys("ArrowRight", "x", 2);
  Axis.registerKeys("ArrowUp", "i", 2);
  Axis.registerKeys("ArrowDown", "s", 2);
  Axis.registerKeys("Enter", "w", 2);

  const gamepadEmulator = Axis.createGamepadEmulator(0); // 0 is gamepad index, often represents the first gamepad connected to your computer
  function update() {
    gamepadEmulator.update();

    requestAnimationFrame(update);
  }
  update();
  Axis.joystick1.setGamepadEmulatorJoystick(gamepadEmulator, 0); // 0 is the joystick index of the gamepad, often the one on the left side
  Axis.joystick2.setGamepadEmulatorJoystick(gamepadEmulator, 1); // 1 is the joystick index of the gamepad, often the one on the right side
  
  Axis.registerGamepadEmulatorKeys(gamepadEmulator, 0, "a", 1); // Gamepad button index 0 (PS4 X) to button "a" from group 1
  Axis.registerGamepadEmulatorKeys(gamepadEmulator, 1, "x", 1); // Gamepad button index 1 (PS4 Square) to button "x" from group 1
  Axis.registerGamepadEmulatorKeys(gamepadEmulator, 2, "i", 1); // Gamepad button index 2 (PS4 Circle) to button "i" from group 1
  Axis.registerGamepadEmulatorKeys(gamepadEmulator, 3, "s", 1); // Gamepad button index 3 (PS4 Triangle) to button "s" from group 1

  const position1 = { x: 0, y: 0 };
  const position2 = { x: 0, y: 0 };

  Axis.joystick1.addEventListener("joystick:move", joystick1MoveHandler);
  Axis.joystick2.addEventListener("joystick:move", joystick2MoveHandler);

  function joystick1MoveHandler(e) {
    if (!e || !e.position) {
      return;
    }
    const speed = 50;
    position1.x += speed * e.position.x;
    position1.y += speed * e.position.y;
    try {
      const inst = window.MyGameInstace || window.unityInstance || null;
      if (inst && typeof inst.SendMessage === "function") {
        inst.SendMessage("JoystickController", "InputJoystick1MoveHandlerX", e.position.x);
        inst.SendMessage("JoystickController", "InputJoystick1MoveHandlerY", e.position.y);
      } else {
        console.warn("[AxisBridge] Unity instance not ready for joystick move");
      }
    } catch (err) {
      console.error("[AxisBridge] SendMessage failed for joystick1 move:", err);
    }
  }

  function joystick2MoveHandler(e) {
    if (!e || !e.position) {
      return;
    }
    const speed = 50;
    position2.x += speed * e.position.x;
    position2.y += speed * e.position.y;
  }
}
