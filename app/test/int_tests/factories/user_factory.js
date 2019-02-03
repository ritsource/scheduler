import axios from 'axios';
import crypto from 'crypto';

export default async () => {
  const response = await axios.post('http://localhost:4001/auth/register', {
    name: 'Name', email: `${crypto.randomBytes(10).toString('hex')}@example.com`, password: '1234567890'
  });

  return response.data;
};