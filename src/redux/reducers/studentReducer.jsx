import { produce } from "immer"
import { fetch_studentList, filter_students, selected_student } from "../types/studentTypes"
const initialState = {
    studentList : [],
    selectedStudent : null,
    filterStudentList : []
}
export const studentReducer = (state = initialState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case fetch_studentList: {
                draft.studentList = action.payload;
            }
            case selected_student:{
                draft.selectedStudent = action.payload;
            }
            case filter_students:{
                draft.filterStudentList = action.payload;
                console.log("state",state.filterStudentList)
            }
        }
    })
}