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

console.log(element[1].includes("so"));