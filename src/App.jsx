
import NavBar from "./component/NavBar.jsx";
import Hero from "./component/Hero.jsx";
import ProductViewer from "./component/ProductViewer.jsx";
import  gsap from "gsap";
import { ScrollTrigger}    from 'gsap/all'

gsap.registerPlugin(ScrollTrigger);
function App(){
    return (
        <main>

            <NavBar/>
            <Hero/>
            <ProductViewer/>
        </main>

    )
}

export default App;