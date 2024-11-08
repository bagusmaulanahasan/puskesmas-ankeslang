import NightBG from "../assets/night-bg.jpg";

export default function ClosedPage() {
    return (
        <div
            className="h-screen text-white font-bold "
            style={{
                backgroundImage: `url(${NightBG})`,
                backgroundSize: `cover`,
            }}
        >
            <div className="ms-28 pt-36 flex flex-col gap-4">
                <h2 className="text-5xl">Puskesmas sedang tutup.</h2>
                <h2 className="text-5xl">Jam operasional: 08:00 - 21:00</h2>
            </div>
        </div>
    );
}
