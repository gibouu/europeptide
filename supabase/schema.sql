-- VIALWORKS starter schema (build spec §8).
-- Apply with: supabase db push, or paste into the SQL editor.

create table products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  cat_no text unique not null,
  name text not null,
  category text not null,
  size_mg text,
  tagline text,
  bullets jsonb default '[]',
  price_cents int not null,
  active boolean default true
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  status text default 'pending',          -- pending | paid | shipped | cancelled
  subtotal_cents int,
  discount_cents int,
  reward_label text,                       -- bundle bonus, rolled server-side
  stripe_session_id text,
  created_at timestamptz default now()
);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders on delete cascade,
  product_id uuid references products,
  qty int default 1,
  unit_price_cents int
);

create table consent_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  age_confirmed boolean,
  research_use_confirmed boolean,
  ip inet,
  created_at timestamptz default now()
);

-- Bundle-bonus reward table: weights live server-side so odds can be tuned
-- without a deploy, and the roll-reward Edge Function reads from here.
-- Margin rule (spec §5): worst-case reward (max pct) must still clear the
-- target margin on the cheapest possible 3-item bundle — model before launch.
create table rewards (
  id text primary key,                     -- '10pct', 'ship', ...
  label text not null,
  detail text,
  rarity text,
  pct int default 0,
  weight int not null,
  active boolean default true
);

insert into rewards (id, label, detail, rarity, pct, weight) values
  ('10pct', '10% off', 'your whole bundle', 'Common', 10, 50),
  ('15pct', '15% off', 'your whole bundle', 'Uncommon', 15, 25),
  ('ship',  'Free shipping', '+ bacteriostatic water add-on', 'Uncommon', 0, 17),
  ('20pct', '20% off', 'your whole bundle', 'Rare', 20, 8);

-- Row Level Security
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table consent_log enable row level security;
alter table rewards enable row level security;

create policy "active products are public" on products
  for select using (active);

create policy "own orders" on orders
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own order items" on order_items
  for select using (exists (
    select 1 from orders o where o.id = order_id and o.user_id = auth.uid()
  ));

create policy "insert own consent" on consent_log
  for insert with check (auth.uid() = user_id);
create policy "read own consent" on consent_log
  for select using (auth.uid() = user_id);

-- rewards table: no public policies — read only by service-role inside the
-- roll-reward Edge Function, never from the client.
