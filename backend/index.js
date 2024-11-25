import express from "express";

const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());
app.use("*", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
})

app.get("/api", (req, res) => {
    res.send("Hello World from the Server");
});

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});