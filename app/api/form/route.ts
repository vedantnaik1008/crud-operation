import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const { title, email } = body;
    try {
   const user = await prisma.user.create({
       data: {
           email: email
           // other fields...
       }
   });

   const post = await prisma.post.create({
       data: {
           title: title,
           userId: user.id
           // other fields...
       }
   });

        return NextResponse.json(post);
    } catch (error) {
        console.log('Error adding product to cart', error);
        return NextResponse.error();
    }
}

export async function GET() {
    try {
        const post = await prisma.post.findMany()
        return NextResponse.json(post)
    } catch (error) {
        console.log('Error geting post', error);
        return NextResponse.error();
    }

}

export async function DELETE(
    request: Request
) {
    try {
        const post = await prisma.post.deleteMany();
        return NextResponse.json('post deleted');
    } catch (error) {
        console.log('Error geting post', error);
        return NextResponse.error();
    }
}