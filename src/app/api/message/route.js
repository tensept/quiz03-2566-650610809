import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const roomId = request.nextUrl.searchParams.get("roomId");
  readDB();
  const room = DB.messages.filter((x) => x.roomId === roomId)
  const foundroom = DB.messages.findIndex((x)=> x.roomId === roomId) 
  if(foundroom === -1)
    return NextResponse.json(
      {
        ok: false,
        message: `Room is not found`,
      },
      { status: 404 }
    );
  
    return NextResponse.json(
      {
        ok: true,
        message: room,
      },
      { status: 200 }
    );
    
};

export const POST = async (request) => {
  const body = await request.json();
  readDB();
  const room = DB.messages.find((x) => x.roomId === body.roomId)
  if(body.roomId !== room.roomId)
    return NextResponse.json(
      {
        ok: false,
        message: `Room is not found`,
      },
      { status: 404 }
    );

  const messageId = nanoid();

  DB.messages.push({
    body,
    messageId,
  })

  writeDB();

  return NextResponse.json({
    ok: true,
    messageId,
    message: "Message has been sent",
  });
};

export const DELETE = async (request) => {
  const body = await request.json();
  const payload = checkToken();
  if(!payload)
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );

  readDB();
  const message = DB.messages.find((x) => x.messageId === body.messageId)
  if(!message)    
    return NextResponse.json(
      {
        ok: false,
        message: "Message is not found",
      },
      { status: 404 }
    );
    
  if(payload.role === "SUPER ADMIN"){
    DB.messages.splice(body,1)
  }
  writeDB();

  return NextResponse.json({
    ok: true,
    message: "Message has been deleted",
  });
};
