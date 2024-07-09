
type KeyValue = {
  key: string,
  value: string,
}
interface DetailsDisplayProps {
  keyValues: KeyValue[]
}
export default ({keyValues}: DetailsDisplayProps) => {
  return ( 
      <article className='flex flex-col items-center'>
        {keyValues.map((kv, i) => (
          <div className='inline-flex justify-start w-full space-x-2' key={i}>
            <span className='w-1/2 text-right'>{kv.key} :</span>
            <span className='w-1/2 '>{kv.value}</span>
          </div>
        ) )}
      </article>
      )
}
