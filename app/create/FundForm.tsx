'use client'

export default function FundForm({ user }: any) {
  const createFund = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const tags = formData.get('tags') as String
    tags.split(',')

    const body = {
      name: formData.get('name'),
      description: formData.get('description'),
      usage: formData.get('usage'),
      amount: formData.get('amount'),
      tags,
      creatorId: user.id,
    }

    const res = await fetch('/api/create', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return (
    <div>
      <h2>Create your Fund</h2>
      <form onSubmit={createFund}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          placeholder='What is your fund called?'
        />
        <label htmlFor='description'>Description</label>
        <textarea
          name='description'
          cols={30}
          rows={10}
          placeholder='Description your fund in detail'
        ></textarea>
        <label htmlFor='usage'>Usage</label>
        <textarea
          name='usage'
          cols={30}
          rows={10}
          placeholder='How do you plan on using the fund amount?'
        ></textarea>
        <label htmlFor='amount'>Amount (in $)</label>
        <input type='number' name='amount' />
        <label htmlFor='tags'>Tags</label>
        <input
          type='text'
          name='tags'
          placeholder='health, education, sports, ...'
        />
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}
