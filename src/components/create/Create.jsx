import React from 'react';
import {connect} from 'react-redux'
import {countries, hobbies, genders} from '../../constants/constantArrays';
import { createStudent } from '../../_actions/studentActions';
import {arrayToObject} from '../../commonFunctions/fromArrayToObject';
import {GenderRadios} from '../GenderRadios';
import { HobbyCheckboxes } from '../HobbyCheckboxes';
import { CountrySelect } from '../CountrySelect';

class CreateStudent extends React.Component {
    
    state = {
        email : '',
        password : '',
        confirmPassword : '',
        gender : '',
        hobbiesArray : [],
        country : countries[0],
        errors : {
            emailError : '',
            passwordError : '',
            confirmPasswordError : '',
            hobbiesError : '',
            genderError : ''
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

    isNotUnique = (emailTyped) => {
        let emailExists = false;
        emailExists = this.props.studentsArray.some((student) => {
            if(student.email === emailTyped) {
                return true;
            }
        });
        return emailExists;
    }

    allFilled = () => { 
        const {password, confirmPassword, hobbiesArray, email, gender} = this.state;
        let allFilledVal = true;
        let passwordFlag = false, confirmPasswordFlag = false, hobbiesFlag = false, emailFlag = false, genderFlag = false; 
        if(!password) {
            passwordFlag = true;
            allFilledVal = false;
        }
        if(!confirmPassword) {
            confirmPasswordFlag = true;
            allFilledVal = false;
        }
        if(!hobbiesArray.length) {
            hobbiesFlag = true;
            allFilledVal = false;
        }
        if(!email) {
            emailFlag = true;
            allFilledVal = false;
        }
        if(!gender) {
            genderFlag = true;
            allFilledVal = false;
        }
        let errors = {
            emailError : emailFlag ? 'This field is required' : null,
            passwordError : passwordFlag ? 'This field is required' : null,
            confirmPasswordError : confirmPasswordFlag ? 'This field is required' : null,
            hobbiesError : hobbiesFlag ? 'This field is required' : null,
            genderError : genderFlag ? 'This field is required' : null
        };
        this.setState({errors});
        return allFilledVal;
    }

    validateForm = () => {
        if (this.allFilled() ) {
            //if all the fields are filled only then check for further validation
            const {password, confirmPassword, hobbiesArray, email} = this.state;
            let confirmPasswordFlag = false, hobbiesFlag = false, emailFlag = false, formIsValid = true;
            if( password!==confirmPassword ) {
                confirmPasswordFlag = true;
                formIsValid = false;
            }
            if(hobbiesArray.length<2) {
                hobbiesFlag = true;
                formIsValid = false;
            }
            if( this.isNotUnique(email) ) {
                //if the email is is not unique
                emailFlag = true;
                formIsValid = false;
            }
            let errors = {
                emailError : emailFlag ? 'This email id has already been taken !' : null,
                confirmPasswordError : confirmPasswordFlag ? 'Passwords should match !' : null,
                hobbiesError : hobbiesFlag ? 'Please choose atleast two hobbies !' : null
            }
            this.setState({errors});
            return formIsValid;
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        if( this.validateForm() ) {
            //immediate function invocation -> pick only those things from state which are required to create a student
            const studentObj = ( ({email, password, gender, hobbiesArray, country}) => {
                return {
                    email, password, gender, hobbiesArray, country
                }
            } )(this.state)
            //if all the validation results to true then dispatch a createStudent action
            this.props.createStudent(studentObj);
            //reset the state to initial -> form should be cleared
            this.setState({
                email : '',
                password : '',
                confirmPassword : '',
                gender : '',
                country : countries[0],
                hobbiesArray : [],
                radios : arrayToObject(genders, false),
                checkboxes : arrayToObject(hobbies, false)
            })
        }
    }

    render() {
        const {radios, checkboxes, email, password, confirmPassword, country} = this.state;
        return (
            <div className="container" style = {{marginTop:'40px'}}>
                <h2>Create</h2>
                <form onSubmit = {this.onFormSubmit}>
                    {/* email address ----------------------------*/}
                    <div className="form-group">
                        <label htmlFor="inputEmail">Email Address</label>
                        <input type="email" name = "email" className="form-control" 
                            id="inputEmail" aria-describedby="emailHelp" 
                            placeholder="Enter email"
                            value = {email}
                            onChange = {(e) => {this.handleChange(e)}}
                        />
                        {
                            this.state.errors.emailError &&
                                <div className = "error-msg">{this.state.errors.emailError}</div>
                        }
                    </div>
                    {/* password ----------------------------*/}
                    <div className="form-group">
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" name = "password" className="form-control" 
                            id="inputPassword"
                            placeholder="Enter password"
                            value = {password}
                            onChange = {(e) => {this.handleChange(e)}}
                        />
                        {
                            this.state.errors.passwordError &&
                                <div className = "error-msg">{this.state.errors.passwordError}</div>
                        }
                    </div>
                    {/* confirm password ----------------------------*/}
                    <div className="form-group">
                        <label htmlFor="inputConfirmPassword">Confirm Password</label>
                        <input type="password" name = "confirmPassword" className="form-control" 
                            id="inputConfirmPassword" 
                            placeholder="Confirm password"
                            value = {confirmPassword}
                            onChange = {(e) => {this.handleChange(e)}}
                        />
                        {
                            this.state.errors.confirmPasswordError &&
                                <div className = "error-msg">{this.state.errors.confirmPasswordError}</div>
                        }
                    </div>
                    {/* gender radio ----------------------------*/}
                    <div className="form-group">
                        <label style={{marginRight:"15px"}}>Gender : </label>
                        <GenderRadios genders = {genders} 
                            onChange = {(e) => this.handleChange(e)} 
                            radios = {radios}
                            parent = "_create"
                        />
                        {
                            this.state.errors.genderError &&
                                <div className = "error-msg">{this.state.errors.genderError}</div>
                        }
                    </div>
                    {/* hobbies checkbox ----------------------------*/}
                    <div className="form-group">
                        <label style={{marginRight:"15px"}}>Hobbies : </label>
                        <HobbyCheckboxes
                            hobbies = {hobbies}
                            onChange = {(e) => this.handleChange(e)}
                            checkboxes = {checkboxes}
                            parent = "_create" 
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
                            parent = "_create"
                        />
                    </div>
                    {/* Create button ------------------------------*/}
                    <button type="submit" className="btn btn-outline-success">Create</button>
                </form>
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
        createStudent : function(student) {
            dispatch(createStudent(student));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateStudent);