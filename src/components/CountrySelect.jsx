import React from 'react';

export const CountrySelect = ({ value, onChange, countries, parent }) => {
    return(
        <select value = {value}
            className="custom-select"
            name = "country"
            onChange = {onChange}
        >
            {
                countries.map( (country, index) => 
                    <option key = { index + parent } value = {country}>{country}</option>
                )
            }
        </select>
    )
}