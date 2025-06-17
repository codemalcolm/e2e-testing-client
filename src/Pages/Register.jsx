import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/register', form);
    alert('Registered!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input placeholder="Username" onChange={e => setForm({...form, username: e.target.value})} />
      <input placeholder="Password" type="password" onChange={e => setForm({...form, password: e.target.value})} />
      <button type="submit">Register</button>
    </form>
  );
}