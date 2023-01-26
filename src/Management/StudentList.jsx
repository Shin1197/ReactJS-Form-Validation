import axios from 'axios';
import React, { Component } from 'react';
import { connect } from "react-redux"
import { selectedStudentAction } from '../redux/actions/studentAction';
import StudentForm from './StudentForm';
class StudentList extends Component {
    handleDelete = async (id) => {
        try {
            await axios({
                method: "DELETE",
                url: `https://63c63b30dcdc478e15bd64d9.mockapi.io/student/${id}`
            });
            this.props.fetchStudentList();
        }
        catch (err) {
            console.log(err)
        }
    }
    handleSelect = async (id) => {
        try {
            const res = await axios({
                method: "GET",
                url: `https://63c63b30dcdc478e15bd64d9.mockapi.io/student/${id}`
            });
            this.props.dispatch(
                selectedStudentAction(res.data)
            )

        }
        catch (err) {
            console.log(err)
        }
    }
    render() {
        return (
            <div>
                <table className="table text-center mt-4" style={{ lineHeight: "40px" }}>
                    <thead className='bg-dark text-light'>
                        <tr>
                            <th>Mã</th>
                            <th>Họ tên</th>
                            <th>Sdth</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>
                                <button className="btn btn-primary">Chỉnh sửa</button>
                                <button className="btn btn-danger ms-2">Xóa</button>
                            </td>
                        </tr> */}
                        {this.props.filterStudentList.length > 0 ? 
                        this.props.filterStudentList.map(item =>
                            <tr key={item.id}>
                                <td>{item.idStudent}</td>
                                <td>{item.fullname}</td>
                                <td>{item.phone}</td>
                                <td>{item.email}</td>
                                <td>
                                    <button
                                        onClick={() => this.handleSelect(item.id)}
                                        className="btn btn-primary">Chỉnh sửa</button>
                                    <button
                                        onClick={() => this.handleDelete(item.id)}
                                        className="btn btn-danger ms-2">Xóa</button>
                                </td>
                            </tr>
                        ):
                        this.props.studentList.map(item =>
                            <tr key={item.id}>
                                <td>{item.idStudent}</td>
                                <td>{item.fullname}</td>
                                <td>{item.phone}</td>
                                <td>{item.email}</td>
                                <td>
                                    <button
                                        onClick={() => this.handleSelect(item.id)}
                                        className="btn btn-primary">Chỉnh sửa</button>
                                    <button
                                        onClick={() => this.handleDelete(item.id)}
                                        className="btn btn-danger ms-2">Xóa</button>
                                </td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
  
}

export default connect(state => ({
    studentList: state.studentReducer.studentList,
    filterStudentList: state.studentReducer.filterStudentList,
}))(StudentList)