
import woman from '/images/woman.png';

const Home = () => {
    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-[rgb(4,48,47)] via-[rgba(8,57,54,1)] to-[rgba(4,48,47,1)]">
            <div className="relative flex flex-col items-center p-8 space-y-8 md:flex-row md:space-x-8 md:space-y-0 md:p-16">
                {/* Text Content */}
                <div className="flex-1 max-w-md space-y-4 text-center md:text-left">
                    <button className="px-4 py-2 font-bold text-white bg-gray-700 rounded-full transition-transform transform hover:scale-105">
                        Join With Us!
                    </button>
                    <h1 className="text-4xl font-bold text-white md:text-5xl">
                        Easier <span className="text-yellow-400">Solution</span> to Transfer Your <span className="text-yellow-400">Finance</span>
                    </h1>
                    <p className="text-lg text-gray-300">
                        Discover new ways to transfer your finances, send efficiently and smartly, and achieve your financial goals with us.
                    </p>
                    <button className="px-6 py-3 font-semibold text-white bg-yellow-500 rounded-md transition-transform transform hover:scale-105">
                        Register Now
                    </button>
                </div>
                <div className="relative mt-8 lg:mt-0 flex-1">
                    <img src={woman} alt="Person" className="z-20 w-92 h-92 lg:w-[80%] lg:h-[80%] md:w-[100%] md:h-[100%]  rounded-lg shadow-lg mx-auto" />
                    <svg className="absolute top-0 left-0 w-16 h-16 text-yellow-400 fill-current animate-pulse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" /></svg>
                    <svg className="absolute bottom-0 right-0 w-24 h-24 text-yellow-400 fill-current animate-pulse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" /></svg>
                </div>
            </div>
        </div>
    );
}

export default Home;
