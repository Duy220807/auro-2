import { Alert } from "react-native"

const { useEffect } = require("react")
const { useState } = require("react")

const useAppwrite = (fn) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchData = async () => {
        setIsLoading(true)

        try {
            const response = await fn();
            //@ts-ignore
            setData(response);
        } catch (error) {
            Alert.alert('Error', error.message)
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {


        fetchData();
    }, [])

    const refetch = () => fetchData();

    return { data, isLoading, refetch }
}

export default useAppwrite;