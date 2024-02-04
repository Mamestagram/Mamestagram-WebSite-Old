app.get("/donation", (req, res) => {
    pageName = "Donation";
    res.render("donation.ejs", 
        {pageTitle: pageName});
});