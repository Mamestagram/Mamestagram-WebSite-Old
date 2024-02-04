app.get("/leaderboard/:mode/:sortby&page=:page",
    (req, res, next) => {
        if (req.params.page > 0) {
            next();
        }
        else {
            res.redirect(`/leaderboard/${req.params.mode}/${req.params.sortby}`);
        }
    },
    (req, res) => {
        pageName = "Leaderboard";
        modeNum = getModeNum(req.params.mode);
        const ranking = new Array(2), sortType = ["pp", "acc", "plays"],
            sortby = sortType[getSortbyIndex(req.params.sortby)];
        pool.getConnection((err, connection) => {
            postLog(err, req, res, `connected to ${pageName}/${req.params.mode}/${req.params.sortby}/${req.params.page}`);

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
            if (req.params.sortby !== "dans") {
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
                            "LIMIT 50 " +
                            "OFFSET ?;",
                            [modeNum, 50 * (req.params.page - 1)]
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
                            "OFFSET ?;",
                            [modeNum, 50 * req.params.page]
                        );
                        res.render("leaderboard.ejs", {
                            pageTitle: pageName,
                            ranking: ranking[0],
                            nextpage: ranking[1],
                            modeNum: modeNum,
                            key: "all",
                            sortby: req.params.sortby,
                            page: Number(req.params.page)
                        });
                    }
                    catch (error) {
                        console.error(error);
                        throw error;
                    }
                }
                processAsyncTask();
            }
            else {
                async function processAsyncTask() {
                    // 段位ランキング取得
                    ranking[0] = await queryPromise(
                        "SELECT dan_stats.id, RANK() OVER(ORDER BY SUM(reward_pp) DESC) ranking, country, name, SUM(reward_pp) AS 'reward_pp', COALESCE(AVG(dan_stats.acc), 0) AS 'acc', AVG(dan_stats.plays) AS 'plays' " +
                        "FROM dan_stats " +
                        "JOIN users " +
                        "ON dan_stats.id = users.id " +
                        "JOIN stats " +
                        "ON dan_stats.id = stats.id " +
                        "AND dan_stats.mode = stats.mode " +
                        "WHERE (priv = 3 " +
                        "OR priv = 6147 " +
                        "OR priv = 31879 " +
                        "OR priv = 4099) " +
                        "AND NOT dan_stats.id = 1 " +
                        "GROUP BY dan_stats.id, dan_stats.mode " +
                        "HAVING dan_stats.mode = ? " +
                        "AND NOT SUM(reward_pp) = 0 " +
                        "ORDER BY SUM(reward_pp) DESC " +
                        "LIMIT 50 " +
                        "OFFSET ?;",
                        [modeNum, 50 * (req.params.page - 1)]
                    );
                    // 次ページのランキング取得
                    ranking[1] = await queryPromise(
                        "SELECT dan_stats.id, SUM(reward_pp) " +
                        "FROM dan_stats " +
                        "JOIN users " +
                        "ON dan_stats.id = users.id " +
                        "JOIN stats " +
                        "ON dan_stats.id = stats.id " +
                        "AND dan_stats.mode = stats.mode " +
                        "WHERE (priv = 3 " +
                        "OR priv = 6147 " +
                        "OR priv = 31879 " +
                        "OR priv = 4099) " +
                        "AND NOT dan_stats.id = 1 " +
                        "GROUP BY dan_stats.id, dan_stats.mode " +
                        "HAVING dan_stats.mode = ? " +
                        "AND NOT SUM(reward_pp) = 0 " +
                        "ORDER BY SUM(reward_pp) DESC " +
                        "LIMIT 50 " +
                        "OFFSET ?;",
                        [modeNum, 50 * req.params.page]
                    );
                    res.render("leaderboard.ejs", {
                        pageTitle: pageName,
                        ranking: ranking[0],
                        nextpage: ranking[1],
                        modeNum: modeNum,
                        key: "all",
                        sortby: req.params.sortby,
                        page: Number(req.params.page)
                    });
                }
                processAsyncTask();
            }

            connection.release();
        });
    }
);