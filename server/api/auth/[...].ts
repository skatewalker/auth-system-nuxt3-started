import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'
//import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { Prisma, PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
const runtimeConfig = useRuntimeConfig()


const getUserByCredentials = async (username: string, email:string, password: string ) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    })
    if (!user) {
      return null
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    return isPasswordValid ? user : null
  } catch (error) {
    console.error("Error en la function getUserByCredentials")
  }
}

export default NuxtAuthHandler({
  secret: runtimeConfig.authSecret, //para encriptar los JWT
  //adapter: PrismaAdapter(prisma),
  // your authentication configuration here!
  providers: [
    // @ts-expect-error Import is exported on .default during
    CredentialsProvider.default({
      name: 'Credentials',
      credentials:{
        username: { label: "Username", type:"text" },
        email: { label: "Email", type:"text" },
        password: { label: "Parrword", type: 'password'}
      },
      authorize: async (credentials: any) => {
        const user = await getUserByCredentials(credentials.username, credentials.email, credentials.password)
        if (user) {
          return user
        }
        return null
      }
    })
  ]
})