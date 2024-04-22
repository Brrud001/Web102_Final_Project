/** 
 * @returns Footer 
 */
const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <>
            <footer className="footer footer-center p-10 mt-5 bg-base-300 ">
                <div>
                    <p className="font-bold">
                        Brian Rudowitz <br />
                    </p>
                    {/* Easter egg link to Halo 3 Wikipedia page */}
                    <a href="https://en.wikipedia.org/wiki/Halo_3" target="_blank" rel="noopener noreferrer" title="Halo 3">
                        <p className="text-white">Were it so easy</p>
                    </a>
                    <p className="text-white">Copyright © {year} - All right reserved by Brian Rudowitz</p>
                </div>
            </footer>
        </>
    );
}

export default Footer;
