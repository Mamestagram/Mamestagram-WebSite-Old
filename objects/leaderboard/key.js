// maniaキー別
app.get("/leaderboard/:mode&:key/:sortby", (req, res) => {
    pageName = "Leaderboard";
    modeNum = getModeNum(req.params.mode);
    const ranking = new Array(2), sortType = ["pp", "acc", "plays"];
        sortby = sortType[getSortbyIndex(req.params.sortby)];
    pool.getConnection((err, connection) => {
        postLog(err, req, res, `connected to ${pageName}/${req.params.mode}/${req.params.sortby}/1`);

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
                // ランキング取得
                ranking[0] = await queryPromise(
                    `SELECT users.id, RANK() OVER(ORDER BY ${sortby} DESC) ranking, country, name, acc, plays, pp, xh_count, x_count, sh_count, s_count, a_count ` +
                    "FROM users " +
                    "JOIN stats " +
                    "ON users.id = stats.id " +
                    `AND mode = ? ` +
                    "AND NOT users.id = 1 " +
                    "AND (priv = 3 " +
                    "OR priv = 6147 " +
                    "OR priv = 31879 " +
                    "OR priv = 4099) " +
                    "AND NOT acc = 0 " +
                    `ORDER BY ${sortby} DESC ` +
                    "LIMIT 50;",
                    [modeNum]
                );
                // 次ページのランキング取得
                ranking[1] = await queryPromise(
                    "SELECT users.id " +
                    "FROM users " +
                    "JOIN stats " +
                    "ON users.id = stats.id " +
                    "AND mode = ? " +
                    "AND NOT users.id = 1 " +
                    "AND (priv = 3 " +
                    "OR priv = 6147 " +
                    "OR priv = 31879 " +
                    "OR priv = 4099) " +
                    "AND NOT acc = 0 " +
                    `ORDER BY ${sortby} DESC ` +
                    "LIMIT 50 " +
                    "OFFSET 50;",
                    [modeNum]
                );
                res.render("leaderboard.ejs", {
                    pageTitle: pageName,
                    ranking: ranking[0],
                    nextpage: ranking[1],
                    modeNum: modeNum,
                    key: req.params.key,
                    sortby: req.params.sortby,
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
});