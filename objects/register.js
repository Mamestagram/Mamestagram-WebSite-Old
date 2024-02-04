app.get("/register", (req, res) => {
    pageName = "Register";
    pool.getConnection((err, connection) => {
        postLog(err, req, res, `connected to ${pageName}`);

        connection.release();
    });
    res.render("register.ejs",
        {pageTitle: pageName, err: "", untxt: "", emtxt: "", pstxt: ""});
});
app.post("/register",
    (req, res, next) => {
        const un = req.body.username, em = req.body.email, ps = req.body.password;
        let time = 0;
        if (!clicked) {
            clicked = true;
            const timer = setInterval(function() {
                if (++time >= 100) {
                    clicked = false;
                    clearInterval(timer);
                }
            }, 10);
            next();
        }
        else {
            time = 0;
            res.render("register.ejs", {pageTitle: pageName, err: "wait", untxt: un, emtxt: em, pstxt: ps});
            postLog("", req, res, "failed to register");
        }
    },
    (req, res, next) => {
        const un = req.body.username, em = req.body.email, ps = req.body.password;
        let errli = new Array(0);
        if (un.length <= 0) {
            errli.push("empname");
        }
        else if (!isValidName(un)) {
            errli.push("spacebar");
        }
        else if (hasEmoji(un)) {
            errli.push("emoji");
        }
        if (em.length <= 0) {
            errli.push("empemail");
        }
        if (ps.length <= 0) {
            errli.push("emppass");
        }
        if (errli.length > 0) {
            res.render("register.ejs", {pageTitle: pageName, err: errli, untxt: un, emtxt: em, pstxt: ps});
            postLog("", req, res, "failed to register");
        }
        else {
            next();
        }
    },
    (req, res, next) => {
        const un = req.body.username, em = req.body.email, ps = req.body.password;
        let errli = new Array(0);
        if (un.length > 15) {
            errli.push("overname");
        }
        if (!isEmailForm(em)) {
            errli.push("notemail");
        }
        if (ps.length < 8) {
            errli.push("shortpass");
        }
        else if (!isValidPass(ps)) {
            errli.push("weakpass");
        }
        if (errli.length > 0) {
            res.render("register.ejs", {pageTitle: pageName, err: errli, untxt: un, emtxt: em, pstxt: ps});
            postLog("", req, res, "failed to register");
        }
        else {
            next();
        }
    },
    (req, res, next) => {
        let errli = new Array(0), un = req.body.username, em = req.body.email, ps = req.body.password;
        if (req.body.confirmpass.length <= 0) {
            errli.push("empconf");
        }
        else if (req.body.confirmpass !== ps) {
            errli.push("wrongconf");
        }
        pool.getConnection((err, connection) => {
            connection.query(
                "SELECT * " +
                "FROM users " +
                "WHERE safe_name = ?;",
                [getSafeName(un)],
                (error, results) => {
                    if (error) {
                        console.error(error);
                        throw error;
                    }
                    else if (results.length > 0) {
                        errli.push("dupname");
                    }
                }
            );
            connection.query(
                "SELECT * " +
                "FROM users " +
                "WHERE email = ?;",
                [em],
                (error, results) => {
                    if (error) {
                        console.error(error);
                        throw error;
                    }
                    else if (results.length > 0) {
                        errli.push("dupemail");
                    }
                    if (errli.length > 0) {
                        res.render("register.ejs", {pageTitle: pageName, err: errli, untxt: un, emtxt: em, pstxt: ps});
                        postLog("", req, res, "failed to register");
                    }
                    else {
                        next();
                    }
                }
            );

            connection.release();
        });
    },
    (req, res, next) => {
        const secretKey = "6LcsItomAAAAAJv5KUJtybbvbK82Lmwu9xQGcMhj";
        axios.get(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.recaptcha}`)
            .then((response) => {
                const data = response.data;
                const success = data.success, score = data.score;
                let un = req.body.username, em = req.body.email, ps = req.body.password;
                postLog("", req, res, `success: ${success}, score: ${score}`);
                if (success && score >= 0.9) {
                    next();
                }
                else {
                    res.render("register.ejs", { pageTitle: pageName, err: "nothuman", untxt: un, emtxt: em, pstxt: ps })
                }
            })
            .catch((error) => {
                console.error('Error:', error.message);
            });
    },
    (req, res) => {
        axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=93d38062e9704d878ff9187cef1a9bfd&ip=${getIP(req)}`)
            .then((response) => {
                const data = response.data;
                const username = req.body.username, email = req.body.email;
                const pass = crypto.createHash("md5").update(req.body.password).digest("hex");
                const safename = getSafeName(username), hashed = bcrypt.hashSync(pass, 12);
                console.log(`[ username: ${username}, email: ${email}]`);

                pool.getConnection((err, connection) => {
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
                            const getId = await queryPromise(
                                "SELECT id " +
                                "FROM users " +
                                "ORDER BY id DESC " +
                                "LIMIT 1;",
                                []
                            );
                            const userid = getId[0].id + 1;
                            await queryPromise(
                                "INSERT INTO users (id, name, safe_name, email, priv, pw_bcrypt, country, creation_time) " +
                                "VALUES (?, ?, ?, ?, 3, ?, ?, ?);",
                                [userid, username, safename, email, hashed, data.country_code2.toLowerCase(), Math.floor(Date.now() / 1000)],
                            );
                            for (let i = 0; i <= 8; i++) {
                                if (i !== 7) {
                                    await queryPromise(
                                        "INSERT INTO stats (id, mode) " +
                                        "VALUES (?, ?);",
                                        [userid, i]
                                    );
                                }
                            }
                            for (let i = 0; i < 4; i++) {
                                switch (i) {
                                    case 0:
                                        for (let j = 0; j < 2; j++) {
                                            await queryPromise(
                                                "INSERT INTO dan_stats (id, type, mode, cs) " +
                                                "VALUES (?, ?, ?, 0);",
                                                [userid, j, i]
                                            );
                                        }
                                        break;
                                    case 3:
                                        let cs;
                                        for (let j = 0; j < 14; j++) {
                                            if (j >= 0 && j <= 4) { cs = 4; }
                                            else if (j <= 8) { cs = 6; }
                                            else if (j <= 12) { cs = 7; }
                                            else { cs = 10; }
                                            await queryPromise(
                                                "INSERT INTO dan_stats (id, type, mode, cs) " +
                                                "VALUES (?, ?, ?, ?);",
                                                [userid, j, i, cs]
                                            );
                                        }
                                        break;
                                    default:
                                        await queryPromise(
                                            "INSERT INTO dan_stats (id, type, mode, cs) " +
                                            "VALUES (?, 0, ?, 0);",
                                            [userid, i]
                                        );
                                        break;
                                }
                            }
                            alert("Your account has been successfully registered!");
                            res.redirect("/");
                            postLog(err, req, res, `successfully registered (userid: ${userid})`);
                        }
                        catch (error) {
                            console.error(error);
                            throw error;
                        }
                    }
                    processAsyncTask();

                    connection.release();
                });
            })
            .catch((error) => {
                console.error("Error:", error.message);
            });
    }
);