exports.send = async (req, res) => {
    try {
        console.log(req.files);
        if (!req.files) {
            res.send('No file uploaded')
        } else {
            const file = req.files.image;
            file.mv('./public/imgs/' + file.name);
            res.send(file);
        }
    } catch (err) {
        res.send(err.message);
        console.log(err.message);
    }
}
