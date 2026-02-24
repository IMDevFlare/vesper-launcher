import { Navigation } from "@/components/navigation";
import { DocsSidebar } from "@/components/DocsSidebar";
import { 
  ChevronRightIcon, 
  CalendarIcon, 
  ClockIcon,
  ClipboardIcon
} from "@heroicons/react/24/outline";
import blogs from "@/data/blogs.json";

export default function DocsPage() {
  // Use the first blog entry as a featured/main content for this demo page
  const mainDoc = blogs[0];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <DocsSidebar />

          {/* Content */}
          <div className="flex-1 max-w-3xl">
            {/* Breadcrumbs */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
              <span className="hover:text-foreground cursor-pointer transition-colors">Docs</span>
              <ChevronRightIcon className="h-4 w-4" />
              <span className="text-foreground font-medium">{mainDoc.category}</span>
              <ChevronRightIcon className="h-4 w-4" />
              <span className="truncate">{mainDoc.title}</span>
            </nav>

            {/* Header */}
            <header className="mb-10">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                {mainDoc.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Published {new Date(mainDoc.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1.5 border-l border-border pl-4">
                  <ClockIcon className="h-4 w-4" />
                  <span>Last updated: {new Date(mainDoc.lastUpdated).toLocaleString()}</span>
                </div>
              </div>
            </header>

            {/* Article Content */}
            <article className="prose prose-invert max-w-none">
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {mainDoc.description} Vesper Launcher provides a high-performance, modular environment 
                for your gaming needs. This guide will walk you through the essential steps to get 
                everything up and running smoothly.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-foreground">Quick Setup</h2>
              <p className="text-muted-foreground mb-6">
                To initialize the launcher with your custom settings, use the following CLI command:
              </p>

              {/* Code Snippet Section - Dark Theme */}
              <div className="relative group mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-purple-500/20 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative bg-[#0d1117] border border-white/10 rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                    <span className="text-xs font-mono text-zinc-400">terminal</span>
                    <button className="text-zinc-400 hover:text-white transition-colors">
                      <ClipboardIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="p-5 overflow-x-auto">
                    <pre className="font-mono text-sm text-zinc-300">
                      <code>
{`# Install the Vesper CLI
npm install -g @vesper/cli

# Initialize your project
vesper init --template=premium-dark

# Start the launcher
vesper start`}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mb-4 text-foreground">Advanced Configuration</h2>
              <p className="text-muted-foreground mb-6">
                You can further customize your experience by editing the <code>vesper.config.json</code> 
                file. This allows for deep integration with your existing workflows and assets.
              </p>

              {/* Another Code Snippet - JSON */}
              <div className="relative bg-[#0d1117] border border-white/10 rounded-lg overflow-hidden mb-8">
                <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                  <span className="text-xs font-mono text-zinc-400">vesper.config.json</span>
                </div>
                <div className="p-5 overflow-x-auto">
                  <pre className="font-mono text-sm text-zinc-300">
                    <code className="text-emerald-400">
{`{
  "theme": "vesper-dark",
  "optimization": {
    "memory": "4G",
    "jvm": "-XX:+UseG1GC"
  }
}`}
                    </code>
                  </pre>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>
    </div>
  );
}
