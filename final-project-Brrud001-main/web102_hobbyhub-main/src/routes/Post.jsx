import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../client";
import { useEffect, useState } from "react";
import CommentSection from "../components/CommentSection";
import SinglePost from "../components/SinglePost";

const Post = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [status, setStatus] = useState({
        loading: false
    });

    const getPost = async () => {
        setStatus({ ...status, loading: true });
        try {
            const { data } = await supabase
                .from('posts')
                .select('*')
                .eq('id', params.id);
            setStatus({ ...status, loading: false });
            setPost(data[0]);
        } catch (error) {
            console.error("Error fetching post:", error);
            setStatus({ ...status, loading: false });
        }
    };
   
    useEffect(() => {
        getPost();
    }, []);

    const handleDelete = async () => {
        try {
            await supabase.from('posts').delete().eq('id', params.id);
            navigate('/');
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <>
            <div className="flex flex-wrap">
                <SinglePost post={post} status={status} />
                <section className="p-[50px] w-full lg:w-2/4 ">
                    <CommentSection postID={post?.id} />
                    <div className="mt-4">
                        <button onClick={() => navigate(`/update/${params.id}`)} className="btn btn-primary mr-2">Edit</button>
                        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
                    </div>
                </section>
            </div >
        </>
    );
};

export default Post;
