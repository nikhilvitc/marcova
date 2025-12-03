# Inquiries Feature Setup Guide

## Overview
This guide will help you set up the inquiries/contact form feature for your Marcova website.

## Prerequisites
- Access to your Supabase dashboard
- Supabase project URL and anon key configured in `.env.local`

## Setup Steps

### 1. Create the Inquiries Table in Supabase

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **SQL Editor** from the left sidebar
4. Click **New Query**
5. Copy and paste the following SQL:

```sql
-- Create updated_at function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'responded', 'resolved')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries(email);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);

-- Create updated_at trigger
CREATE TRIGGER update_inquiries_updated_at 
  BEFORE UPDATE ON inquiries 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can create inquiries (for contact form submissions)
CREATE POLICY "Anyone can create inquiries" 
  ON inquiries FOR INSERT 
  WITH CHECK (true);

-- Policy: Anyone can read inquiries (you can restrict this later)
CREATE POLICY "Anyone can view inquiries" 
  ON inquiries FOR SELECT 
  USING (true);

-- Policy: Authenticated users can update inquiries (for admin panel)
CREATE POLICY "Authenticated users can update inquiries" 
  ON inquiries FOR UPDATE 
  TO authenticated 
  USING (true);

-- Policy: Authenticated users can delete inquiries
CREATE POLICY "Authenticated users can delete inquiries" 
  ON inquiries FOR DELETE 
  TO authenticated 
  USING (true);
```

6. Click **Run** to execute the query

### 2. Verify the Table

1. In Supabase Dashboard, go to **Table Editor**
2. You should see the `inquiries` table listed
3. Click on it to verify the columns:
   - id (UUID)
   - name (TEXT)
   - email (TEXT)
   - phone (TEXT)
   - subject (TEXT)
   - message (TEXT)
   - status (TEXT)
   - admin_notes (TEXT)
   - created_at (TIMESTAMP)
   - updated_at (TIMESTAMP)

### 3. Test the Contact Form

1. Visit your website: http://localhost:3000/contact
2. Fill out the contact form with test data
3. Click "Send Message"
4. You should see a success message

### 4. Check Admin Panel

1. Login to admin: http://localhost:3000/admin/login
2. Navigate to **Inquiries** from the admin menu
3. You should see the test inquiry you just submitted
4. You can:
   - View inquiry details
   - Mark as responded/resolved
   - Delete inquiries
   - Add admin notes

## Table Structure

### inquiries Table Schema

| Column      | Type      | Description                                    |
|-------------|-----------|------------------------------------------------|
| id          | UUID      | Primary key (auto-generated)                   |
| name        | TEXT      | Customer's full name                           |
| email       | TEXT      | Customer's email address                       |
| phone       | TEXT      | Customer's phone number (optional)             |
| subject     | TEXT      | Inquiry subject (optional)                     |
| message     | TEXT      | Customer's message                             |
| status      | TEXT      | pending, responded, or resolved                |
| admin_notes | TEXT      | Internal notes from admin (optional)           |
| created_at  | TIMESTAMP | When the inquiry was created                   |
| updated_at  | TIMESTAMP | When the inquiry was last updated              |

## Troubleshooting

### "Inquiries table not created yet" Error
- Make sure you ran the SQL query in Supabase SQL Editor
- Check that the table appears in Table Editor
- Verify RLS policies are enabled

### Contact Form Not Submitting
- Check browser console for errors
- Verify Supabase credentials in `.env.local`
- Make sure the `inquiries` table exists
- Check RLS policies allow INSERT operations

### Admin Panel Not Showing Inquiries
- Verify the table has data (check in Supabase Table Editor)
- Check browser console for errors
- Ensure RLS policies allow SELECT operations
- Try refreshing the admin page

## Security Notes

1. **Row Level Security (RLS)** is enabled on the inquiries table
2. Anyone can submit inquiries (INSERT policy)
3. Only authenticated users can update/delete inquiries
4. Consider adding email verification or CAPTCHA for production

## Next Steps

1. ✅ Set up email notifications when inquiries are received
2. ✅ Add admin notes functionality
3. ✅ Export inquiries as CSV
4. ✅ Add inquiry filters (by status, date)
5. ✅ Set up automated responses

## Support

If you encounter any issues:
1. Check the Supabase logs in the Dashboard
2. Review browser console for JavaScript errors
3. Verify your `.env.local` configuration
4. Test the Supabase connection with a simple query

---

**Note:** Make sure to run this setup in your Supabase project before using the contact form feature!
