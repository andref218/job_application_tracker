import HeroCarousel from "@/components/HeroCarousel";

import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth/auth-server";
import {
  ArrowRight,
  BarChart2,
  Briefcase,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1 bg-blue-50">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-32">
          <div className="flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left">
            <div className="lg:w-1/2 sm:px-4">
              <h1 className="text-black mb-6 text-6xl font-bold">
                A better way to track your job applications.
              </h1>
              <p className="text-muted-foreground mb-5 text-xl">
                Capture, organize and manage your job search in one place.
              </p>
              {session?.user ? (
                <>
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="h-12 px-5 font-medium cursor-pointer"
                    >
                      Dashboard
                      <ArrowRight className="ml-2" />
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/sign-up">
                    <Button
                      size="lg"
                      className="h-12 px-5 font-medium cursor-pointer"
                    >
                      Start for free
                      <ArrowRight className="ml-2" />
                    </Button>
                  </Link>

                  <p className="text-sm text-muted-foreground mt-5">
                    Free forever. No credit card required.
                  </p>
                </>
              )}
            </div>
            {/* Images Section inside Hero */}
            <div className="lg:w-1/2 relative w-full">
              <HeroCarousel />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t bg-white py-10 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl ">
              <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 ">
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 justify-between">
                    <h3 className="mb-3 text-2xl font-semibold text-black">
                      Organize Applications
                    </h3>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    Create custom boards and columns to track your job
                    applications at every stage of the process.
                  </p>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 justify-between">
                    <h3 className="mb-3 text-2xl font-semibold text-black">
                      Track Progress
                    </h3>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  <p className="text-muted-foreground">
                    Monitor your application status from applied to interview to
                    offer with visual Kanban boards.
                  </p>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 justify-between">
                    <h3 className="mb-3 text-2xl font-semibold text-black">
                      Stay Organized
                    </h3>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  <p className="text-muted-foreground">
                    Never lose track of an application. Keep all your job search
                    information in one centralized place.
                  </p>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 justify-between">
                    <h3 className="mb-3 text-2xl font-semibold text-black">
                      Insights & Analytics
                    </h3>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <BarChart2 className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  <p className="text-muted-foreground">
                    Visualize trends and metrics from your job applications to
                    make smarter decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
