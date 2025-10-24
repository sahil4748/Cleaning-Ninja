import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Log the quote request (in production, integrate with email service like Resend)
    console.log('Quote request received:', body)

    // TODO: Integrate with Resend or your email service
    // Example with Resend:
    // const { Resend } = require('resend')
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'quotes@cleaningninja.co',
    //   to: 'hello@cleaningninja.co',
    //   subject: 'New Quote Request',
    //   html: `<div>
    //     <h2>New Quote Request</h2>
    //     <p><strong>Service:</strong> ${body.serviceType}</p>
    //     <p><strong>Property Type:</strong> ${body.propertyType}</p>
    //     <p><strong>Location:</strong> ${body.suburb}</p>
    //     <p><strong>Email:</strong> ${body.email}</p>
    //     <p><strong>Phone:</strong> ${body.phone}</p>
    //     <p><strong>Message:</strong> ${body.message || 'N/A'}</p>
    //   </div>`
    // })

    return NextResponse.json({ success: true, message: 'Quote request received' })
  } catch (error) {
    console.error('Quote API error:', error)
    return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 500 })
  }
}
