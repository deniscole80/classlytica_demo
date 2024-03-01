const aws = require("aws-sdk");
const { request } = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");

const formidable = require("formidable");

const azure = require("azure");
const storageAccount = "classlyticadev";
const accessKey =
  "xUL9ZdItB0ACbHnsIp0ogEytwIEQ3MRorTllnrUxP0BdacooE7YIAx3wx89TtcGJUlsMPpxq1qcy+AStnZvqWw==";
const blobSvc = azure.createBlobService(storageAccount, accessKey);

// // Set S3 endpoint to DigitalOcean Spaces
// const spacesEndpoint = new aws.Endpoint("fra1.digitaloceanspaces.com");
// const s3 = new aws.S3({
//   endpoint: spacesEndpoint,
// });

// Change bucket property to your Space name
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: "development-space/posts/images",
//     acl: "public-read",
//     key: function (req, file, cb) {
//       console.log(file);
//       cb(null, Date.now() + "-" + file.originalname);
//       if (!("image" in req.body)) {
//         req.body.image = [];
//       }
//       req.body.image.push(Date.now() + "-" + file.originalname);
//     },
//   }),
// }).array("file", 4);

const uploadMultipleImages = (req, res, next) => {
  const form = new formidable.IncomingForm({ multiples: true });
  // form.uploadMultipleImages = true;
  form.parse(req, (err, fields, files) => {
    req.body.image = [];
    if (Array.isArray(files.file)) {
      files.file.map(async (myFile, i) => {
        // console.log("Myfile", myFile);
        const filename = `${Date.now()}-${myFile.newFilename}`;
        req.body.image.push(filename);
        // console.log(req.body);
        const options = {
          contentType: files.file.type,
          metadata: { fileName: filename },
        };
        await blobSvc.createBlockBlobFromLocalFile(
          "image-posts",
          filename,
          myFile.filepath,
          options,
          function (error, result, response) {
            if (!error) {
              // file uploaded
              console.log("file uploaded!");
              if (i == files.file.length - 1) {
                req.body = { ...fields, image: [...req.body.image] };
                next();
              }
            } else {
              console.log(error);
            }
          }
        );
      });
    } else {
      const filename = `${Date.now()}-${files.file.newFilename}`;
      req.body = { ...fields, image: [filename] };
      console.log("Upload level", req.body);
      const options = {
        contentType: files.file.type,
        metadata: { fileName: filename },
      };
      blobSvc.createBlockBlobFromLocalFile(
        "image-posts",
        filename,
        files.file.filepath,
        options,
        function (error, result, response) {
          if (!error) {
            // file uploaded
            console.log("file uploaded!");
            next();
          } else {
            console.log(error);
          }
        }
      );
    }
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
};

module.exports = {
  uploadMultipleImages,
};
