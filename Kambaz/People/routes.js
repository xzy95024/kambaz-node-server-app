export default function PeopleRoutes(app) {
    app.get("/api/courses/:cid/people", async (req, res) => {
        const courseId = req.params.cid;
        const users = await getUsers();         // 从你的后端 DB 中获取所有用户
        const enrollments = await getEnrollments(); // 所有选课记录

        const enrolledUsers = users.filter((user) =>
            enrollments.some((enroll) => enroll.user === user._id && enroll.course === courseId)
        );

        res.json(enrolledUsers);
    });
}