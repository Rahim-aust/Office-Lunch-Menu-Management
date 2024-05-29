import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "12345",
    database: "lunch_menu_db"
});


client.connect(err => {
    if (err) {
        console.error('connection error', err.stack);
    } else {
        console.log('Connected');
    }
});

export default client;

