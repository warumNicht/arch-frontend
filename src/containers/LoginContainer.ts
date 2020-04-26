import { connect } from 'react-redux'
import setToken from '../redux/actions/actions'
import { Login } from '../components/login/login';

const mapDispatchToProps = (dispatch: any) => ({
    login: (token: string) => dispatch(setToken(token))
})

export default connect(
    null,
    mapDispatchToProps
)(Login);