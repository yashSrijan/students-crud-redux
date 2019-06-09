import React from 'react';
import { updateStudent } from '../../_actions/studentActions';
import { connect } from 'react-redux';
import {countries, hobbies, genders} from '../../constants/constantArrays';
import { arrayToObject } from '../../commonFunctions/fromArrayToObject';
import eventTrigger from '../../commonFunctions/eventTrigger';
import { GenderRadios } from '../GenderRadios';
import { HobbyCheckboxes } from '../HobbyCheckboxes';
import { CountrySelect } from '../CountrySelect';

class Update extends React.Component {
    state = {
        email : '',
        password : '',
        gender : '',
        country : '',
        hobbiesArray : [],
        errors : {
            passwordError : '',
            genderError : '',
            hobbiesError : '',
            countryError : ''
        },
        radios : arrayToObject(genders, false),
        checkboxes : arrayToObject(hobbies, false),
    }

    handleChange = (e) => {
        let value = e.target.value;
        //handle checkboxes
        if(e.target.name === "hobbies" ) {
            if (e.target.checked) {
                let newArr = [...this.state.hobbiesArray, value];
                this.setState({ hobbiesArray : newArr, checkboxes : {...this.state.checkboxes, [value] : true} })
            } else {
                let filtered = this.state.hobbiesArray.filter( (ele) => ele !== value );
                this.setState({ hobbiesArray : filtered, checkboxes : {...this.state.checkboxes, [value] : false} })
            }
        } 
        //handle radios
        else if (e.target.name === "gender") {
            let radios = arrayToObject( Object.keys(this.state.radios), false );
            radios[value] = true;
            this.setState({
                [e.target.name] : value, radios
            })
        }
        //handle everything else
        else {
            this.setState({
                [e.target.name] : value
            })
        }
    }

    allFilled = () => { 
        const {password, hobbiesArray} = this.state;
        let allFilledVal = true;
        let passwordFlag = false, hobbiesFlag = false;
        if(!password) {
            passwordFlag = true;
            allFilledVal = false;
        }
        if(!hobbiesArray.length) {
            hobbiesFlag = true;
            allFilledVal = false;
        }
        let errors = {
            passwordError : passwordFlag ? 'This field is required' : null,
            hobbiesError : hobbiesFlag ? 'This field is required' : null,
        };
        this.setState({errors});
        return allFilledVal;
    }

    validateForm = () => {
        if( this.allFilled() ) {
            //do further checks for checkboxes
            const {hobbiesArray} = this.state;
            let hobbiesFlag = false, formIsValid = true;
            if(hobbiesArray.length<2) {
                hobbiesFlag = true;
                formIsValid = false;
            }
            let errors = {
                hobbiesError : hobbiesFlag ? 'Please choose atleast two hobbies !' : null
            }
            this.setState({errors});
            return formIsValid;
        }
    }

    reset = () => {
        this.setState({
            email : '',
            password : '',
            confirmPassword : '',
            gender : '',
            country : countries[0],
            hobbiesArray : [],
            radios : arrayToObject(genders, false),
            checkboxes : arrayToObject(hobbies, false)
        });
    }

    onUpdateClick = (e) => {
        e.preventDefault();
        if( this.validateForm() ) {
            let updatedStudentObj = (
                ({email, password, gender, country, hobbiesArray}) => ({ email, password, gender, country, hobbiesArray })
            )(this.state)
           this.props.updateStudent(updatedStudentObj);
           //explicitly close the modal and set the state to as it was initially
           eventTrigger(document.getElementById('close-modal'), 'click');
           this.reset();
        }
    }

    launchUpdateModal = (student) => {
        //while the modal is being launched
        //the info of that specific student is being set in current state so that
        //thefiels in modal could show/manipulate data via state
        let obj = arrayToObject(student.hobbiesArray, true)
        this.setState({
            email : student.email,
            password : student.password,
            gender : student.gender,
            country : student.country,
            hobbiesArray : student.hobbiesArray,
            radios : {...this.state.radios, [student.gender] : true},
            checkboxes : {...this.state.checkboxes, ...obj}
        })
    }

    render() {
        const {studentsArray} = this.props;
        const {email, password, radios, checkboxes, country} = this.state;
        return (
            <div className="container" style = {{marginTop:'40px'}}>
                <h2>Update</h2>
                {
                    studentsArray.map( (student) => (
                        <div key = {student.email} className = 'student-read-update'>
                            <div className = "row">
                                <div className = "col-sm-8">
                                    <div style = {{padding:"8px 0"}}>{student.email}</div>
                                </div>
                                <div className = "text-right col-sm-4">
                                    <button type = "button" className = "btn btn-bloack btn-outline-primary" 
                                        onClick = {() => this.launchUpdateModal(student) }
                                        data-toggle="modal" data-target="#updateModal"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) )
                }
                {/* this is the update modal - it would be fired on edit button click */}
                <div className = "modal fade" id="updateModal" tabIndex="-1" role="dialog" aria-labelledby="updateModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="updateModalLabel">Update Student</h5>
                            </div>
                            <div className="modal-body">
                            <form>
                                {/* email address - this field is freezed as some unique key is required to update a student oject ----------------------------*/}
                                <div className="form-group">
                                    <label htmlFor="updateInputEmail">Email Address</label>
                                    <input type="email" name = "email" className="form-control" 
                                        id="updateInputEmail" disabled
                                        value = {email}
                                    />
                                </div>
                                {/* password ----------------------------*/}
                                <div className="form-group">
                                    <label htmlFor="updateInputPassword">Password</label>
                                    <input type="text" name = "password" className="form-control" 
                                        id="updateInputPassword"
                                        placeholder="Enter password"
                                        value = {password}
                                        onChange = {(e) => {this.handleChange(e)}}
                                    />
                                    {
                                        this.state.errors.passwordError &&
                                            <div className = "error-msg">{this.state.errors.passwordError}</div>
                                    }
                                </div>
                                {/* gender radio ----------------------------*/}
                                <div className="form-group">
                                    <label style={{marginRight:"15px"}}>Gender : </label>
                                    <GenderRadios genders = {genders}
                                        onChange = {(e) => this.handleChange(e)} 
                                        radios = {radios} 
                                        parent = "_update"
                                    />
                                </div>
                                {/* hobbies checkbox ----------------------------*/}
                                <div className="form-group">
                                    <label style={{marginRight:"15px"}}>Hobbies : </label>
                                    <HobbyCheckboxes
                                        hobbies = {hobbies}
                                        onChange = {(e) => this.handleChange(e)}
                                        parent = "_update"
                                        checkboxes = {checkboxes}
                                    />
                                    {
                                        this.state.errors.hobbiesError &&
                                            <div className = "error-msg">{this.state.errors.hobbiesError}</div>
                                    }
                                </div>
                                {/* Countries select ------------------------------*/}
                                <div className = "form-group">
                                    <CountrySelect
                                        value = {country}
                                        onChange = {(e) => this.handleChange(e)}
                                        countries = {countries}
                                        parent = "_update"
                                    />
                                </div>
                            </form>
                            </div>
                            <div className="modal-footer">
                                <button id = "close-modal" type="button"
                                    onClick = {this.reset}
                                    className="btn btn-outline-secondary" 
                                    data-dismiss="modal"
                                >
                                Close
                                </button>
                                <button type="button" onClick = {this.onUpdateClick} 
                                    className="btn btn-outline-success"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        studentsArray : store.studentReducer.studentsArray
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateStudent : function(updatedStudentObj) {
            dispatch(updateStudent(updatedStudentObj));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Update)