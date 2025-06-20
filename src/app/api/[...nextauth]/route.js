import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
const prisma = new PrismaClient()
export const authOptions = {

    providers :[
        CredentialsProvider ({
            name : "Credentials",
            credentials : {
                email : {label : "Email" , type : "text"},
                password : {label : "Password" , type : "password"}
            },

            async authorize (credentials){

                const user = await prisma.user.findUnique({
                    where : {email : credentials.email}
                })

                if(!user){
                    return null
                }
                else{
                    
                    const isValid = await bcrypt.compare(credentials.password, user.password)

                    if(!isValid){
                        return null

                    }
                    else{
                        return{
                            id : user.id,
                            email : user.email
                        }
                    }
                }

            }
        })
    ],

    session : {
        strategy : "jwt"
    },

    pages : {
        signIn : "/login",
    },

    secret : process.env.NEXTAUTH_SECRET
}


const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}