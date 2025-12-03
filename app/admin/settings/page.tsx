'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import AdminLayout from '@/components/AdminLayout'
import toast from 'react-hot-toast'
import { 
  FiEye, FiEyeOff, FiArrowUp, FiArrowDown, FiPlus, FiTrash2,
  FiSettings, FiMenu, FiShare2, FiImage, FiMail, FiGlobe, FiToggleLeft
} from 'react-icons/fi'

interface MenuItem {
  id: string; label: string; href: string; is_visible: boolean; display_order: number; icon: string; description: string
}

interface SiteSetting {
  id: string; key: string; value: string; description: string; category: string; data_type: string
}

interface SocialLink {
  id: string; platform: string; url: string; icon: string; is_visible: boolean; display_order: number; color: string
}

interface ContactInfo {
  id: string; type: string; label: string; value: string; icon: string; is_visible: boolean; display_order: number
}

interface FeatureToggle {
  id: string; feature_key: string; feature_name: string; is_enabled: boolean; description: string; category: string
}

interface HeroSetting {
  id: string; title: string; subtitle: string; description: string; primary_button_text: string
  primary_button_link: string; secondary_button_text: string; secondary_button_link: string; is_active: boolean
}

export default function ComprehensiveSiteSettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [loading, setLoading] = useState(true)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [siteSettings, setSiteSettings] = useState<SiteSetting[]>([])
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([])
  const [featureToggles, setFeatureToggles] = useState<FeatureToggle[]>([])
  const [heroSettings, setHeroSettings] = useState<HeroSetting[]>([])
  const [showAddMenuItem, setShowAddMenuItem] = useState(false)
  const [showAddSocial, setShowAddSocial] = useState(false)
  const [newMenuItem, setNewMenuItem] = useState({ label: '', href: '', icon: 'FiCircle', description: '' })
  const [newSocialLink, setNewSocialLink] = useState({ platform: '', url: '', icon: '', color: '#000000' })

  useEffect(() => { fetchAllData() }, [])

  const fetchAllData = async () => {
    try {
      setLoading(true)
      const [menuData, settingsData, socialData, contactData, featuresData, heroData] = await Promise.all([
        supabase.from('menu_items').select('*').order('display_order'),
        supabase.from('site_settings').select('*').order('category'),
        supabase.from('social_links').select('*').order('display_order'),
        supabase.from('contact_info').select('*').order('display_order'),
        supabase.from('feature_toggles').select('*').order('category'),
        supabase.from('hero_settings').select('*').order('display_order')
      ])
      if (menuData.data) setMenuItems(menuData.data)
      if (settingsData.data) setSiteSettings(settingsData.data)
      if (socialData.data) setSocialLinks(socialData.data)
      if (contactData.data) setContactInfo(contactData.data)
      if (featuresData.data) setFeatureToggles(featuresData.data)
      if (heroData.data) setHeroSettings(heroData.data)
    } catch (error: any) {
      toast.error('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  const toggleMenuVisibility = async (id: string, currentVisibility: boolean) => {
    try {
      await supabase.from('menu_items').update({ is_visible: !currentVisibility }).eq('id', id)
      setMenuItems(menuItems.map(item => item.id === id ? { ...item, is_visible: !currentVisibility } : item))
      toast.success(`Menu item ${!currentVisibility ? 'shown' : 'hidden'}`)
    } catch (error) { toast.error('Failed to update menu item') }
  }

  const updateMenuOrder = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = menuItems.findIndex(item => item.id === id)
    if ((direction === 'up' && currentIndex === 0) || (direction === 'down' && currentIndex === menuItems.length - 1)) return
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    const newMenuItems = [...menuItems]
    ;[newMenuItems[currentIndex], newMenuItems[newIndex]] = [newMenuItems[newIndex], newMenuItems[currentIndex]]
    try {
      for (let index = 0; index < newMenuItems.length; index++) {
        const item = newMenuItems[index]
        await supabase.from('menu_items').update({ display_order: index + 1 }).eq('id', item.id)
      }
      setMenuItems(newMenuItems.map((item, index) => ({ ...item, display_order: index + 1 })))
      toast.success('Menu order updated')
    } catch (error) { toast.error('Failed to update order') }
  }

  const addMenuItem = async () => {
    if (!newMenuItem.label || !newMenuItem.href) { toast.error('Label and URL are required'); return }
    try {
      const maxOrder = Math.max(...menuItems.map(item => item.display_order), 0)
      const { data } = await supabase.from('menu_items').insert([{ ...newMenuItem, is_visible: true, display_order: maxOrder + 1 }]).select()
      if (data) {
        setMenuItems([...menuItems, data[0]])
        setNewMenuItem({ label: '', href: '', icon: 'FiCircle', description: '' })
        setShowAddMenuItem(false)
        toast.success('Menu item added')
      }
    } catch (error) { toast.error('Failed to add menu item') }
  }

  const deleteMenuItem = async (id: string) => {
    if (!confirm('Delete this menu item?')) return
    try {
      await supabase.from('menu_items').delete().eq('id', id)
      setMenuItems(menuItems.filter(item => item.id !== id))
      toast.success('Menu item deleted')
    } catch (error) { toast.error('Failed to delete menu item') }
  }

  const updateSetting = async (key: string, value: string) => {
    try {
      await supabase.from('site_settings').update({ value }).eq('key', key)
      setSiteSettings(siteSettings.map(setting => setting.key === key ? { ...setting, value } : setting))
      toast.success('Setting updated')
    } catch (error) { toast.error('Failed to update setting') }
  }

  const toggleSocialVisibility = async (id: string, currentVisibility: boolean) => {
    try {
      await supabase.from('social_links').update({ is_visible: !currentVisibility }).eq('id', id)
      setSocialLinks(socialLinks.map(link => link.id === id ? { ...link, is_visible: !currentVisibility } : link))
      toast.success('Social link updated')
    } catch (error) { toast.error('Failed to update social link') }
  }

  const addSocialLink = async () => {
    if (!newSocialLink.platform || !newSocialLink.url) { toast.error('Platform and URL are required'); return }
    try {
      const maxOrder = Math.max(...socialLinks.map(link => link.display_order), 0)
      const { data } = await supabase.from('social_links').insert([{ ...newSocialLink, is_visible: true, display_order: maxOrder + 1 }]).select()
      if (data) {
        setSocialLinks([...socialLinks, data[0]])
        setNewSocialLink({ platform: '', url: '', icon: '', color: '#000000' })
        setShowAddSocial(false)
        toast.success('Social link added')
      }
    } catch (error) { toast.error('Failed to add social link') }
  }

  const deleteSocialLink = async (id: string) => {
    if (!confirm('Delete this social link?')) return
    try {
      await supabase.from('social_links').delete().eq('id', id)
      setSocialLinks(socialLinks.filter(link => link.id !== id))
      toast.success('Social link deleted')
    } catch (error) { toast.error('Failed to delete social link') }
  }

  const updateContactInfo = async (id: string, value: string) => {
    try {
      await supabase.from('contact_info').update({ value }).eq('id', id)
      setContactInfo(contactInfo.map(info => info.id === id ? { ...info, value } : info))
      toast.success('Contact info updated')
    } catch (error) { toast.error('Failed to update contact info') }
  }

  const toggleFeature = async (featureKey: string, currentState: boolean) => {
    try {
      await supabase.from('feature_toggles').update({ is_enabled: !currentState }).eq('feature_key', featureKey)
      setFeatureToggles(featureToggles.map(feature => feature.feature_key === featureKey ? { ...feature, is_enabled: !currentState } : feature))
      toast.success(`Feature ${!currentState ? 'enabled' : 'disabled'}`)
    } catch (error) { toast.error('Failed to toggle feature') }
  }

  const updateHeroSetting = async (id: string, field: string, value: string) => {
    try {
      await supabase.from('hero_settings').update({ [field]: value }).eq('id', id)
      setHeroSettings(heroSettings.map(hero => hero.id === id ? { ...hero, [field]: value } : hero))
      toast.success('Hero setting updated')
    } catch (error) { toast.error('Failed to update hero setting') }
  }

  const getSettingsByCategory = (category: string) => siteSettings.filter(s => s.category === category)

  const tabs = [
    { id: 'general', label: 'General', icon: FiSettings },
    { id: 'menu', label: 'Navigation', icon: FiMenu },
    { id: 'display', label: 'Display', icon: FiEye },
    { id: 'homepage', label: 'Homepage', icon: FiImage },
    { id: 'products', label: 'Products', icon: FiSettings },
    { id: 'checkout', label: 'Checkout', icon: FiSettings },
    { id: 'social', label: 'Social Media', icon: FiShare2 },
    { id: 'hero', label: 'Hero Section', icon: FiImage },
    { id: 'contact', label: 'Contact Info', icon: FiMail },
    { id: 'features', label: 'Features', icon: FiToggleLeft },
    { id: 'seo', label: 'SEO & Analytics', icon: FiGlobe },
  ]

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-cream-400">Loading settings...</p>
        </div>
      </AdminLayout>
    )
  }

  const ToggleSwitch = ({ value, onChange }: { value: boolean, onChange: () => void }) => (
    <button onClick={onChange} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-green-600' : 'bg-gray-600'}`}>
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  )

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Complete Site Control</h1>
          <p className="text-cream-400">Manage every aspect of your website from one place</p>
        </div>

        <div className="flex overflow-x-auto mb-8 border-b border-chocolate-700 pb-2 gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-gold-600 text-black font-bold' : 'bg-chocolate-800 text-cream-200 hover:bg-chocolate-700'}`}>
                <Icon size={18} />
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="space-y-6">
          {activeTab === 'general' && (
            <div className="card">
              <h2 className="text-2xl font-display font-bold mb-6">General Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getSettingsByCategory('general').map((setting) => (
                  <div key={setting.id} className="bg-chocolate-800 p-4 rounded-lg">
                    <label className="block mb-2">
                      <span className="font-semibold text-cream-100">{setting.key.replace(/_/g, ' ').toUpperCase()}</span>
                      {setting.description && <span className="block text-sm text-cream-400 mt-1">{setting.description}</span>}
                    </label>
                    <input type="text" value={setting.value} onChange={(e) => updateSetting(setting.key, e.target.value)} className="w-full bg-chocolate-700 text-cream-100 px-4 py-2 rounded-lg border border-chocolate-600 focus:border-gold-500 focus:outline-none" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'menu' && (
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold">Navigation Menu</h2>
                <button onClick={() => setShowAddMenuItem(!showAddMenuItem)} className="btn-primary flex items-center gap-2"><FiPlus /> Add Menu Item</button>
              </div>
              {showAddMenuItem && (
                <div className="bg-chocolate-800 p-4 rounded-lg mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input type="text" placeholder="Label" value={newMenuItem.label} onChange={(e) => setNewMenuItem({ ...newMenuItem, label: e.target.value })} className="bg-chocolate-700 text-cream-100 px-4 py-2 rounded-lg border border-chocolate-600" />
                    <input type="text" placeholder="URL" value={newMenuItem.href} onChange={(e) => setNewMenuItem({ ...newMenuItem, href: e.target.value })} className="bg-chocolate-700 text-cream-100 px-4 py-2 rounded-lg border border-chocolate-600" />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={addMenuItem} className="btn-primary">Add</button>
                    <button onClick={() => setShowAddMenuItem(false)} className="btn-secondary">Cancel</button>
                  </div>
                </div>
              )}
              <div className="space-y-3">
                {menuItems.map((item, index) => (
                  <div key={item.id} className="bg-chocolate-800 p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex flex-col gap-1">
                        <button onClick={() => updateMenuOrder(item.id, 'up')} disabled={index === 0} className="text-cream-400 hover:text-gold-500 disabled:opacity-30"><FiArrowUp /></button>
                        <button onClick={() => updateMenuOrder(item.id, 'down')} disabled={index === menuItems.length - 1} className="text-cream-400 hover:text-gold-500 disabled:opacity-30"><FiArrowDown /></button>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-cream-100">{item.label}</span>
                          <span className="text-xs text-cream-500">→ {item.href}</span>
                        </div>
                        {item.description && <p className="text-sm text-cream-400">{item.description}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggleMenuVisibility(item.id, item.is_visible)} className={`p-2 rounded-lg ${item.is_visible ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>
                        {item.is_visible ? <FiEye /> : <FiEyeOff />}
                      </button>
                      <button onClick={() => deleteMenuItem(item.id)} className="p-2 rounded-lg bg-red-600/20 text-red-400"><FiTrash2 /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'display' && (
            <div className="card">
              <h2 className="text-2xl font-display font-bold mb-6">Display Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getSettingsByCategory('display').map((setting) => (
                  <div key={setting.id} className="bg-chocolate-800 p-4 rounded-lg flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-cream-100 block">{setting.key.replace(/_/g, ' ').toUpperCase()}</span>
                      {setting.description && <span className="text-sm text-cream-400">{setting.description}</span>}
                    </div>
                    <ToggleSwitch value={setting.value === 'true'} onChange={() => updateSetting(setting.key, setting.value === 'true' ? 'false' : 'true')} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'homepage' && (
            <div className="card">
              <h2 className="text-2xl font-display font-bold mb-6">Homepage Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getSettingsByCategory('homepage').map((setting) => (
                  <div key={setting.id} className="bg-chocolate-800 p-4 rounded-lg flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-cream-100 block">{setting.key.replace(/_/g, ' ').toUpperCase()}</span>
                      {setting.description && <span className="text-sm text-cream-400">{setting.description}</span>}
                    </div>
                    {setting.data_type === 'boolean' ? (
                      <ToggleSwitch value={setting.value === 'true'} onChange={() => updateSetting(setting.key, setting.value === 'true' ? 'false' : 'true')} />
                    ) : (
                      <input type="number" value={setting.value} onChange={(e) => updateSetting(setting.key, e.target.value)} className="w-20 bg-chocolate-700 text-cream-100 px-3 py-2 rounded-lg" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="card">
              <h2 className="text-2xl font-display font-bold mb-6">Product Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getSettingsByCategory('products').map((setting) => (
                  <div key={setting.id} className="bg-chocolate-800 p-4 rounded-lg flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-cream-100 block">{setting.key.replace(/_/g, ' ').toUpperCase()}</span>
                      {setting.description && <span className="text-sm text-cream-400">{setting.description}</span>}
                    </div>
                    {setting.data_type === 'boolean' ? (
                      <ToggleSwitch value={setting.value === 'true'} onChange={() => updateSetting(setting.key, setting.value === 'true' ? 'false' : 'true')} />
                    ) : (
                      <input type="number" value={setting.value} onChange={(e) => updateSetting(setting.key, e.target.value)} className="w-20 bg-chocolate-700 text-cream-100 px-3 py-2 rounded-lg" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'checkout' && (
            <div className="card">
              <h2 className="text-2xl font-display font-bold mb-6">Checkout & Payment Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-cream-100">Checkout Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getSettingsByCategory('checkout').map((setting) => (
                      <div key={setting.id} className="bg-chocolate-800 p-4 rounded-lg flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-cream-100 block">{setting.key.replace(/_/g, ' ').toUpperCase()}</span>
                          {setting.description && <span className="text-sm text-cream-400">{setting.description}</span>}
                        </div>
                        {setting.data_type === 'boolean' ? (
                          <ToggleSwitch value={setting.value === 'true'} onChange={() => updateSetting(setting.key, setting.value === 'true' ? 'false' : 'true')} />
                        ) : (
                          <input type="number" value={setting.value} onChange={(e) => updateSetting(setting.key, e.target.value)} className="w-24 bg-chocolate-700 text-cream-100 px-3 py-2 rounded-lg" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-cream-100">Payment Methods</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getSettingsByCategory('payment').map((setting) => (
                      <div key={setting.id} className="bg-chocolate-800 p-4 rounded-lg">
                        <label className="block mb-2">
                          <span className="font-semibold text-cream-100">{setting.key.replace(/_/g, ' ').toUpperCase()}</span>
                          {setting.description && <span className="block text-sm text-cream-400 mt-1">{setting.description}</span>}
                        </label>
                        {setting.data_type === 'boolean' ? (
                          <ToggleSwitch value={setting.value === 'true'} onChange={() => updateSetting(setting.key, setting.value === 'true' ? 'false' : 'true')} />
                        ) : (
                          <input type="text" value={setting.value} onChange={(e) => updateSetting(setting.key, e.target.value)} className="w-full bg-chocolate-700 text-cream-100 px-4 py-2 rounded-lg" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-cream-100">Shipping Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getSettingsByCategory('shipping').map((setting) => (
                      <div key={setting.id} className="bg-chocolate-800 p-4 rounded-lg">
                        <label className="block mb-2">
                          <span className="font-semibold text-cream-100">{setting.key.replace(/_/g, ' ').toUpperCase()}</span>
                          {setting.description && <span className="block text-sm text-cream-400 mt-1">{setting.description}</span>}
                        </label>
                        {setting.data_type === 'boolean' ? (
                          <ToggleSwitch value={setting.value === 'true'} onChange={() => updateSetting(setting.key, setting.value === 'true' ? 'false' : 'true')} />
                        ) : (
                          <input type="number" value={setting.value} onChange={(e) => updateSetting(setting.key, e.target.value)} className="w-full bg-chocolate-700 text-cream-100 px-4 py-2 rounded-lg" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold">Social Media Links</h2>
                <button onClick={() => setShowAddSocial(!showAddSocial)} className="btn-primary flex items-center gap-2"><FiPlus /> Add Social Link</button>
              </div>
              {showAddSocial && (
                <div className="bg-chocolate-800 p-4 rounded-lg mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input type="text" placeholder="Platform (e.g., Facebook)" value={newSocialLink.platform} onChange={(e) => setNewSocialLink({ ...newSocialLink, platform: e.target.value })} className="bg-chocolate-700 text-cream-100 px-4 py-2 rounded-lg" />
                    <input type="url" placeholder="URL" value={newSocialLink.url} onChange={(e) => setNewSocialLink({ ...newSocialLink, url: e.target.value })} className="bg-chocolate-700 text-cream-100 px-4 py-2 rounded-lg" />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={addSocialLink} className="btn-primary">Add</button>
                    <button onClick={() => setShowAddSocial(false)} className="btn-secondary">Cancel</button>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {socialLinks.map((link) => (
                  <div key={link.id} className="bg-chocolate-800 p-4 rounded-lg flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-cream-100 block">{link.platform}</span>
                      <span className="text-sm text-cream-400 truncate block max-w-xs">{link.url}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggleSocialVisibility(link.id, link.is_visible)} className={`p-2 rounded-lg ${link.is_visible ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>
                        {link.is_visible ? <FiEye /> : <FiEyeOff />}
                      </button>
                      <button onClick={() => deleteSocialLink(link.id)} className="p-2 rounded-lg bg-red-600/20 text-red-400"><FiTrash2 /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'hero' && heroSettings[0] && (
            <div className="card">
              <h2 className="text-2xl font-display font-bold mb-6">Hero Section Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 font-semibold text-cream-100">Title</label>
                  <input type="text" value={heroSettings[0].title} onChange={(e) => updateHeroSetting(heroSettings[0].id, 'title', e.target.value)} className="w-full bg-chocolate-800 text-cream-100 px-4 py-2 rounded-lg" />
                </div>
                <div>
                  <label className="block mb-2 font-semibold text-cream-100">Subtitle</label>
                  <input type="text" value={heroSettings[0].subtitle} onChange={(e) => updateHeroSetting(heroSettings[0].id, 'subtitle', e.target.value)} className="w-full bg-chocolate-800 text-cream-100 px-4 py-2 rounded-lg" />
                </div>
                <div>
                  <label className="block mb-2 font-semibold text-cream-100">Description</label>
                  <textarea value={heroSettings[0].description} onChange={(e) => updateHeroSetting(heroSettings[0].id, 'description', e.target.value)} rows={3} className="w-full bg-chocolate-800 text-cream-100 px-4 py-2 rounded-lg" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-semibold text-cream-100">Primary Button Text</label>
                    <input type="text" value={heroSettings[0].primary_button_text} onChange={(e) => updateHeroSetting(heroSettings[0].id, 'primary_button_text', e.target.value)} className="w-full bg-chocolate-800 text-cream-100 px-4 py-2 rounded-lg" />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold text-cream-100">Primary Button Link</label>
                    <input type="text" value={heroSettings[0].primary_button_link} onChange={(e) => updateHeroSetting(heroSettings[0].id, 'primary_button_link', e.target.value)} className="w-full bg-chocolate-800 text-cream-100 px-4 py-2 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="card">
              <h2 className="text-2xl font-display font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div key={info.id} className="bg-chocolate-800 p-4 rounded-lg">
                    <label className="block mb-2 font-semibold text-cream-100">{info.label}</label>
                    <input type="text" value={info.value} onChange={(e) => updateContactInfo(info.id, e.target.value)} className="w-full bg-chocolate-700 text-cream-100 px-4 py-2 rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="card">
              <h2 className="text-2xl font-display font-bold mb-6">Feature Toggles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featureToggles.map((feature) => (
                  <div key={feature.id} className="bg-chocolate-800 p-4 rounded-lg flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-cream-100 block">{feature.feature_name}</span>
                      {feature.description && <span className="text-sm text-cream-400">{feature.description}</span>}
                      <span className="text-xs text-cream-500 block mt-1">Category: {feature.category}</span>
                    </div>
                    <ToggleSwitch value={feature.is_enabled} onChange={() => toggleFeature(feature.feature_key, feature.is_enabled)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="card">
              <h2 className="text-2xl font-display font-bold mb-6">SEO & Analytics Settings</h2>
              <div className="grid grid-cols-1 gap-4">
                {getSettingsByCategory('analytics').map((setting) => (
                  <div key={setting.id} className="bg-chocolate-800 p-4 rounded-lg">
                    <label className="block mb-2">
                      <span className="font-semibold text-cream-100">{setting.key.replace(/_/g, ' ').toUpperCase()}</span>
                      {setting.description && <span className="block text-sm text-cream-400 mt-1">{setting.description}</span>}
                    </label>
                    {setting.data_type === 'boolean' ? (
                      <ToggleSwitch value={setting.value === 'true'} onChange={() => updateSetting(setting.key, setting.value === 'true' ? 'false' : 'true')} />
                    ) : (
                      <input type="text" value={setting.value} onChange={(e) => updateSetting(setting.key, e.target.value)} className="w-full bg-chocolate-700 text-cream-100 px-4 py-2 rounded-lg border border-chocolate-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
