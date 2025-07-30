"use client"

import React, { useState } from 'react'

type ReplyFormProps = {
    onSubmit: (text: string) => void;
    isSubmitting: boolean;
    placeholder?: string;
}

const ReplyForm = ({onSubmit, isSubmitting, placeholder}: ReplyFormProps) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!text.trim()) return;
        onSubmit(text);
        setText("")
    }
  return (
    <form onSubmit={handleSubmit} className='mt-4 space-y-2'>
        <textarea className='w-full border p-2 rounded' 
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        ></textarea>
        <div className='flex justify-end'>
            <button disabled={isSubmitting} className='bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50'>
                {isSubmitting ? "Posting..": "Post Reply"}
            </button>
        </div>
    </form>
  )
}

export default ReplyForm