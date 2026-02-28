"use client";

export default function Roadmap() {
    return (
        <div className="min-h-screen relative overflow-hidden flex flex-col selection:bg-brand-accent/30 selection:text-brand-accent">
            {/* Subtle Dot Grid Background */}
            <div className="fixed inset-0 z-[-2] bg-background" />
            <div
                className="fixed inset-0 z-[-1] opacity-20 dark:opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a0a0a0' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                    maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)"
                }}
            />

            {/* Vesper Ambient Glow */}
            <div className="fixed top-0 left-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

            <main className="flex-1 w-full pt-24 flex flex-col items-center justify-center">
                <section className="max-w-4xl px-4 mx-auto text-center flex flex-col items-center">
                    <h1 className="text-5xl md:text-7xl font-bold text-center tracking-tight text-foreground mb-6">
                        Vesper <span className="text-brand-accent italic">Roadmap</span>
                    </h1>
                    <p className="mt-2 text-lg md:text-xl text-muted-foreground mb-10">
                        Here’s what we’re building, what’s brewing, and where we want to take Vesper. <br />
                        No hype—just a clear path. Some things in motion, others on the horizon.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full text-left text-base md:text-lg">
                        {/* Planned Features */}
                        <div>
                            <h2 className="text-2xl font-semibold text-brand-accent mb-3">Planned</h2>
                            <div className="pl-6 py-2 text-muted-foreground text-lg">NaN</div>
                        </div>
                        {/* In Progress */}
                        <div>
                            <h2 className="text-2xl font-semibold text-brand-accent mb-3">In Progress</h2>
                            <div className="pl-6 py-2 text-muted-foreground text-lg">NaN</div>
                        </div>
                        {/* Experimental/Long-Term */}
                        <div>
                            <h2 className="text-2xl font-semibold text-brand-accent mb-3">Long-Term & Experiments</h2>
                            <div className="pl-6 py-2 text-muted-foreground text-lg">NaN</div>
                        </div>
                    </div>
                    <div className="mt-14 text-muted-foreground text-center text-sm px-2">
                        <span>
                            This roadmap reflects our <span className="text-brand-accent font-medium">intentions</span>, not official promises.<br />
                            {/* Want to suggest something or see progress? <a className="underline hover:text-brand-accent" target="_blank" href="https://github.com/vespermc/vesper">Contribute on GitHub</a> or join the discussion. */}
                            Want to suggest something or see progress? <a className="underline hover:text-brand-accent" target="_blank" href="https://github.com/IMDevFlare/vesper-website">Contribute on GitHub</a> or join the discussion.
                        </span>
                    </div>
                </section>
            </main>
        </div>
    );
}