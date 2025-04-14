import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    _id: String,
    title: String,
    course: { type: String, ref: "CourseModel" },  // 关联课程 ID
    modules: String,
    availability: Date,
    due_date: Date,
    points: String
}, { collection: "assignments" });
export default assignmentSchema;