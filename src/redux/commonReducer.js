export const ADD_LOADING = 'ADD_LOADING';


export const addloading = Id => ({
    type: ADD_LOADING,
    payload: Id,
});



const initialState = {
    loader: false,
};


const CommonReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_LOADING:
            return {
                ...state,
                loader: action.payload,
            };
        default:
            return state;
    }
};
export default CommonReducer;