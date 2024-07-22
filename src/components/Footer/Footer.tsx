import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="mt-auto bg-[rgb(4,48,47)] w-full">
            <div className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 lg:pt-20 mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    <div className="col-span-1">
                        <h4 className="font-semibold text-gray-100">Qiewcode</h4>
                        <div className="mt-3 grid space-y-3">
                            <p><Link className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200" to="/">Oui Sommes nous</Link></p>
                            <p><Link className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200" to="/#about">Nos services</Link></p>
                            <p><Link className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200" to="/#contact">Contactez nous</Link></p>
                        </div>
                    </div>

                    <div className="col-span-2">
                        <h4 className="font-semibold text-gray-100">+32 487618887</h4>
                        <h4 className="font-semibold text-gray-100">contact@Qiewcode.be</h4>
                        <form>
                            <div className="mt-4 flex flex-col gap-4 p-2 w-full">
                                <div className="flex flex-col lg:flex-row lg:gap-4 w-full">
                                    <div className="w-full lg:w-1/2">
                                        <label htmlFor="name-input" className="sr-only">Nom</label>
                                        <input type="text" id="name-input" name="name-input" className="py-3 px-4 block w-full border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Votre nom" />
                                    </div>
                                    <div className="w-full lg:w-1/2 mt-2 lg:mt-0">
                                        <label htmlFor="email-input" className="sr-only">Email</label>
                                        <input type="email" id="email-input" name="email-input" className="py-3 px-4 block w-full border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="E-mail" />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="message-input" className="sr-only">Message</label>
                                    <textarea id="message-input" name="message-input" className="py-3 px-4 block w-full border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Votre message" rows={4}></textarea>
                                </div>
                                <button className="w-full lg:w-auto flex-none whitespace-nowrap p-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[#ffdb4f] text-[#235552] hover:bg-[#ffd83c] disabled:opacity-50 disabled:pointer-events-none" type="submit">
                                    Envoyer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="mt-5 sm:mt-12 flex items-center justify-between lg:justify-center">
                    <p className="text-sm text-gray-400 lg:p-2">© 2024 Qiewcode.</p>
                    <p className="text-sm text-gray-400">
                        <Link className="text-gray-400 hover:text-gray-200" to="/conditions-generales">
                            Conditions Générales
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
