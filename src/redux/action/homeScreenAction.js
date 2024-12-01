import axios from "axios"
import { addCofee } from "../homeReducer"
import { Alert } from "react-native"

export const getCoffeeList = async (dispatch)=>{
    await axios.get("https://api.sampleapis.com/coffee/hot").then((response)=>{
        if(response.data !=null){
            dispatch(addCofee(response.data))
        }
    }).catch((error)=>{
       Alert.alert("Error",error.message) 
    })
}