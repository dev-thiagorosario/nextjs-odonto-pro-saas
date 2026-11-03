import { DefaultSession } from "next-auth";



declare module 'next-auth' {
  interface Sessio {
    user: User & DefaultSession['user']
  }

  interface User{
    id: string,
    name: string,
    email: string,
    emailVerified?: null | string | boolean;
    image?: string;
    stripe_costumer_id?: string;
    times: string[];
    address?: string;
    phone?: string;
    status: boolea;
    createdAt: string;
    updatedAt: string;
  }
}
