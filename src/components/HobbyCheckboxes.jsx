import React from 'react';

export const HobbyCheckboxes = ({hobbies, onChange, checkboxes, parent}) => {
    return (
        <div>
            {
                hobbies.map((hobby, index) => {
                    return(
                        <div key = {hobby} className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" 
                                name="hobbies" id={ `${hobby + index + parent}` } 
                                value={hobby} 
                                checked = {checkboxes[hobby]}
                                onChange = {onChange}
                            />
                            <label className="form-check-label" htmlFor={ `${hobby + index + parent}` }>{hobby}</label>
                        </div>
                    )
                })
            }
        </div>
    )
}