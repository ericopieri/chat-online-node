import { MessageSquareMore, Plus } from 'lucide-react'

export const Home = () => {
    return (
        <div className="h-screen bg-zinc-400 text-zinc-100 font-semibold flex flex-col items-center justify-center">
            <h1 className="block text-zinc-700 text-4xl mb-6">
                Olá, Erico! 👋
            </h1>
            <main className="flex gap-5 h-3/4 p-5 bg-zinc-700 rounded-2xl w-3/5">
                <aside className="flex flex-col text-base bg-zinc-600 p-3 rounded-2xl min-w-80 gap-4">
                    <button className="self-start">
                        New Message <Plus />
                    </button>
                    <a
                        href="#"
                        className="flex items-center gap-2 p-3 hover:bg-zinc-500 rounded-lg transition-all"
                    >
                        <MessageSquareMore />
                        Erico
                    </a>
                    <a
                        href="#"
                        className="flex items-center gap-2 p-3 hover:bg-zinc-500 rounded-lg transition-all"
                    >
                        <MessageSquareMore />
                        Igor
                    </a>
                    <a
                        href="#"
                        className="flex items-center gap-2 p-3 hover:bg-zinc-500 rounded-lg transition-all"
                    >
                        <MessageSquareMore />
                        Gustavo
                    </a>
                    <a
                        href="#"
                        className="flex items-center gap-2 p-3 hover:bg-zinc-500 rounded-lg transition-all"
                    >
                        <MessageSquareMore />
                        Ademas
                    </a>
                </aside>
                <div className="flex-1">Erico</div>
            </main>
        </div>
    )
}
