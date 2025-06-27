import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client'; // Importar PrismaClient
import { z } from 'zod'; // Importar z de zod

const prisma = new PrismaClient(); // Instanciar PrismaClient

// Definir el esquema de validación con Zod
const registerSchema = z.object({
  username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
  email: z.string().email('Formato de correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Validar el cuerpo de la solicitud con Zod
    const validatedData = registerSchema.parse(body); // Esto lanzará un error si la validación falla

    // Validamos si el usuario existe
    const existingUser = await prisma.user.findUnique({
      where: {
        email: validatedData.email, // Usar los datos validados
      },
    });

    if (existingUser) {
      return {
        statusCode: 400,
        body: {
          error: 'EMAIL_EXISTS',
          message: 'El correo electrónico ya está en uso',
        },
      };
    }

    // Hash Pass with Bcrypt
    const hashedPassword = await bcrypt.hash(validatedData.password, 12); // Usar los datos validados

    // Create user with Prisma ORM
    const newUser = await prisma.user.create({
      data: {
        name: validatedData.username,
        username: validatedData.username,
        email: validatedData.email,
        password: hashedPassword,
        // Asegúrate de que los campos 'role' y 'status' tengan valores por defecto o se proporcionen aquí
        // Según tu schema.prisma, tienen valores por defecto, así que no es necesario proporcionarlos explícitamente aquí
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

    // Manejo de errores de Zod
    if (error instanceof z.ZodError) {
      return {
        statusCode: 400,
        body: {
          error: 'VALIDATION_ERROR',
          message: error.errors.map((err) => err.message).join(', '),
        },
      };
    }

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
  } finally {
    await prisma.$disconnect(); // Desconectar Prisma al finalizar
  }
});