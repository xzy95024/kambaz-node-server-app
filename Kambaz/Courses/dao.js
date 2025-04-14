// // import courses from "../Database/courses.js";
// import {enrollments} from "../Database/index.js";  //这里需要改进！！！！！！
import model from "./model.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
import { v4 as uuidv4 } from "uuid";



export function findAllCourses() {
    return model.find();
}
export function updateCourse(courseId, courseUpdates) {
    console.log(" Incoming courseId:", courseId);
    // console.log(" All course IDs:", courses.map(c => c._id));
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}

// export function findCoursesForEnrolledUser(userId) {
//     const enrolledCourses = courses.filter((course) =>
//         enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
//     return enrolledCourses;
// }
export function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    return model.create(newCourse);
}
export function deleteCourse(courseId) {
    return model.deleteOne({ _id: courseId });
}
// export function deleteCourse(courseId) {
//     const index = courses.findIndex((c) => c._id === courseId);
//     if (index === -1) return { status: "Not Found" };
//
//     courses.splice(index, 1);
//     for (let i = enrollments.length - 1; i >= 0; i--) {
//         if (enrollments[i].course === courseId) {
//             enrollments.splice(i, 1);
//         }
//     }
//
//     console.log("✅ Deleted course:", courseId);
//     return { status: "OK" };
// }
