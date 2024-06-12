const app = require("./app");

const port = process.env.port || 3000;

app.listen(process.env.PORT, () => {
    console.log(`server körs på port ${port}`);
});