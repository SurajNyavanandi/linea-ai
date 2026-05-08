import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

function MainLayout() {
  return (
    <div className="h-screen bg-[#0f0f0f] text-white flex overflow-hidden">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}

export default MainLayout;