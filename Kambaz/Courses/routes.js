import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
export default function CourseRoutes(app) {
    app.get("/api/courses", (req, res) => {
        const courses = dao.findAllCourses();
        res.send(courses);
    });
    app.delete("/api/courses/:cid", (req, res) => {
        const { cid } = req.params;
        console.log("DELETE /api/courses/:cid called with cid =", cid);
        const status = dao.deleteCourse(cid);
        res.json(status);
    });

    app.put("/api/courses/:courseId", (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        const updatedCourse = dao.updateCourse(courseId, courseUpdates);

        if (!updatedCourse) {
            res.status(404).send({ message: "Course not found" });
        } else {
            res.send(updatedCourse);
        }
    });
    app.get("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const modules = modulesDao.findModulesForCourse(courseId);
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

}
