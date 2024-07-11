import { FiArrowRight, FiMapPin, FiMail } from 'react-icons/fi';

const Contact = () => {
    return (
        <div className="bg-[rgb(4,48,47)]" id="contact">
            <div className="max-w-5xl px-4 xl:px-0 py-10 lg:py-20 mx-auto">
                {/* Title */}
                <div className="max-w-3xl mb-10 lg:mb-14">
                    <button className="px-4 py-2 font-semibold bg-gray-700 text-white rounded-full">
                        Contact <span className='uppercase font-bold text-[#ffdb4f]'>us?</span>
                    </button>
                    <p className="mt-1 text-neutral-400">Whatever your goal - we will get you there.</p>
                </div>
                {/* End Title */}

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16">
                    <div className="md:order-2 border-b border-neutral-800 pb-10 mb-10 md:border-b-0 md:pb-0 md:mb-0">
                        <form>
                            <div className="space-y-4">
                                {/* Input */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="hs-tac-input-name"
                                        className="peer p-4 block w-full  border-transparent rounded-lg text-sm text-black placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none
                    focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                                        placeholder="Name"
                                    />
                                    <label
                                        htmlFor="hs-tac-input-name"
                                        className="absolute top-0 start-0 p-4 h-full text-neutral-800 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                    peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-neutral-400 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-neutral-400"
                                    >
                                        Name
                                    </label>
                                </div>
                                {/* End Input */}

                                {/* Input */}
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="hs-tac-input-email"
                                        className="peer p-4 block w-full  border-transparent rounded-lg text-sm text-black placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none
                    focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                                        placeholder="Email"
                                    />
                                    <label
                                        htmlFor="hs-tac-input-email"
                                        className="absolute top-0 start-0 p-4 h-full text-neutral-800 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                    peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-neutral-400 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-neutral-400"
                                    >
                                        Email
                                    </label>
                                </div>
                                {/* End Input */}

                                {/* Input */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="hs-tac-input-company"
                                        className="peer p-4 block w-full  border-transparent rounded-lg text-sm text-black placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none
                    focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                                        placeholder="Company"
                                    />
                                    <label
                                        htmlFor="hs-tac-input-company"
                                        className="absolute top-0 start-0 p-4 h-full text-neutral-800 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                    peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-neutral-400 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-neutral-400"
                                    >
                                        Company
                                    </label>
                                </div>
                                {/* End Input */}

                                {/* Input */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="hs-tac-input-phone"
                                        className="peer p-4 block w-full  border-transparent rounded-lg text-sm text-black placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none
                    focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                                        placeholder="Phone"
                                    />
                                    <label
                                        htmlFor="hs-tac-input-phone"
                                        className="absolute top-0 start-0 p-4 h-full text-neutral-800 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                    peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-neutral-400 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-neutral-400"
                                    >
                                        Phone
                                    </label>
                                </div>
                                {/* End Input */}

                                {/* Textarea */}
                                <div className="relative">
                                    <textarea
                                        id="hs-tac-message"
                                        className="peer p-4 block w-full  border-transparent rounded-lg text-sm text-black placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none
                    focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                                        placeholder="This is a textarea placeholder"
                                    ></textarea>
                                    <label
                                        htmlFor="hs-tac-message"
                                        className="absolute top-0 start-0 p-4 h-full text-neutral-800 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                    peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-neutral-400 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-neutral-400"
                                    >
                                        Tell us about your project
                                    </label>
                                </div>
                                {/* End Textarea */}
                            </div>

                            <div className="mt-2">
                                <p className="text-sm text-neutral-200">
                                    All fields are required
                                </p>

                                <p className="mt-5">
                                    <a className="group inline-flex items-center gap-x-2 py-2 px-3 bg-[#ffdb4f] font-medium text-sm text-neutral-800 rounded-full focus:outline-none" href="#">
                                        Submit
                                        <FiArrowRight className="flex-shrink-0 size-4 transition  group-hover:translate-x-0 group-focus:translate-x-0.5" />
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                    {/* End Col */}

                    <div className="space-y-14">
                        {/* Item */}
                        <div className="flex gap-x-5">
                            <FiMapPin className="flex-shrink-0 size-6 text-neutral-500" />
                            <div className="grow">
                                <h4 className="text-white font-semibold">Our address:</h4>
                                <address className="mt-1 text-neutral-400 text-sm not-italic">
                                    300 Bath Street, Tay House<br />
                                    Glasgow G2 4JR, United Kingdom
                                </address>
                            </div>
                        </div>
                        {/* End Item */}

                        {/* Item */}
                        <div className="flex gap-x-5">
                            <FiMail className="flex-shrink-0 size-6 text-neutral-500" />
                            <div className="grow">
                                <h4 className="text-white font-semibold">Email us:</h4>
                                <a className="mt-1 text-neutral-400 text-sm" href="mailto:example@site.co" target="_blank" rel="noopener noreferrer">
                                    hello@example.so
                                </a>
                            </div>
                        </div>
                        {/* End Item */}

                    </div>
                    {/* End Col */}
                </div>
                {/* End Grid */}
            </div>
        </div>
    );
};

export default Contact;
