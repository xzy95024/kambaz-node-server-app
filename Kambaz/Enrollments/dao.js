import model from "./model.js";
import CourseModel from "../Courses/model.js";
import { v4 as uuidv4 } from "uuid";
export async function findCoursesForUser(userId) {
    console.log("🔍 Looking up enrollments for user:", userId);
    const enrollments = await model.find({ user: userId });  // 不要 populate
    console.log("🧾 Raw enrollments:", enrollments);
    const courseIds = enrollments.map((e) => e.course);
    console.log("🎯 courseIds to find:", courseIds);
    const courses = await CourseModel.find({ _id: { $in: courseIds } });
    return courses;
}

export function enrollUserInCourse(userId, courseId) {
    console.log("✅ Enrolling:", userId, "in course:", courseId);
    if (!userId || !courseId) {
        console.warn("❌ Cannot enroll user - missing userId or courseId", { userId, courseId });
        return;
    }
    const newEnrollment = {
        _id: uuidv4(),
        user: userId,
        course: courseId,
        enrollmentDate: new Date(),
    };
    return model.create(newEnrollment);
}

export async function unenrollUserFromCourse(userId, courseId) {
    const result = await model.deleteOne({ user: userId, course: courseId });
    if (result.deletedCount === 1) {
        console.log("✅ Enrollment removed from MongoDB");
        return { status: "success" };
    } else {
        console.warn("❌ Unenroll failed: enrollment not found");
        return { status: "not found" };
    }
}
export async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
}

export async function deleteEnrollmentsForCourse(courseId) {
    const result = await model.deleteMany({ course: courseId });
    console.log(`🧹 Deleted ${result.deletedCount} enrollments for course ${courseId}`);
    return result;
}