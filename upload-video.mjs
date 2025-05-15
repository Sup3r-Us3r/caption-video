import { v2 as cloudinary } from "cloudinary";
import { randomUUID } from "node:crypto";

cloudinary.config({
  cloud_name: process?.env?.CLOUDINARY_CLOUD_NAME,
  api_key: process?.env?.CLOUDINARY_API_KEY,
  api_secret: process?.env?.CLOUDINARY_API_SECRET,
});

async function main() {
  console.log("\nUPLOADING VIDEO TO CLOUDINARY");

  const uploadResult = await cloudinary.uploader.upload(
    "out/rendered-video.mp4",
    {
      folder: "bot/instagram/videos",
      public_id: randomUUID(),
      resource_type: "video",
      format: "mp4",
    },
  );

  console.log("\nVIDEO SENT SUCCESSFULLY");
  console.log("\nCALL WEBHOOK TO TRIGGER WORKFLOW");

  const webhookRequest = await fetch(
    `${process.env.WEBHOOK_URL}?publishVideo=true`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        videoWithSubtitles: uploadResult?.secure_url,
      }),
    },
  );
  const webhookResponse = await webhookRequest.json();

  if (!webhookRequest.ok) {
    console.error("\nError calling webhook: ", webhookResponse);
  }

  console.log("\nSUCCESSFULLY TRIGGERED WORKFLOW");
}

main();
