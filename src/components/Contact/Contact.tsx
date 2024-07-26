import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FiArrowRight, FiMapPin, FiMail } from 'react-icons/fi';
import emailjs from 'emailjs-com'
const Contact = () => {

    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        user_subject: '',
        message: ''
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.user_name || !formData.user_email || !formData.user_subject || !formData.message) {
            toast.error('All fields are required');
            return
        }
        emailjs.send(
            'service_cdaavuo',
            'template_6jm6d0b',
            formData,
            'user_3iCFvzpWjdxqQaJMi15mx'
        ).then((res: any) => {
            toast.success('Message sent successfully', res.status)
        }).catch((err) => {
            console.log("Error sending message", err);
            console.error("Message sending failed");
        })
    }
    return (
        <div className="bg-[rgb(4,48,47)]" id="contact">
            <div className="max-w-5xl px-4 xl:px-0 py-10 lg:py-20 mx-auto">
                <div className="max-w-3xl mb-10 lg:mb-14">
                    <button className="px-4 py-2 font-semibold bg-gray-700 text-white rounded-full">
                        Contact <span className='uppercase font-bold text-[#ffdb4f]'>us?</span>
                    </button>
                    <p className="mt-1 text-neutral-400">Whatever your goal - we will get you there.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16">
                    <div className="md:order-2 border-b border-neutral-800 pb-10 mb-10 md:border-b-0 md:pb-0 md:mb-0">
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                {/* Input */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        name='user_name'
                                        value={formData.user_name}
                                        onChange={handleChange}
                                        className="peer p-4 block w-full  border-transparent rounded-lg text-sm text-black placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none
                    focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                                        placeholder="Name"
                                    />
                                    <label
                                        htmlFor="user_name"
                                        className="absolute top-0 start-0 p-4 h-full text-neutral-800 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                    peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-neutral-400 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-neutral-400"
                                    >
                                        Name
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name='user_email'
                                        value={formData.user_email}
                                        onChange={handleChange}
                                        className="peer p-4 block w-full  border-transparent rounded-lg text-sm text-black placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none
                    focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                                        placeholder="Email"
                                    />
                                    <label
                                        htmlFor="user_email"
                                        className="absolute top-0 start-0 p-4 h-full text-neutral-800 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                    peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-neutral-400 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-neutral-400"
                                    >
                                        Email
                                    </label>
                                </div>

                                <div className="relative">
                                    <input
                                        type="text"
                                        id="user_subject"
                                        name='user_subject'
                                        value={formData.user_subject}
                                        onChange={handleChange}
                                        className="peer p-4 block w-full  border-transparent rounded-lg text-sm text-black placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none
                    focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                                        placeholder="Phone"
                                    />
                                    <label
                                        htmlFor="user_subject"
                                        className="absolute top-0 start-0 p-4 h-full text-neutral-800 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                    peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-neutral-400 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-neutral-400"
                                    >
                                        Subject
                                    </label>
                                </div>

                                <div className="relative">
                                    <textarea
                                        id="message"
                                        name='message'
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="peer p-4 block w-full  border-transparent rounded-lg text-sm text-black placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none
                    focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                                        placeholder="This is a textarea placeholder"
                                    ></textarea>
                                    <label
                                        htmlFor="message"
                                        className="absolute top-0 start-0 p-4 h-full text-neutral-800 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                    peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-neutral-400 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-neutral-400"
                                    >
                                        Tell us about your project
                                    </label>
                                </div>
                            </div>

                            <div className="mt-2">
                                <button
                                    type="submit"
                                    className="group h-auto inline-flex items-center justify-center rounded-full transition-colors font-semibold !mt-6 py-3 px-4 text-base sm:text-sm  bg-[#ffdb4f] text-neutral-900 hover:bg-neutral-900 hover:text-white"
                                >
                                    Send message
                                    <span className="pl-3">
                                        <FiArrowRight size={20} />
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="space-y-14">
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
                        <div className="flex gap-x-5">
                            <FiMail className="flex-shrink-0 size-6 text-neutral-500" />
                            <div className="grow">
                                <h4 className="text-white font-semibold">Email us:</h4>
                                <a className="mt-1 text-neutral-400 text-sm" href="mailto:example@site.co" target="_blank" rel="noopener noreferrer">
                                    hello@example.so
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
