import { NuxtAuthHandler } from '#auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const runtimeConfig = useRuntimeConfig();

// Simplified to only accept email and password, as username is not used for finding the user
const getUserByCredentials = async (email: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user || !user.password) { // Check if user or user.password is null/undefined
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : null;
  } catch (error) {
    console.error('Error en la function getUserByCredentials:', error); // Log the actual error
    return null; // Return null on error
  }
};

export default NuxtAuthHandler({
  secret: runtimeConfig.authSecret, //para encriptar los JWT
  //adapter: PrismaAdapter(prisma), // Uncomment if you want to use PrismaAdapter for sessions
  // your authentication configuration here!
  providers: [
    // @ts-expect-error Import is exported on .default during
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }, // Corrected typo 'Parrword'
      },
      authorize: async (credentials: any) => {
        // Ensure credentials are not null and have email/password
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const user = await getUserByCredentials(
          credentials.email,
          credentials.password,
        );

        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  // Add callbacks for session and JWT if needed for custom user data in session
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role; // Add user role to token
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role; // Add user role to session
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login', // Specify the login page
  },
});