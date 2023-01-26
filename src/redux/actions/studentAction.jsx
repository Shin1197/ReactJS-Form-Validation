import { fetch_studentList, filter_students, selected_student } from "../types/studentTypes";

export const fetchStudentListAction = payload =>({
    type:fetch_studentList,
    payload
})

export const selectedStudentAction = payload =>({
    type:selected_student,
    payload
})
export const filterStudentsAction = payload =>({
    type:filter_students,
    payload
})