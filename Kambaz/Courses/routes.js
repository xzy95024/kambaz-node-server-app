import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {


    app.get("/api/courses", async (req, res) => {
        const courses = await dao.findAllCourses();
        res.send(courses);
    });

    app.delete("/api/courses/:cid", async  (req, res) => {
        const { cid } = req.params;
        console.log("DELETE /api/courses/:cid called with cid =", cid);
        await enrollmentsDao.deleteEnrollmentsForCourse(cid);
        const status = await dao.deleteCourse(cid);
        res.json(status);
    });

    app.put("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        const updatedCourse = await dao.updateCourse(courseId, courseUpdates);

        if (!updatedCourse) {
            res.status(404).send({ message: "Course not found" });
        } else {
            res.send(updatedCourse);
        }
    });
    app.get("/api/courses/:courseId/modules",  async (req, res) => {
        console.log("🔍 API call for modules of course:", req.params.courseId);
        const { courseId } = req.params;
        const module = {
            ...req.body,
            course: courseId,
        };

        const modules = await modulesDao.findModulesForCourse(courseId);
        res.json(modules);
    });
    app.post("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const module = {
            ...req.body,
            course: courseId,
        };
        const newModule = modulesDao.createModule(module);
        res.send(newModule);
    });
    app.post("/api/courses", async (req, res) => {
        const course = await dao.createCourse(req.body);
        const currentUser = req.session["currentUser"];
        if (currentUser) {
            await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);

        }
        res.json(course);

    });
    app.get("/api/courses/:cid/users", async (req, res) => {
        const { cid } = req.params;
        const users = await enrollmentsDao.findUsersForCourse(cid);
        res.json(users);
    });

}
