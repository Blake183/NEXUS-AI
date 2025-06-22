




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUhGcUF1WlR4SGJtZXg1bExuMFJPeklYaVVNc1FjbDFUUG1sSTJneENWQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiemp2UE1GNUZYOE5GNHh6cU5QZzI3NlhJZ2FnZko4akkrblNNMzI4QlRsYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvUGpwMFQ1QStFazUrc3RHWGExdU1JWE91OHlYMjJtVERGQ2lVTE5MZDJvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyQ21YTnZTdnV2TmprVzBEQXgvN1VOZEVZRXdQWHJxRm4xRFZieHg3SXpRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdJV3JmZDl1eEh1MVlqMGxXQ2pVSUV6L3NUL3FuZk1uOWF5RFgrTzJzRzg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFMZUxsdWF1cFQxdzJpNUZybUsraHRiT2xwbjYzM3g3K3Jkb3NsbWk3elU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUY4UGdwNGNNd25mR0JqTGtIOEhraytMUzVlQnNibXN6NDNUQTNqNWVHWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0NmMzVmaXI3Y3VwQ2JFMVA1ZWh2d0dyblZsY1lseU9Ra2Z3bTQ5dTJHaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBSL2hDY2paUWQxbUpCMis2OHAzNXhZek1IajN5OE9qWEJxbjB2bGVJR3R6eVUzSHBJbmtlNW05dE92dnE2SHJET3NWZzZ4VGQ2UFVQY1RrdksxZmdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjAwLCJhZHZTZWNyZXRLZXkiOiJzdDJubFJlWndLSlBCNDMzQlNtVjNySGdlRk93U1B6WmdHa1g2b1RGWmU0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc5MjA0OTI0OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI4MDk0NjNGMTk1QzBBNjk2RkIzMUVBNzM1MzRCRjE5NCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUwNTc5OTg2fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3OTIwNDkyNDhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMUFBQTg0NDQ2NEE4OThDMkQwQzFDMzQ1QUYxMUQzMTAifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MDU3OTk4OH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiODVSTVRYM1YiLCJtZSI6eyJpZCI6IjI1NDc5MjA0OTI0ODoyMEBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjIwMjk2MzE1OTEwNTYxNzoyMEBsaWQiLCJuYW1lIjoiRGFubnkgQndveSDwn5mP8J+Zj/CfmY8ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ052czBLMERFUG4xM3NJR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Imc1b21KWktoaXB1ZkZSV0x4UVEzZW9MTHh4VFhWelNCb1hwbytiRERGeEU9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkNSTVEwN0FFQ3M4ejd6d0tlSVhoR3ZZUDhOWERFaXJqM1NpSDhGc3pQRGpYOTY4WWt3RDlRRGNvUjBnYmZKa1ljWUNNN05icm1xWUxJc1c0cVdYY0FBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI0N1pZc2NDczZadGoxNG1hZUFtMUJvUmhOOGVSRk51Vm9DSVAzZU1JQ3R6dmtlalVrdldLaW5MMk5OdjVsdWxOTmVyNzNUSWZiMjN4Mm41YkVXbEdqdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc5MjA0OTI0ODoyMEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZT2FKaVdTb1lxYm54VVZpOFVFTjNxQ3k4Y1UxMWMwZ2FGNmFQbXd3eGNSIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQTBJRWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTA1Nzk5NzUsImxhc3RQcm9wSGFzaCI6IjJWNzdxVSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTk9DIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "254710772666",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
