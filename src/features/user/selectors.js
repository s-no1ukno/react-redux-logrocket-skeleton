import { useSelector } from 'react-redux'

const useAPI = () => useSelector(state => state.user)

export default useAPI
