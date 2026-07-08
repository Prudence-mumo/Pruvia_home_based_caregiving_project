/*
# Create bookings table for Pruvia Home-Based Care

## Summary
Creates the bookings/lead capture table that stores service requests submitted via the website's multi-step booking form.

## New Tables

### bookings
Stores care request submissions from prospective clients.

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key, auto-generated |
| created_at | timestamptz | When the booking was submitted |
| client_name | text | Full name of the client |
| email | text | Email address |
| phone | text | Phone number |
| location | text | Service area (Nairobi, Kitengela, Machakos, Makueni, Other Kenya) |
| services | text[] | Array of requested service types |
| care_complexity | text | Description of care needs/complexity |
| package_selected | text | Selected care package (Basic/Standard/Comprehensive) |
| status | text | Booking status: pending, contacted, scheduled, closed |
| notes | text | Internal admin notes |

## Security
- RLS enabled on bookings table.
- Single-tenant no-auth app: anon + authenticated can insert (public form) and read/update (admin dashboard).
- Using `TO anon, authenticated` because there is no sign-in screen.

## Notes
1. This is a public-facing form with no authentication — anon role must have access.
2. Status defaults to 'pending' for all new submissions.
3. Array type for services allows multiple service selections.
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  client_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  location text NOT NULL,
  services text[] DEFAULT '{}',
  care_complexity text DEFAULT '',
  package_selected text DEFAULT '',
  status text NOT NULL DEFAULT 'pending',
  notes text DEFAULT ''
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_bookings" ON bookings;
CREATE POLICY "anon_select_bookings" ON bookings FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_bookings" ON bookings;
CREATE POLICY "anon_insert_bookings" ON bookings FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_bookings" ON bookings;
CREATE POLICY "anon_update_bookings" ON bookings FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_bookings" ON bookings;
CREATE POLICY "anon_delete_bookings" ON bookings FOR DELETE
TO anon, authenticated USING (true);
