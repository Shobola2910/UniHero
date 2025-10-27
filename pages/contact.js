// pages/contact.js
import { useState } from 'react';
import CommentForm from '../components/CommentForm'; // Import your comment form component

export default function Contact() {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>Leave a comment and connect with us!</p>
      <CommentForm />
    </div>
  );
}
