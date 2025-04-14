import AssignmentModel from "./model.js";

export const findAssignmentsForCourse = (courseId) =>
    AssignmentModel.find({ course: courseId });

export const createAssignment = (assignment) =>
    AssignmentModel.create(assignment);

export const updateAssignment = (aid, updates) =>
    AssignmentModel.updateOne({ _id: aid }, { $set: updates });

export const deleteAssignment = (aid) =>
    AssignmentModel.deleteOne({ _id: aid });

export const findAssignmentById = (aid) =>
    AssignmentModel.findById(aid);