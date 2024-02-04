app.get("/discord", (req, res) => {
    pageName = "Discord";
    pool.getConnection((err, connection) => {
        postLog(err, req, res, `connected to ${pageName}`);

        connection.release();
    });
    res.redirect(`https://discord.com/invite/xqncGVrHSf`);
});