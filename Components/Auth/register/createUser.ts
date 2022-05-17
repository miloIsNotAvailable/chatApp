import { getRegisterInfoSelector } from "../../interfaces/formInterfaces"
import { getRegisterInfoState } from "../../store/interfaces"

interface userDataProps {
    id: string | undefined, 
    email?: string | undefined, 
    username?: string | undefined, 
    password?: string | undefined, 
}

const createUser = async( userData: userDataProps ) => {

    fetch( '/api/post', {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( userData ),
    } ).then( ( e ) => e.json() ).then( v => console.log( v ) )

}

export default createUser