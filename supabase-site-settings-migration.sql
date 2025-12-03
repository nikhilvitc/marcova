-- Comprehensive Site Settings Migration for Marcova
-- This migration creates complete control over all website aspects

-- Drop existing tables if they exist (for clean migration)
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS social_links CASCADE;
DROP TABLE IF EXISTS hero_settings CASCADE;
DROP TABLE IF EXISTS theme_settings CASCADE;
DROP TABLE IF EXISTS contact_info CASCADE;
DROP TABLE IF EXISTS seo_settings CASCADE;
DROP TABLE IF EXISTS feature_toggles CASCADE;

-- ============================================
-- 1. MENU ITEMS TABLE (Navigation Control)
-- ============================================
CREATE TABLE menu_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    href VARCHAR(255) NOT NULL,
    is_visible BOOLEAN DEFAULT true,
    display_order INTEGER NOT NULL,
    icon VARCHAR(50),
    description TEXT,
    parent_id UUID REFERENCES menu_items(id) ON DELETE CASCADE,
    is_external BOOLEAN DEFAULT false,
    open_in_new_tab BOOLEAN DEFAULT false,
    css_class VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- 2. SITE SETTINGS TABLE (Global Configuration)
-- ============================================
CREATE TABLE site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    description TEXT,
    category VARCHAR(50) DEFAULT 'general',
    data_type VARCHAR(20) DEFAULT 'text',
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- 3. SOCIAL LINKS TABLE (Social Media)
-- ============================================
CREATE TABLE social_links (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    platform VARCHAR(50) NOT NULL,
    url VARCHAR(500) NOT NULL,
    icon VARCHAR(50),
    is_visible BOOLEAN DEFAULT true,
    display_order INTEGER NOT NULL,
    color VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- 4. HERO SETTINGS TABLE (Homepage Hero Section)
-- ============================================
CREATE TABLE hero_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    background_image VARCHAR(500),
    background_video VARCHAR(500),
    primary_button_text VARCHAR(50),
    primary_button_link VARCHAR(255),
    secondary_button_text VARCHAR(50),
    secondary_button_link VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 1,
    overlay_opacity DECIMAL(3,2) DEFAULT 0.5,
    text_alignment VARCHAR(20) DEFAULT 'center',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- 5. THEME SETTINGS TABLE (Colors & Styling)
-- ============================================
CREATE TABLE theme_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    primary_color VARCHAR(20),
    secondary_color VARCHAR(20),
    accent_color VARCHAR(20),
    background_color VARCHAR(20),
    text_color VARCHAR(20),
    font_family VARCHAR(100),
    font_size_base INTEGER DEFAULT 16,
    border_radius INTEGER DEFAULT 8,
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- 6. CONTACT INFO TABLE (Business Information)
-- ============================================
CREATE TABLE contact_info (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    label VARCHAR(100),
    value TEXT NOT NULL,
    icon VARCHAR(50),
    is_visible BOOLEAN DEFAULT true,
    display_order INTEGER NOT NULL,
    link_type VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- 7. SEO SETTINGS TABLE (Search Engine Optimization)
-- ============================================
CREATE TABLE seo_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_path VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255),
    description TEXT,
    keywords TEXT,
    og_image VARCHAR(500),
    canonical_url VARCHAR(500),
    robots VARCHAR(50) DEFAULT 'index,follow',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- 8. FEATURE TOGGLES TABLE (Enable/Disable Features)
-- ============================================
CREATE TABLE feature_toggles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    feature_key VARCHAR(100) UNIQUE NOT NULL,
    feature_name VARCHAR(100) NOT NULL,
    is_enabled BOOLEAN DEFAULT true,
    description TEXT,
    category VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- CREATE UPDATE TIMESTAMP FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- DROP EXISTING TRIGGERS
-- ============================================
DROP TRIGGER IF EXISTS update_menu_items_updated_at ON menu_items;
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
DROP TRIGGER IF EXISTS update_social_links_updated_at ON social_links;
DROP TRIGGER IF EXISTS update_hero_settings_updated_at ON hero_settings;
DROP TRIGGER IF EXISTS update_theme_settings_updated_at ON theme_settings;
DROP TRIGGER IF EXISTS update_contact_info_updated_at ON contact_info;
DROP TRIGGER IF EXISTS update_seo_settings_updated_at ON seo_settings;
DROP TRIGGER IF EXISTS update_feature_toggles_updated_at ON feature_toggles;

-- ============================================
-- CREATE TRIGGERS FOR ALL TABLES
-- ============================================
CREATE TRIGGER update_menu_items_updated_at
    BEFORE UPDATE ON menu_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON site_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_links_updated_at
    BEFORE UPDATE ON social_links
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hero_settings_updated_at
    BEFORE UPDATE ON hero_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_theme_settings_updated_at
    BEFORE UPDATE ON theme_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_info_updated_at
    BEFORE UPDATE ON contact_info
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_seo_settings_updated_at
    BEFORE UPDATE ON seo_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_feature_toggles_updated_at
    BEFORE UPDATE ON feature_toggles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INSERT DEFAULT DATA - MENU ITEMS
-- ============================================
INSERT INTO menu_items (label, href, is_visible, display_order, icon, description) VALUES
('Home', '/', true, 1, 'FiHome', 'Homepage with featured products'),
('Products', '/products', true, 2, 'FiShoppingBag', 'All chocolate products'),
('Cakes', '/cakes', true, 3, 'FiGift', 'Celebration cakes'),
('About', '/about', true, 4, 'FiInfo', 'About Marcova'),
('Contact', '/contact', true, 5, 'FiMail', 'Contact us page');

-- ============================================
-- INSERT DEFAULT DATA - SITE SETTINGS
-- ============================================
INSERT INTO site_settings (key, value, description, category, data_type) VALUES
-- General Settings
('site_name', 'Marcova', 'Website name displayed in header', 'general', 'text'),
('site_tagline', 'Handcrafted Chocolate Excellence', 'Site tagline or subtitle', 'general', 'text'),
('site_logo_url', '/assets/images/logo.png', 'Path to logo image', 'general', 'text'),
('site_favicon', '/favicon.ico', 'Path to favicon', 'general', 'text'),
('copyright_text', '© 2025 Marcova. All rights reserved.', 'Footer copyright text', 'general', 'text'),

-- Display Settings
('show_cart', 'true', 'Show/hide cart icon in navigation', 'display', 'boolean'),
('show_search', 'true', 'Show/hide search functionality', 'display', 'boolean'),
('show_breadcrumbs', 'true', 'Show/hide breadcrumb navigation', 'display', 'boolean'),
('show_footer', 'true', 'Show/hide footer section', 'display', 'boolean'),
('show_newsletter', 'true', 'Show/hide newsletter signup', 'display', 'boolean'),
('show_social_icons', 'true', 'Show/hide social media icons', 'display', 'boolean'),
('show_back_to_top', 'true', 'Show/hide back to top button', 'display', 'boolean'),
('show_product_reviews', 'true', 'Show/hide product reviews', 'display', 'boolean'),
('show_related_products', 'true', 'Show/hide related products', 'display', 'boolean'),
('show_floating_cart', 'true', 'Show/hide floating cart button', 'display', 'boolean'),

-- Homepage Settings
('hero_animation', 'true', 'Enable/disable hero animations', 'homepage', 'boolean'),
('show_featured_products', 'true', 'Show featured products section', 'homepage', 'boolean'),
('featured_products_count', '6', 'Number of featured products to display', 'homepage', 'number'),
('show_categories', 'true', 'Show categories section', 'homepage', 'boolean'),
('show_testimonials', 'true', 'Show testimonials section', 'homepage', 'boolean'),
('show_about_section', 'true', 'Show about section on homepage', 'homepage', 'boolean'),
('show_stats', 'true', 'Show statistics/numbers section', 'homepage', 'boolean'),

-- Product Settings
('products_per_page', '12', 'Number of products per page', 'products', 'number'),
('enable_product_filters', 'true', 'Enable category/price filters', 'products', 'boolean'),
('enable_product_sorting', 'true', 'Enable product sorting options', 'products', 'boolean'),
('show_product_stock', 'true', 'Show stock availability', 'products', 'boolean'),
('show_product_sku', 'false', 'Show product SKU', 'products', 'boolean'),
('enable_wishlist', 'true', 'Enable wishlist functionality', 'products', 'boolean'),
('enable_quick_view', 'true', 'Enable quick view modal', 'products', 'boolean'),
('product_image_zoom', 'true', 'Enable product image zoom', 'products', 'boolean'),

-- Cart & Checkout Settings
('enable_guest_checkout', 'true', 'Allow checkout without login', 'checkout', 'boolean'),
('minimum_order_value', '0', 'Minimum order value (0 for no minimum)', 'checkout', 'number'),
('enable_coupon_codes', 'true', 'Enable discount coupon codes', 'checkout', 'boolean'),
('enable_gift_wrapping', 'true', 'Enable gift wrapping option', 'checkout', 'boolean'),
('show_estimated_delivery', 'true', 'Show estimated delivery date', 'checkout', 'boolean'),
('enable_order_notes', 'true', 'Allow order notes/comments', 'checkout', 'boolean'),

-- Payment Settings
('enable_whatsapp_orders', 'true', 'Enable WhatsApp ordering feature', 'payment', 'boolean'),
('whatsapp_number', '918902232596', 'WhatsApp business number', 'payment', 'text'),
('enable_cod', 'true', 'Enable Cash on Delivery', 'payment', 'boolean'),
('enable_online_payment', 'false', 'Enable online payment gateway', 'payment', 'boolean'),
('currency_symbol', '₹', 'Currency symbol to display', 'payment', 'text'),
('currency_code', 'INR', 'Currency code (ISO 4217)', 'payment', 'text'),

-- Shipping Settings
('free_shipping_threshold', '500', 'Free shipping above this amount', 'shipping', 'number'),
('default_shipping_cost', '50', 'Default shipping cost', 'shipping', 'number'),
('show_shipping_calculator', 'true', 'Show shipping cost calculator', 'shipping', 'boolean'),
('enable_local_pickup', 'true', 'Enable local pickup option', 'shipping', 'boolean'),

-- Contact & Communication
('primary_email', 'marcovachocolates@gmail.com', 'Primary contact email', 'contact', 'text'),
('support_email', 'support@marcova.com', 'Support email address', 'contact', 'text'),
('primary_phone', '+91 9876543210', 'Primary phone number', 'contact', 'text'),
('business_hours', 'Mon-Sat: 9 AM - 6 PM', 'Business hours text', 'contact', 'text'),
('show_live_chat', 'false', 'Show live chat widget', 'contact', 'boolean'),
('enable_contact_form', 'true', 'Enable contact form', 'contact', 'boolean'),

-- Notification Settings
('enable_order_notifications', 'true', 'Send order confirmation emails', 'notifications', 'boolean'),
('enable_newsletter_notifications', 'true', 'Send newsletter emails', 'notifications', 'boolean'),
('enable_promotion_notifications', 'true', 'Send promotional emails', 'notifications', 'boolean'),
('enable_browser_notifications', 'false', 'Enable browser push notifications', 'notifications', 'boolean'),

-- Performance Settings
('enable_image_lazy_loading', 'true', 'Enable lazy loading for images', 'performance', 'boolean'),
('enable_caching', 'true', 'Enable browser caching', 'performance', 'boolean'),
('enable_compression', 'true', 'Enable content compression', 'performance', 'boolean'),
('page_transition_speed', '300', 'Page transition speed (ms)', 'performance', 'number'),

-- Security Settings
('enable_recaptcha', 'false', 'Enable reCAPTCHA on forms', 'security', 'boolean'),
('recaptcha_site_key', '', 'Google reCAPTCHA site key', 'security', 'text'),
('enable_ssl_redirect', 'true', 'Force HTTPS redirect', 'security', 'boolean'),
('enable_rate_limiting', 'true', 'Enable API rate limiting', 'security', 'boolean'),

-- Maintenance & Development
('maintenance_mode', 'false', 'Enable maintenance mode (site unavailable)', 'maintenance', 'boolean'),
('maintenance_message', 'We are currently performing maintenance. Please check back soon!', 'Maintenance mode message', 'maintenance', 'text'),
('debug_mode', 'false', 'Enable debug mode (development only)', 'maintenance', 'boolean'),
('show_under_construction', 'false', 'Show under construction banner', 'maintenance', 'boolean'),

-- Announcement Bar
('announcement_bar_enabled', 'false', 'Show announcement bar', 'announcement', 'boolean'),
('announcement_bar_text', '', 'Announcement bar message', 'announcement', 'text'),
('announcement_bar_color', 'gold', 'Announcement bar color', 'announcement', 'text'),
('announcement_bar_link', '', 'Announcement bar link URL', 'announcement', 'text'),
('announcement_bar_dismissible', 'true', 'Allow users to dismiss announcement', 'announcement', 'boolean'),

-- Analytics & Tracking
('google_analytics_id', '', 'Google Analytics tracking ID', 'analytics', 'text'),
('facebook_pixel_id', '', 'Facebook Pixel ID', 'analytics', 'text'),
('enable_analytics', 'false', 'Enable analytics tracking', 'analytics', 'boolean'),
('track_conversions', 'false', 'Track conversion events', 'analytics', 'boolean');

-- ============================================
-- INSERT DEFAULT DATA - SOCIAL LINKS
-- ============================================
INSERT INTO social_links (platform, url, icon, is_visible, display_order, color) VALUES
('Facebook', 'https://facebook.com/marcova', 'FaFacebook', true, 1, '#1877F2'),
('Instagram', 'https://instagram.com/marcova', 'FaInstagram', true, 2, '#E4405F'),
('Twitter', 'https://twitter.com/marcova', 'FaTwitter', true, 3, '#1DA1F2'),
('WhatsApp', 'https://wa.me/918902232596', 'FaWhatsapp', true, 4, '#25D366'),
('YouTube', 'https://youtube.com/@marcova', 'FaYoutube', false, 5, '#FF0000'),
('LinkedIn', 'https://linkedin.com/company/marcova', 'FaLinkedin', false, 6, '#0A66C2');

-- ============================================
-- INSERT DEFAULT DATA - HERO SETTINGS
-- ============================================
INSERT INTO hero_settings (title, subtitle, description, primary_button_text, primary_button_link, secondary_button_text, secondary_button_link, is_active) VALUES
('Indulge In The Art Of Homemade Chocolate', 'Premium Handcrafted Chocolates', 'Discover our exquisite collection of artisanal chocolates made with the finest ingredients', 'Shop Now', '/products', 'Our Story', '/about', true);

-- ============================================
-- INSERT DEFAULT DATA - CONTACT INFO
-- ============================================
INSERT INTO contact_info (type, label, value, icon, is_visible, display_order) VALUES
('address', 'Address', 'Kolkata, West Bengal, India', 'FiMapPin', true, 1),
('phone', 'Phone', '+91 9876543210', 'FiPhone', true, 2),
('email', 'Email', 'marcovachocolates@gmail.com', 'FiMail', true, 3),
('hours', 'Business Hours', 'Mon-Sat: 9 AM - 6 PM', 'FiClock', true, 4);

-- ============================================
-- INSERT DEFAULT DATA - SEO SETTINGS
-- ============================================
INSERT INTO seo_settings (page_path, title, description, keywords) VALUES
('/', 'Marcova - Premium Handcrafted Chocolates | Kolkata', 'Discover premium handcrafted chocolates and celebration cakes from Marcova. Made with finest ingredients in Kolkata, West Bengal.', 'chocolate, handcrafted chocolate, premium chocolate, kolkata, cakes, celebration cakes'),
('/products', 'Our Products - Marcova Chocolates', 'Browse our complete collection of artisanal chocolates, bars, bonbons, and celebration treats.', 'chocolate products, buy chocolate, chocolate bars, bonbons'),
('/cakes', 'Celebration Cakes - Marcova', 'Order custom celebration cakes for birthdays, anniversaries, and special occasions.', 'celebration cakes, birthday cakes, custom cakes, kolkata cakes'),
('/about', 'About Marcova - Our Story', 'Learn about Marcova journey in creating exceptional handcrafted chocolates with passion and dedication.', 'about marcova, chocolate story, artisan chocolate'),
('/contact', 'Contact Marcova - Get In Touch', 'Contact Marcova for custom orders, inquiries, or to learn more about our products.', 'contact marcova, chocolate orders, custom chocolate');

-- ============================================
-- INSERT DEFAULT DATA - FEATURE TOGGLES
-- ============================================
INSERT INTO feature_toggles (feature_key, feature_name, is_enabled, description, category) VALUES
('dark_mode', 'Dark Mode', false, 'Enable dark mode theme switcher', 'appearance'),
('multi_language', 'Multi-Language Support', false, 'Enable multiple language support', 'localization'),
('product_compare', 'Product Comparison', false, 'Enable product comparison feature', 'products'),
('virtual_try', 'Virtual Try-On', false, 'Enable AR/virtual try-on feature', 'products'),
('loyalty_program', 'Loyalty Program', false, 'Enable customer loyalty points', 'customers'),
('gift_cards', 'Gift Cards', false, 'Enable gift card purchases', 'sales'),
('bulk_orders', 'Bulk Order Discounts', true, 'Enable bulk order discount system', 'sales'),
('subscription_model', 'Subscription Service', false, 'Enable subscription-based ordering', 'sales'),
('recipe_blog', 'Recipe Blog', false, 'Enable recipe/blog section', 'content'),
('video_tutorials', 'Video Tutorials', false, 'Show video tutorials section', 'content'),
('customer_reviews', 'Customer Reviews', true, 'Enable customer review system', 'social'),
('social_sharing', 'Social Sharing', true, 'Enable social media sharing buttons', 'social'),
('live_inventory', 'Live Inventory', true, 'Show real-time stock levels', 'inventory'),
('pre_orders', 'Pre-Orders', false, 'Enable pre-order functionality', 'inventory'),
('custom_orders', 'Custom Orders', true, 'Enable custom order requests', 'orders');

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE theme_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_toggles ENABLE ROW LEVEL SECURITY;

-- ============================================
-- DROP EXISTING POLICIES
-- ============================================
DROP POLICY IF EXISTS "Allow public read access to site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow admin full access to site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow public read access to menu_items" ON menu_items;
DROP POLICY IF EXISTS "Allow admin full access to menu_items" ON menu_items;
DROP POLICY IF EXISTS "Allow public read access to social_links" ON social_links;
DROP POLICY IF EXISTS "Allow admin full access to social_links" ON social_links;
DROP POLICY IF EXISTS "Allow public read access to hero_settings" ON hero_settings;
DROP POLICY IF EXISTS "Allow admin full access to hero_settings" ON hero_settings;
DROP POLICY IF EXISTS "Allow public read access to theme_settings" ON theme_settings;
DROP POLICY IF EXISTS "Allow admin full access to theme_settings" ON theme_settings;
DROP POLICY IF EXISTS "Allow public read access to contact_info" ON contact_info;
DROP POLICY IF EXISTS "Allow admin full access to contact_info" ON contact_info;
DROP POLICY IF EXISTS "Allow public read access to seo_settings" ON seo_settings;
DROP POLICY IF EXISTS "Allow admin full access to seo_settings" ON seo_settings;
DROP POLICY IF EXISTS "Allow public read access to feature_toggles" ON feature_toggles;
DROP POLICY IF EXISTS "Allow admin full access to feature_toggles" ON feature_toggles;

-- ============================================
-- CREATE POLICIES FOR ALL TABLES
-- ============================================
-- Site Settings
CREATE POLICY "Allow public read access to site_settings" ON site_settings FOR SELECT USING (is_public = true);
CREATE POLICY "Allow admin full access to site_settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);

-- Menu Items
CREATE POLICY "Allow public read access to menu_items" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to menu_items" ON menu_items FOR ALL USING (true) WITH CHECK (true);

-- Social Links
CREATE POLICY "Allow public read access to social_links" ON social_links FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to social_links" ON social_links FOR ALL USING (true) WITH CHECK (true);

-- Hero Settings
CREATE POLICY "Allow public read access to hero_settings" ON hero_settings FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to hero_settings" ON hero_settings FOR ALL USING (true) WITH CHECK (true);

-- Theme Settings
CREATE POLICY "Allow public read access to theme_settings" ON theme_settings FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to theme_settings" ON theme_settings FOR ALL USING (true) WITH CHECK (true);

-- Contact Info
CREATE POLICY "Allow public read access to contact_info" ON contact_info FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to contact_info" ON contact_info FOR ALL USING (true) WITH CHECK (true);

-- SEO Settings
CREATE POLICY "Allow public read access to seo_settings" ON seo_settings FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to seo_settings" ON seo_settings FOR ALL USING (true) WITH CHECK (true);

-- Feature Toggles
CREATE POLICY "Allow public read access to feature_toggles" ON feature_toggles FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to feature_toggles" ON feature_toggles FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_menu_items_display_order ON menu_items(display_order);
CREATE INDEX idx_menu_items_is_visible ON menu_items(is_visible);
CREATE INDEX idx_menu_items_parent_id ON menu_items(parent_id);
CREATE INDEX idx_site_settings_key ON site_settings(key);
CREATE INDEX idx_site_settings_category ON site_settings(category);
CREATE INDEX idx_social_links_display_order ON social_links(display_order);
CREATE INDEX idx_social_links_is_visible ON social_links(is_visible);
CREATE INDEX idx_hero_settings_is_active ON hero_settings(is_active);
CREATE INDEX idx_theme_settings_is_active ON theme_settings(is_active);
CREATE INDEX idx_contact_info_display_order ON contact_info(display_order);
CREATE INDEX idx_seo_settings_page_path ON seo_settings(page_path);
CREATE INDEX idx_feature_toggles_feature_key ON feature_toggles(feature_key);
CREATE INDEX idx_feature_toggles_is_enabled ON feature_toggles(is_enabled);

-- ============================================
-- ADD COMMENTS FOR DOCUMENTATION
-- ============================================
COMMENT ON TABLE menu_items IS 'Navigation menu items with visibility and ordering controls';
COMMENT ON TABLE site_settings IS 'Global site settings and configuration values';
COMMENT ON TABLE social_links IS 'Social media links and profiles';
COMMENT ON TABLE hero_settings IS 'Homepage hero section content and styling';
COMMENT ON TABLE theme_settings IS 'Theme color schemes and styling presets';
COMMENT ON TABLE contact_info IS 'Business contact information';
COMMENT ON TABLE seo_settings IS 'SEO meta data for each page';
COMMENT ON TABLE feature_toggles IS 'Feature flags for enabling/disabling functionality';

COMMENT ON COLUMN menu_items.is_visible IS 'Controls whether menu item appears in navigation';
COMMENT ON COLUMN menu_items.display_order IS 'Order of appearance in menu (lower numbers first)';
COMMENT ON COLUMN menu_items.parent_id IS 'Parent menu item for submenu/dropdown functionality';
COMMENT ON COLUMN site_settings.category IS 'Grouping category for settings organization';
COMMENT ON COLUMN site_settings.data_type IS 'Data type: text, boolean, number, json';
COMMENT ON COLUMN site_settings.is_public IS 'Whether setting should be accessible publicly';
COMMENT ON COLUMN feature_toggles.is_enabled IS 'Whether feature is currently active';
