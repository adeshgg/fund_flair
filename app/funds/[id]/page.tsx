export default async function Fund({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Hi from the fund</h1>
      <p>Fund Id: {params.id}</p>
    </div>
  )
}
