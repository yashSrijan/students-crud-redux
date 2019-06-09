import React from 'react';

export const GenderRadios = ({genders, onChange, radios, parent}) => {
    return (
        <div>
            {
                genders.map((gender, index) => {
                    return(
                        <div key = {gender} className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" 
                                name="gender" id={ `${gender + index + parent}` } 
                                value={gender} 
                                checked = {radios[gender]}
                                onChange = {onChange}
                            />
                            <label className="form-check-label" htmlFor={ `${gender + index + parent}` }>{gender}</label>
                        </div>
                    )
                })
            }
        </div>
    )
}