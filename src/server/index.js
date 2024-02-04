import express from "express"
import bodyParser from "body-parser"
import bcrypt from "bcrypt"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import morgan from "morgan"
import mongoose from "mongoose"
import path from "path"
//helps set up the paths when we configure directories
import { fileURLToPath } from "url"
import helmet from "helmet"
import { log } from "console"

/*CONFIGURATIONS FOR MIDDLEWARE AND OTHER PACKAGES */
//grabs file url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//to use dot.env files
dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
//limit: controls the maximum request body size
app.use(bodyParser.json({limit: "30mb", extended: true}));
//help store files locally
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    },

})

const upload = multer({storage});

const PORT = process.env.PORT || 6001;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: false,
    useUnifiedTopology : false,
}).then(()=>{
    app.listen(PORT, ()=>{console.log(`server listening on ${PORT}`)})
}).catch((error)=>{
    console.log(`${error} didn't work`)
}) 
