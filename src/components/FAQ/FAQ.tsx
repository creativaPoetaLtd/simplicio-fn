import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index: any) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-[rgb(4,48,47)] py-16 px-8">
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                {/* Grid */}
                <div className="grid md:grid-cols-5 gap-10">
                    <div className="md:col-span-2">
                        <div className="max-w-xs">
                            <button className="px-4 py-2 font-semibold bg-gray-700 text-white rounded-full">
                                Frequently Asked <span className='uppercase font-bold text-[#ffdb4f]'>Questions?</span>
                            </button>
                            <p className="mt-1 hidden md:block text-gray-600 dark:text-neutral-400">
                                Answers to the most frequently asked questions.
                            </p>
                        </div>
                    </div>
                    {/* End Col */}

                    {/* Accordion Items */}
                    <div className="md:col-span-3">
                        <div className="hs-accordion pt-6 pb-3">
                            <button
                                className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400"
                                onClick={() => toggleAccordion(1)}
                            >
                                My team has credits. How do we use them?
                                {openIndex === 1 ? (
                                    <FaChevronUp className="flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" />
                                ) : (
                                    <FaChevronDown className="flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" />
                                )}
                            </button>
                            {openIndex === 1 && (
                                <div className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300">
                                    <p className="text-gray-600 dark:text-neutral-400">
                                        Once your team signs up for a subscription plan. This is where we sit down, grab a cup of coffee and dial in the details.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="hs-accordion pt-6 pb-3">
                            <button
                                className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400"
                                onClick={() => toggleAccordion(2)}
                            >
                                How does Preline's pricing work?
                                {openIndex === 2 ? (
                                    <FaChevronUp className="flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" />
                                ) : (
                                    <FaChevronDown className="flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" />
                                )}
                            </button>
                            {openIndex === 2 && (
                                <div className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300">
                                    <p className="text-gray-600 dark:text-neutral-400">
                                        Our subscriptions are tiered. Understanding the task at hand and ironing out the wrinkles is key.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="hs-accordion pt-6 pb-3">
                            <button
                                className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400"
                                onClick={() => toggleAccordion(3)}
                            >
                                Upgrade License Type
                                {openIndex === 3 ? (
                                    <FaChevronUp className="flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" />
                                ) : (
                                    <FaChevronDown className="flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" />
                                )}
                            </button>
                            {openIndex === 3 && (
                                <div className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300">
                                    <p className="text-gray-600 dark:text-neutral-400">
                                        There may be times when you need to upgrade your license from the original type you purchased and we have a solution that ensures you can apply your original purchase cost to the new license purchase.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* End Accordion Items */}
                </div>
                {/* End Grid */}
            </div>
        </section>

    );
};

export default FAQ;
