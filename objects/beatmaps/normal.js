app.get("/beatmaps/:setid/:id", (req, res) => {
    pageName = "Beatmaps";
    pool.getConnection((err, connection) => {
        const query = new Array(3);
        postLog(err, req, res, `${pageName}/${req.params.setid}/${req.params.id}`);

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
                //マップ情報
                query[0] = await queryPromise(
                    "SELECT id, set_id, version, mode, diff " +
                    "FROM maps " +
                    "WHERE set_id = ? " +
                    "ORDER BY diff;",
                    [req.params.setid]
                );
                //マップ詳細
                query[1] = await queryPromise(
                    "SELECT id, set_id, title, artist, creator, status, diff, version, mode, plays, total_length, bpm, max_combo, cs, hp, od, ar, passes, passes / plays * 100 AS 'rate' " +
                    "FROM maps " +
                    "WHERE set_id = ? " +
                    "AND id = ?;",
                    [req.params.setid, req.params.id]
                );
                if (query[0].length <= 0 || query[1].length <= 0) {
                    res.render("notfound.ejs", {
                        pageTitle: "Page does not exist",
                        err: 404,
                        obj: "Page"
                    });
                    return;
                }
                //スコアランキング
                query[2] = await queryPromise(
                    "SELECT RANK() OVER(ORDER BY score DESC) ranking, userid, grade, score, acc, name, country, scores.max_combo, n300, ngeki, n100, nkatu, n50, nmiss, pp, mods, " +
                    "TIMESTAMPDIFF(YEAR, play_time, NOW()) AS 'year', TIMESTAMPDIFF(MONTH, play_time, NOW()) AS 'month', TIMESTAMPDIFF(WEEK, play_time, NOW()) AS 'week', TIMESTAMPDIFF(DAY, play_time, NOW()) AS 'day', TIMESTAMPDIFF(HOUR, play_time, NOW()) AS 'hour' " +
                    "FROM scores " +
                    "JOIN users " +
                    "ON userid = users.id " +
                    "JOIN maps " +
                    "ON map_md5 = md5 " +
                    "WHERE set_id = ? " +
                    "AND maps.id = ? " +
                    "AND scores.mode = ? " +
                    "AND scores.status = 2 " +
                    "AND (priv = 3 " +
                    "OR priv = 6147 " +
                    "OR priv = 31879 " +
                    "OR priv = 4099) " +
                    "AND NOT grade = 'F';",
                    [req.params.setid, req.params.id, query[1][0].mode]
                );
                res.render("beatmap.ejs", {
                    pageTitle: pageName,
                    mapinfo: query[0],
                    mapdetails: query[1][0],
                    rankings: query[2],
                    setid: req.params.setid,
                    mapid: req.params.id,
                    modeNum: query[1][0].mode,
                    mods: -1
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
});