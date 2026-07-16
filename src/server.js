require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

connectDB();
console.log(process.env.PORT)
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});