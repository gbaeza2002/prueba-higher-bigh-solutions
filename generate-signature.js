import crypto from "crypto";

const secret = "devsecret";
const userId = "u1";
const timestamp = Date.now().toString();

const data = userId + timestamp;
const signature = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("hex");

console.log("Headers necesarios:");
console.log("x-user-id:", userId);
console.log("x-timestamp:", timestamp);
console.log("x-signature:", signature);