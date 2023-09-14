import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Waenkaew Phimsena",
    studentId: "650610809",
  });
};
