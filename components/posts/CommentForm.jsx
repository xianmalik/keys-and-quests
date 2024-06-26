import { useState } from 'react';
import axios from 'axios';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

export default function CommentForm({ postId }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const comment = { name, email, message, post: { _type: 'reference', _ref: postId } };

    try {
      const response = await axios.post('/api/v1/comment', comment);

      if (!response) return;

      const { data } = response;

      if (data?.success) {
        setIsSubmitted(true)
        setName('')
        setEmail('')
        setMessage('')
      }
    } catch (error) {
      console.error('Error submitting comment', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-2 md:gap-3 w-full'>
      <h3 className='col-span-2 font-medium mb-0'>Drop a comment:</h3>
      <div>
        <Input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className='col-span-2'>
        <Textarea placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} required />
      </div>
      <div className='col-span-2'>
        <Button type="submit">Submit</Button>
      </div>
      {isSubmitted && <p className='col-span-2 my-2 rounded p-4 text-green-800 bg-green-200 border border-green-600'>Thank you for your comment. Please wait for comment approval.</p>}
    </form>
  );
}
