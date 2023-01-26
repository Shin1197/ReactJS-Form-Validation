import axios from 'axios';
import React, { Component } from 'react'
import { connect } from "react-redux"
import { filterStudentsAction } from '../redux/actions/studentAction';
class Filter extends Component {
    handleChange = async (e) => {
        let keyword = e.target.value.trim().toLowerCase();
        let filterStudents = [];
        try {
            const res = await axios({
                method: "GET",
                url: `https://63c63b30dcdc478e15bd64d9.mockapi.io/student`
            });
            for (let object of res.data) {
                if (object.idStudent.toLowerCase().includes(keyword)) {
                    filterStudents.push(object)
                }
            }
            this.props.dispatch(
                filterStudentsAction(filterStudents)
            )
            console.log(filterStudents)
        } catch (err) {
            console.log(err)
        }

    }
    render() {
        return (
            <div>
                <span>Tìm sinh viên</span>
                <input
                    onChange={this.handleChange}
                    type="text" className="form-control w-25" />
            </div>
        )
    }
}
export default connect()(Filter)