import { createClient } from '@supabase/supabase-js';

// Use environment variables from your .env file
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Example function to create an order
export async function createOrder() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        customer_name: 'Ali',
        customer_phone: '+47 123 45 678',
        items: [
          {
            id: '1',
            name: 'Kebab',
            price: 140,
            quantity: 1
          }
        ],
        total_amount: 140,
        status: 'pending',
        payment_method: 'cash',
        notes: 'Extra sauce please'
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating order:', error);
      return { data: null, error };
    }

    console.log('Order created successfully:', data);
    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { data: null, error: err };
  }
}

// Example usage
// createOrder().then(({ data, error }) => {
//   if (error) {
//     console.error('Failed to create order:', error);
//   } else {
//     console.log('Order created:', data);
//   }
// });