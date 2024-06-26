export default function CommentView({ comments }) {
  if (comments?.length <= 0) {
    return (
      <p className="my-6 font-medium text-lg">No Comments found. Add a comment to start a topic!</p>
    )
  }

  return (
    <div className="flex flex-col gap-2 md:gap-6 mb-6">
      {comments.map((comment) => (
        <div className="flex flex-col rounded border border-gray-300 p-4" key={comment._id}>
          <p className="text-sm text-gray-600">
            {comment.name} <span className="text-xs">({comment.email})</span>
          </p>
          <div>

          </div>
          <div>
            {comment.message}
          </div>
        </div>
      ))}
    </div>
  )
}