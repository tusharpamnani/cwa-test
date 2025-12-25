export default function VoteButton({
    label,
    onClick
  }: {
    label: string
    onClick: () => void
  }) {
    return (
      <button
        onClick={onClick}
        className="w-full px-4 py-2 border rounded hover:bg-gray-100"
      >
        {label}
      </button>
    )
  }
  