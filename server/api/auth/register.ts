import bcrypt from 'bcrypt';
import prisma from '@prisma/client';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    //Validamos campos
    if (!body.username || !body.email || !body.password) {
      return {
        statusCode: 400,
        body: {
          error: 'INVALID_EMAIL',
          message: 'Todos los campos son obligatorios',
        },
      };
    }

    // Validamos si el usuario existe
    const existingUSer = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (existingUSer) {
      return {
        statusCode: 400,
        body: {
          error: 'EMAIL_EXISTS',
          message: 'El correo electrónico ya está en uso',
        },
      };
    }

    // Hash Pass with Bcrypt
    const haschedPassword = await bcrypt.hash(body.password, 12);

    // Create user with Prisma ORM
    const newUser = await prisma.user.create({
      data: {
        name: body.username,
        username: body.username,
        email: body.email,
        password: haschedPassword,
      },
    });

    return {
      statusCode: 201,
      body: {
        message: 'Usuario registrado con éxito',
        newUser,
      },
    };
  } catch (error) {
    console.error('Error en el registro api/auth/register:', error);

    if (error.code === 'P2002') {
      return {
        statusCode: 400,
        body: {
          error: 'EMAIL_EXISTS',
          message: 'El correo electrónico ya está en uso',
        },
      };
    }
    return {
      statusCode: 500,
      body: {
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Error interno del servidor',
      },
    };
  }
});
