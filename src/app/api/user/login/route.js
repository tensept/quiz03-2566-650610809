import jwt from "jsonwebtoken";

import { DB, readDB } from "@/app/libs/DB";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export const POST = async (request) => {
  const body = await request.json();
  const rawAuthHeader = headers().get("authorization");
  readDB();
  const user = DB.users.filter((x) => x.username === body.username)
  if(!user)
    return NextResponse.json(
      {
        ok: false,
        message: "Username or Password is incorrect",
      },
      { status: 400 }
    );
  
  const token = rawAuthHeader.split(" ")[1];
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  
  return NextResponse.json({ ok: true, token });
};
