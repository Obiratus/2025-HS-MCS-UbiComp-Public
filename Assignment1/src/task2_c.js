const N_SAMPLES = 20;
const G_RANGE   = 2;

let windowBuf = [];
let running = false;

function q7FromG(g) {
    let v = Math.round(g * (127 / G_RANGE));
    if (v > 127) v = 127;
    if (v < -127) v = -127;
    return v;
}

function classifyIfReady() {
    if (windowBuf.length !== N_SAMPLES || running) return;
    running = true;

    for (let i = 0; i < N_SAMPLES; i++) {
        const s = windowBuf[i];
        Infxl.insert(i, q7FromG(s.x), q7FromG(s.y), q7FromG(s.z));
    }

    const cls = Infxl.model();
    print("ANN classification:", cls);

    running = false;
}

function onSample(gx, gy, gz) {
    // Add newest sample
    windowBuf.push({ x: gx, y: gy, z: gz });
    if (windowBuf.length > N_SAMPLES) windowBuf.shift();

    classifyIfReady();
}

function startAccel() {
    windowBuf = [];
    Puck.accelOn();
    Puck.on("accel", a => {
        onSample(a.acc.x, a.acc.y, a.acc.z);
    });
    print("Accelerometer on (sliding window, stride=1)");
}

function stopAccel() {
    Puck.removeAllListeners("accel");
    Puck.accelOff();
    print("Stopped accel");
}

startAccel();
