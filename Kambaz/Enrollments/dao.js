import { enrollments } from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function enrollUserInCourse(userId, courseId) {
    const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
    enrollments.push(newEnrollment);
    return newEnrollment; // ✅ 别忘了 return
}

export function unenrollUserFromCourse(userId, courseId) {
    const uid = String(userId);
    const cid = String(courseId);
    console.log("⬅️  Unenroll Request Received:");
    console.log("User:", uid);
    console.log("Course:", cid);
    console.log("Current Enrollments:", enrollments);

    const index = enrollments.findIndex(
        (e) => String(e.user) === uid && String(e.course) === cid
    );

    console.log("Found Index:", index);

    if (index !== -1) {
        enrollments.splice(index, 1);
        console.log("✅ Enrollment removed");
        return { status: "success" };
    } else {
        console.warn("❌ Unenroll failed: enrollment not found");
        return { status: "not found" };
    }
}
