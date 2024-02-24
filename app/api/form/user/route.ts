import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const post = await prisma.user.findMany();
        return NextResponse.json(post);
    } catch (error) {
        console.log('Error geting post', error);
        return NextResponse.error();
    }
}
