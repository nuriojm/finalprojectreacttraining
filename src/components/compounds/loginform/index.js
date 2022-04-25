import Label from '../../atoms/label';
import Inputtext from '../../atoms/inputtext';

function Loginform(props) {
    return (
        <div className="r-form r-form-left">
            <div className="r-form-title">Login Form</div>
            <Label text="User Name" />
            <Inputtext name="username" type="text" />
            <Label text="Password" />
            <Inputtext name="password" type="password" />
            <Inputtext type="button" value="Login"></Inputtext>
        </div>
    )
}

export default Loginform;