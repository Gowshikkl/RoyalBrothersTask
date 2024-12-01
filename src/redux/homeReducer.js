const ADD_COFEE = "ADD_COFEE"

export const addCofee =data =>({
    type : ADD_COFEE,
    payload : data
}) 

const initialState = {
    coffeeList : []
}


const HomeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COFEE:
            return {
                ...state,
                coffeeList: action.payload,
            };
        default:
            return state;
    }
};

export default HomeReducer;
