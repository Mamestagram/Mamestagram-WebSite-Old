app.get("/profile/id=:id/mode=:mode/special=:sp/:bppage&:mppage&:repage", (req, res) => {
    let mode = req.params.mode;
    mode += req.params.sp !== "none" ? req.params.sp : "";
    res.redirect(`/profile/${req.params.id}/${mode}`);
});