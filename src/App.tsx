import Header from "./header/header"
import SideBar from "./sidebar/sidebar";

function App() {
  return (
    <div>
      <Header />
      <div className="w-screen h-px bg-zinc-200"></div>
      <SideBar />
    </div>
  )
}

export default App
