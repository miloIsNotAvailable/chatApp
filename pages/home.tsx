import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { FC } from "react";
import { auth } from "../Components/constants/firebaseConfig";

const MainChat: FC = () => {

    const router = useRouter()

    return (
        <div onClick={ () => {
            signOut( auth ).then( () => router.push( "/" ) )
            } }>
            hello
        </div>
    )
}

export default MainChat