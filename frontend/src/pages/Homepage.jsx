import QueueList from "../fragments/QueueList";
import BackgroundHomePage from "../assets/copy-space-medical-workspace.jpg";

const HomePage = () => {
    return (
        <div
            className="h-screen w-screen flex flex-col items-center"
            style={{
                backgroundImage: `url(${BackgroundHomePage})`,
                backgroundSize: `cover`,
            }}
        >
            <div className="backdrop-blur-md p-6 rounded-xl text-white">
                <h1>Welcome to Ankeslang</h1>
            </div>
            <div className="w-2/3 pb-10">
                <QueueList />
            </div>
        </div>
    );
};

export default HomePage;
