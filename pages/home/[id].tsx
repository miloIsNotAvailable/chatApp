import { useRouter } from "next/router";
import { FC } from "react";

const DisplayRoom: FC = () => {

    const router = useRouter()
    const { id } = router.query

    return (
        <div>
            { id }
        </div>
    )
}

export default DisplayRoom