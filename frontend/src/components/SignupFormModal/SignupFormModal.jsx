import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [inputErrors, setInputErrors] = useState([])
  const buttonClass = inputErrors.length >= 1 || password !== confirmPassword ? "sign-up-button-disabled" : "sign-up-button"

  useEffect(() => {
    const errArr = [];
    if (!email || !username || !firstName || !lastName || !password || !confirmPassword) errArr.push("bad");

    if (username.length < 4) errArr.push("bad");

    if (password.length < 6) errArr.push("bad");



    setInputErrors(errArr);
  }, [email, username, firstName, lastName])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
        const response = await dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        return response
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if(data?.errors){
            setErrors(data.errors)
          }
        })
    }
     return setErrors({
        confirmPassword: "Confirm Password field must be the same as the Password field"
      });
    }
      

  return (
    <div className="sign-up-container">
      <h1>Sign Up</h1>
      {errors.email && <p className="sign-up-error">{errors.email}</p>}
      {errors.username && <p className="sign-up-error">{errors.username}</p>}
      {errors.firstName && <p className="sign-up-error">{errors.firstName}</p>}
      {errors.lastName && <p className="sign-up-error">{errors.lastName}</p>}
      {errors.password && <p className="sign-up-error">{errors.password}</p>}
      {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          <input
            placeholder='E-mail'
            className="sign-up-container-entry"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          <input
            placeholder="Username"
            className="sign-up-container-entry"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label>
          <input
            placeholder="First Name"
            className="sign-up-container-entry"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>

        <label>
          <input
            placeholder="Last Name"
            className="sign-up-container-entry"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>

        <label>
          <input
            placeholder="Password"
            className="sign-up-container-entry"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label>
          <input
            placeholder="Confirm Password"
            className="sign-up-container-entry"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <div className="sign-up-button-container">
          <button type="submit" disabled={inputErrors.length >= 1 || password !== confirmPassword} className={buttonClass}>Sign Up</button>
        </div>

      </form>
    </div>
  );
}

export default SignupFormModal;
