import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    const body = await request.json();
    const { title, email } = body;
    try {
        const { id } = params;
        const user = await prisma.user.create({
            data: {
                email: email
                // other fields...
            }
        });

        const post = await prisma.post.update({
            where: {
                id
            },
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

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const post = await prisma.post.findUnique({
            where: {
                id
            }
        });
        return NextResponse.json(post);
    } catch (error) {
        console.log('Error geting post', error);
        return NextResponse.error();
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    console.log('params:', params);
    try {
        const { id } = params;
        const post = await prisma.post.delete({
            where: {
                id
            }
        });
        return NextResponse.json('post deleted');
    } catch (error) {
        console.log('Error geting post', error);
        return NextResponse.error();
    }
}
