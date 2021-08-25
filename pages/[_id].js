import { useRouter } from 'next/router'

const Kmls = ({ kmls }) => {
  const router = useRouter();
  const { _id } = router.query;
  return (
    <>
      <h1>eiei: {_id}</h1>
    </>
  )
}

export default Kmls