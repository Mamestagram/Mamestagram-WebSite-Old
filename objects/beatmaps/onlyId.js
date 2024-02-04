app.get("/beatmaps/:id", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            if (err) {
                console.error(err);
                throw err;
            }
        }

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
                const getSetId = await queryPromise(
                    "SELECT set_id " +
                    "FROM maps " +
                    "WHERE id = ? " +
                    "LIMIT 1",
                    [req.params.id]
                );
                if (getSetId.length <= 0) {
                    res.render("notfound.ejs", {
                        pageTitle: "Page does not exist",
                        err: 404,
                        obj: "Page"
                    });
                }
                else {
                    const setid = getSetId[0].set_id;
                    res.redirect(`/beatmaps/${setid}/${req.params.id}`);
                }
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        }
        processAsyncTask();

        connection.release();
    });
});