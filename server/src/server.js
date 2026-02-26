const {server} = require("./app");
const path = require("path");
const connectDB = require("./config/db.config");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
}

const PORT = process.env.PORT || 3000;

const init = async () => {
    try {

        await connectDB();

        console.log('✅ DATABASE CONNECTED SUCCESSFULLY!');

        server.listen(PORT, ()=>{
            console.log(`✅ Server is listening on port ${PORT}`);
        });

    } catch (error) { 
        console.error("❌ ERROR:- ",error);
        process.exit(1);
    }
};


init();