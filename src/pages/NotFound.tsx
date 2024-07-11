import { Link } from "react-router-dom";
import illustration from "/images/illustration.svg"
const NotFoundPage = () => {
    return (
        <section className="bg-[#235552] ">
            <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
                <div className="wf-ull lg:w-1/2">
                    <p className="text-xl font-medium text-[#FFDB4F] ">404 error</p>
                    <h1 className="mt-3 text-4xl font-semibold text-white  md:text-3xl">Page not found</h1>
                    <p className="mt-4 text-gray-300 ">Sorry, the page you are looking for doesn't exist.Here are some helpful links:</p>

                    <div className="flex items-center mt-6 gap-x-3">
                        <Link to="/" className="w-1/2 px-5 py-2 text-xl font-medium tracking-wide text-[#235552] transition-colors duration-200 bg-[#E3E3E3] rounded-lg shrink-0 sm:w-auto hover:bg-[#d6cece] ">
                            Take me home
                        </Link>
                    </div>
                </div>

                <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
                    <img className="w-full max-w-lg lg:mx-auto" src={illustration} alt="" />
                </div>
            </div>
        </section>
    )
}

export default NotFoundPage;