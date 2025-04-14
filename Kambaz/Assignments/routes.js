// import * as dao from "./dao.js";
//
// export default function AssignmentRoutes(app) {
//     app.get("/api/courses/:courseId/assignments", (req, res) => {
//         const { courseId } = req.params;
//         const result = dao.findAssignmentsForCourse(courseId);
//         res.send(result);
//     });
//
//     app.post("/api/courses/:courseId/assignments", (req, res) => {
//         const { courseId } = req.params;
//         const assignment = { ...req.body, course: courseId };
//         const created = dao.createAssignment(assignment);
//         res.send(created);
//     });
//
//     app.put("/api/assignments/:assignmentId", (req, res) => {
//         const { assignmentId } = req.params;
//         const updated = dao.updateAssignment(assignmentId, req.body);
//         if (!updated) {
//             res.status(404).send({ message: "Assignment not found" });
//         } else {
//             res.send(updated);
//         }
//     });
//     app.get("/api/assignments/:assignmentId", (req, res) => {
//         const { assignmentId } = req.params;
//         const assignment = dao.findAssignmentById(assignmentId); // 你需要在 dao.js 中添加这个方法
//         if (!assignment) {
//             res.status(404).send({ message: "Assignment not found" });
//         } else {
//             res.send(assignment);
//         }
//     });
//     app.delete("/api/assignments/:assignmentId", (req, res) => {
//         const { assignmentId } = req.params;
//         const result = dao.deleteAssignment(assignmentId);
//         res.send(result);
//     });
// }
import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {

    function parseDateSafe(value) {
        const parsed = new Date(value);
        return isNaN(parsed.getTime()) ? undefined : parsed;
    }

    app.get("/api/courses/:courseId/assignments", async (req, res) => {
        const { courseId } = req.params;
        const result = await dao.findAssignmentsForCourse(courseId);
        res.send(result);
    });

    app.post("/api/courses/:courseId/assignments", async (req, res) => {
        const { courseId } = req.params;
        const assignment = {
            ...req.body,
            course: courseId,
            availability: parseDateSafe(req.body.availability),
            due_date: parseDateSafe(req.body.due_date),
        };
        const created = await dao.createAssignment(assignment);
        res.send(created);
    });

    app.put("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const updates = {
            ...req.body,
            availability: parseDateSafe(req.body.availability),
            due_date: parseDateSafe(req.body.due_date),
        };
        const updated = await dao.updateAssignment(assignmentId, updates);
        if (!updated) {
            res.status(404).send({ message: "Assignment not found" });
        } else {
            res.send(updated);
        }
    });


    app.get("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const assignment = await dao.findAssignmentById(assignmentId);
        if (!assignment) {
            res.status(404).send({ message: "Assignment not found" });
        } else {
            res.send(assignment);
        }
    });

    app.delete("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const result = await dao.deleteAssignment(assignmentId);
        res.send(result);
    });
}
