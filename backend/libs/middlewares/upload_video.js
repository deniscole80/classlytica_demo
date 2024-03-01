const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
// let image_count = 1;

const formidable = require("formidable");

const azure = require("azure");
const storageAccount = "classlyticadev";
const accessKey =
  "xUL9ZdItB0ACbHnsIp0ogEytwIEQ3MRorTllnrUxP0BdacooE7YIAx3wx89TtcGJUlsMPpxq1qcy+AStnZvqWw==";
const blobSvc = azure.createBlobService(storageAccount, accessKey);

// Set S3 endpoint to DigitalOcean Spaces
// const spacesEndpoint = new aws.Endpoint("fra1.digitaloceanspaces.com");
// const s3 = new aws.S3({
//   endpoint: spacesEndpoint,
// });

// Change bucket property to your Space name
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: "development-space/posts/videos",
//     acl: "public-read",
//     key: function (req, file, cb) {
//       console.log(file);
//       cb(null, Date.now() + "-" + file.originalname);
//       req.body.video = Date.now() + "-" + file.originalname;
//     },
//   }),
// }).array("file", 1);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/pictures/profile/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

const uploadVideo = (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    let filename = `${Date.now()}-${files.file.newFilename}`;
    req.body = { ...fields, video: filename };
    console.log(req.body);
    const options = {
      contentType: files.file.type,
      metadata: { fileName: filename },
    };

    blobSvc.createBlockBlobFromLocalFile(
      "video-posts",
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
  //   next();
  // });
  //   upload.single("file")(req, res, () => {
  //     // console.log(req.file);
  //     next();
  //   });
};

module.exports = {
  uploadVideo,
};
