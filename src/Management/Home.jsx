import axios from 'axios';
import React, { Component } from 'react';
import StudentForm from './StudentForm';
import StudentList from './StudentList';
import {connect} from "react-redux"
import { fetchStudentListAction } from '../redux/actions/studentAction';
import Filter from './Filter';
class Home extends Component {
    fetchStudentList = async () => {
        const res = await axios({
            method: "GET",
            url: `https://63c63b30dcdc478e15bd64d9.mockapi.io/student`
        });
        this.props.dispatch(
            fetchStudentListAction(res.data)
        )
    }
    render() {
        return (
            <div className='container mt-2'>
                <StudentForm fetchStudentList={this.fetchStudentList} />
                <Filter/>
                <StudentList fetchStudentList={this.fetchStudentList}  />
            </div>
        );
    }
    componentDidMount() {
        {this.fetchStudentList()}
    }
}

export default connect()(Home)