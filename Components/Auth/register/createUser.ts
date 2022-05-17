import { getRegisterInfoState } from "../../store/interfaces"

interface userDataProps extends getRegisterInfoState{
    id: string | null, 
}

const createUser = async( userData: userDataProps ) => {

    fetch( '/api/post', {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( userData ),
    } ).then( ( e ) => e.json() ).then( v => console.log( v ) )

}

export default createUser