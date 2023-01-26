
import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux'
class StudentForm extends Component {
    state = {
        values: {
            fullname: "",
            email: "",
            phone: "",
            idStudent: "",
        },
        errors: {
            fullname: "",
            email: "",
            phone: "",
            idStudent: "",
        },
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            values: {
                ...this.state.values,
                [name]: value
            }
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        // check validaiton
        const { values } = this.state;
        const validationErrors = {};
        for (const key in values) {
            const error = this.validation(key, values[key]);
            if (error) validationErrors[key] = error
        }
        if (Object.keys(validationErrors).length > 0) {
            this.setState({
                errors: {
                    ...this.state.errors,
                    ...validationErrors
                }
            })
            return
        }
        const { id, ...payload } = values;
        try {
            if (id) {
                await axios({
                    method: "PUT",
                    url: `https://63c63b30dcdc478e15bd64d9.mockapi.io/student/${id}`,
                    data: payload
                });
            } else {
                await axios({
                    method: "POST",
                    url: `https://63c63b30dcdc478e15bd64d9.mockapi.io/student`,
                    data: payload
                });
            }
            console.log(payload)
            this.props.fetchStudentList();
         
            this.setState({
                values: {
                    fullname: "",
                    email: "",
                    phone: "",
                    idStudent: "",
                },
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    handleBlur = (e) => {
        const { name, value } = e.target;
        this.setState({
            errors: {
                ...this.state.errors,
                [name]: this.validation(name, value)
            }
        })
    }
    validation = (name, value) => {
        switch (name) {
            case "idStudent": {
                if (!value) return "Mã học sinh không được bỏ trống"

                return ""
            }
            case "fullname": {
                if (!value) return "Họ tên không được bỏ trống"
                // if (!/[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u.test(value)) return "Tên không hợp lệ"
                return ""
            }
            case "phone": {
                if (!value) return "Số điện thoại không được bỏ trống"
                // if(!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(value)) return "Số điện thoại không hợp lệ"
                return ""
            }
            case "email": {
                if (!value) return "Email không được bỏ trống"
                // if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) return "Email không đúng định dạng"
                return ""
            }
        }
    }
    render() {
        const { values, errors } = this.state;
        return (
            <div className='card'>
                <div className="card-header bg-dark text-light">
                    <h3>Thông tin sinh viên</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit} action="">
                        <div className="row">
                            <div className="col-6 mb-3">
                                <span>Mã SV</span>
                                <input type="text" className="form-control" name="idStudent" value={values.idStudent} onChange={this.handleChange} onBlur={this.handleBlur} />
                                {errors.idStudent && <span className='text-danger'>{errors.idStudent}</span>}
                            </div>
                            <div className="col-6 mb-3">
                                <span>Họ tên</span>
                                <input type="text" className="form-control" name="fullname" value={values.fullname} onChange={this.handleChange} onBlur={this.handleBlur} />
                                {errors.fullname && <span className='text-danger'>{errors.fullname}</span>}
                            </div>
                            <div className="col-6 mb-3">
                                <span>Số điện thoại</span>
                                <input type="text" className="form-control" name="phone" value={values.phone} onChange={this.handleChange} onBlur={this.handleBlur} />
                                {errors.phone && <span className='text-danger'>{errors.phone}</span>}
                            </div>
                            <div className="col-6 mb-3">
                                <span>Email</span>
                                <input type="text" className="form-control" name="email" value={values.email} onChange={this.handleChange} onBlur={this.handleBlur} />
                                {errors.email && <span className='text-danger'>{errors.email}</span>}
                            </div>
                        </div>
                        <button className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
    componentDidUpdate(preProps) {
        const { selectedStudent } = this.props;
        if (selectedStudent && selectedStudent !== preProps.selectedStudent) {
            this.setState({
                values: selectedStudent
            })
        }
    }
}
export default connect(state => ({
    selectedStudent: state.studentReducer.selectedStudent,
  

}))(StudentForm)