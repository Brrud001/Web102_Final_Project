import { useEffect, useState, useCallback } from "react";
import { supabase } from "../client";
import LandingPage from "./LandingPage";
import AllPosts from "../components/AllPosts";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [sortByAsc, setSortByAsc] = useState(false);
    const handleSortByLikes = () => {
        setStatus({ ...status, sortByLikes: !status.sortByLikes });
        getPosts();
    };

    const getPosts = useCallback(async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: sortByAsc });
            if (error) throw error;
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    }, [sortByAsc]);

    useEffect(() => {
        getPosts();
    }, [getPosts]);

    const handleSortChange = () => {
        setSortByAsc(!sortByAsc);
    };

    const searchPosts = useCallback(async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .ilike('title', `%${search}%`);
            if (error) throw error;
            setPosts(data);
        } catch (error) {
            console.error('Error searching posts:', error);
        } finally {
            setLoading(false);
        }
    }, [search]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        searchPosts();
    };


    return (
        <>
            <LandingPage />
            <form className="mt-4">
                <div className="hero">
                    <input
                        type="text"
                        className="input input-bordered"
                        placeholder="Search Posts by Title"
                        onChange={(e) =>
                            setSearch(e.target.value)
                        } />
                </div>
                <div className="space-x-6 flex justify-center mt-2">
                    <button className="btn text-[#DDDDDD]" onClick={(e) => handleFormSubmit(e)}>Search</button>
                    <button className="btn text-[#DDDDDD]" onClick={() => getPosts()}>Reset</button>
                </div>
            </form>
            <div className="space-x-5 flex justify-center mt-3">
                <button
                    className="btn text-[#DDDDDD]"
                    onClick={() => handleSortChange()}
                >
                    Sort Date Ascending/ {status.sortBy ? 'Ascending' : 'Descending'}
                </button>
                <button
                    className="btn text-[#DDDDDD]"
                    onClick={() => handleSortByLikes()}
                >
                    Sort by Likes Ascending/ {status.sortByLikes ? 'Ascending' : 'Descending'}
                </button>
            </div>
            <AllPosts posts={posts} setPosts={setPosts} status={status} />
        </>
    )
}

export default Home