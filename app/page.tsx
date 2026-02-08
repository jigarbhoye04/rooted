import { getWordByDate, getTodayDateString } from '@/src/lib/db';
import { NotFoundErrors } from '@/src/schemas/apiResponses';

export default async function Home() {
    const today = getTodayDateString();
    const word = await getWordByDate(today);

    if (!word) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-[#FDFCF9]">
                <div className="text-center max-w-2xl bg-white p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#E9E4D9]">
                    <h1 className="text-4xl font-serif text-[#2C2C2C] mb-4">No Word Today</h1>
                    <p className="text-[#666666] italic">Check back later for your daily etymology fix.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-[#FDFCF9]">
            <div className="text-center max-w-3xl w-full animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <span className="inline-block px-4 py-1.5 mb-8 text-xs font-semibold tracking-widest text-[#6F4E37] uppercase bg-[#6F4E37]/10 rounded-full">
                    Word of the Day • {word.publish_date}
                </span>

                <h1 className="text-7xl font-serif font-black text-[#2C2C2C] mb-6 tracking-tight">
                    {word.word}
                </h1>

                <div className="flex justify-center items-center gap-4 mb-10 text-[#666666]">
                    <span className="text-2xl font-serif italic">{word.phonetic}</span>
                </div>

                <div className="bg-white p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#E9E4D9] mb-12 relative overflow-hidden group">
                    <div
                        className="absolute top-0 left-0 w-full h-1.5"
                        style={{ backgroundColor: word.accent_color }}
                    />

                    <p className="text-2xl leading-relaxed text-[#444444] font-medium mb-6">
                        {word.definition}
                    </p>

                    <div className="pt-8 border-t border-[#F0EDE6] text-left">
                        <h3 className="text-xs font-bold text-[#A69F88] uppercase tracking-widest mb-4">Quick Insight</h3>
                        <p className="text-lg text-[#555555]">
                            {word.content_json.hook}
                        </p>
                    </div>
                </div>

                <p className="text-[#A69F88] text-sm font-medium hover:text-[#6F4E37] transition-colors cursor-pointer">
                    Scroll to explore the journey of {word.word.toLowerCase()} →
                </p>
            </div>
        </main>
    );
}
