const app = require("./app");
const pool = require("./pool");

const home = () => {
    app.get("/home", (req, res) => {
        const pageName = "Home";
        pool.getConnection((err, connection) => {
            utils.postLog(err, req, res, `connected to ${pageName}`);
    
            connection.release();
        });
        res.render("home.ejs", {
            pageTitle: pageName
        });
    });
}