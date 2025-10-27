// pages/contact.js

import { useState } from 'react';
import CommentForm from '../components/CommentForm'; // Agar CommentForm komponenti mavjud bo'lsa

export default function Contact() {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>Leave a comment and connect with us!</p>
      <CommentForm />
    </div>
  );
}
