// Authentication endpoints for user login and registration

import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { prisma } from '../../../lib/prisma';

// User Registration
export async function POST(req) {
    const body = await req.json();
    const { username, password } = body;

    // Validate input
    const schema = z.object({
        username: z.string().min(1),
        password: z.string().min(6),
    });
    try {
        schema.parse({ username, password });
    } catch (err) {
        return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    const user = await prisma.user.create({
        data: { username, password: hashedPassword }
    });

    return NextResponse.json({ message: "User created successfully", userId: user.id }, { status: 201 });
}

// User Login
export async function POST_login(req) {
    const body = await req.json();
    const { username, password } = body;

    // Validate input
    const schema = z.object({
        username: z.string().min(1),
        password: z.string().min(6),
    });
    try {
        schema.parse({ username, password });
    } catch (err) {
        return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Find user in database
    const user = await prisma.user.findUnique({
        where: { username }
    });
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful", userId: user.id }, { status: 200 });
}