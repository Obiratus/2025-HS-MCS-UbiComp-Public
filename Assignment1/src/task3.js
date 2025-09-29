const SAMPLE_HZ = 12.5;
const N_SAMPLES = 20;
const AXES = 3;
const WIN = N_SAMPLES * AXES;

let buf = new Float32Array(WIN);
let idx = 0;
let have = 0;

function startAccel() {
    Puck.accelOn(SAMPLE_HZ);
    Puck.removeAllListeners("accel");
    idx = 0;
    have = 0;

    Puck.on("accel", a => {
        buf[idx] = a.acc.x;
        buf[(idx + 1) % WIN] = a.acc.y;
        buf[(idx + 2) % WIN] = a.acc.z;

        idx = (idx + 3) % WIN;
        if (have < WIN) have += 3;
    });
}

function dumpData() {
    if (have < WIN) return "";
    let out = new Array(WIN);
    let j = idx;
    for (let k = 0; k < WIN; k++) {
        out[k] = buf[j];
        j = (j + 1) % WIN;
    }
    return out.join(",");
}

NRF.on("connect", startAccel);
NRF.on("disconnect", () => {
    Puck.removeAllListeners("accel");
    Puck.accelOff();
});
