import * as THREE from "three";

export default class newbridge {
    constructor(world) {
        this.world = world;
        this.input = { left: false, right: false };
        this.joystickY = 0;
        this.isPulledBack = false; // indique si le joystick a été tiré en arrière
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onKeyUp = this._onKeyUp.bind(this);
        this.addEvents();
        this.getMessage();
    }

    getMessage() {
        window.addEventListener("message", (ev) => {
            const msg = ev.data;
            if (!msg || msg.type !== "axis-event") return;

            // 🕹️ Gestion des touches latérales
            if (msg.event === "keydown" || msg.event === "keyup") {
                const rawKey = (msg.payload?.key || "").toLowerCase();
                const m = rawKey.match(/^([a-z]+)(\d+)$/);
                let baseKey = rawKey;
                let controllerId = msg.payload?.id || msg.payload?.joystick || 1;
                if (m) {
                    baseKey = m[1];
                    controllerId = parseInt(m[2], 10);
                }

                if (msg.event === "keydown") {
                    if (msg.payload.key === "a1") {
                        this.input.left = true;
                        console.log("left down");
                        console.log("[AxisBridge] bouton a1 déclenché, unityInst:", window.MyGameInstace || window.unityInstance);
                    try {
                        const inst = window.MyGameInstace || window.unityInstance || null;
                        console.log("Inst :", inst);
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
                    if (msg.payload.key === "w2") {
                        this.input.right = true;
                        console.log("right down");
                    }
                } else {
                    if (msg.payload.key === "a1") {
                        this.input.left = false;
                        console.log("left up");
                    }
                    if (msg.payload.key === "w2") {
                        this.input.right = false;
                        console.log("right up");
                    }
                }
            }

            // 🎮 Gestion du joystick analogique
            if (msg.event === "joystick:move") {
                const joystickId = msg.payload?.joystick || msg.payload?.id || 1;
                if (joystickId === 1) {
                    const pos = msg.payload?.position || { x: 0, y: 0 };
                    this.joystickY = pos.y;
                    this.input.left = true;
                    console.log("joystickmove");
                    console.log("movement du joystick, unityInst:", window.MyGameInstace || window.unityInstance);
                    try {
                        const inst = window.MyGameInstace || window.unityInstance || null;
                        console.log("Inst joystick :", inst);
                        if (inst && typeof inst.SendMessage === "function") {
                            console.log(typeof pos.x, pos.x);
                            console.log(pos.y);
                        // envoyer le nom de la méthode sans parenthèses
                        // inst.SendMessage("JoystickController", "InputJoystick1MoveHandlerX", pos.x);
                        // inst.SendMessage("JoystickController", "InputJoystick1MoveHandlerY", pos.y);
                        } else {
                        console.warn("[AxisBridge] instance Unity non prête pour SendMessage");
                        }
                    } catch (e) {
                        console.error("[AxisBridge] SendMessage failed:", e);
                    }

                    // // Étape 1 : on détecte que le joystick a été tiré vers l’arrière
                    // if (pos.y < -0.9 && !this.isPulledBack) {
                    //     this.isPulledBack = true;
                    //     this.pullStrength = Math.abs(pos.y); // on garde la force du tir
                    //     console.log("🔧 Joystick tiré à fond !");
                    // }

                    // // Étape 2 : quand on relâche (y repasse au-dessus de -0.5), on lance la balle
                    // if (pos.y > -0.5 && this.isPulledBack) {
                    //     console.log("🎯 Joystick relâché → lancement !");
                    //     this.start({ y: -this.pullStrength }); // on réutilise la force enregistrée
                    //     this.isPulledBack = false;
                    // }
                }
            }
        });
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
        //     // Force proportionnelle à la traction du joystick
        //     const force = pos ? Math.abs(pos.y) * 400 : 400;
        //     this.world.ball.springLaunch(force, 0.35, new THREE.Vector3(0, 0, -1));
        //     this.world.ballLaunched = true;
        //     console.log(`🚀 Balle lancée avec force ${force.toFixed(1)}`);
        // }
    }

    destroy() {
        window.removeEventListener("keydown", this._onKeyDown);
        window.removeEventListener("keyup", this._onKeyUp);
    }
}
