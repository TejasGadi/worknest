import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle, FileText, Users, Calendar, Search, Database, Sparkles, ArrowRight } from "lucide-react"
import { SignedOut, SignedIn, SignInButton, UserButton } from "@clerk/clerk-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col mx-auto">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <FileText className="h-6 w-6" />
            <span>WorkNest</span>
          </div>
          <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button size="lg">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          </div>
        </div>
      </header>
      <main className="flex-1 mx-auto">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    All your work in one place. Organized and easy to find.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    WorkNest brings structured editing and seamless teamwork into one powerful workspace. Collaborate with your team, organize your work, and boost productivity.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <SignedOut>
                    <SignInButton mode="modal">
                      <Button size="lg">
                        Get started
                      </Button>
                    </SignInButton>
                  </SignedOut>
                  {/* <Button variant="outline" size="lg" asChild>
                    <Link href="#demo">Watch Demo</Link>
                  </Button> */}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-full overflow-hidden rounded-lg border shadow-xl">
                  <Image
                    src="/images/Dashboard.png"
                    alt="WorkNest Dashboard Preview"
                    fill
                    className="object-scale-down"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Everything you need to stay organized
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  WorkNest brings a powerful block-based editor to help you organize content effortlessly.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Rich Documents</h3>
                <p className="text-center text-muted-foreground">
                  Create beautiful, functional docs with our powerful editor. Add images, code blocks, and more.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Team Collaboration</h3>
                <p className="text-center text-muted-foreground">
                  Work together in real-time and share documents with your team.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">AI Assistant</h3>
                <p className="text-center text-muted-foreground">
                  Get help with writing, summarizing, translation and organizing your content with our built-in AI assistant.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* App Screenshot Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Your workspace, your way
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Customize your workspace to fit your workflow. Create pages, databases, and wikis that work for you.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-6xl py-12">
              <div className="relative w-full overflow-hidden rounded-lg border shadow-xl aspect-video">
                <Image
                  src="/images/Dashboard.png"
                  alt="WorkNest Interface"
                  fill
                  className=""
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Loved by teams worldwide</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See what our users have to say about how WorkNest has transformed their productivity.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col justify-between space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    "WorkNest has completely transformed how our team collaborates. Everything is in one place, and it's
                    so easy to find what we need."
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-muted h-10 w-10"></div>
                  <div>
                    <p className="text-sm font-medium">Sarah Johnson</p>
                    <p className="text-xs text-muted-foreground">Product Manager at Acme Inc.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    "The flexibility of WorkNest is incredible. We use it for everything from project management to our
                    company wiki. It's become our digital HQ."
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-muted h-10 w-10"></div>
                  <div>
                    <p className="text-sm font-medium">Michael Chen</p>
                    <p className="text-xs text-muted-foreground">CTO at StartupX</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    "As a freelancer, I needed a tool to keep all my client work organized. WorkNest is perfect - I can
                    create custom databases for each project and client."
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-muted h-10 w-10"></div>
                  <div>
                    <p className="text-sm font-medium">Emma Rodriguez</p>
                    <p className="text-xs text-muted-foreground">Independent Designer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <footer className="w-full border-t bg-background justify-center">
        <div className="mx-auto container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex items-center gap-2 font-bold">
            <FileText className="h-5 w-5" />
            <span>WorkNest</span>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} WorkNest. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

