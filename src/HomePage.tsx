import NavBar from "./components/ui/navbar";
import { Footer } from "./components/ui/footer";
import { Button } from "./components/ui/button";


function HomePage() {
    return (
        <>
            <NavBar />
            <main className="container flex items-center h-screen">
                    <div className='w-auto flex flex-col gap-10'>
                        <h1 className="animate-slidein text-6xl md:leading-tight font-semibold text-sky-900 max-md:text-4xl ">Travel <br/>The Hell Out of It !</h1>
                        <p className="animate-slidein500 max-w-sm ml-1.5 text-lg text-gray-600">The World awaits !<br/> Explore new destinations,
                        meet new people and create unforgettable memories  </p>
                        <Button  className="animate-slidein700 ml-1 w-40 h-12 rounded-full font-semibold">
                            <a href="./home/Browse">Book Yours Tickets !</a>
                        </Button>
                    </div> 
                    <div className="w-3/4 flex flex-row-reverse md:w-full">
                        <img src="src\assets\pxfuel.jpg" className="w-5/6 h-auto rounded-xl opacity-90 md:ml-24 "/>
                    </div>
                    
            </main>
            <Footer />
        </>
    );
}

export default HomePage;