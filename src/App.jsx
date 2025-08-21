import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { lazy, Suspense } from "react"; // Import lazy and Suspense
import './App.css';
import DeepSeekChat from './deepseek_API/DeepSeekChat';
import { CopilotKit } from "@copilotkit/react-core"; 
import { CopilotPopup } from "@copilotkit/react-ui"; 
import "@copilotkit/react-ui/styles.css"; 

// Lazy load the components
const Admin = lazy(() => import("./components/Pages/Admin"));
const Product = lazy(() => import("./components/Pages/Product"));
const Cart = lazy(() => import("./components/Pages/cart"));
const BuyPage = lazy(() => import("./components/Pages/BuyPage"));

function App() {
  return (
    <CopilotKit publicApiKey="ck_pub_e0bf8025463b8f065f0400b10e1d3d77">
      <Router>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}> {/* Fallback UI while the component is loading */}
          <Routes>
            <Route path="/" element={<Admin />} />
            <Route path="/Product" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/buy" element={<BuyPage />} />
          </Routes>
        </Suspense>
        <DeepSeekChat />
        <CopilotPopup
          instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
          labels={{
            title: "Popup Assistant",
            initial: "Need any help?", 
          }}
          debug={false} // Disable debug mode if supported
          branding={false} // Disable branding if the library supports
        />
      </Router>
    </CopilotKit>
  );
}

export default App;






















// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Navbar } from "./components/Navbar/Navbar";
// import { lazy, Suspense } from "react"; // Import lazy and Suspense
// import { CopilotKit } from "@copilotkit/react-core"; 
// import { CopilotPopup } from "@copilotkit/react-ui"; 
// import "@copilotkit/react-ui/styles.css"; 
// import './App.css';

// // Lazy load the components
// const Admin = lazy(() => import("./components/Pages/Admin"));
// const Product = lazy(() => import("./components/Pages/Product"));
// const Cart = lazy(() => import("./components/Pages/cart"));
// const BuyPage = lazy(() => import("./components/Pages/BuyPage"));

// function App() {
//   return (
//     <CopilotKit publicApiKey="ck_pub_e0bf8025463b8f065f0400b10e1d3d77">
//       <Router>
//         <Navbar />
//         <Suspense fallback={<div>Loading...</div>}> {/* Fallback UI while the component is loading */}
//           <Routes>
//             <Route path="/" element={<Admin />} />
//             <Route path="/Product" element={<Product />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/buy" element={<BuyPage />} />
//           </Routes>
//         </Suspense>

//         <CopilotPopup
//           instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
//           labels={{
//             title: "Popup Assistant",
//             initial: "Need any help?",
//           }}
//           debug={false} // Disable debug mode if supported
//           branding={false} // Disable branding if the library supports this option
//         />
//       </Router>
//     </CopilotKit>
//   );
// }

// export default App;