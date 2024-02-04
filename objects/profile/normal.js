app.get("/profile/:id/:mode", 
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
        let info, rankings = {}, grades = {}, medals, bestpp, mostplays, recentplays = new Array(2);
    
        pool.getConnection((err, connection) => {
            postLog(err, req, res, `connected to ${pageName}/${id}`);

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
                    // プロフィール情報
                    info = await queryPromise(
                        "SELECT priv, verified, name, country, acc, plays, total_hits, rscore, tscore, max_combo, replay_views, pp, playtime " +
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
                        "FROM stats " +
                        "JOIN users " +
                        "ON users.id = stats.id " +
                        "WHERE pp > ( " +
                            "SELECT pp " +
                            "FROM stats " +
                            "WHERE id = ? " +
                            "AND mode = ?) " +
                        "AND mode = ? " +
                        "AND (priv = 3 " +
                        "OR priv = 6147 " +
                        "OR priv = 31879 " +
                        "OR priv = 4099);",
                        [id, modeNum, modeNum]
                    );
                    // 国内ランキング
                    rankings.country = await queryPromise(
                        "SELECT COUNT(*) + 1 AS 'value' " +
                        "FROM stats " +
                        "JOIN users " +
                        "ON stats.id = users.id " +
                        "WHERE pp > ( " +
                            "SELECT pp " +
                            "FROM stats " +
                            "WHERE id = ? " +
                            "AND mode = ?) " +
                            "AND country = ( " +
                                "SELECT country " +
                                "FROM users " +
                                "WHERE id = ?) " +
                        "AND mode = ? " +
                        "AND (priv = 3 " +
                        "OR priv = 6147 " +
                        "OR priv = 31879 " +
                        "OR priv = 4099);",
                        [id, modeNum, id, modeNum]
                    );
                    // メダル数
                    medals = await queryPromise(
                        "SELECT COUNT(*) AS 'value' " +
                        "FROM user_achievements " +
                        "WHERE userid = ?;",
                        [id]
                    );
                    // グレード数
                    // XH
                    grades.xh = await queryPromise(
                        "SELECT COUNT(*) AS 'value' " +
                        "FROM scores " +
                        "WHERE userid = ? " +
                        "AND mode = ? " +
                        "AND grade = 'XH' " +
                        "AND status = 2;",
                        [id, modeNum]
                    );
                    // X
                    grades.x = await queryPromise(
                        "SELECT COUNT(*) AS 'value' " +
                        "FROM scores " +
                        "WHERE userid = ? " +
                        "AND mode = ? " +
                        "AND grade = 'X' " +
                        "AND status = 2;",
                        [id, modeNum]
                    );
                    // SH
                    grades.sh = await queryPromise(
                        "SELECT COUNT(*) AS 'value' " +
                        "FROM scores " +
                        "WHERE userid = ? " +
                        "AND mode = ? " +
                        "AND grade = 'SH' " +
                        "AND status = 2;",
                        [id, modeNum]
                    );
                    // S
                    grades.s = await queryPromise(
                        "SELECT COUNT(*) AS 'value' " +
                        "FROM scores " +
                        "WHERE userid = ? " +
                        "AND mode = ? " +
                        "AND grade = 'S' " +
                        "AND status = 2;",
                        [id, modeNum]
                    );
                    // A
                    grades.a = await queryPromise(
                        "SELECT COUNT(*) AS 'value' " +
                        "FROM scores " +
                        "WHERE userid = ? " +
                        "AND mode = ? " +
                        "AND grade = 'A' " +
                        "AND status = 2;",
                        [id, modeNum]
                    );
                    //

                    // ベストパフォーマンス
                    bestpp = await queryPromise(
                        "SELECT set_id, maps.id, maps.mode, grade, title, artist, version, mods, acc, pp " +
                        "FROM scores " +
                        "JOIN maps " +
                        "ON map_md5 = md5 " +
                        "WHERE userid = ? " +
                        "AND scores.mode = ? " +
                        "AND scores.status = 2 " +
                        "AND NOT grade = 'F' " +
                        "AND (maps.status = 2 " +
                        "OR maps.status = 3) " +
                        "ORDER BY pp DESC " +
                        "LIMIT 100;",
                        [id, modeNum]
                    );
    
                    // ベストプレイ回数
                    mostplays = await queryPromise(
                        "SELECT title, artist, creator, version, maps.mode, set_id, maps.id, COUNT(*) AS 'playtimes' " +
                        "FROM scores " +
                        "JOIN maps " +
                        "ON map_md5 = md5 " +
                        "WHERE userid = ? " +
                        "GROUP BY map_md5 " +
                        "ORDER BY playtimes DESC;",
                        [id]
                    );
    
                    // 最近のプレイ
                    recentplays[0] = await queryPromise(
                        "SELECT set_id, maps.id, grade, title, artist, version, mods, maps.status, acc, pp " +
                        "FROM scores " +
                        "JOIN maps " +
                        "ON map_md5 = md5 " +
                        "WHERE userid = ? " +
                        "AND scores.mode = ? " +
                        "AND TIMEDIFF(CURRENT_TIMESTAMP(), play_time) <= '24:00:00' " +
                        "ORDER BY play_time DESC;",
                        [id, modeNum]
                    );
                    // 最近のプレイ (Fなし)
                    recentplays[1] = await queryPromise(
                        "SELECT set_id, maps.id, grade, title, artist, version, mods, maps.status, acc, pp " +
                        "FROM scores " +
                        "JOIN maps " +
                        "ON map_md5 = md5 " +
                        "WHERE userid = ? " +
                        "AND scores.mode = ? " +
                        "AND NOT grade = 'F' " +
                        "AND TIMEDIFF(CURRENT_TIMESTAMP(), play_time) <= '24:00:00' " +
                        "ORDER BY play_time DESC;",
                        [id, modeNum]
                    );
    
                    res.render("profile.ejs", {
                        pageTitle: pageName,
                        info: info[0],
                        ranking: rankings,
                        grade: grades,
                        medals: medals[0].value,
                        bestpp: bestpp,
                        mostplays: mostplays,
                        recentplays: recentplays[0],
                        recentplays_nof: recentplays[1],
                        id: Number(req.params.id),
                        modeNum: modeNum,
                        dans: false
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

// 404 not found
app.use((req, res) => {
    res.render("notfound.ejs", {
        pageTitle: "Page does not exist",
        err: 404,
        obj: "Page"
    });
});