import express from 'express';
import cors from 'cors';
import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';
import UserRoutes from './Kambaz/Users/routes.js';
import session from "express-session";
import "dotenv/config";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import PeopleRoutes from "./Kambaz/People/routes.js"
import mongoose from 'mongoose';
import  EnrollmentModel from "./Kambaz/Enrollments/model.js"
import  CourseModel from "./Kambaz/Courses/model.js"
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);
const app = express();



//  Register middleware FIRST
app.use(
    cors({
        credentials: true,
        origin: process.env.NETLIFY_URL || "http://localhost:5173",
    })
);

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));


app.use(express.json());
app.use((req, res, next) => {
    console.log(`📥 Incoming request: ${req.method} ${req.url}`);
    next();
});
//  Then register routes
UserRoutes(app);
CourseRoutes(app);
EnrollmentRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
PeopleRoutes(app);
Lab5(app);
Hello(app);

app.get("/debug", async (req, res) => {
    const currentUser = req.session["currentUser"];
    const enrollments = await EnrollmentModel.find();
    const courses = await CourseModel.find();
    res.json({ currentUser, enrollments, courses });
});

app.listen(process.env.PORT || 4000);