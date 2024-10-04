export const send = (req, res) => {
    try {
        console.log(req.files);
        if (!req.files) {
            res.send('No file uploaded')
        } else {
            const file = req.files.image;
            file.mv('./public/imgs/' + file.name);
            res.status(200).send(file);
        }
    } catch (err) {
        res.send(err.message);
    }
}
