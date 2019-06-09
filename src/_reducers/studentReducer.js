import {CREATE_STUDENT, UPDATE_STUDENT, DELETE_STUDENTS} from './../_actionTypes/studentsActionTypes';

let initialState = {
    studentsArray : []
}
//an array element would be an object with student info

const studenReducer = ( state = initialState, action) => {

    switch (action.type) {
        case CREATE_STUDENT:
            return {
                studentsArray : [...state.studentsArray, action.student]
            }

        case UPDATE_STUDENT:
            let newStudentsArray = state.studentsArray.map((student, index) => {
                if(student.email === action.updatedStudent.email) {
                    return action.updatedStudent
                }
                return student;
            });
            return {
                studentsArray : newStudentsArray
            } 

        case DELETE_STUDENTS:
            let newArr = state.studentsArray.filter((student, index) => {
                let exists = false;
                exists = action.deletionArr.some((id) => {
                    if(id === student.email) {
                        return true;
                    }
                })
                return !exists;
            })
            return {
                studentsArray : newArr
            }

        default:
            return state;
    }
    
}

export default studenReducer;