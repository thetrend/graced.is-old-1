import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import auth from './utils/auth';

const Signup = () => {
  const [searchParams] = useSearchParams();
  const invite = searchParams.get('invite');

  if (!invite) {
    const navigate = useNavigate();
    useEffect(() => {
      navigate('/');
    }, []);
  }

  const [form, setForm] = useState({
    password: '',
    password2: ''
  });
  const [remember, setRemember] = useState(false);
  const [formError, setFormError] = useState<boolean|string>(false);

  const handleFormInput = (e: ChangeEvent<HTMLInputElement>): void => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRemember = (e: FormEvent<HTMLInputElement>): void => setRemember(!remember);

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password2 !== form.password) {
      setFormError('Passwords do not match!');
    } else {
      setFormError(false);
    }

    auth.acceptInvite(invite!, form.password, remember)
      .then(response => console.log(response));
  };

  return (
    <>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <input type="password" name="password" id="password" placeholder="Password" value={form.password} onChange={handleFormInput} /><br />
        <input type="password" name="password2" id="password2" placeholder="Verify Password" value={form.password2} onChange={handleFormInput} /><br />
        <label htmlFor="remember"><input type="checkbox" name="remember" id="remember" checked={remember} onChange={handleRemember} /> Remember Me</label><br />
        {formError && <span style={{color: 'red', display: 'block'}}>{formError}</span>}
        <button type="submit">Signup</button>
      </form>
    </>
  )
};

export default Signup;