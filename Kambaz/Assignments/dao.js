import {assignments} from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findAssignmentsForCourse(courseId) {
    return assignments.filter((a) => a.course === courseId);
}

export function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    assignments.push(newAssignment);
    return newAssignment;
}

export function updateAssignment(assignmentId, updates) {
    const assignment = assignments.find((a) => a._id === assignmentId);
    if (!assignment) return null;
    Object.assign(assignment, updates);
    return assignment;
}
export const findAssignmentById = (assignmentId) =>
    assignments.find((a) => a._id === assignmentId);
export function deleteAssignment(assignmentId) {
    const index = assignments.findIndex((a) => a._id === assignmentId);
    if (index === -1) return { status: "Not Found" };
    assignments.splice(index, 1);
    return { status: "OK" };
}