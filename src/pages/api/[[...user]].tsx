import { deleteData, retrieveData, updateData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import cors, { runMiddleware } from "@/pages/api/cors"; // Import middleware

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors); // Jalankan middleware CORS

  try {
    if (req.method === "GET") {
      const users = await retrieveData("users");
      const data = users.map((user: any) => {
        delete user.password;
        return user;
      });
      res.status(200).json({ status: true, statusCode: 200, message: "success", data });
    } else if (req.method === "PUT") {
      const { id, data } = req.body;
      const result = await updateData("users", id, data);
      if (result) {
        res.status(200).json({
          status: true,
          statusCode: 200,
          message: "success",
        });
      } else {
        res.status(400).json({
          status: false,
          statusCode: 400,
          message: "failed",
        });
      }
    } else if (req.method === "DELETE") {
      const { user }: any = req.query;
      const result = await deleteData("users", user[1]);
      if (result) {
        res.status(200).json({
          status: true,
          statusCode: 200,
          message: "success",
        });
      } else {
        res.status(400).json({
          status: false,
          statusCode: 400,
          message: "failed",
        });
      }
    } else {
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
