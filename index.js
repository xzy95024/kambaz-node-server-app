import express from 'express';
import cors from 'cors';
import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';
import UserRoutes from '../kamabaz-react-web-app/src/Kambaz/Users/routes.js';
import session from "express-session";
import "dotenv/config";
import CourseRoutes from "../kamabaz-react-web-app/src/Kambaz/Courses/routes.js";
import EnrollmentRoutes from "../kamabaz-react-web-app/src/Kambaz/Enrollments/routes.js";
import ModuleRoutes from "../kamabaz-react-web-app/src/Kambaz/Courses/Modules/routes.js";
import AssignmentRoutes from "../kamabaz-react-web-app/src/Kambaz/Courses/Assignments/routes.js";

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
Lab5(app);
Hello(app);

app.listen(process.env.PORT || 4000);