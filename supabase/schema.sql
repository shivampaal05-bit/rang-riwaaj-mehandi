-- ==============================================================================
-- RANG RIWAAZ MEHANDI - SUPABASE POSTGRESQL SCHEMA & SECURITY CONFIGURATION
-- Multi-tier Commission Marketplace with Row-Level Security (RLS) & Triggers
-- Hub: Baraipar Mod, Gorakhpur, Uttar Pradesh
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Custom ENUM Types
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('customer', 'artist', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE artist_tier AS ENUM ('bridal', 'top_rated', 'regular');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE booking_status AS ENUM (
        'pending',
        'confirmed',
        'artist_on_way',
        'service_started',
        'completed',
        'cancelled'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM (
        'pending',
        'advance_paid',
        'fully_paid',
        'refunded'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payout_status AS ENUM (
        'pending',
        'approved',
        'settled',
        'rejected'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ==============================================================================
-- 3. CORE TABLES
-- ==============================================================================

-- 3.1. PROFILES (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE,
    phone TEXT,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'customer',
    locality TEXT DEFAULT 'Golghar, Gorakhpur',
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3.2. ARTIST_PROFILES (Marketplace Artist Metadata & Financials)
CREATE TABLE IF NOT EXISTS public.artist_profiles (
    id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    studio_name TEXT NOT NULL,
    category_tier artist_tier NOT NULL DEFAULT 'bridal',
    commission_rate NUMERIC(5, 2) NOT NULL DEFAULT 15.00, -- 15% bridal, 12% top_rated, 10% regular
    rating NUMERIC(3, 2) NOT NULL DEFAULT 4.90,
    review_count INTEGER NOT NULL DEFAULT 0,
    experience_years INTEGER NOT NULL DEFAULT 5,
    bio TEXT,
    locality TEXT NOT NULL DEFAULT 'Baraipar Mod, Gorakhpur',
    address TEXT,
    travel_charge_per_km NUMERIC(6, 2) NOT NULL DEFAULT 22.00,
    free_travel_km NUMERIC(4, 1) NOT NULL DEFAULT 3.0,
    is_verified BOOLEAN NOT NULL DEFAULT false,
    verification_badges JSONB NOT NULL DEFAULT '{
        "identityVerified": true,
        "phoneVerified": true,
        "portfolioChecked": true,
        "skillChecked": true,
        "homeServiceVerified": true
    }'::jsonb,
    reliability_metrics JSONB NOT NULL DEFAULT '{
        "onTimePercentage": 98,
        "fulfillmentRate": 99,
        "avgArrivalEarlyMin": 15,
        "standbyBackupReady": true
    }'::jsonb,
    bank_upi_id TEXT,
    bank_account_no TEXT,
    bank_ifsc TEXT,
    bank_account_holder TEXT,
    total_gmv NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    total_commission_paid NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    pending_payout NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    settled_payout NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3.3. SERVICES (Pricing Packages Offered by Artists)
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    artist_id UUID NOT NULL REFERENCES public.artist_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    service_type TEXT NOT NULL, -- 'bridal', 'guest', 'groom', 'engagement', 'festival'
    base_price NUMERIC(10, 2) NOT NULL,
    est_duration_hours NUMERIC(4, 1) NOT NULL DEFAULT 3.0,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3.4. PORTFOLIO_ITEMS (Real Work Photos & Videos)
CREATE TABLE IF NOT EXISTS public.portfolio_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    artist_id UUID NOT NULL REFERENCES public.artist_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- 'bridal', 'arabic', 'marwari', 'portrait'
    media_url TEXT NOT NULL,
    media_type TEXT NOT NULL DEFAULT 'image', -- 'image' or 'video'
    featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3.5. MARKETPLACE_SETTINGS (Admin Configurable Commission Rates)
CREATE TABLE IF NOT EXISTS public.marketplace_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    platform_name TEXT NOT NULL DEFAULT 'Rang Riwaaz Mehandi',
    center_hub TEXT NOT NULL DEFAULT 'Baraipar Mod, Gorakhpur (273413)',
    default_bridal_commission NUMERIC(5, 2) NOT NULL DEFAULT 15.00,
    default_top_rated_commission NUMERIC(5, 2) NOT NULL DEFAULT 12.00,
    default_regular_commission NUMERIC(5, 2) NOT NULL DEFAULT 10.00,
    advance_token_percentage NUMERIC(5, 2) NOT NULL DEFAULT 20.00,
    min_payout_amount NUMERIC(8, 2) NOT NULL DEFAULT 1000.00,
    platform_upi TEXT DEFAULT 'rangriwaaz@upi',
    support_phone TEXT DEFAULT '+91 94500 00100',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3.6. BOOKINGS (Date-Locked Commission Orders)
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_code TEXT UNIQUE NOT NULL,
    customer_id UUID NOT NULL REFERENCES public.profiles(id),
    artist_id UUID NOT NULL REFERENCES public.artist_profiles(id),
    event_date DATE NOT NULL,
    time_slot TEXT NOT NULL, -- 'morning', 'afternoon', 'evening', 'night'
    service_type TEXT NOT NULL DEFAULT 'bridal',
    locality TEXT NOT NULL,
    venue_address TEXT NOT NULL,
    pincode TEXT DEFAULT '273413',
    guest_count INTEGER NOT NULL DEFAULT 0,
    add_ons JSONB DEFAULT '[]'::jsonb,
    
    -- Financials & Commission Breakdown
    subtotal NUMERIC(10, 2) NOT NULL,
    travel_fee NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    discount_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    total_amount NUMERIC(10, 2) NOT NULL,
    advance_token_amount NUMERIC(10, 2) NOT NULL,
    balance_cash_amount NUMERIC(10, 2) NOT NULL,
    
    -- Commission Tracking Fields
    commission_rate NUMERIC(5, 2) NOT NULL, -- e.g. 15.00%
    commission_amount NUMERIC(10, 2) NOT NULL, -- Platform fee
    artist_net_earnings NUMERIC(10, 2) NOT NULL, -- total_amount - commission_amount
    
    status booking_status NOT NULL DEFAULT 'confirmed',
    payment_status payment_status NOT NULL DEFAULT 'advance_paid',
    
    -- Emergency Backup Match
    backup_artist_id UUID REFERENCES public.artist_profiles(id),
    cancelled_by_artist BOOLEAN NOT NULL DEFAULT false,
    cancellation_reason TEXT,
    
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3.7. COMMISSION_PAYOUTS (Artist Financial Settlement Ledger)
CREATE TABLE IF NOT EXISTS public.commission_payouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payout_code TEXT UNIQUE NOT NULL,
    artist_id UUID NOT NULL REFERENCES public.artist_profiles(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
    gross_amount NUMERIC(10, 2) NOT NULL,
    commission_amount NUMERIC(10, 2) NOT NULL,
    net_payout NUMERIC(10, 2) NOT NULL,
    status payout_status NOT NULL DEFAULT 'pending',
    payout_method TEXT NOT NULL DEFAULT 'upi', -- 'upi' or 'bank_transfer'
    account_details TEXT NOT NULL,
    utr_reference TEXT,
    notes TEXT,
    settled_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3.8. REVIEWS (Verified Client Ratings)
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES public.profiles(id),
    artist_id UUID NOT NULL REFERENCES public.artist_profiles(id),
    rating NUMERIC(2, 1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    cleanliness_score INTEGER DEFAULT 5,
    stain_quality_score INTEGER DEFAULT 5,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 4. AUTOMATIC COMMISSION CALCULATION & TRIGGERS
-- ==============================================================================

-- 4.1. Auto Commission Calculation Trigger Function
CREATE OR REPLACE FUNCTION public.fn_calculate_booking_commission()
RETURNS TRIGGER AS $$
DECLARE
    v_artist_tier artist_tier;
    v_custom_rate NUMERIC(5, 2);
    v_bridal_rate NUMERIC(5, 2);
    v_top_rate NUMERIC(5, 2);
    v_regular_rate NUMERIC(5, 2);
BEGIN
    -- Fetch global defaults
    SELECT 
        default_bridal_commission, 
        default_top_rated_commission, 
        default_regular_commission
    INTO 
        v_bridal_rate, 
        v_top_rate, 
        v_regular_rate
    FROM public.marketplace_settings
    WHERE id = 1;

    -- Fetch artist specific tier and custom rate
    SELECT category_tier, commission_rate
    INTO v_artist_tier, v_custom_rate
    FROM public.artist_profiles
    WHERE id = NEW.artist_id;

    -- Determine applicable commission rate based on Tier
    IF v_custom_rate IS NOT NULL AND v_custom_rate > 0 THEN
        NEW.commission_rate := v_custom_rate;
    ELSIF v_artist_tier = 'bridal' THEN
        NEW.commission_rate := COALESCE(v_bridal_rate, 15.00);
    ELSIF v_artist_tier = 'top_rated' THEN
        NEW.commission_rate := COALESCE(v_top_rate, 12.00);
    ELSE
        NEW.commission_rate := COALESCE(v_regular_rate, 10.00);
    END IF;

    -- Calculate Platform Commission & Net Artist Earnings
    NEW.commission_amount := ROUND((NEW.total_amount * (NEW.commission_rate / 100.0)), 2);
    NEW.artist_net_earnings := ROUND(NEW.total_amount - NEW.commission_amount, 2);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER trg_calculate_booking_commission
BEFORE INSERT OR UPDATE OF total_amount, artist_id ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.fn_calculate_booking_commission();

-- 4.2. Auto Payout Creation Trigger when Booking Completes
CREATE OR REPLACE FUNCTION public.fn_handle_booking_completion()
RETURNS TRIGGER AS $$
DECLARE
    v_payout_code TEXT;
    v_upi TEXT;
    v_acc TEXT;
    v_payout_method TEXT;
    v_details TEXT;
BEGIN
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        -- Get artist payment details
        SELECT bank_upi_id, bank_account_no
        INTO v_upi, v_acc
        FROM public.artist_profiles
        WHERE id = NEW.artist_id;

        IF v_upi IS NOT NULL AND v_upi <> '' THEN
            v_payout_method := 'upi';
            v_details := v_upi;
        ELSE
            v_payout_method := 'bank_transfer';
            v_details := COALESCE(v_acc, 'UPI not provided');
        END IF;

        v_payout_code := 'PAY-' || to_char(now(), 'YYMMDD') || '-' || substr(md5(random()::text), 1, 6);

        -- Insert commission payout record
        INSERT INTO public.commission_payouts (
            payout_code,
            artist_id,
            booking_id,
            gross_amount,
            commission_amount,
            net_payout,
            status,
            payout_method,
            account_details,
            created_at
        ) VALUES (
            v_payout_code,
            NEW.artist_id,
            NEW.id,
            NEW.total_amount,
            NEW.commission_amount,
            NEW.artist_net_earnings,
            'pending',
            v_payout_method,
            v_details,
            now()
        );

        -- Update Artist Profile lifetime earnings
        UPDATE public.artist_profiles
        SET 
            total_gmv = total_gmv + NEW.total_amount,
            total_commission_paid = total_commission_paid + NEW.commission_amount,
            pending_payout = pending_payout + NEW.artist_net_earnings
        WHERE id = NEW.artist_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER trg_handle_booking_completion
AFTER UPDATE OF status ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.fn_handle_booking_completion();

-- ==============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artist_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commission_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if current user is artist
CREATE OR REPLACE FUNCTION public.is_artist()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'artist'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5.1. PROFILES POLICIES
CREATE POLICY "Public profiles are viewable by everyone"
ON public.profiles FOR SELECT
USING (true);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Admins have full access to profiles"
ON public.profiles FOR ALL
USING (public.is_admin());

-- 5.2. ARTIST_PROFILES POLICIES
CREATE POLICY "Active artist profiles viewable by everyone"
ON public.artist_profiles FOR SELECT
USING (is_active = true OR public.is_admin() OR auth.uid() = id);

CREATE POLICY "Artists can update own profile details"
ON public.artist_profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (
    auth.uid() = id AND 
    -- Artists cannot lower their own commission rate or forge verification status
    commission_rate = (SELECT commission_rate FROM public.artist_profiles WHERE id = auth.uid()) AND
    is_verified = (SELECT is_verified FROM public.artist_profiles WHERE id = auth.uid())
);

CREATE POLICY "Admins have full access to artist_profiles"
ON public.artist_profiles FOR ALL
USING (public.is_admin());

-- 5.3. SERVICES & PORTFOLIO POLICIES
CREATE POLICY "Services viewable by everyone"
ON public.services FOR SELECT
USING (true);

CREATE POLICY "Artists can manage their own services"
ON public.services FOR ALL
USING (auth.uid() = artist_id OR public.is_admin());

CREATE POLICY "Portfolio viewable by everyone"
ON public.portfolio_items FOR SELECT
USING (true);

CREATE POLICY "Artists can manage their own portfolio"
ON public.portfolio_items FOR ALL
USING (auth.uid() = artist_id OR public.is_admin());

-- 5.4. MARKETPLACE_SETTINGS POLICIES
CREATE POLICY "Settings viewable by everyone"
ON public.marketplace_settings FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify marketplace settings"
ON public.marketplace_settings FOR UPDATE
USING (public.is_admin());

-- 5.5. BOOKINGS POLICIES (Strict Security)
CREATE POLICY "Customers can view their own bookings"
ON public.bookings FOR SELECT
USING (auth.uid() = customer_id);

CREATE POLICY "Artists can view bookings assigned to them"
ON public.bookings FOR SELECT
USING (auth.uid() = artist_id);

CREATE POLICY "Customers can create new bookings"
ON public.bookings FOR INSERT
WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Artists can update status of their bookings"
ON public.bookings FOR UPDATE
USING (auth.uid() = artist_id OR auth.uid() = customer_id OR public.is_admin());

CREATE POLICY "Admins can view and manage all bookings"
ON public.bookings FOR ALL
USING (public.is_admin());

-- 5.6. COMMISSION_PAYOUTS POLICIES
CREATE POLICY "Artists can view their own payouts"
ON public.commission_payouts FOR SELECT
USING (auth.uid() = artist_id);

CREATE POLICY "Admins can view and manage all commission payouts"
ON public.commission_payouts FOR ALL
USING (public.is_admin());

-- 5.7. REVIEWS POLICIES
CREATE POLICY "Reviews viewable by everyone"
ON public.reviews FOR SELECT
USING (true);

CREATE POLICY "Customers can insert reviews for their completed bookings"
ON public.reviews FOR INSERT
WITH CHECK (
    auth.uid() = customer_id AND
    EXISTS (
        SELECT 1 FROM public.bookings
        WHERE id = booking_id AND customer_id = auth.uid() AND status = 'completed'
    )
);

-- ==============================================================================
-- 6. DEFAULT SEED DATA (For Immediate Demonstration)
-- ==============================================================================

INSERT INTO public.marketplace_settings (
    id, platform_name, center_hub, default_bridal_commission, 
    default_top_rated_commission, default_regular_commission, 
    advance_token_percentage, min_payout_amount, platform_upi
) VALUES (
    1, 'Rang Riwaaz Mehandi', 'Baraipar Mod, Gorakhpur (273413)',
    15.00, 12.00, 10.00, 20.00, 1000.00, 'rangriwaaz@upi'
) ON CONFLICT (id) DO UPDATE SET
    default_bridal_commission = 15.00,
    default_top_rated_commission = 12.00,
    default_regular_commission = 10.00;
