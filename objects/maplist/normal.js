app.get("/maplist/:type/:mode",
    (req, res, next) => {
        switch (req.params.type) {
            case "all":
            case "custom":
            case "default":
                next();
                break;
            default:
                res.redirect("/maplist/custom/any");
                break;
        }
    },
    (req, res, next) => {
        switch (req.params.mode) {
            case "any":
            case "std":
            case "taiko":
            case "ctb":
            case "mania":
                next();
                break;
            default:
                res.redirect("/maplist/custom/any");
                break;
        }
    },
    (req, res) => {
        pageName = "Beatmaps";
        pool.getConnection((err, connection) => {
            let mapsets = new Array(0), nextpage = new Array(0), diffs = new Array(0);
            postLog(err, req, res, `connected to ${pageName}`);
    
            function queryPromise(query, args) {
                return new Promise((resolve, reject) => {
                    connection.query(query, args, (error, results) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            resolve(results);
                        }
                    });
                });
            }
            async function processAsyncTask() {
                try {
                    if (req.params.mode === "any") {
                        mapsets = await queryPromise(
                            "SELECT DISTINCT(set_id), title, artist, creator, status " +
                            "FROM maps " +
                            `WHERE ${req.params.type !== "all" ? `frozen = ${req.params.type === "default" ? 0 : 1} ` : ""}` +
                            `${req.params.type !== "all" ? "AND" : ""} NOT (set_id >= -70 && set_id <= -61) `+
                            "AND NOT (set_id >= -53 && set_id <= -41) " +
                            "AND NOT (set_id >= -39 && set_id <= -29) " +
                            "AND NOT set_id = 435114 " +
                            "AND NOT set_id = 477431 " +
                            "AND NOT set_id = 529168 " +
                            "AND NOT set_id = 616461 " +
                            "AND NOT set_id = 625751 " +
                            "AND NOT set_id = 695759 " +
                            "AND NOT set_id = 783009 " +
                            "AND NOT set_id = 884597 " +
                            "AND NOT set_id = 885149 " +
                            "AND NOT set_id = 891143 " +
                            "AND NOT set_id = 891152 " +
                            "AND NOT set_id = 891157 " +
                            "AND NOT set_id = 891164 " +
                            "AND NOT set_id = 895138 " +
                            "AND NOT set_id = 925097 " +
                            "AND NOT set_id = 930218 " +
                            "AND NOT set_id = 938649 " +
                            "AND NOT set_id = 938887 " +
                            "AND NOT set_id = 939723 " +
                            "AND NOT set_id = 1061136 " +
                            "AND NOT set_id = 1093043 " +
                            "AND NOT set_id = 1093064 " +
                            "AND NOT set_id = 1093066 " +
                            "AND NOT set_id = 1098825 " +
                            "AND NOT set_id = 1116467 " +
                            "AND NOT set_id = 1118057 " +
                            "AND NOT set_id = 1220647 " +
                            "AND NOT set_id = 1255809 " +
                            "AND NOT set_id = 1701653 " +
                            "AND NOT set_id = 1701656 " +
                            "AND NOT set_id = 1701658 " +
                            "AND NOT set_id = 1701659 " +
                            "AND NOT set_id = 1836385 " +
                            "ORDER BY frozen DESC, set_id DESC " +
                            "LIMIT 100;",
                            []
                        );
                        // 次ページ取得
                        nextpage = await queryPromise(
                            "SELECT DISTINCT(set_id) " +
                            "FROM maps " +
                            `WHERE ${req.params.type !== "all" ? `frozen = ${req.params.type === "default" ? 0 : 1} ` : ""}` +
                            `${req.params.type !== "all" ? "AND" : ""} NOT (set_id >= -70 && set_id <= -61) `+
                            "AND NOT (set_id >= -53 && set_id <= -41) " +
                            "AND NOT (set_id >= -39 && set_id <= -29) " +
                            "AND NOT set_id = 435114 " +
                            "AND NOT set_id = 477431 " +
                            "AND NOT set_id = 529168 " +
                            "AND NOT set_id = 616461 " +
                            "AND NOT set_id = 625751 " +
                            "AND NOT set_id = 695759 " +
                            "AND NOT set_id = 783009 " +
                            "AND NOT set_id = 884597 " +
                            "AND NOT set_id = 885149 " +
                            "AND NOT set_id = 891143 " +
                            "AND NOT set_id = 891152 " +
                            "AND NOT set_id = 891157 " +
                            "AND NOT set_id = 891164 " +
                            "AND NOT set_id = 895138 " +
                            "AND NOT set_id = 925097 " +
                            "AND NOT set_id = 930218 " +
                            "AND NOT set_id = 938649 " +
                            "AND NOT set_id = 938887 " +
                            "AND NOT set_id = 939723 " +
                            "AND NOT set_id = 1061136 " +
                            "AND NOT set_id = 1093043 " +
                            "AND NOT set_id = 1093064 " +
                            "AND NOT set_id = 1093066 " +
                            "AND NOT set_id = 1098825 " +
                            "AND NOT set_id = 1116467 " +
                            "AND NOT set_id = 1118057 " +
                            "AND NOT set_id = 1220647 " +
                            "AND NOT set_id = 1255809 " +
                            "AND NOT set_id = 1701653 " +
                            "AND NOT set_id = 1701656 " +
                            "AND NOT set_id = 1701658 " +
                            "AND NOT set_id = 1701659 " +
                            "AND NOT set_id = 1836385 " +
                            "ORDER BY frozen DESC, set_id DESC " +
                            "LIMIT 100 " +
                            "OFFSET ?;",
                            [50]
                        );
                        for (let mapset of mapsets) {
                            diffs.push(
                                await queryPromise(
                                    "SELECT id, mode, diff, version " +
                                    "FROM maps " +
                                    "WHERE set_id = ? " +
                                    "ORDER BY diff;",
                                    [mapset.set_id]
                                )
                            );
                        }
                    }
                    else {
                        let n = 0;
                        for (let i = 0; n < 30; i++) {
                            let getRow, getDiffs;
                            getRow = await queryPromise(
                                "SELECT DISTINCT(set_id), title, artist, creator, status " +
                                "FROM maps " +
                                `WHERE ${req.params.type !== "all" ? `frozen = ${req.params.type === "default" ? 0 : 1} ` : ""}` +
                                `${req.params.type !== "all" ? "AND" : ""} NOT (set_id >= -70 && set_id <= -61) `+
                                "AND NOT (set_id >= -53 && set_id <= -41) " +
                                "AND NOT (set_id >= -39 && set_id <= -29) " +
                                "AND NOT set_id = 435114 " +
                                "AND NOT set_id = 477431 " +
                                "AND NOT set_id = 529168 " +
                                "AND NOT set_id = 616461 " +
                                "AND NOT set_id = 625751 " +
                                "AND NOT set_id = 695759 " +
                                "AND NOT set_id = 783009 " +
                                "AND NOT set_id = 884597 " +
                                "AND NOT set_id = 885149 " +
                                "AND NOT set_id = 891143 " +
                                "AND NOT set_id = 891152 " +
                                "AND NOT set_id = 891157 " +
                                "AND NOT set_id = 891164 " +
                                "AND NOT set_id = 895138 " +
                                "AND NOT set_id = 925097 " +
                                "AND NOT set_id = 930218 " +
                                "AND NOT set_id = 938649 " +
                                "AND NOT set_id = 938887 " +
                                "AND NOT set_id = 939723 " +
                                "AND NOT set_id = 1061136 " +
                                "AND NOT set_id = 1093043 " +
                                "AND NOT set_id = 1093064 " +
                                "AND NOT set_id = 1093066 " +
                                "AND NOT set_id = 1098825 " +
                                "AND NOT set_id = 1116467 " +
                                "AND NOT set_id = 1118057 " +
                                "AND NOT set_id = 1220647 " +
                                "AND NOT set_id = 1255809 " +
                                "AND NOT set_id = 1701653 " +
                                "AND NOT set_id = 1701656 " +
                                "AND NOT set_id = 1701658 " +
                                "AND NOT set_id = 1701659 " +
                                "AND NOT set_id = 1836385 " +
                                "ORDER BY frozen DESC, set_id DESC " +
                                "LIMIT 1 " +
                                "OFFSET ?;",
                                [i]
                            );
                            if (getRow.length <= 0) {
                                break;
                            }
                            mapsets.push(getRow[0]);
                            getDiffs = await queryPromise(
                                "SELECT id, mode, diff, version " +
                                "FROM maps " +
                                "WHERE set_id = ? " +
                                "ORDER BY diff;",
                                [mapsets[n].set_id]
                            );
                            if (req.params.mode === "any") {
                                diffs.push(getDiffs);
                                n++;
                            }
                            else {
                                modeNum = getModeNum(req.params.mode);
                                let isSame = false;
                                for (let data of getDiffs) {
                                    if (data.mode === modeNum) {
                                        diffs.push(getDiffs);
                                        isSame = true;
                                        n++;
                                        break;
                                    }
                                }
                                if (!isSame) {
                                    mapsets.pop();
                                }
                            }
                            // 次ページ取得
                            getRow = await queryPromise(
                                "SELECT DISTINCT(set_id) " +
                                "FROM maps " +
                                `WHERE ${req.params.type !== "all" ? `frozen = ${req.params.type === "default" ? 0 : 1} ` : ""}` +
                                `${req.params.type !== "all" ? "AND" : ""} NOT (set_id >= -70 && set_id <= -61) `+
                                "AND NOT (set_id >= -53 && set_id <= -41) " +
                                "AND NOT (set_id >= -39 && set_id <= -29) " +
                                "AND NOT set_id = 435114 " +
                                "AND NOT set_id = 477431 " +
                                "AND NOT set_id = 529168 " +
                                "AND NOT set_id = 616461 " +
                                "AND NOT set_id = 625751 " +
                                "AND NOT set_id = 695759 " +
                                "AND NOT set_id = 783009 " +
                                "AND NOT set_id = 884597 " +
                                "AND NOT set_id = 885149 " +
                                "AND NOT set_id = 891143 " +
                                "AND NOT set_id = 891152 " +
                                "AND NOT set_id = 891157 " +
                                "AND NOT set_id = 891164 " +
                                "AND NOT set_id = 895138 " +
                                "AND NOT set_id = 925097 " +
                                "AND NOT set_id = 930218 " +
                                "AND NOT set_id = 938649 " +
                                "AND NOT set_id = 938887 " +
                                "AND NOT set_id = 939723 " +
                                "AND NOT set_id = 1061136 " +
                                "AND NOT set_id = 1093043 " +
                                "AND NOT set_id = 1093064 " +
                                "AND NOT set_id = 1093066 " +
                                "AND NOT set_id = 1098825 " +
                                "AND NOT set_id = 1116467 " +
                                "AND NOT set_id = 1118057 " +
                                "AND NOT set_id = 1220647 " +
                                "AND NOT set_id = 1255809 " +
                                "AND NOT set_id = 1701653 " +
                                "AND NOT set_id = 1701656 " +
                                "AND NOT set_id = 1701658 " +
                                "AND NOT set_id = 1701659 " +
                                "AND NOT set_id = 1836385 " +
                                "ORDER BY frozen DESC, set_id DESC " +
                                "LIMIT 1 " +
                                "OFFSET ?;",
                                [30 + i]
                            );
                            if (getRow.length  <= 0) {
                                continue;
                            }
                            nextpage.push(getRow[0]);
                            if (req.params.mode !== "any") {
                                const index = nextpage.length - 1;
                                modeNum = getModeNum(req.params.mode);
                                getDiffs = await queryPromise(
                                    "SELECT mode " +
                                    "FROM maps " +
                                    "WHERE set_id = ? " +
                                    "ORDER BY diff;",
                                    [nextpage[index].set_id]
                                );
                                let isSame = false;
                                for (let data of getDiffs) {
                                    if (data.mode === modeNum) {
                                        isSame = true;
                                        break;
                                    }
                                }
                                if (!isSame) {
                                    nextpage.pop();
                                }
                            }
                        }
                    }
                    res.render("maplist.ejs", {
                        pageTitle: pageName,
                        mapsets: mapsets,
                        diffs: diffs,
                        nextpage: nextpage,
                        type: req.params.type,
                        mode: req.params.mode,
                        filter: "none",
                        page: 1
                    });
                }
                catch (error) {
                    console.error(error);
                    throw error;
                }
            }
            processAsyncTask();
    
            connection.release();
        });
    }
);