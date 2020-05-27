import { connect } from 'react-redux'
import setToken, {setCurrentUser} from '../redux/actions/actions'
import { Login } from '../components/login/login';
import { User } from '../redux/interfaces/ArchitectureAppStore';

const mapDispatchToProps = (dispatch: any) => ({
    login: (token: string) => dispatch(setToken(token)),
    setReduxUser: (user: User) => dispatch(setCurrentUser(user))
})

export default connect(
    null,
    mapDispatchToProps
)(Login);