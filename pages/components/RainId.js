import Link from 'next/link'

export default function RainId({ data }) {
  console.log(data)
  return (
    <div>
      <li>
        <Link href="/rains/[id]" as={`/rains/${data._id}`}>
          <a>{data.id}</a>
        </Link>
      </li>
    </div>
  )
}
