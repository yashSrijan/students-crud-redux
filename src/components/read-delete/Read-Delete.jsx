import React, {useState} from 'react';
import {connect} from 'react-redux'
import { deleteStudents } from '../../_actions/studentActions';

const ReadAndDelete = (props) => {

    const [deletionArr, setDeletionArr] = useState([]);

    const handleDeleteCheck = (e) => {
        let value = e.target.value;
        if (e.target.checked) {
            let newArr = [...deletionArr, value];
            setDeletionArr(newArr)
        } else {
            let filtered = deletionArr.filter( (ele) => ele !== value );
            setDeletionArr(filtered)
        }
    }

    const deleteClicked = () => {
        console.log('deletion array is : ', deletionArr)
        props.deleteStudents(deletionArr);
        setDeletionArr([])
    }
    
    const {studentsArray} = props;

    return (
        <div className="container"  style = {{marginTop:'40px'}}>
            <div className="row">
                <div className = "col-sm-8">
                    <h2>Read and Delete</h2>
                </div>
                <div className = "text-right col-sm-4">
                    <button type="button" className="btn btn-outline-secondary btn-block" 
                        onClick = {() => deleteClicked()}
                        disabled = {deletionArr.length ? false : true}
                    >
                        Delete Selected
                    </button>
                </div>
            </div>
            {
                studentsArray.map( (student) => (
                    <div key = {student.email} className = 'student-read-update'>
                        <h4>{student.email}</h4>
                        <div className = 'gray'>Country : {student.country}</div>
                        <div className = 'gray'>Gender : {student.gender}</div>
                        <div className = 'gray'>Hobbies : </div>
                        {
                            student.hobbiesArray.map( (hobby, index) => 
                                <div className = 'hobby' key = {index}>{hobby}</div>
                            )
                        }
                        <div className="absolute">
                            <input type="checkbox" 
                                id={student.email} value={student.email}
                                name = "deleteCheck" onChange = { (e) => handleDeleteCheck(e) }
                            />
                            <label className="form-check-label" htmlFor={student.email}>
                                Check this for deletion
                            </label>
                        </div>
                    </div>
                ) )
            }
        </div>
    )
    
}

const mapStateToProps = (store) => {
    return {
        studentsArray : store.studentReducer.studentsArray
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteStudents : function(deletionArr) {
            dispatch(deleteStudents(deletionArr));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadAndDelete);