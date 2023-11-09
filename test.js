const groupBySort = (id, mode, diffs) => {
    let idByMode = new Array(0), diffByMode = new Array(0), rst = new Array(0);
    for (let i = 0; i < 4; i++) {
        idByMode.push([]);
        diffByMode.push([]);
    }
    for (let i = 0; i < diffs.length; i++) {
        idByMode[mode[i]].push(id[i]);
        diffByMode[mode[i]].push(diffs[i]);
    }
    for (let i = 0; i < diffs.length; i++) {
        if (diffByMode[i] && idByMode[i]) {
            idByMode[i] = idSort(idByMode[i], diffByMode[i]);
            mode.sort();
            diffByMode[i].sort();
        }
    }
    rst.push({
        id: new Array(0),
        mode: new Array(0),
        diff: new Array(0)
    });
    for (let i = 0; i < mode.length; i++) {
        rst[0].mode.push(mode[i]);
    }
    for (let i = 0; i < diffByMode.length; i++) {
        if (idByMode[i] && diffByMode[i]) {
            for (let j = 0; j < diffByMode[i].length; j++) {
                rst[0].id.push(idByMode[i][j]);
                rst[0].diff.push(diffByMode[i][j]);
            }
        }
    }
    return rst[0];
}
const idSort = (id, diff) => {
    for (let i = diff.length - 2; i >= 0; i--) {
        for (let j = 0; j <= i; j++) {
            if (diff[j] > diff[j + 1]) {
                let hold = [id[j + 1], diff[j + 1]];
                id[j + 1] = id[j];
                diff[j + 1] = diff[j];
                id[j] = hold[0];
                diff[j] = hold[1];
            }
        }
    }
    return id;
}

const id = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    mode = [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    diff = [7.399, 5.436, 5.012, 1.296, 2.553, 5.58, 2.13, 5.757, 4.517, 1.402];

const element = [
    ["ap", "rx", "so"],
    [123, 456, 789]
];

const getMods = (modNum) => {
    let mod = new Array(0);
    const mods = [
        "nf", // 0 : NoFail
        "ez", // 1 : Eazy
        "ts", // 2 : TouchScreen
        "hd", // 3 : Hidden
        "hr", // 4 : HardRock
        "sd", // 5 : SaddenDeath
        "dt", // 6 : DoubleTime
        "rx", // 7 : Relax
        "ht", // 8 : HalfTime
        "nc", // 9 : NightCore
        "fl", // 10 : FlashLight
        "at", // 11 : AutoPlay
        "so", // 12 : SpinOut
        "ap", // 13 : Autopilot
        "pf", // 14 : Perfect
        "k4", // 15 : Key4
        "k5", // 16 : Key5
        "k6", // 17 : Key6
        "k7", // 18 : Key7
        "k8", // 19 : Key8
        "fi", // 20 : FadeIn
        "rd", // 21 : Random
        "cm", // 22 : Cinema
        "tp", // 23 : TargetPoint
        "k9", // 24 : Key9
        "kc", // 25 : KeyCoop
        "k1", // 26 : Key1
        "k3", // 27 : Key3
        "k2", // 28 : Key2
        "v2", // 29 : ScoreV2
        "mr"  // 30 : Mirror
    ];
    for (let i = 30; i >= 0; i--) {
        if (i !== 2 && i !== 11 && i !== 19 && i !== 22 && !(i >= 24 && i <= 28) && modNum >= 1 << i) {
            switch (i) {
                case 14:
                    modNum -= 1 << 5;
                    break;
                case 9:
                    modNum -= 1 << 6;
                    break;
            }
            mod.push(mods[i]);
            modNum -= 1 << i;
        }
    }
    mod = sortMods(mod);
    return mod;
}
const sortMods = (mods) => {
    const order = ["rx", "ap", "k4", "k5", "k6", "k7", "nf", "ez", "ht", "hd", "hr", "dt", "nc", "sd", "pf", "fl", "fi", "mr", "so", "v2"];
    let rst = new Array(0);
    for (let i = 0; i < order.length; i++) {
        for (let mod of mods) {
            if (mod === order[i]) {
                rst.push(mod);
                break;
            }
        }
    }
    return rst;
}

const list = {
    number: 1,
    text: "hello"
};

const emoji = require("node-emoji");

console.log();