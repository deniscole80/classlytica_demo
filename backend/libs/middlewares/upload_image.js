const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const formidable = require("formidable");

const azure = require("azure");
const storageAccount = "classlyticadev";
const accessKey =
  "xUL9ZdItB0ACbHnsIp0ogEytwIEQ3MRorTllnrUxP0BdacooE7YIAx3wx89TtcGJUlsMPpxq1qcy+AStnZvqWw==";
const blobSvc = azure.createBlobService(storageAccount, accessKey);
// let image_count = 1;

// Set S3 endpoint to DigitalOcean Spaces
// const spacesEndpoint = new aws.Endpoint("fra1.digitaloceanspaces.com");
// const s3 = new aws.S3({
//   endpoint: spacesEndpoint,
// });

// Change bucket property to your Space name
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: "development-space/profile",
//     acl: "public-read",
//     key: function (req, file, cb) {
//       console.log(file);
//       cb(null, Date.now() + "-" + file.originalname);
//       req.body.img = Date.now() + "-" + file.originalname;
//     },
//   }),
// }).array("file", 4);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/pictures/profile/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });
// const upload = (req, res, cb) => {
//   const mult = multer({
//     filename: (req, file, cb) => {},
//   });
//   console.log("filename", req.file);
// };

const uploadImage = (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    let filename = `${Date.now()}-${files.file.newFilename}`;
    req.body = { ...fields, img: filename };
    console.log(req.body);
    const options = {
      contentType: files.file.type,
      metadata: { fileName: filename },
    };

    blobSvc.createBlockBlobFromLocalFile(
      "profile",
      filename,
      files.file.filepath,
      options,
      function (error, result, response) {
        if (!error) {
          // file uploaded
          console.log("file uploaded!");
          next();
        }
      }
    );
  });
  // upload(req, res, function (error) {
  //   if (error) {
  //     console.log(error);
  //     res.status(501).send({ message: "Upload failed" });
  //     return;
  //   }
  //   console.log("File uploaded successfully.");
  //   // console.log(req.body);
  //   // next();
  // });
  //   upload.single("file")(req, res, () => {
  //     // console.log(req.file);
  //     next();
  //   });
};

module.exports = {
  uploadImage,
};
