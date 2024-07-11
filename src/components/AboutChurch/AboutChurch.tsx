

const AboutChurch = ({ savedBgColor, churchLogo, churchAbout, churchTitle }: any) => {
    return (
        <section className={`${!savedBgColor ? 'bg-gradient-to-br from-[rgb(4,48,47)] via-[rgba(8,57,54,1)] to-[rgba(4,48,47,1)]' : ''}`} style={{ backgroundColor: savedBgColor }} id="about">
            <div className=" lg:container px-6 py-16 mx-auto">
                <div className="items-center lg:flex">
                    <div className="w-full lg:w-1/2">
                        <div className="lg:max-w-lg">
                            <h1 className="text-3xl font-semibold text-white lg:text-4xl">
                                {churchTitle}
                            </h1>

                            <p className="mt-3 text-white">
                                {churchAbout}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
                        <img
                            className="w-40 h-40 md:w-24 md:h-24 lg:w-[50%] lg:h-[50%] mt-4"
                            src={churchLogo}
                            alt="Church Logo"
                        />
                    </div>
                </div>
            </div>
        </section >
    )
}

export default AboutChurch