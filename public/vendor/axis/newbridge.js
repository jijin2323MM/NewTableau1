import * as THREE from "three";

export default class newbridge {
    constructor(world) {
        this.world = world;
        this.input = { left: false, right: false };
        this.joystickY = 0;
        this.isPulledBack = false;
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onKeyUp = this._onKeyUp.bind(this);
        this.addEvents();
        this.getMessage();
    }

    getMessage() {
        window.addEventListener("message", (ev) => {
            console.log("Message reçu dans newbridge:", ev.data);
            try {
                const msg = ev.data;
                if (!msg || msg.type !== "axis-event") return;

                const payload = msg.payload || {};

                if (msg.event === "keydown" || msg.event === "keyup") {
                    const normalizedKey = this.normalizeKey(payload.key);
                    const match = normalizedKey.match(/^([a-z]+)(\d+)$/);
                    let controllerId = payload.id || payload.joystick || 1;

                    if (match) {
                        controllerId = parseInt(match[2], 10);
                    }

                    if (msg.event === "keydown") {
                        this.handleAxisKeyDown(normalizedKey, controllerId);
                    } else {
                        this.handleAxisKeyUp(normalizedKey, controllerId);
                    }
                }

                if (msg.event === "joystick:move") {
                    this.handleJoystickMove(payload);
                }
            } catch (error) {
                console.error("[AxisBridge] message handler failed:", error, ev && ev.data);
            }
        });
    }

    normalizeKey(value) {
        if (typeof value === "string") return value.toLowerCase();
        if (value === undefined || value === null) return "";
        return String(value).toLowerCase();
    }

    handleAxisKeyDown(key, controllerId) {
        if (key === "a1") {
            this.input.left = true;
            console.log("left down");
            console.log("[AxisBridge] bouton a1 déclenché, unityInst:", window.MyGameInstace || window.unityInstance);
            this.sendUnityMessage("InputA1");
        }

        if (key === "w2") {
            this.input.right = true;
            console.log("right down");
        }
    }

    handleAxisKeyUp(key, controllerId) {
        if (key === "a1") {
            this.input.left = false;
            console.log("left up");
        }

        if (key === "w2") {
            this.input.right = false;
            console.log("right up");
        }
    }

    handleJoystickMove(payload) {
        const joystickId = payload.joystick || payload.id || 1;
        if (joystickId !== 1) return;

        const position = payload.position || { x: 0, y: 0 };
        this.joystickY = position.y;
        this.input.left = true;
        console.log("joystickmove");
        console.log("movement du joystick, unityInst:", window.MyGameInstace || window.unityInstance);

        try {
            const inst = window.MyGameInstace || window.unityInstance || null;
            console.log("Inst joystick :", inst);
            if (inst && typeof inst.SendMessage === "function") {
                console.log(typeof position.x, position.x);
                console.log(position.y);
                // inst.SendMessage("JoystickController", "InputJoystick1MoveHandlerX", position.x);
                // inst.SendMessage("JoystickController", "InputJoystick1MoveHandlerY", position.y);
            } else {
                console.warn("[AxisBridge] instance Unity non prête pour SendMessage");
            }
        } catch (error) {
            console.error("[AxisBridge] SendMessage failed:", error);
        }
    }

    sendUnityMessage(method) {
        try {
            const inst = window.MyGameInstace || window.unityInstance || null;
            console.log("Inst :", inst);
            if (inst && typeof inst.SendMessage === "function") {
                inst.SendMessage("JoystickController", method);
            } else {
                console.warn("[AxisBridge] instance Unity non prête pour SendMessage");
            }
        } catch (error) {
            console.error("[AxisBridge] SendMessage failed:", error);
        }
    }

    addEvents() {
        window.addEventListener("keydown", this._onKeyDown);
        window.addEventListener("keyup", this._onKeyUp);
    }

    _onKeyDown(e) {
        if (e.code === "ArrowLeft") this.input.left = true;
        if (e.code === "ArrowRight") this.input.right = true;
        if (e.code === "Space") this.start();
    }

    _onKeyUp(e) {
        if (e.code === "ArrowLeft") this.input.left = false;
        if (e.code === "ArrowRight") this.input.right = false;
    }

    start(pos) {
        // if (this.world.ball && !this.world.ballLaunched) {
        //     const force = pos ? Math.abs(pos.y) * 400 : 400;
        //     this.world.ball.springLaunch(force, 0.35, new THREE.Vector3(0, 0, -1));
        //     this.world.ballLaunched = true;
        //     console.log(`🎯 Balle lancée avec force ${force.toFixed(1)}`);
        // }
    }

    destroy() {
        window.removeEventListener("keydown", this._onKeyDown);
        window.removeEventListener("keyup", this._onKeyUp);
    }
}
