import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process?.env?.CLOUDINARY_CLOUD_NAME,
  api_key: process?.env?.CLOUDINARY_API_KEY,
  api_secret: process?.env?.CLOUDINARY_API_SECRET,
});

async function uploadVideoToCloudinary() {
  console.log("\nUPLOADING VIDEO TO CLOUDINARY");

  const response = await cloudinary.uploader.upload("out/rendered-video.mp4", {
    folder: "bot/templates/instagram",
    public_id: "rendered-video",
    resource_type: "video",
    format: "mp4",
  });

  console.log("\nVIDEO SENT SUCCESSFULLY: ", response?.secure_url);
}

uploadVideoToCloudinary();
