import { MessageSquareMore, Plus, Search } from 'lucide-react'

export const Home = () => {
    return (
        <div className="h-screen  text-zinc-100 bg-zinc-100 font-semibold flex flex-col items-center justify-center">
            <h1 className="block text-zinc-700 text-4xl mb-6">
                Olá, Erico! 👋
            </h1>
            <main className="flex gap-5 h-3/4 p-5 bg-zinc-700 rounded-2xl w-3/5">
                <aside className="flex flex-col text-base bg-zinc-600 p-3 rounded-2xl min-w-80 gap-4">
                    <div className='flex gap-2 items-center'>
                        <button className='text-base flex-1 inline-flex gap-1 rounded-lg bg-green-600 p-4 hover:bg-white hover:text-green-600 transition-all duration-300'>
                            New Chat <Plus />
                        </button>
                        <button className='text-base py-4 px-3 flex items-center bg-zinc-800 rounded-lg'>
                            <Search />
                        </button>
                    </div>
                    <div className='py-2 border-t-2 text-xs border-zinc-500 px-1 border-b-2 text-zinc-200'>Latests chat's</div>
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
                <div className="flex-1 bg-zinc-100 rounded-lg relative overflow-hidden">
                    <div className='py-7 px-4 absolute top-0 left-0 w-full bg-zinc-400'>Erico</div>
                </div>
            </main>
        </div>
    )
}
