import { Reply } from '@/types/comments'
import React from 'react'

const ReplyList = ({replies}: {replies: Reply[]}) => {
  return (
    <div className="ml-12 mt-4 border-l pl-4 space-y-4">
      {replies.map((reply, idx) => (
        <div key={idx} className="flex space-x-3">
          <img
            src="https://placehold.co/40x40/e2e8f0/4a5568?text=User"
            alt={reply.author}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p>{reply.comment}</p>
            <div className="text-xs text-gray-500">
              <strong>{reply.author}</strong>
              {reply.createdAt && <> • {new Date(reply.createdAt).toLocaleString()}</>}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ReplyList