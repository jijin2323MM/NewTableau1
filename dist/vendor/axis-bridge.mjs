import s from "axis-api";
var r, i;
const e = ((r = s) == null ? void 0 : r.default) || ((i = s) == null ? void 0 : i.Axis) || s;
!e || typeof e.registerKeys != "function" ? console.warn("[AxisBridge] Axis API introuvable ou invalide :", e) : (console.log("Axis found"), window.Axis = e, window.__axis__ = window.__axis__ || e, e.registerKeys("q", "a", 1), e.registerKeys("d", "x", 1), e.registerKeys("z", "i", 1), e.registerKeys("s", "s", 1), e.registerKeys(" ", "w", 1), e.registerKeys("ArrowLeft", "a", 2), e.registerKeys("ArrowRight", "x", 2), e.registerKeys("ArrowUp", "i", 2), e.registerKeys("ArrowDown", "s", 2), e.registerKeys("Enter", "w", 2));
