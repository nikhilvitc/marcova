'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import AdminLayout from '@/components/AdminLayout'
import toast from 'react-hot-toast'
import { FiSave, FiEye, FiEyeOff, FiArrowUp, FiArrowDown, FiPlus, FiTrash2 } from 'react-icons/fi'

interface MenuItem {
  id: string
  label: string
  href: string
  is_visible: boolean
  display_order: number
  icon: string
  description: string
}

interface SiteSetting {
  id: string
  key: string
  value: string
  description: string
}

export default function SiteSettingsPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [siteSettings, setSiteSettings] = useState<SiteSetting[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newMenuItem, setNewMenuItem] = useState({
    label: '',
    href: '',
    icon: 'FiCircle',
    description: ''
  })
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch menu items
      const { data: menuData, error: menuError } = await supabase
        .from('menu_items')
        .select('*')
        .order('display_order', { ascending: true })

      if (menuError) throw menuError
      setMenuItems(menuData || [])

      // Fetch site settings
      const { data: settingsData, error: settingsError } = await supabase
        .from('site_settings')
        .select('*')
        .order('key', { ascending: true })

      if (settingsError) throw settingsError
      setSiteSettings(settingsData || [])

    } catch (error: any) {
      console.error('Error fetching data:', error)
      toast.error('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  const toggleMenuItemVisibility = async (id: string, currentVisibility: boolean) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .update({ is_visible: !currentVisibility })
        .eq('id', id)

      if (error) throw error

      setMenuItems(menuItems.map(item => 
        item.id === id ? { ...item, is_visible: !currentVisibility } : item
      ))
      
      toast.success(`Menu item ${!currentVisibility ? 'shown' : 'hidden'}`)
    } catch (error: any) {
      console.error('Error updating menu item:', error)
      toast.error('Failed to update menu item')
    }
  }

  const updateDisplayOrder = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = menuItems.findIndex(item => item.id === id)
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === menuItems.length - 1)
    ) {
      return
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    const newMenuItems = [...menuItems]
    const temp = newMenuItems[currentIndex]
    newMenuItems[currentIndex] = newMenuItems[newIndex]
    newMenuItems[newIndex] = temp

    // Update display_order for both items
    try {
      const updates = newMenuItems.map((item, index) => ({
        id: item.id,
        display_order: index + 1
      }))

      for (const update of updates) {
        await supabase
          .from('menu_items')
          .update({ display_order: update.display_order })
          .eq('id', update.id)
      }

      setMenuItems(newMenuItems.map((item, index) => ({
        ...item,
        display_order: index + 1
      })))

      toast.success('Menu order updated')
    } catch (error: any) {
      console.error('Error updating order:', error)
      toast.error('Failed to update order')
    }
  }

  const updateSiteSetting = async (key: string, value: string) => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .update({ value })
        .eq('key', key)

      if (error) throw error

      setSiteSettings(siteSettings.map(setting => 
        setting.key === key ? { ...setting, value } : setting
      ))

      toast.success('Setting updated')
    } catch (error: any) {
      console.error('Error updating setting:', error)
      toast.error('Failed to update setting')
    }
  }

  const addMenuItem = async () => {
    if (!newMenuItem.label || !newMenuItem.href) {
      toast.error('Label and URL are required')
      return
    }

    try {
      const maxOrder = Math.max(...menuItems.map(item => item.display_order), 0)
      
      const { data, error } = await supabase
        .from('menu_items')
        .insert([{
          label: newMenuItem.label,
          href: newMenuItem.href,
          icon: newMenuItem.icon,
          description: newMenuItem.description,
          is_visible: true,
          display_order: maxOrder + 1
        }])
        .select()

      if (error) throw error

      setMenuItems([...menuItems, data[0]])
      setNewMenuItem({ label: '', href: '', icon: 'FiCircle', description: '' })
      setShowAddForm(false)
      toast.success('Menu item added')
    } catch (error: any) {
      console.error('Error adding menu item:', error)
      toast.error('Failed to add menu item')
    }
  }

  const deleteMenuItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return

    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id)

      if (error) throw error

      setMenuItems(menuItems.filter(item => item.id !== id))
      toast.success('Menu item deleted')
    } catch (error: any) {
      console.error('Error deleting menu item:', error)
      toast.error('Failed to delete menu item')
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-cream-400">Loading settings...</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Site Settings</h1>
          <p className="text-cream-400">Manage navigation menu and site configuration</p>
        </div>

        {/* Menu Items Section */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold">Navigation Menu</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn-primary flex items-center gap-2"
            >
              <FiPlus /> Add Menu Item
            </button>
          </div>

          {/* Add Menu Item Form */}
          {showAddForm && (
            <div className="bg-chocolate-800 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4">New Menu Item</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Label (e.g., Products)"
                  value={newMenuItem.label}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, label: e.target.value })}
                  className="bg-chocolate-700 text-cream-100 px-4 py-2 rounded-lg border border-chocolate-600 focus:border-gold-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="URL (e.g., /products)"
                  value={newMenuItem.href}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, href: e.target.value })}
                  className="bg-chocolate-700 text-cream-100 px-4 py-2 rounded-lg border border-chocolate-600 focus:border-gold-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Icon (e.g., FiShoppingBag)"
                  value={newMenuItem.icon}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, icon: e.target.value })}
                  className="bg-chocolate-700 text-cream-100 px-4 py-2 rounded-lg border border-chocolate-600 focus:border-gold-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newMenuItem.description}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
                  className="bg-chocolate-700 text-cream-100 px-4 py-2 rounded-lg border border-chocolate-600 focus:border-gold-500 focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                <button onClick={addMenuItem} className="btn-primary">
                  Add Item
                </button>
                <button onClick={() => setShowAddForm(false)} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Menu Items List */}
          <div className="space-y-3">
            {menuItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-chocolate-800 p-4 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => updateDisplayOrder(item.id, 'up')}
                      disabled={index === 0}
                      className="text-cream-400 hover:text-gold-500 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <FiArrowUp size={16} />
                    </button>
                    <button
                      onClick={() => updateDisplayOrder(item.id, 'down')}
                      disabled={index === menuItems.length - 1}
                      className="text-cream-400 hover:text-gold-500 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <FiArrowDown size={16} />
                    </button>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-cream-100">{item.label}</span>
                      <span className="text-xs text-cream-500">→ {item.href}</span>
                    </div>
                    {item.description && (
                      <p className="text-sm text-cream-400">{item.description}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleMenuItemVisibility(item.id, item.is_visible)}
                    className={`p-2 rounded-lg transition-colors ${
                      item.is_visible
                        ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
                        : 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                    }`}
                    title={item.is_visible ? 'Hide from menu' : 'Show in menu'}
                  >
                    {item.is_visible ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                  </button>
                  
                  <button
                    onClick={() => deleteMenuItem(item.id)}
                    className="p-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 transition-colors"
                    title="Delete menu item"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Site Settings Section */}
        <div className="card">
          <h2 className="text-2xl font-display font-bold mb-6">General Settings</h2>
          <div className="space-y-4">
            {siteSettings.map((setting) => (
              <div key={setting.id} className="bg-chocolate-800 p-4 rounded-lg">
                <label className="block mb-2">
                  <span className="font-semibold text-cream-100 capitalize">
                    {setting.key.replace(/_/g, ' ')}
                  </span>
                  {setting.description && (
                    <span className="block text-sm text-cream-400 mt-1">{setting.description}</span>
                  )}
                </label>
                
                {setting.value === 'true' || setting.value === 'false' ? (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateSiteSetting(setting.key, setting.value === 'true' ? 'false' : 'true')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        setting.value === 'true' ? 'bg-green-600' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          setting.value === 'true' ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    <span className="text-cream-300">
                      {setting.value === 'true' ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                ) : (
                  <input
                    type="text"
                    value={setting.value}
                    onChange={(e) => updateSiteSetting(setting.key, e.target.value)}
                    className="w-full bg-chocolate-700 text-cream-100 px-4 py-2 rounded-lg border border-chocolate-600 focus:border-gold-500 focus:outline-none"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
