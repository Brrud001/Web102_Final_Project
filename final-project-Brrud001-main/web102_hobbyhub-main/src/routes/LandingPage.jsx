import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <section className="text-center p-8 bg-fixed bg-cover" style={{ backgroundImage: 'url(path/to/your/gaming-background.jpg)' }}>
            <div className="max-w-4xl mx-auto space-y-4 backdrop-blur-md backdrop-brightness-75 p-4 rounded-lg">
                <h1 className="text-4xl font-bold text-shadow-lg">
                    LevelUpLounge: Unleash Your Gaming Potential!
                </h1>
                <p className="text-xl">
                    Dive into discussions, share tips, and connect over your favorite games with fellow enthusiasts.
                </p>
                <Link to="/create">
                    <button className="btn btn-primary text-lg font-semibold my-2 shadow-lg hover:scale-105 transition-transform">
                        Start a New Discussion
                    </button>
                </Link>
                <p className="text-2xl">Explore Discussions Below</p>
            </div>
        </section>
    );
}

export default LandingPage;
