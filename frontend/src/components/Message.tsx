import { tv } from 'tailwind-variants'

const UsernameVariants = tv({
    base: 'text-xs text-zinc-600',
    variants: {
        isMine: {
            true: 'text-right',
            false: 'text-left',
        },
    },
})

const MessageContentVariants = tv({
    base: 'w-fit rounded-lg p-3 text-base max-w-96',
    variants: {
        isMine: {
            true: 'bg-green-300 self-end',
            false: 'bg-zinc-400',
        },
    },
})

interface MessageProps {
    content: string
    username: string
    isMine?: boolean
}

const Message = ({ content, username, isMine = false }: MessageProps) => {
    return (
        <div className="flex flex-col gap-1">
            <span className={UsernameVariants({ isMine })}>{username}</span>
            <div className={MessageContentVariants({ isMine })}>{content}</div>
        </div>
    )
}

export { Message }
