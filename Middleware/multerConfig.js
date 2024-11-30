const multer = require("multer");
const fs = require("fs");
const sharp = require("sharp"); 

exports.UploadFile = async (req, folder = '/') => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const path = `uploads/${folder}`;
            fs.mkdirSync(path, { recursive: true })
            cb(null, path);
        },

        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, ''));
        },
    });


    var upload = multer({ storage: storage }).any();

    return new Promise((resolve, reject) => {
        upload(req, (res = null), async (err) => {

            if (err) return reject(err);

            if (req.files) {
                const files = await Promise.all(req.files.map(async (file) => {
                    let filePath = file.path.replace(/\\/g, '/');

                    if (file.mimetype.startsWith('image/') && file.mimetype !== 'image/webp') {
                        const webpPath = `${filePath.split('.').slice(0, -1).join('.')}.webp`;
                        await sharp(filePath)
                            .toFormat('webp')
                            .toFile(webpPath);
                        fs.unlink(filePath, () => {
                            console.log("Deleted!!")
                        }); 
                        filePath = webpPath;
                    }

                    return { ...file, path: process.env.MULTER  + filePath };
                }));

                resolve({
                    body: req.body,
                    file: files,
                });
            } else {
                reject(new Error('No files found.'));
            }
        });
    });
};