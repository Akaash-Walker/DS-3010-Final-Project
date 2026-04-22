import Speedometer from "@/app/speedometer";


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
                    <p className={"text-2xl font-bold"}>This article is most likely:</p>
                    <div className="flex items-center gap-4">
                        <button className="btn btn-xl btn-error">Fake</button>
                        <div className="flex items-center justify-center">
                            <Speedometer/>
                        </div>
                        <button className="btn btn-xl btn-success">Real</button>
                    </div>
                </div>
            </div>

        </div>
    );
}
