// import serverless from "serverless-http";
// import app from "./app";

// export const handler = serverless(app);
import serverless from "serverless-http";
import app from "./app";

// Configure serverless-http to NOT treat bodies as binary
export const handler = serverless(app, {
  binary: false,
});