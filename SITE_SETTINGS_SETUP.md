# Site Settings & Menu Control Setup Guide

This guide explains how to set up and use the admin control panel for managing navigation menu items and site settings.

## 🚀 Features

### Menu Management
- **Show/Hide Menu Items**: Control which pages appear in the navigation
- **Reorder Menu Items**: Change the order of navigation links
- **Add Custom Menu Items**: Create new navigation links
- **Delete Menu Items**: Remove unwanted navigation links

### Site Settings
- **Site Name**: Change the website name displayed in header
- **Site Tagline**: Update the site tagline/subtitle
- **Cart Visibility**: Show or hide the shopping cart icon
- **WhatsApp Orders**: Enable/disable WhatsApp ordering feature
- **Maintenance Mode**: Put site into maintenance mode
- **Announcement Bar**: Add site-wide announcements

## 📋 Setup Instructions

### Step 1: Run the SQL Migration

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `supabase-site-settings-migration.sql`
4. Paste into the SQL Editor
5. Click **Run** to execute

This will create:
- `menu_items` table (navigation menu control)
- `site_settings` table (global site configuration)
- Default menu items (Home, Products, Cakes, About, Contact)
- Default site settings

### Step 2: Verify Tables Created

1. Go to **Table Editor** in Supabase
2. You should see two new tables:
   - `menu_items`
   - `site_settings`

### Step 3: Check Default Data

#### Menu Items Table
Should contain:
| Label    | href       | is_visible | display_order |
|----------|------------|------------|---------------|
| Home     | /          | true       | 1             |
| Products | /products  | true       | 2             |
| Cakes    | /cakes     | true       | 3             |
| About    | /about     | true       | 4             |
| Contact  | /contact   | true       | 5             |

#### Site Settings Table
Should contain:
| key                    | value                            |
|------------------------|----------------------------------|
| site_name              | Marcova                          |
| site_tagline           | Handcrafted Chocolate Excellence |
| show_cart              | true                             |
| enable_whatsapp_orders | true                             |
| maintenance_mode       | false                            |
| announcement_bar       | (empty)                          |
| announcement_bar_color | gold                             |

### Step 4: Access Admin Settings

1. Log into your admin panel at `/admin/login`
2. Click on **"Site Settings"** in the sidebar
3. You should see:
   - Navigation Menu section
   - General Settings section

## 🎯 How to Use

### Managing Navigation Menu

#### Hide a Menu Item
1. Go to **Admin → Site Settings**
2. Find the menu item in the list
3. Click the **eye icon** (👁️) to hide
4. The menu item will disappear from the navigation
5. Click again to show it

#### Reorder Menu Items
1. Use the **up arrow** (↑) and **down arrow** (↓) buttons
2. Items will be reordered in real-time
3. Changes apply immediately to the navigation

#### Add a New Menu Item
1. Click **"Add Menu Item"** button
2. Fill in:
   - **Label**: Display name (e.g., "Blog")
   - **URL**: Page path (e.g., "/blog")
   - **Icon**: Icon name (e.g., "FiBook")
   - **Description**: Optional description
3. Click **"Add Item"**
4. New item appears in navigation

#### Delete a Menu Item
1. Click the **trash icon** (🗑️) next to the menu item
2. Confirm deletion
3. Item is removed from navigation

### Managing Site Settings

#### Toggle Settings (Boolean Values)
- Click the toggle switch to enable/disable
- Examples: Show Cart, WhatsApp Orders, Maintenance Mode

#### Update Text Settings
- Click in the input field
- Type new value
- Changes save automatically

### Available Settings

| Setting | Type | Description |
|---------|------|-------------|
| Site Name | Text | Website name in header/logo |
| Site Tagline | Text | Subtitle or tagline |
| Show Cart | Toggle | Display shopping cart icon |
| Enable WhatsApp Orders | Toggle | Allow WhatsApp ordering |
| Maintenance Mode | Toggle | Take site offline for maintenance |
| Announcement Bar | Text | Site-wide announcement message |
| Announcement Bar Color | Text | Color theme for announcement |

## 🔧 Advanced Usage

### Adding Custom Settings

To add a new site setting:

```sql
INSERT INTO site_settings (key, value, description) VALUES
('your_setting_key', 'default_value', 'Description of setting');
```

### Custom Menu Icons

Supported icon names (from react-icons/fi):
- `FiHome` - Home icon
- `FiShoppingBag` - Shopping bag
- `FiGift` - Gift box
- `FiInfo` - Information
- `FiMail` - Mail/envelope
- `FiBook` - Book
- `FiStar` - Star
- `FiHeart` - Heart
- `FiCircle` - Circle (default)

### Database Structure

#### menu_items
```sql
CREATE TABLE menu_items (
    id UUID PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    href VARCHAR(255) NOT NULL,
    is_visible BOOLEAN DEFAULT true,
    display_order INTEGER NOT NULL,
    icon VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

#### site_settings
```sql
CREATE TABLE site_settings (
    id UUID PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

## 🔐 Security

- Tables have Row Level Security (RLS) enabled
- Public can read (for navigation display)
- Only admins can modify (requires authentication)
- Policies automatically applied

## 🐛 Troubleshooting

### Menu Items Not Showing

**Problem**: Navigation shows default items, not database items

**Solution**:
1. Check Supabase connection in `/lib/supabase.ts`
2. Verify migration ran successfully
3. Check browser console for errors
4. Ensure RLS policies are set correctly

### Can't Update Settings

**Problem**: Changes don't save in admin panel

**Solution**:
1. Verify you're logged in as admin
2. Check Supabase API keys in `.env.local`
3. Verify RLS policies allow updates
4. Check network tab for API errors

### Cart Icon Still Shows After Hiding

**Problem**: Cart icon visible despite `show_cart = false`

**Solution**:
1. Refresh the page (hard refresh: Cmd+Shift+R)
2. Clear browser cache
3. Check the setting value in Supabase table

### New Menu Items Don't Appear

**Problem**: Added menu items not showing in navigation

**Solution**:
1. Verify `is_visible` is set to `true`
2. Check `display_order` is a valid number
3. Refresh the navigation page
4. Check browser console for errors

## 📊 Testing

### Test Menu Visibility
1. Hide "Products" from menu
2. Visit homepage
3. Verify "Products" link is gone
4. Show it again and verify it returns

### Test Menu Ordering
1. Move "Contact" to top position
2. Check navigation order changed
3. Restore original order

### Test Settings
1. Toggle "Show Cart" off
2. Verify cart icon disappears
3. Toggle back on
4. Verify cart icon returns

## 🎨 Customization

### Styling Menu Items in Code

Edit `/components/Navbar.tsx`:

```tsx
{navLinks.map((link) => (
  <Link
    key={link.href}
    href={link.href}
    className="your-custom-styles"
  >
    {link.label}
  </Link>
))}
```

### Adding New Settings

1. Add to database:
```sql
INSERT INTO site_settings (key, value, description) VALUES
('new_setting', 'value', 'Description');
```

2. Use in code:
```tsx
const { data } = await supabase
  .from('site_settings')
  .select('value')
  .eq('key', 'new_setting')
  .single()
```

## 📝 Best Practices

1. **Backup Before Changes**: Export tables before major modifications
2. **Test Changes**: Use preview before deploying
3. **Document Custom Settings**: Keep track of custom settings added
4. **Monitor Performance**: Check site speed after adding menu items
5. **Use Meaningful Names**: Clear labels and descriptions

## 🚀 Deployment

After setup:

1. Commit changes:
```bash
git add .
git commit -m "Add site settings and menu control"
git push origin main
```

2. Vercel will auto-deploy
3. Settings work immediately after migration

## 📚 Related Files

- `/app/admin/settings/page.tsx` - Admin settings interface
- `/components/Navbar.tsx` - Navigation component (reads settings)
- `/supabase-site-settings-migration.sql` - Database setup
- `/lib/supabase.ts` - Supabase client configuration

## ✅ Verification Checklist

- [ ] Migration ran successfully in Supabase
- [ ] Both tables created (`menu_items`, `site_settings`)
- [ ] Default data populated
- [ ] Admin settings page accessible
- [ ] Can toggle menu item visibility
- [ ] Can reorder menu items
- [ ] Can add/delete menu items
- [ ] Site settings update correctly
- [ ] Cart visibility toggle works
- [ ] Navigation updates in real-time

---

Need help? Check the troubleshooting section or contact support.
