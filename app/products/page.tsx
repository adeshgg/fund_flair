'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'
import Modal from '@/components/Modal'

const products = [
  {
    id: 1,
    name: 'Cap',
    description: 'White Colored Cap',
    href: '#',
    imageSrc:
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=500',
    imageAlt: 'White Colored Cap',
    price: 5,
  },
  {
    id: 1,
    name: 'Zip Tote Basket',
    description: 'Carry your stuff in style',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg',
    imageAlt:
      'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
    price: 750,
  },
  {
    id: 1,
    name: 'Desk Globe',
    description: 'World at fingertips',
    href: '#',
    imageSrc:
      'https://images.unsplash.com/photo-1593632717071-218c1d85c663?w=500&h=500',
    imageAlt: 'Desk Globe on white table',
    price: 5000,
  },
  {
    id: 1,
    name: 'Shoes',
    description: 'Shoes for all occasions',
    href: '#',
    imageSrc:
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&h=500',
    imageAlt: 'A Colorful pair of shoes',
    price: 10000,
  },
  {
    id: 1,
    name: 'Digital Tablet',
    description: 'Create what you love',
    href: '#',
    imageSrc:
      'https://images.unsplash.com/photo-1585770536735-27993a080586?w=500&h=500',
    imageAlt:
      'Digital Tablet with white screen, black canvas back, and white pencil.',
    price: 15000,
  },
  // More products...
]

export default function Products() {
  const [rewards, setRewards] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [productPrice, setProductPrice] = useState(0)

  useEffect(() => {
    fetchRewards()
  }, [showModal])

  async function fetchRewards() {
    const res = await fetch('/api/rewards')
    const data = await res.json()
    setRewards(data.rewards)
  }

  return (
    <div className='p-10'>
      <h2 className='m-4 ml-0 font-bold text-1xl md:text-2xl lg:text-4xl'>
        Products
      </h2>
      <div className='mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {products.map(product => (
          <div key={product.id}>
            <div className='relative'>
              <div className='relative w-full h-72 rounded-lg overflow-hidden'>
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className='w-full h-full object-center object-cover'
                />
              </div>
              <div className='relative mt-4'>
                <h3 className='text-sm font-medium text-gray-900'>
                  {product.name}
                </h3>
                <p className='mt-1 text-sm text-gray-500'>
                  {product.description}
                </p>
              </div>
              <div className='absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden'>
                <div
                  aria-hidden='true'
                  className='absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50'
                />
                <p className='relative text-lg font-semibold text-white'>
                  {product.price} coins
                </p>
              </div>
            </div>
            <div className='mt-6'>
              <button
                onClick={() => {
                  setShowModal(true)
                  setProductPrice(product.price)
                }}
                className={clsx(
                  'relative w-full flex border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium',
                  {
                    'bg-blue-500 hover:bg-blue-600 text-white':
                      rewards >= product.price,
                    'bg-gray-100 hover:bg-gray-200 text-gray-900 cursor-not-allowed':
                      rewards < product.price,
                  }
                )}
                disabled={rewards < product.price}
              >
                Redeem Coins<span className='sr-only'>, {product.name}</span>
              </button>
              {showModal && (
                <Modal price={productPrice} setShowModal={setShowModal} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
