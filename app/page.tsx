import Speedometer from "@/app/speedometer";
import Input from "@/app/Input";

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
                    <Input/>
                    <p className={"text-2xl font-bold"}>This article is most likely:</p>
                    <div className="flex items-center gap-4">
                        <button className="btn btn-xl btn-error bg-[#FF471A] border-[#FF471A]">Fake</button>
                        <div className="flex items-center justify-center">
                            <Speedometer/>
                        </div>
                        <button className="btn btn-xl btn-success bg-[#6AD72D] border-[#6AD72D]">Real</button>
                    </div>
                </div>
            </div>

        </div>
    );
}
