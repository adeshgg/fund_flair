'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export default function FundForm() {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const createFund = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    let tags = formData.get('tags') as String
    const tagsArray = tags?.split(',')

    const body = {
      name: formData.get('name'),
      description: formData.get('description'),
      usage: formData.get('usage'),
      amount: Number(formData.get('amount')),
      tags: tagsArray.map(item => item.trim()),
    }

    setIsLoading(true)

    const res = await fetch('/api/create', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    setIsLoading(false)
    if (res.status === 200) {
      toast.success('Fund created')
      setTimeout(() => {
        router.push('/dashboard')
        router.refresh()
      }, 500)
    } else toast.error('Please try again')

    router.refresh()
  }

  return (
    <div className='p-10'>
      <h2 className='m-4 ml-0 font-bold text-1xl md:text-2xl lg:text-4xl'>
        Create your Fund
      </h2>
      <form onSubmit={createFund}>
        <label
          htmlFor='name'
          className='block mb-1 text-gray-700 text-sm font-semibold text-left'
        >
          Name
        </label>
        <input
          type='text'
          name='name'
          className='border border-gray-300 w-full p-2 rounded-md mb-4'
          placeholder='What is your fund called?'
        />
        <label
          htmlFor='description'
          className='block mb-1 text-gray-700 text-sm font-semibold text-left'
        >
          Description
        </label>
        <textarea
          name='description'
          cols={30}
          rows={10}
          className='border border-gray-300 w-full p-2 rounded-md mb-4'
          placeholder='Description your fund in detail'
        ></textarea>
        <label
          htmlFor='usage'
          className='block mb-1 text-gray-700 text-sm font-semibold text-left'
        >
          Usage
        </label>
        <textarea
          name='usage'
          cols={30}
          rows={10}
          className='border border-gray-300 w-full p-2 rounded-md mb-4'
          placeholder='How do you plan on using the fund amount?'
        ></textarea>
        <label
          htmlFor='amount'
          className='block mb-1 text-gray-700 text-sm font-semibold text-left'
        >
          Amount (in ₹)
        </label>
        <input
          type='number'
          name='amount'
          className='border border-gray-300 w-full p-2 rounded-md mb-4'
        />
        <label
          htmlFor='tags'
          className='block mb-1 text-gray-700 text-sm font-semibold text-left'
        >
          Tags
        </label>
        <input
          type='text'
          name='tags'
          placeholder='health, education, sports, ...'
          className='border border-gray-300 w-full p-2 rounded-md mb-4'
        />
        <button
          type='submit'
          className='block bg-blue-500 text-white py-2 px-4 rounded-md'
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  )
}
