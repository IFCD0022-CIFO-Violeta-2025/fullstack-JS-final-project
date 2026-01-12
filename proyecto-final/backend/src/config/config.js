import 'dotenv/config'

const config = {

    api_port: process.env.API_PORT,
    db_host: process.env.DB_HOST,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASS,
    db_name: process.env.DB_NAME,
    db_port: process.env.DB_PORT,

    // CONFIGURACION CORREO
    email_host: process.env.EMAIL_HOST,
    email_port: process.env.EMAIL_PORT,
    email_secure: process.env.EMAIL_SECURE, //.toUpperCase()==='TRUE' ? true : false,
    email_user: process.env.EMAIL_USER,
    email_password: process.env.EMAIL_PASSWORD,
    email_link_confirm: process.env.EMAIL_LINK_CONFIRM,
    email_from_confirm: process.env.EMAIL_FROM_CONFIRM,
    email_from_mailing: process.env.EMAIL_FROM_MAILING

}

export default config
