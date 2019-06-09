import { UPDATE_STUDENT, CREATE_STUDENT, DELETE_STUDENTS } from "../_actionTypes/studentsActionTypes";

export function updateStudent(updatedStudent) {
    return {
        type : UPDATE_STUDENT,
        updatedStudent
    }
}

export function createStudent(student) {
    return {
        type : CREATE_STUDENT,
        student
    }
}

export function deleteStudents(deletionArr) {
    return {
        type : DELETE_STUDENTS,
        deletionArr
    }
}