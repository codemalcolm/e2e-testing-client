import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setMessage(res.data.message))
    .catch(() => setMessage('Access denied'));
  }, []);

  return <h2>{message}</h2>;
}