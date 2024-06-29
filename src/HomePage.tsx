import NavBar from "./components/ui/navbar";
import { Footer } from "./components/ui/footer";
import { Button } from "./components/ui/button";


function HomePage() {
    return (
        <>
            <NavBar />
            <main className='container flex items-center h-screen max-md:h-lvh max-md:inline-block max-md:py-16'>
                <div className='w-auto flex flex-col gap-10 max-md:gap-8'>
                    <h1 className="animate-slidein text-6xl md:leading-tight font-semibold text-sky-900 max-md:text-4xl max-md:min-w-max">Travel <br/>The Hell Out of It !</h1>
                    <p className="animate-slidein500 max-w-sm ml-1.5 text-lg text-gray-600">The World awaits !<br/> Explore new destinations,
                    meet new people and create unforgettable memories  </p>
                    <Button  className="animate-slidein700 ml-1 w-40 h-12 rounded-full font-semibold">
                        <a href="./home/Browse">Book Yours Tickets !</a>
                    </Button>
                </div> 
                <div className="w-3/4 flex flex-row-reverse md:w-full max-md:flex max-md:py-6 max-md:flex-row">
                    <img src="src\assets\pxfuel.jpg" className="w-5/6 h-auto rounded-xl opacity-90 md:ml-24 max-md:w-full"/>
                </div>
            </main>
            <div className="container mx-auto h-screen my-3">
                    <p className="text-xl font-semibold text-center max-md:text-lg text-gray-500">WHY CHOOSE US</p>
                    <p className="text-4xl mt-5 font-semibold text-center max-md:text-xl text-gray-600">Our Features</p>
                    <div className="my-24 py-8 grid grid-cols-3 gap-16 max-md:gap-6">
                        <div className="flex flex-col gap-5 items-center py-8 rounded-lg bg-gradient-to-r from-violet-400/40 to-purple-200/30 backdrop-blur-md border-slate-300/70 border-2 max-md:gap-3 max-md:px-3">
                            <img src="https://img.icons8.com/?size=100&id=mui3oke5Lft1&format=png&color=000000" />
                            <p className="text-2xl font-semibold text-center text-gray-700 max-md:text-xl">Effortless <br/> Booking</p>
                            <p className="text-base font-medium text-center text-black-500 max-md:text-sm">Book bus tickets in seconds from a vast <br/> network of operators and routes. Find the <br/> perfect trip, all at your fingertips</p>
                        </div>

                        <div className="flex flex-col gap-5 items-center py-8 rounded-lg bg-gradient-to-r from-violet-400/40 to-purple-200/30 backdrop-blur-md border-slate-300/70 border-2 max-md:gap-3 max-md:px-1">
                            <img src="https://img.icons8.com/?size=100&id=0BGf861PSTub&format=png&color=000000"/>
                            <p className="text-2xl font-semibold text-center text-gray-700 max-md:text-xl">Transparent <br/>Fares</p>
                            <p className="text-base font-medium text-center text-black-500 max-md:text-sm">See real-time fares and availability,<br/> with no hidden fees. Make decisions and secure <br/> your seats with confidence.</p>
                        </div>

                        <div className="flex flex-col gap-5 items-center py-8 rounded-lg bg-gradient-to-r from-violet-400/40 to-purple-200/30 backdrop-blur-md border-slate-300/70 border-2 max-md:gap-3 max-md:px-1">
                            <img src="https://img.icons8.com/?size=100&id=ckGxZhdwuIAp&format=png&color=000000" />
                            <p className="text-2xl font-semibold text-center text-gray-700 max-md:text-xl">Your Journey <br/> Simplified</p>
                            <p className="text-base font-medium  text-center text-black-500 max-md:text-sm">Track your bus live, manage bookings <br/> on the go, and enjoy a smooth ride <br/> with our user-friendly features.</p>
                        </div>
                    </div>
            </div>  
            <Footer />
        </>
    );
}

export default HomePage;