const N_SAMPLES = 20;
const G_RANGE = 2;
let bufIdx = 0;

function q7FromG(g) {
    let v = Math.round(g * (127 / G_RANGE));
    if (v > 127) v = 127;
    if (v < -127) v = -127;
    return v;
}

function feedSample(gx, gy, gz) {
    const x = q7FromG(gx);
    const y = q7FromG(gy);
    const z = q7FromG(gz);
    Infxl.insert(bufIdx, x, y, z);
    bufIdx++;
    if (bufIdx >= N_SAMPLES) {
        bufIdx = 0;
        const cls = Infxl.model();
        print("ANN classification:", cls);
    }
}

function startAccel() {
    bufIdx = 0;
    Puck.accelOn();
    Puck.on("accel", function(a) {
        // a.acc.x, a.acc.y, a.acc.z are in g
        feedSample(a.acc.x, a.acc.y, a.acc.z);
    });
    print("Accelerometer on");
}

function stopAccel() {
    Puck.removeAllListeners("accel");
    Puck.accelOff();
    print("Stopped accel");
}

startAccel();
