app.get("/logout", (req, res) => {
    const userid = req.session.userid;
    if (res.locals.loginf) {
        req.session.destroy(() => {
            res.locals.loginf = false;
            res.redirect("/");
            postLog("", req, res, `signed out (userid: ${userid})`);
        });
    }
    else {
        res.redirect("/");
    }
});