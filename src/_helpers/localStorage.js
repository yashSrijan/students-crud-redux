export const loadState = () => {
    try {
        const serializedState = sessionStorage.getItem('state');
        //console.log('loadState has retrieved state : ', JSON.parse(serializedState))
        if(serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
}

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem('state', serializedState);
    } catch (err) {
        console.log('trouble saving state to sessionStorage : ', err);
    }
}