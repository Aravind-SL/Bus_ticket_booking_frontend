import { Button } from "./components/ui/button";


function HomePage() {
    return (
        <>
            <main className='container flex items-center h-screen space-x-16 max-md:h-lvh max-md:inline-block max-md:py-16'>
                <div className='flex flex-col w-auto gap-10 max-md:gap-8'>
                    <h1 className="text-6xl font-semibold animate-slidein md:leading-tight text-sky-900 max-md:text-4xl max-md:min-w-max">Travel <br/>The Hell Out of It !</h1>
                    <p className="animate-slidein500 max-w-sm ml-1.5 text-lg text-gray-600">The World awaits !<br/> Explore new destinations,
                    meet new people and create unforgettable memories  </p>
                    <Button asChild className="ml-1 font-semibold rounded-full w-fit animate-slidein700">
                        <a href="/book">Book Yours Tickets !</a>
                    </Button>
                </div> 
                <div className="flex flex-row-reverse w-5/6 md:w-full max-md:flex max-md:py-6 max-md:flex-row">
                    <img src="src\assets\pxfuel.jpg" className="h-auto rounded-xl opacity-90 md:ml-24 max-md:w-full"/>
                </div>
            </main>
            <div className="container h-screen mx-auto my-3">
                    <p className="text-xl font-semibold text-center text-gray-500 max-md:text-lg">WHY CHOOSE US</p>
                    <p className="mt-5 text-4xl font-semibold text-center text-gray-600 max-md:text-xl">Our Features</p>
                    <div className="py-8 my-24 grid grid-cols-3 gap-16 max-md:gap-6">
                        <div className="flex flex-col items-center py-8 border-2 rounded-lg gap-5 bg-gradient-to-r from-violet-400/40 to-purple-200/30 backdrop-blur-md border-slate-300/70 max-md:gap-3 max-md:px-3">
                            <img src="https://img.icons8.com/?size=100&id=mui3oke5Lft1&format=png&color=000000" />
                            <p className="text-2xl font-semibold text-center text-gray-700 max-md:text-xl">Effortless <br/> Booking</p>
                            <p className="text-base font-medium text-center text-black-500 max-md:text-sm">Book bus tickets in seconds from a vast <br/> network of operators and routes. Find the <br/> perfect trip, all at your fingertips</p>
                        </div>

                        <div className="flex flex-col items-center py-8 border-2 rounded-lg gap-5 bg-gradient-to-r from-violet-400/40 to-purple-200/30 backdrop-blur-md border-slate-300/70 max-md:gap-3 max-md:px-1">
                            <img src="https://img.icons8.com/?size=100&id=0BGf861PSTub&format=png&color=000000"/>
                            <p className="text-2xl font-semibold text-center text-gray-700 max-md:text-xl">Transparent <br/>Fares</p>
                            <p className="text-base font-medium text-center text-black-500 max-md:text-sm">See real-time fares and availability,<br/> with no hidden fees. Make decisions and secure <br/> your seats with confidence.</p>
                        </div>

                        <div className="flex flex-col items-center py-8 border-2 rounded-lg gap-5 bg-gradient-to-r from-violet-400/40 to-purple-200/30 backdrop-blur-md border-slate-300/70 max-md:gap-3 max-md:px-1">
                            <img src="https://img.icons8.com/?size=100&id=ckGxZhdwuIAp&format=png&color=000000" />
                            <p className="text-2xl font-semibold text-center text-gray-700 max-md:text-xl">Your Journey <br/> Simplified</p>
                            <p className="text-base font-medium text-center text-black-500 max-md:text-sm">Track your bus live, manage bookings <br/> on the go, and enjoy a smooth ride <br/> with our user-friendly features.</p>
                        </div>
                    </div>
            </div>  
        </>
    );
}

export default HomePage;
