app.get("/edit", (req, res) => {
    pageName = "Edit";
    if (res.locals.loginf) {
        pool.getConnection((err, connection) => {
            postLog(err, req, res, `connected to ${pageName}`);
    
            connection.release();
        });
        res.render("edit.ejs",
            {pageTitle: pageName, err: "", text: ""});
    }
    else {
        res.redirect("/");
    }
});