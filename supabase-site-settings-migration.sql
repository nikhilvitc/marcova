-- Site Settings Migration for Marcova
-- This migration creates tables for controlling site settings including menu visibility

-- Drop existing tables if they exist (for clean migration)
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;

-- Create site_settings table for global settings
CREATE TABLE site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create menu_items table for menu control
CREATE TABLE menu_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    href VARCHAR(255) NOT NULL,
    is_visible BOOLEAN DEFAULT true,
    display_order INTEGER NOT NULL,
    icon VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create or replace function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop triggers if they exist
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
DROP TRIGGER IF EXISTS update_menu_items_updated_at ON menu_items;

-- Create triggers for updated_at
CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at
    BEFORE UPDATE ON menu_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default menu items
INSERT INTO menu_items (label, href, is_visible, display_order, icon, description) VALUES
('Home', '/', true, 1, 'FiHome', 'Homepage with featured products'),
('Products', '/products', true, 2, 'FiShoppingBag', 'All chocolate products'),
('Cakes', '/cakes', true, 3, 'FiGift', 'Celebration cakes'),
('About', '/about', true, 4, 'FiInfo', 'About Marcova'),
('Contact', '/contact', true, 5, 'FiMail', 'Contact us page');

-- Insert default site settings
INSERT INTO site_settings (key, value, description) VALUES
('site_name', 'Marcova', 'Website name displayed in header'),
('site_tagline', 'Handcrafted Chocolate Excellence', 'Site tagline or subtitle'),
('show_cart', 'true', 'Show/hide cart icon in navigation'),
('enable_whatsapp_orders', 'true', 'Enable WhatsApp ordering feature'),
('maintenance_mode', 'false', 'Enable maintenance mode (site unavailable)'),
('announcement_bar', '', 'Text for announcement bar (empty to hide)'),
('announcement_bar_color', 'gold', 'Color theme for announcement bar');

-- Enable Row Level Security
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access to site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow admin full access to site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow public read access to menu_items" ON menu_items;
DROP POLICY IF EXISTS "Allow admin full access to menu_items" ON menu_items;

-- Create policies for site_settings
CREATE POLICY "Allow public read access to site_settings"
    ON site_settings FOR SELECT
    USING (true);

CREATE POLICY "Allow admin full access to site_settings"
    ON site_settings FOR ALL
    USING (true)
    WITH CHECK (true);

-- Create policies for menu_items
CREATE POLICY "Allow public read access to menu_items"
    ON menu_items FOR SELECT
    USING (true);

CREATE POLICY "Allow admin full access to menu_items"
    ON menu_items FOR ALL
    USING (true)
    WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_menu_items_display_order ON menu_items(display_order);
CREATE INDEX idx_menu_items_is_visible ON menu_items(is_visible);
CREATE INDEX idx_site_settings_key ON site_settings(key);

-- Grant permissions (adjust based on your setup)
-- GRANT ALL ON site_settings TO authenticated;
-- GRANT ALL ON menu_items TO authenticated;

COMMENT ON TABLE site_settings IS 'Global site settings and configuration';
COMMENT ON TABLE menu_items IS 'Navigation menu items with visibility controls';
COMMENT ON COLUMN menu_items.is_visible IS 'Controls whether menu item appears in navigation';
COMMENT ON COLUMN menu_items.display_order IS 'Order of appearance in menu (lower numbers first)';
