const getPlayTime = (time) => {
    let res = "";
    res += Math.floor(time / 86400).toLocaleString() + "d ";
    time %= 86400;
    res += Math.floor(time / 3600).toLocaleString() + "h ";
    time %= 3600;
    res += Math.floor(time / 60).toLocaleString() + "m";
    return res;
}

const getMods = (modNum) => {
    const mod = new Array(0);
    const mods = ["nf", "ez", "", "hd", "hr", "sd", "dt", "", "ht", "nc", "fl", "", "so", "", "pf"];
    if (modNum >= 536870912) {
        mod.push("v2");
        modNum -= 536870912;
    }
    for (let i = 14; i >= 0; i--) {
        if (i !== 2 && i !== 11 && modNum >= Math.pow(2, i)) {
            switch (i) {
                case 14:
                    modNum -= Math.pow(2, 5);
                    break;
                case 9:
                    modNum -= Math.pow(2, 6);
                    break;
                case 13:
                case 7:
                    modNum -= Math.pow(2, i);
                    continue;
            }
            mod.push(mods[i]);
            modNum -= Math.pow(2, i);
        }
    }
    return mod;
}

const getMode = (modeNum) => {
    let mode = "#"
    switch (modeNum) {
        case 0:
            mode += "osu";
            break;
        case 1:
            mode += "taiko";
            break;
        case 2:
            mode += "fruits";
            break;
        case 3:
            mode += "mania";
            break;
    }
    return mode;
}

console.log(getMods(128));