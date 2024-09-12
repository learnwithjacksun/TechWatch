import { useContext } from "react"
import { AuthContext } from "../Contexts/AuthProvider"


const useData = () => {

    const authContext = useContext(AuthContext)

    if (!authContext) {
        throw new Error("useData must be used within a AuthProvider");
    }

    const {data} = authContext

  return {data}
}

export default useData