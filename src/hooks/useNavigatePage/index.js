import { useNavigation } from '@react-navigation/native'

function useNavigatePage() {
    const navigation = useNavigation()

    return (key, params = {}) => {
        return () => {
            if (key == null) navigation.goBack()
            else navigation.navigate(key, params)
        }
    }
}

export default useNavigatePage