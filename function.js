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
    let mode = ""
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

const getTitle = (name, artist) => {
    let title = name + " by " + artist;
    let rst = "";
    for (let i = 0; i < 60 && i < title.length; i++) {
        rst += title[i];
    }
    if (rst.length < title.length) {
        rst += "...";
    }
    return rst;
}

const getFullname = (name, diff, artist) => {
    let title = name + " [" + diff + "] by " + artist;
    let rst = "";
    for (let i = 0; i < 100 && i < title.length; i++) {
        rst += title[i];
    }
    if (rst.length < title.length) {
        rst += "...";
    }
    return rst;
}

const shortening = (str, limit) => {
    let rst = "";
    for (let i = 0; i < limit && i < str.length; i++) {
        rst += str[i];
    }
    if (rst.length < str.length) {
        rst += "...";
    }
    return rst;
}

const bestppRecCount = (page, data) => {
    let i = 0, num = 0, display = false, flag, cnt = 0;
    for (let map of data) {
        if (num >= page * 10 - 10) {
            display = true;
        }
        if (num >= page * 10 || num >= 100) {
            break;
        }
        flag = true;
        for(let j = 0; j < i; j++) {
            if (data[j].md5 === map.md5) {
                flag = false;
                break;
            }
        }
        if (display && flag) {
            cnt++;
            num++;
        }
        else if (flag) {
            num++;
        }
        i++;
    }
    return cnt;
}

const playsRecCount = (page, data, amount) => {
    let num = 0, display = false, cnt = 0;
    for (let map of data) {
        if (num >= page * amount - amount) {
            display = true;
        }
        if (num >= page * amount) {
            break;
        }
        if (display) {
            cnt++;
        }
        num++;
    }
    return cnt;
}