const getIP = (req) => {
    if (req.headers["x-forwarded-for"]) {
        return req.headers["x-forwarded-for"];
    }
    else if (req.connection && req.connection.remoteAddress) {
        return req.connection.remoteAddress;
    }
    else if (req.connection.socket && req.connection.socket.remoteAddress) {
        return req.connection.socket.remoteAddress;
    }
    else if (req.socket && req.socket.remoteAddress) {
        return req.socket.remoteAddress;
    }
    else {
        return "0.0.0.0";
    }
}
const postLog = (err, req, res, info) => {
    let log;
    if (err) {
        console.error(err);
        throw err;
    }
    if (res.locals && res.locals.loginf) {
        log = `[${getDateFormat(getTime())} JST(UTC+9)] ${getIP(req)} ${info} (userid: ${req.session.userid})`;
    }
    else {
        log = `[${getDateFormat(getTime())} JST(UTC+9)] ${getIP(req)} ${info}`;
    }
    fs.appendFile("access.log", log + "\n", (err) => {
        if (err) {
            console.error(err);
            throw err;
        }
        console.log(log);
    });
}
const getTime = () => {
    const time = new Date().getTime();
    const timeDiff = 9, offset = timeDiff * 60 * 60 * 1000;
    return time + offset;
}
const getDateFormat = (time) => {
    const now = new Date(time);
    const locales = "en-US", options = {
        hour12: false, year: "numeric", month: "numeric", day: "numeric", weekday: "short",
        hour: "numeric", minute: "numeric", second: "numeric"
    };
    return now.toLocaleString(locales, options);
}
const getModeNum = (mode) => {
    switch (mode) {
        case "std": return 0;
        case "taiko": return 1;
        case "ctb": return 2;
        case "mania": return 3;
        case "stdrx": return 4;
        case "taikorx": return 5;
        case "ctbrx": return 6;
        case "stdap": return 8;
        default: return 0;
    }
}
const getSortbyIndex = (sortby) => {
    switch (sortby) {
        case "performance": return 0;
        case "accuracy": return 1;
        case "playcount": return 2;
        default: return 0;
    }
}
const getSafeName = (username) => {
    let name = username.toLowerCase(), rst = "";
    for (let i = 0; i < name.length; i++) {
        if (name[i] === " ") {
            rst += "_";
        }
        else {
            rst += name[i];
        }
    }
    return rst;
}
const filter = (mode, filter, results) => {
    let filtered;
    if (mode === "any" && filter === "none") {
        return results;
    }
    else {
        if (mode !== "any") {
            filtered = new Array(0);
            modeNum = getModeNum("none", mode);
            results.forEach((result) => {
                if (result.mode === modeNum) {
                    filtered.push({set_id: result.set_id, id: result.id,
                        title: result.title, artist: result.artist, creator: result.creator,
                        status: result.status, mode: result.mode, diff: result.diff});
                }
            });
            results = filtered;
        }
        if (filter !== "none") {
            filtered = new Array(0);
            results.forEach((result) => {
                let flag = false;
                for (let status of filter) {
                    if (result.status === parseInt(status)) {
                        flag = true;
                        break;
                    }
                }
                if (flag) {
                    filtered.push({set_id: result.set_id, id: result.id,
                        title: result.title, artist: result.artist, creator: result.creator,
                        status: result.status, mode: result.mode, diff: result.diff});
                }
            });
            results = filtered;
        }
    }
    return results;
}
const isValidName = (username) => {
    return (
        username[0] !== " " && username[username.length - 1] !== " " &&
        username[0] !== "\u3000" && username[username.length - 1] !== "\u3000"
    );
}
const hasEmoji = (username) => {
    const small = /[a-z]/, big = /[A-Z]/, num = /[0-9]/;
    for (let letter of username) {
        if (!small.test(letter) && !big.test(letter) && !num.test(letter) && emoji.has(letter)) {
            return true;
        }
    }
    return false;
}
const isEmailForm = (email) => {
    let flag = false;
    if (email.length >= 3) {
        flag = email.includes("@") && email.indexOf("@") !== 0 && email.indexOf("@") !== email.length - 1 && !(email.includes(" ") || email.includes("\u3000"));
    }
    return flag;
}
const isValidPass = (password) => {
    const small = /[a-z]/, big = /[A-Z]/, num = /[0-9]/;
    return (small.test(password) || big.test(password)) && num.test(password) && !(password.includes(" ") || password.includes("\u3000"));
}
module.exports = { 
    getIP,
    postLog,
    getTime,
    getDateFormat,
    getModeNum,
    getSortbyIndex,
    getSafeName,
    filter,
    isValidName,
    hasEmoji,
    isEmailForm,
    isValidPass
}