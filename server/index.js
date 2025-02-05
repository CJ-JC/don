import app from "./app.js";

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Le serveur est lancé sur le port ${PORT}`);
});
