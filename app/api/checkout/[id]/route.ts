import { NextResponse, NextRequest } from 'next/server'

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27',
})

export async function GET(request, context) {
  const id = context.params.id

  const session = await stripe.checkout.sessions.retrieve(id)
  return NextResponse.json({ session })
}
