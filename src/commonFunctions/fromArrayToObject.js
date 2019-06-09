export const arrayToObject = (array, boolVal) => {
    return array.reduce((finalObj, option) => {
        return { ...finalObj, [option] : boolVal}
    }, {})
}