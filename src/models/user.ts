export class User{
    id:string;
    name:string;
    first_name:string;
    last_name:string;
    username:string;
    email:string;
    telephone:string;
    cnib:string;
    password:string;
    password_confirmation?:string;
    pictureUrl:string;
    status:"ENABLE"|"DISABLE"="DISABLE";
    token?: string;
    occupation:string;
    physical_address:string;
    town:string;
    country:string;
    postal_code:string;
    s_first_name:string;
    s_last_name:string;
    s_town:string;
    s_country:string;
    s_postal_code:string;
    s_telephone:string;
    description:string;
}