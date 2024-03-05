import { connect } from "mongoose";
import app from "./app.js";
import { PORT,DBURL } from "./secret.js";


app.listen(PORT,async()=>{
    console.log(`Server Started At ${PORT}`);
    try {
        await connect(DBURL);
        console.log('Database Connected');
    } catch (error) {
        console.error('Error While Connecting Database: ', error.message);
    }
});