// axis-bridge.js (ES module)
import Axis from "axis-api";
console.log("Axis found")

//On expose Axis sur window pour que Unity y accède
window.Axis = Axis;


Axis.registerKeys("q", "a", 1);
Axis.registerKeys("d", "x", 1);
Axis.registerKeys("z", "i", 1);
Axis.registerKeys("s", "s", 1);
Axis.registerKeys(" ", "w", 1);

Axis.registerKeys("ArrowLeft", "a", 2);
Axis.registerKeys("ArrowRight", "x", 2);
Axis.registerKeys("ArrowUp", "i", 2);
Axis.registerKeys("ArrowDown", "s", 2);
Axis.registerKeys("Enter", "w", 2);
