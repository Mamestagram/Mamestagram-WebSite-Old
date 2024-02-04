const app = require("./app");

const leaderboard = () => {
    app.get("/leaderboard", (req, res) => {
        res.redirect("/leaderboard/std/performance");
    });
    app.get("/leaderboard/mode=:mode/special=:sp/:page", (req, res) => {
        res.redirect("/leaderboard/std/performance");
    });
    
    // 通常
    
}
module.exports = leaderboard;