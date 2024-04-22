import { useEffect, useState } from 'react';
import { supabase } from '../client';

/** Returns all comments for a post
 * @param {Object} props
 * @param {Number} props.postID - ID of the post  
 */
const CommentSection = ({ postID }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [userID, setUserID] = useState('');
    const [commentError, setCommentError] = useState(false);
    const [loading, setLoading] = useState(false);

    // Helper function to format dates
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    /** Fetches all comments for a post */
    const getComments = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('postID', postID)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching comments:", error);
            setLoading(false);
            return;
        }
        setComments(data);
        setLoading(false);
    };

    /** Adds a comment to a post */
    const addComment = async () => {
        if (newComment.trim() === '' || userID.trim() === '') {
            setCommentError(true);
            setLoading(false);
            return;
        }

        const { error } = await supabase
            .from('comments')
            .insert([
                {
                    postID: postID,
                    comment: newComment,
                    user_id: userID,
                }
            ]);

        if (error) {
            console.error("Error adding comment:", error);
            setCommentError(true);
            setLoading(false);
            return;
        }

        // Clear the input field after adding a comment
        setNewComment('');
        setUserID('');
        setCommentError(false);
        getComments(); // Refresh comments to show the new one
        setLoading(false);
    };

    useEffect(() => {
        getComments();
    }, [postID]);

    return (
        <section>
            <h2 className='text-4xl'>Comments</h2>
            <div className='flex justify-center'>
                {commentError && <p className='alert alert-error mt-2 w-full'>Please fill in all fields before commenting!</p>}
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="comment-form">
                <textarea
                    className='textarea textarea-bordered h-40 mt-5 w-full'
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                />
                <input
                    type="text"
                    className='input input-bordered w-full text-center mt-4'
                    placeholder='Enter User ID'
                    value={userID}
                    onChange={(e) => setUserID(e.target.value)}
                />
                <button onClick={addComment} className='btn mt-4 w-full'>Submit</button>
            </form>
            <ul className='mt-2'>
                {loading ? (
                    <p>Loading comments...</p>
                ) : (
                    comments.map((comment) => (
                        <li key={comment.id} className="my-2 p-2 border-b border-gray-300">
                            User {comment.user_id}: {comment.comment}
                            <div className="text-sm text-gray-500">
                                {formatDate(comment.created_at)}
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </section>
    );
};

export default CommentSection;
