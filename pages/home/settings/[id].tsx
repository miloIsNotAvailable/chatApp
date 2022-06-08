import { useRouter } from "next/router";
import { FC } from "react";
import Settings from "../../../Components/Miscellanous/Settings/Build/Settings";

const UserSettings: FC = () => {

    const router = useRouter()
    const { id } = router.query

    return (
        <div>
            <Settings/>
        </div>
    )
}

export default UserSettings