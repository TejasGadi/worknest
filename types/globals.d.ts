import { User } from "./types";

export {}

declare global 
{
    interface CustomJwtSessionClaims{
        fullname: string;
        email: string;
        image: string;
    }
}