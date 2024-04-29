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
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js"
import verifyToken from "./middleware/auth.js"


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

app.get("/details", (req,res)=>{
res.status(200).send("This are the details")
})

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

/* ROUTE WITH FILES */
//middleware
app.post("/auth/register", upload.single("picture"), register)
app.post("/posts",verifyToken, upload.single("picture"), createPost)

/* ROUTE FOR LOGIN */
app.use("/auth", authRoutes);

/* USERS ROUTES:
            1.Users profile
            2.Users followers
            3. Users posts
            */
app.use("/users", userRoutes);
app.use("/posts", postRoutes)
console.log("conn " + process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology : true,
}).then(()=>{
    app.listen(PORT, ()=>{console.log(`server listening on ${PORT}`)})
}).catch((error)=>{
    console.log(`${error} didn't work`)
}) 
