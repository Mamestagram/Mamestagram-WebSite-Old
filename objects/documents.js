app.get("/documents/:lang", (req, res) => {
    res.redirect("/documents");
});
app.get("/documents", (req, res) => {
    pageName = "Documents";
    pool.getConnection((err, connection) => {
        postLog(err, req, res, `connected to ${pageName}`);

        connection.release();
    });
    res.render("documents.ejs",
        {pageTitle: pageName});
});