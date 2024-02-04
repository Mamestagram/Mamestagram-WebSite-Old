app.get("/profile/:id/:mode&dans", 
    (req, res, next) => {
        pageName = "Profile";
        pool.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                throw err;
            }
            connection.query(
                "SELECT * " +
                "FROM users " +
                "WHERE id = ?;",
                [req.params.id],
                (error, results) => {
                    if (error) {
                        console.error(error);
                        throw error;
                    }
                    if (results.length <= 0) {
                        res.render("notfound.ejs", {
                            pageTitle: pageName,
                            err: "Error",
                            obj: "User"
                        });
                    }
                    else {
                        next();
                    }
                }
            );

            connection.release();
        });
    },
    (req, res) => {
        modeNum = getModeNum(req.params.mode);
        const id = req.params.id;
        let info, rankings = {}, acc, plays, max_combo, pp, grades = {}, medals, bestpp, mostplays, recentplays = new Array(2);
    
        pool.getConnection((err, connection) => {
            postLog(err, req, res, `connected to ${pageName}/${id}&dans`);
    
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
                    // 段位プロフィール
                    info = await queryPromise(
                        "SELECT priv, verified, name, country, total_hits, rscore, tscore, replay_views, playtime " +
                        "FROM stats " +
                        "JOIN users " +
                        "ON stats.id = users.id " +
                        "WHERE users.id = ? " +
                        "AND mode = ?;",
                        [id, modeNum]
                    );
                    // グローバルランキング
                    rankings.global = await queryPromise(
                    "SELECT COUNT(*) + 1 AS 'value' " +
                    "FROM (SELECT SUM(reward_pp) " +
                        "FROM dan_stats " +
                        "JOIN users " +
                        "ON dan_stats.id = users.id " +
                        "WHERE (priv = 3 " +
                        "OR priv = 6147 " +
                        "OR priv = 31879 OR priv = 4099) " +
                        "AND NOT dan_stats.id = 1 " +
                        "GROUP BY dan_stats.id, mode " +
                        "HAVING NOT SUM(reward_pp) = 0 " +
                        "AND SUM(reward_pp) > ( " +
                            "SELECT SUM(reward_pp) " +
                            "FROM dan_stats " +
                            "JOIN users " +
                            "ON dan_stats.id = users.id " +
                            "WHERE (priv = 3 " +
                            "OR priv = 6147 " +
                            "OR priv = 31879 " +
                            "OR priv = 4099) " +
                            "AND NOT dan_stats.id = 1 " +
                            "GROUP BY dan_stats.id, mode " +
                            "HAVING dan_stats.id = ? " +
                            "AND mode = ?) " +
                        "AND mode = ?) AS global;",
                        [id, modeNum, modeNum]
                    );
                    // 国内ランキング
                    rankings.country = await queryPromise(
                        "SELECT COUNT(*) + 1 AS 'value' " +
                        "FROM (SELECT SUM(reward_pp) " +
                            "FROM dan_stats " +
                            "JOIN users " +
                            "ON dan_stats.id = users.id " +
                            "WHERE (priv = 3 " +
                            "OR priv = 6147 " +
                            "OR priv = 31879 " +
                            "OR priv = 4099) " +
                            "AND NOT dan_stats.id = 1 " +
                            "AND country = ( " +
                                "SELECT country " +
                                "FROM users " +
                                "WHERE id = ?) " +
                            "GROUP BY dan_stats.id, mode " +
                            "HAVING NOT SUM(reward_pp) = 0 " +
                            "AND SUM(reward_pp) > ( " +
                                "SELECT SUM(reward_pp) " +
                                "FROM dan_stats " +
                                "JOIN users " +
                                "ON dan_stats.id = users.id " +
                                "WHERE (priv = 3 " +
                                "OR priv = 6147 " +
                                "OR priv = 31879 " +
                                "OR priv = 4099) " +
                                "AND NOT dan_stats.id = 1 " +
                                "GROUP BY dan_stats.id, mode " +
                                "HAVING dan_stats.id = ? " +
                                "AND mode = ?) " +
                            "AND mode = ?) AS country;",
                        [id, id, modeNum, modeNum]
                    );
                    // 段位平均acc
                    acc = await queryPromise(
                        "SELECT COALESCE(AVG(scores.acc), 0) AS 'value' " +
                        "FROM scores " +
                        "JOIN danmaps " +
                        "ON map_md5 = md5 " +
                        "WHERE NOT grade = 'F' " +
                        "AND scores.acc >= danmaps.acc " +
                        "AND scores.score >= danmaps.score " +
                        "AND status = 2 " +
                        "AND userid = ? " +
                        "AND scores.mode = ?;",
                        [id, modeNum]
                    );
                    // 段位プレイ回数
                    plays = await queryPromise(
                        "SELECT COUNT(*) AS 'value' " +
                        "FROM scores " +
                        "JOIN danmaps " +
                        "ON map_md5 = md5 " +
                        "WHERE userid = ? " +
                        "AND scores.mode = ?;",
                        [id, modeNum]
                    );
                    // 段位最大コンボ
                    max_combo = await queryPromise(
                        "SELECT COALESCE(MAX(max_combo), 0) AS 'value' " +
                        "FROM scores " +
                        "JOIN danmaps " +
                        "ON map_md5 = md5 " +
                        "WHERE NOT grade = 'F' " +
                        "AND userid = ? " +
                        "AND scores.mode = ?;",
                        [id, modeNum]
                    )
                    // メダル取得数
                    medals = await queryPromise(
                        "SELECT COUNT(*) AS 'value' " +
                        "FROM user_achievements " +
                        "WHERE userid = ?;",
                        [id]
                    );
                    // 段位pp
                    pp = await queryPromise(
                        "SELECT SUM(reward_pp) AS 'value' " +
                        "FROM dan_stats " +
                        "JOIN users " +
                        "ON dan_stats.id = users.id " +
                        "AND NOT dan_stats.id = 1 " +
                        "GROUP BY dan_stats.id, mode " +
                        "HAVING dan_stats.id = ? " +
                        "AND mode = ?;",
                        [id, modeNum]
                    );
                    // グレード数
                    // XH
                    grades.xh = await queryPromise(
                        "SELECT COUNT(*) AS 'value' " +
                        "FROM scores " +
                        "JOIN danmaps " +
                        "ON map_md5 = md5 " +
                        "WHERE userid = ? " +
                        "AND danmaps.mode = ? " +
                        "AND grade = 'XH';",
                        [id, modeNum]
                    );
                    // X
                    grades.x = await queryPromise(
                        "SELECT COUNT(*) AS 'value' " +
                        "FROM scores " +
                        "JOIN danmaps " +
                        "ON map_md5 = md5 " +
                        "WHERE userid = ? " +
                        "AND danmaps.mode = ? " +
                        "AND grade = 'X';",
                        [id, modeNum]
                    );
                    // SH
                    grades.sh = await queryPromise(
                        "SELECT COUNT(*) AS 'value' " +
                        "FROM scores " +
                        "JOIN danmaps " +
                        "ON map_md5 = md5 " +
                        "WHERE userid = ? " +
                        "AND danmaps.mode = ? " +
                        "AND grade = 'SH';",
                        [id, modeNum]
                    );
                    // S
                    grades.s = await queryPromise(
                        "SELECT COUNT(*) AS 'value' " +
                        "FROM scores " +
                        "JOIN danmaps " +
                        "ON map_md5 = md5 " +
                        "WHERE userid = ? " +
                        "AND danmaps.mode = ? " +
                        "AND grade = 'S';",
                        [id, modeNum]
                    );
                    // A
                    grades.a = await queryPromise(
                        "SELECT COUNT(*) AS 'value' " +
                        "FROM scores " +
                        "JOIN danmaps " +
                        "ON map_md5 = md5 " +
                        "WHERE userid = ? " +
                        "AND danmaps.mode = ? " +
                        "AND grade = 'A';",
                        [id, modeNum]
                    );

                    // 段位ベストパフォーマンス
                    bestpp = await queryPromise(
                        "SELECT maps.mode, grade, title, artist, version, scores.mods, scores.acc, reward " +
                        "FROM scores " +
                        "JOIN danmaps " +
                        "ON map_md5 = danmaps.md5 " +
                        "JOIN maps " +
                        "ON danmaps.md5 = maps.md5 " +
                        "WHERE userid = ? " +
                        "AND scores.mode = ? " +
                        "AND scores.status = 2 " +
                        "AND scores.acc >= danmaps.acc " +
                        "AND scores.score >= danmaps.score " +
                        "AND NOT grade = 'F' " +
                        "ORDER BY reward DESC " +
                        "LIMIT 100;",
                        [id, modeNum]
                    );

                    // 段位ベストプレイ回数
                    mostplays = await queryPromise(
                        "SELECT title, artist, creator, version, maps.mode, COUNT(*) AS 'playtimes' " +
                        "FROM scores " +
                        "JOIN danmaps " +
                        "ON map_md5 = danmaps.md5 " +
                        "JOIN maps " +
                        "ON danmaps.md5 = maps.md5 " +
                        "WHERE userid = ? " +
                        "GROUP BY map_md5 " +
                        "ORDER BY playtimes DESC;",
                        [id]
                    );

                    // 段位最近のプレイ
                    recentplays[0] = await queryPromise(
                        "SELECT grade, title, artist, version, scores.mods, maps.status, scores.acc AS 'sacc', danmaps.acc AS 'dacc', scores.score AS 'sscore', danmaps.score AS 'dscore', reward " +
                        "FROM scores " +
                        "JOIN danmaps " +
                        "ON map_md5 = danmaps.md5 " +
                        "JOIN maps " +
                        "ON danmaps.md5 = maps.md5 " +
                        "WHERE userid = ? " +
                        "AND scores.mode = ? " +
                        "AND TIMEDIFF(CURRENT_TIMESTAMP(), play_time) <= '24:00:00' " +
                        "ORDER BY play_time DESC;",
                        [id, modeNum]
                    );
                    // 段位最近のプレイ (Fなし)
                    recentplays[1] = await queryPromise(
                        "SELECT grade, title, artist, version, scores.mods, maps.status, scores.acc AS 'sacc', danmaps.acc AS 'dacc', scores.score AS 'sscore', danmaps.score AS 'dscore', reward " +
                        "FROM scores " +
                        "JOIN danmaps " +
                        "ON map_md5 = danmaps.md5 " +
                        "JOIN maps " +
                        "ON danmaps.md5 = maps.md5 " +
                        "WHERE userid = ? " +
                        "AND scores.mode = ? " +
                        "AND NOT grade = 'F' " +
                        "AND TIMEDIFF(CURRENT_TIMESTAMP(), play_time) <= '24:00:00' " +
                        "ORDER BY play_time DESC;",
                        [id, modeNum]
                    );


                }
                catch (error) {
                    console.error(error);
                    throw error;
                }
                
                res.render("profile.ejs", {
                    pageTitle: pageName,
                    info: info[0],
                    ranking: rankings,
                    acc: acc[0].value,
                    plays: plays[0].value,
                    max_combo: max_combo[0].value,
                    pp: pp[0].value,
                    grade: grades,
                    medals: medals[0].value,
                    bestpp: bestpp,
                    mostplays: mostplays,
                    recentplays: recentplays[0],
                    recentplays_nof: recentplays[1],
                    id: Number(req.params.id),
                    modeNum: modeNum,
                    dans: true
                });
            }
            processAsyncTask();
    
            connection.release();
        });
    }
);