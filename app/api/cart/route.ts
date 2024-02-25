import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    try {
        const body = await request.json()
        const {postId, userId} = body
        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            }
        })
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if(!post || !user) return NextResponse.json('Post or User not found');

        const cartEntry = await prisma.cart.create({
            data: {
                postId: post.id,
                userId: user.id
            }
        });
        console.log(cartEntry, 'cartEntry');
        console.log(post, user, 'post user');
        
        return NextResponse.json(cartEntry);
    } catch (error) {
       return NextResponse.error()
    }
}

export async function GET() {
    try {
        const cart = await prisma.cart.findMany();
        return NextResponse.json(cart);
    } catch (error) {
        console.log('Error geting cart post', error);
        return NextResponse.error();
    }
}