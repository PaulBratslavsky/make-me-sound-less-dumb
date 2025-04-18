import { TextImprover } from "@/components/custom/text-improver"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 md:p-8 bg-gradient-to-b from-white to-gray-50">
      <div className="w-full max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2">MakeMeSoundLessDumb</h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Transform your casual writing into polished, professional text
          </p>
        </header>

        <TextImprover />

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} MakeMeSoundLessDumb. All rights reserved.</p>
        </footer>
      </div>
    </main>
  )
}
