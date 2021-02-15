import { createStoreon } from 'storeon'
import { storeonDevtools, storeonLogger } from 'storeon/devtools';
import { products } from './products'
// Initial state, reducers and business logic are packed in independent modules

export const store = createStoreon([
  products, 
  process.env.NODE_ENV !== 'production' && storeonDevtools,
  process.env.NODE_ENV !== 'production' && storeonLogger
])