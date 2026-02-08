export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8">
            <div className="text-center max-w-2xl">
                <h1 className="text-5xl font-serif font-bold mb-6">
                    Rooted
                </h1>
                <p className="text-xl text-muted mb-8">
                    Discover the fascinating origins of one word every day.
                </p>
                <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
                    <p className="text-lg text-foreground">
                        🌱 Coming soon: Today&apos;s word will appear here.
                    </p>
                    <p className="text-sm text-muted mt-4">
                        API endpoint: <code className="bg-gray-100 px-2 py-1 rounded">/api/word/today</code>
                    </p>
                </div>
            </div>
        </main>
    );
}
