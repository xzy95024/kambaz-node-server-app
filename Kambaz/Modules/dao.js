import { modules } from "../Database/index.js";
import model from "./model.js";
import { v4 as uuidv4 } from "uuid";


export function findModulesForCourse(courseId) {
    console.log("🔍 Fetching modules for course:", courseId);
    // return modules.filter((module) => module.course === courseId);
    return model.find({ course: courseId });
}


export function createModule(module) {
    console.log("[createModule] received:", module);
    const newModule = { ...module, _id: uuidv4() };
    return model.create(newModule);
    // modules.push(newModule);
    // return newModule;
}


export function deleteModule(moduleId) {
    return model.deleteOne({ _id: moduleId });
    // const index = modules.findIndex((module) => module._id === moduleId);
    // if (index !== -1) {
    //     modules.splice(index, 1); //
    // }
}


export function updateModule(moduleId, moduleUpdates) {
    return model.updateOne({ _id: moduleId }, moduleUpdates);
}