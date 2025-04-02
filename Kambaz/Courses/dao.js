import courses from "../Database/courses.js";
import {enrollments} from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

console.log(Object.isFrozen(courses));
export function findAllCourses() {
    return courses;
}
export function updateCourse(courseId, courseUpdates) {
    console.log("🛠️ Incoming courseId:", courseId);
    console.log("🧾 All course IDs:", courses.map(c => c._id));
    const course = courses.find((course) => course._id === courseId);
    if (!course) return null;
    Object.assign(course, courseUpdates);
    return course;
}

export function findCoursesForEnrolledUser(userId) {
    const enrolledCourses = courses.filter((course) =>
        enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
    return enrolledCourses;
}
export function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    courses.push(newCourse);
    return newCourse;
}

export function deleteCourse(courseId) {
    const index = courses.findIndex((c) => c._id === courseId);
    if (index === -1) return { status: "Not Found" };

    courses.splice(index, 1);
    for (let i = enrollments.length - 1; i >= 0; i--) {
        if (enrollments[i].course === courseId) {
            enrollments.splice(i, 1);
        }
    }

    console.log("✅ Deleted course:", courseId);
    return { status: "OK" };
}
