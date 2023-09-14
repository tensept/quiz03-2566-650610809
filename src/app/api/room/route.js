import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async () => {
  // const roomId = request.nextUrl.searchParams.get("roomId");
  // const roomName = request.nextUrl.searchParams.get("roomName");
  readDB();
  //const room = DB.rooms.find((x)=> x.roomName === room)
  return NextResponse.json({
    ok: true,
    rooms: DB.rooms
    //totalRooms:
  });
};

export const POST = async (request) => {
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
  const roomName = request.nextUrl.searchParams.get("roomName");
  const room = DB.rooms.find((x)=> x.roomName === roomName)
  if(room)
    return NextResponse.json(
      {
        ok: false,
        message: `Room ${"replace this with room name"} already exists`,
      },
      { status: 400 }
    );

  const roomId = nanoid();



  //call writeDB after modifying Database
  writeDB();

  return NextResponse.json({
    ok: true,
    roomId,
    message: `Room ${"replace this with room name"} has been created`,
  });
};
