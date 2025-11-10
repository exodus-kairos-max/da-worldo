// import { Request, Response } from "express";
// import { PutCommand } from "@aws-sdk/lib-dynamodb";
// import { ddbDocClient } from "../db/dynamo";
// import { ContactMessage } from "../models/contact";
// import { randomUUID } from "crypto";

// const TABLE_NAME = process.env.CONTACT_TABLE_NAME || "contact";

// export const createContactMessage = async (req: Request, res: Response) => {
//   try {
//     const { name, email, message } = req.body;

//     // Validation
//     if (!name || !email || !message) {
//       return res.status(400).json({
//         success: false,
//         error: "Name, email, and message are required",
//       });
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({
//         success: false,
//         error: "Invalid email format",
//       });
//     }

//     // Create contact message object
//     const contactMessage: ContactMessage = {
//       message_id: randomUUID(),
//       name: name.trim(),
//       email: email.trim().toLowerCase(),
//       message: message.trim(),
//     };

//     // Save to DynamoDB
//     const command = new PutCommand({
//       TableName: TABLE_NAME,
//       Item: {
//         ...contactMessage,
//         created_at: new Date().toISOString(),
//       },
//     });

//     await ddbDocClient.send(command);

//     return res.status(201).json({
//       success: true,
//       message: "Message sent successfully",
//       data: {
//         message_id: contactMessage.message_id,
//       },
//     });
//   } catch (error: any) {
//     console.error("Error creating contact message:", error);

//     // Provide more specific error messages
//     let errorMessage = "Failed to send message. Please try again later.";

//     if (error?.name === "TimeoutError") {
//       errorMessage =
//         "Request timed out. Please check your network connection and try again.";
//     } else if (error?.code === "ResourceNotFoundException") {
//       errorMessage =
//         "DynamoDB table not found. Please check your AWS configuration.";
//     } else if (
//       error?.message?.includes("credential") ||
//       error?.message?.includes("Resolved credential")
//     ) {
//       errorMessage =
//         "AWS credentials are missing or invalid. Please check your environment variables.";
//     } else if (error?.message) {
//       errorMessage = error.message;
//     }

//     return res.status(500).json({
//       success: false,
//       error: errorMessage,
//     });
//   }
// };
import { Request, Response } from "express";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "../db/dynamo";
import { ContactMessage } from "../models/contact";
import { randomUUID } from "crypto";

const TABLE_NAME = process.env.CONTACT_TABLE_NAME || "contact";

export const createContactMessage = async (req: Request, res: Response) => {
  try {
    // DEBUG: Log the entire request
    console.log("=== CONTACT ENDPOINT DEBUG ===");
    console.log("Request Headers:", JSON.stringify(req.headers, null, 2));
    console.log("Request Body:", JSON.stringify(req.body, null, 2));
    console.log("Body type:", typeof req.body);
    console.log("Body keys:", Object.keys(req.body || {}));
    console.log("============================");

    const { name, email, message } = req.body;

    console.log("Extracted values:", { name, email, message });

    // Validation
    if (!name || !email || !message) {
      console.log("Validation failed - missing fields:", {
        hasName: !!name,
        hasEmail: !!email,
        hasMessage: !!message,
      });
      return res.status(400).json({
        success: false,
        error: "Name, email, and message are required",
        debug: {
          receivedBody: req.body,
          extractedValues: { name, email, message },
        },
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email format",
      });
    }

    // Create contact message object
    const contactMessage: ContactMessage = {
      message_id: randomUUID(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    };

    // Save to DynamoDB
    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        ...contactMessage,
        created_at: new Date().toISOString(),
      },
    });

    await ddbDocClient.send(command);

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: {
        message_id: contactMessage.message_id,
      },
    });
  } catch (error: any) {
    console.error("Error creating contact message:", error);

    // Provide more specific error messages
    let errorMessage = "Failed to send message. Please try again later.";

    if (error?.name === "TimeoutError") {
      errorMessage =
        "Request timed out. Please check your network connection and try again.";
    } else if (error?.code === "ResourceNotFoundException") {
      errorMessage =
        "DynamoDB table not found. Please check your AWS configuration.";
    } else if (
      error?.message?.includes("credential") ||
      error?.message?.includes("Resolved credential")
    ) {
      errorMessage =
        "AWS credentials are missing or invalid. Please check your environment variables.";
    } else if (error?.message) {
      errorMessage = error.message;
    }

    return res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
};