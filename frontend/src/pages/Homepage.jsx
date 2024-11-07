import QueueList from "../fragments/QueueList";

const HomePage = () => {
    return (
        <div className="w-screen">
            <div className="p-4 border flex justify-center w-screen">
                <QueueList />
            </div>
        </div>
    );
};

export default HomePage;
