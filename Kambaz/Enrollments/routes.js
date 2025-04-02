import * as dao from "./dao.js";
export default function EnrollmentRoutes(app) {
    app.post("/api/enrollments", (req, res) => {
        const { user, course } = req.body;
        const enrollment = dao.enrollUserInCourse(user, course);
        res.json(enrollment);
    });

    app.delete("/api/enrollments/:userId/:courseId", (req, res) => {
        const { userId, courseId } = req.params;
        const status = dao.unenrollUserFromCourse(userId, courseId);
        res.json(status);
    });

}