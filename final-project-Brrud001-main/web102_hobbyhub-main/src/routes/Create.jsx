import { useState } from "react";
import { supabase } from "../client";
import { Link, useNavigate } from "react-router-dom";

const Create = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '',
        content: '',
        image: ''
    });

    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: false,
        message: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ ...status, loading: true });

        if (!form.title || !form.content) {
            setStatus({ loading: false, error: true, message: "Please fill in all required fields" });
            return;
        }

        const { error } = await supabase
            .from("posts")
            .insert([form]);

        if (error) {
            setStatus({ loading: false, error: true, message: error.message });
        } else {
            setStatus({ loading: false, success: true, message: 'Post created successfully!' });
            // After successful creation, navigate to the home page.
            navigate("/");
        }
    };

    return (
        <main className="p-20">
            <h1 className="text-3xl text-white mb-4">Create New Post</h1>
            {status.error && <p className="alert alert-error">{status.message}</p>}
            {status.success && <p className="alert alert-success">{status.message}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
                <input
                    type="text"
                    placeholder="Enter Title"
                    className="input input-bordered w-full"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Enter Description"
                    className="textarea textarea-bordered w-full"
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Enter Image URL (Optional)"
                    className="input input-bordered w-full"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
                <button type="submit" className="btn w-full" disabled={status.loading}>
                    {status.loading ? 'Creating...' : 'Create Post'}
                </button>
            </form>
        </main>
    );
};

export default Create;
