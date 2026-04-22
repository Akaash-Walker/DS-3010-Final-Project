export default function Home() {
    return (
        <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 z-0 flex items-center justify-center opacity-25 scale-75 pointer-events-none">
                <img src="/wpi_roundel.png" alt="WPI roundel"/>
            </div>

            <div className="relative flex flex-col items-center gap-24">
                <p className="text-6xl font-bold">Fake News Detector</p>
                <div className={"flex flex-col items-center gap-4"}>
                    <input type={"text"} className="input" placeholder="input article here"/>
                    <div className={"flex gap-4"}>
                        <button className={"btn btn-success"}>Real</button>
                        <button className={"btn btn-error"}>Fake</button>
                    </div>
                </div>
            </div>

        </div>
    );
}
