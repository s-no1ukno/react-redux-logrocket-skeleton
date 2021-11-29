import { useSelector } from 'react-redux'

const useAPI = () => useSelector(state => state.alert)

export default useAPI
