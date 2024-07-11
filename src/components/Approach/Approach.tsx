
const Approach = () => {
    return (
        <div className="bg-[rgb(4,48,47)]">
            <div className="max-w-5xl px-4 xl:px-0 py-10 lg:pt-20 lg:pb-20 mx-auto">
                {/* Title */}
                <div className="max-w-3xl mb-10 lg:mb-14">
                    <button className="px-4 py-2 font-semibold bg-gray-700 text-white rounded-full">
                        How it <span className='uppercase font-bold text-[#ffdb4f]'>Works?</span>
                    </button>
                    <p className="mt-1 text-neutral-400">
                        This profound insight guides our comprehensive strategy — from
                        meticulous research and strategic planning to the seamless execution
                        of brand development and website or product deployment.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center">
                    <div className="aspect-w-16 aspect-h-9 lg:aspect-none">
                        <img
                            className="w-full object-cover rounded-xl"
                            src="https://images.unsplash.com/photo-1587614203976-365c74645e83?q=80&w=480&h=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Image Description"
                        />
                    </div>

                    <div>

                        <div className="mb-4">
                            <h3 className="text-[#ffdb4f] text-xs font-medium uppercase">Steps</h3>
                        </div>



                        <div className="flex gap-x-5 ms-1">

                            <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-[#ffdb4f]">
                                <div className="relative z-10 size-8 flex justify-center items-center">
                                    <span className="flex flex-shrink-0 justify-center items-center size-8 border border-[#ffdb4f] text-[#ffdb4f] font-semibold text-xs uppercase rounded-full">
                                        1
                                    </span>
                                </div>
                            </div>

                            <div className="grow pt-0.5 pb-8 sm:pb-12">
                                <p className="text-sm lg:text-base text-neutral-400">
                                    <span className="text-white">Register an Account:</span>{' '}
                                    Identify your target audience and understand their needs,
                                    preferences, and behaviors.
                                </p>
                            </div>

                        </div>



                        <div className="flex gap-x-5 ms-1">

                            <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-[#ffdb4f]">
                                <div className="relative z-10 size-8 flex justify-center items-center">
                                    <span className="flex flex-shrink-0 justify-center items-center size-8 border border-[#ffdb4f] text-[#ffdb4f] font-semibold text-xs uppercase rounded-full">
                                        2
                                    </span>
                                </div>
                            </div>

                            <div className="grow pt-0.5 pb-8 sm:pb-12">
                                <p className="text-sm lg:text-base text-neutral-400">
                                    <span className="text-white">Login :</span>{' '}
                                    Develop digital products or services that address the needs and
                                    preferences of your target audience.
                                </p>
                            </div>

                        </div>

                        <div className="flex gap-x-5 ms-1">

                            <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-[#ffdb4f]">
                                <div className="relative z-10 size-8 flex justify-center items-center">
                                    <span className="flex flex-shrink-0 justify-center items-center size-8 border border-[#ffdb4f] text-[#ffdb4f] font-semibold text-xs uppercase rounded-full">
                                        3
                                    </span>
                                </div>
                            </div>

                            <div className="grow pt-0.5 pb-8 sm:pb-12">
                                <p className="text-sm md:text-base text-neutral-400">
                                    <span className="text-white">Apply for controlling church:</span>{' '}
                                    Develop a comprehensive marketing strategy to promote your digital
                                    products or services.
                                </p>
                            </div>

                        </div>

                        <div className="flex gap-x-5 ms-1">

                            <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-[#ffdb4f]">
                                <div className="relative z-10 size-8 flex justify-center items-center">
                                    <span className="flex flex-shrink-0 justify-center items-center size-8 border border-[#ffdb4f] text-[#ffdb4f] font-semibold text-xs uppercase rounded-full">
                                        4
                                    </span>
                                </div>
                            </div>

                            <div className="grow pt-0.5 pb-8 sm:pb-12">
                                <p className="text-sm md:text-base text-neutral-400">
                                    <span className="text-white">Receiving an email:</span>{' '}
                                    Launch your digital products or services to the market, closely
                                    monitoring their performance and user feedback.
                                </p>
                            </div>

                        </div>


                        <a
                            className="group inline-flex items-center gap-x-2 py-2 px-3 bg-[#ffdb4f] font-medium text-sm text-[#235552] rounded-full focus:outline-none"
                            href="#"
                        >
                            Schedule a call
                        </a>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Approach;
