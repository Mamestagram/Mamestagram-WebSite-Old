app.get("/login", (req, res) => {
    pageName = "Sign in";
    pool.getConnection((err, connection) => {
        postLog(err, req, res, `connected to ${pageName}`);

        connection.release();
    });
    res.render("login.ejs",
        {
            pageTitle: pageName, 
            err: "",
            untxt: "",
            pstxt: ""
        });
});

app.post("/login",
    (req, res, next) => {
        const un = req.body.username, ps = req.body.password;
        let errli = new Array(0);
        if (un.length <= 0 || ps.length <= 0) {
            if (un.length <= 0) {
                errli.push("empname");
            }
            if (ps.length <= 0) {
                errli.push("emppass");
            }
            res.locals.failed = true;
            res.render("login.ejs", {
                pageTitle: pageName,
                err: errli,
                untxt: un,
                pstxt: ps
            });
            postLog("", req, res, "faild to sign in");
        }
        else {
            next();
        }
    },
    (req, res) => {
        const username = req.body.username;
        const pass = crypto.createHash("md5").update(req.body.password).digest("hex");
        const un = req.body.username, ps = req.body.password;
        pool.getConnection((err, connection) => {
            connection.query(
                "SELECT id, name, pw_bcrypt " +
                "FROM users " +
                "WHERE name = ?;",
                [username],
                (error, results) => {
                    if (error) {
                        console.error(error);
                        throw error;
                    }
                    if (results.length <= 0) {
                        res.locals.failed = true;
                        res.render("login.ejs", {pageTitle: pageName, err: "notfound", untxt: un, pstxt: ps});
                        postLog(err, req, res, "faild to sign in");
                    }
                    else {
                        const hashed = results[0].pw_bcrypt;
                        bcrypt.compare(pass, hashed, (er, result) => {
                            if (er) {
                                console.error(er);
                                throw er;
                            }
                            if (result) {
                                req.session.userid = results[0].id;
                                req.session.username = username;
                                res.locals.failed = false;
                                res.redirect("/");
                                postLog(err, req, res,
                                    `successfully signed in (userid: ${req.session.userid})`);
                            }
                            else {
                                res.locals.failed = true;
                                res.render("login.ejs", {pageTitle: pageName, err: "wrongpass", untxt: un, pstxt: ps});
                                postLog(err, req, res, "faild to sign in");
                            }
                        });
                    }
                }
            );

            connection.release();
        });
    }
);