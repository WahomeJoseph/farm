import connectDB from '@/lib/db'
import Product from '@/models/Product'
import { NextResponse } from 'next/server'

// Add a new product
export async function POST(request) {
  try {
    await connectDB()
    const { name, category, price, weight, description, image } = await request.json()

    if (!name || !category || !price || !weight || !description || !image) {
      return NextResponse.json(
        { message: 'All fileds are required!' },
        { status: 400 }
      )
    }

    const validCategories = ['Piglets', 'Gilts', 'Boars', 'Sows', 'Manure']
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { message: 'Invalid category' },
        { status: 400 }
      )
    }

    const newProduct = await Product.create({
      name,
      category,
      price,
      weight,
      description,
      image,
    })

    return NextResponse.json(
      { message: 'Product added successfully', product: newProduct },
      { status: 201 }
    )
  } catch (error) {
    console.error('POST error:', error)
    return NextResponse.json(
      { message: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

// Get all products
export async function GET() {
  try {
    await connectDB()
    const products = await Product.find().lean()
    return NextResponse.json(
      { message: 'Products fetched successfully', products },
      { status: 200 }
    )
  } catch (error) {
    console.error('GET error:', error)
    return NextResponse.json(
      { message: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}