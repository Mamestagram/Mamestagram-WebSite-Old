const directry = "/root/data/user-data/avatar";
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, directry);
    },
    filename: function(req, file, cb) {
        cb(null, req.session.userid + path.extname(file.originalname));
    }
});
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: function(req, file, cb) {
        cb(null, true);
    }
});
app.post("/avatar",
    (req, res, next) => {
        const deleteFile = req.session.userid;
        fs.readdir(directry, (err, files) => {
            if(err) {
                console.error(err);
                throw err;
            }
            const file = files.filter(file => file.split(".")[0] == deleteFile);
            file.forEach(f => {
                const filePath = path.join(directry, f);
                fs.unlink(filePath, error => {
                    if (error) {
                        console.error(error);
                        throw error;
                    }
                });
            });
            next();
        });
    },
    upload.single("avatar"), (req, res) => {
        postLog("", req, res, "successfully changed avatar");
        res.redirect(`/profile/${req.session.userid}/std`);
    }
);