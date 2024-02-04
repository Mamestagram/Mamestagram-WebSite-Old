app.post("/rename",
    (req, res, next) => {
        let errmsg;
        if (!isValidName(req.body.username)) {
            errmsg = "Don't use space bar at begenning or end";
        }
        else if (hasEmoji(req.body.username)) {
            errmsg = "Don't use any emoji";
        }
        else if (req.body.username.length > 15) {
            errmsg = "Keep it within 15 characters";
        }
        pool.getConnection((err, connection) => {
            connection.query(
                "SELECT * " +
                "FROM users " +
                "WHERE safe_name = ?;",
                [getSafeName(req.body.username)],
                (error, results) => {
                    if (error) {
                        console.error(error);
                        throw error;
                    }
                    else if (results.length > 0) {
                        errmsg = "This name is alreadey used";
                    }
                    if (errmsg) {
                        postLog(err, req, res, "faild to rename");
                        res.render("edit.ejs", {pageTitle: pageName, err: errmsg, text: req.body.username});
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
        pool.getConnection((err, connection) => {
            //名前(name)変更
            connection.query(
                "UPDATE users " +
                "SET name = ? " +
                "WHERE id = ?;",
                [req.body.username, req.session.userid],
                (error) => {
                    if (error) {
                        console.error(error);
                        throw error;
                    }
                }
            );

            //名前(safe_name)変更
            connection.query(
                "UPDATE users " +
                "SET safe_name = ? " +
                "WHERE id = ?;",
                [getSafeName(req.body.username), req.session.userid],
                (error) => {
                    if (error) {
                        console.error(error);
                        throw error;
                    }
                }
            );

            //名前変更後
            connection.query(
                "SELECT name " +
                "FROM users " +
                "WHERE id = ?;",
                [req.session.userid],
                (error, results) => {
                    if (error) {
                        console.error(error);
                        throw error;
                    }
                    req.session.username = results[0].name;
                    postLog(err, req, res,
                        `successfully renamed to ${results[0].name}`);
                    res.redirect(`/profile/${req.session.userid}/std`);
                }
            );

            connection.release();
        });
    }
);