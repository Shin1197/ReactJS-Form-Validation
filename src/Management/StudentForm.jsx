
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
                if (!value) return "M?? h???c sinh kh??ng ???????c b??? tr???ng"

                return ""
            }
            case "fullname": {
                if (!value) return "H??? t??n kh??ng ???????c b??? tr???ng"
                // if (!/[^a-z0-9A-Z_???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????]/u.test(value)) return "T??n kh??ng h???p l???"
                return ""
            }
            case "phone": {
                if (!value) return "S??? ??i???n tho???i kh??ng ???????c b??? tr???ng"
                // if(!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(value)) return "S??? ??i???n tho???i kh??ng h???p l???"
                return ""
            }
            case "email": {
                if (!value) return "Email kh??ng ???????c b??? tr???ng"
                // if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) return "Email kh??ng ????ng ?????nh d???ng"
                return ""
            }
        }
    }
    render() {
        const { values, errors } = this.state;
        return (
            <div className='card'>
                <div className="card-header bg-dark text-light">
                    <h3>Th??ng tin sinh vi??n</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit} action="">
                        <div className="row">
                            <div className="col-6 mb-3">
                                <span>M?? SV</span>
                                <input type="text" className="form-control" name="idStudent" value={values.idStudent} onChange={this.handleChange} onBlur={this.handleBlur} />
                                {errors.idStudent && <span className='text-danger'>{errors.idStudent}</span>}
                            </div>
                            <div className="col-6 mb-3">
                                <span>H??? t??n</span>
                                <input type="text" className="form-control" name="fullname" value={values.fullname} onChange={this.handleChange} onBlur={this.handleBlur} />
                                {errors.fullname && <span className='text-danger'>{errors.fullname}</span>}
                            </div>
                            <div className="col-6 mb-3">
                                <span>S??? ??i???n tho???i</span>
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