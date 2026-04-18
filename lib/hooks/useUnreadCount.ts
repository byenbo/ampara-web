'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useUnreadCount(userId: string) {
  const [count, setCount] = useState(0)

  async function fetch() {
    const supabase = createClient()
    const { data } = await supabase.rpc('get_unread_count', { user_id_param: userId })
    if (typeof data === 'number') setCount(data)
  }

  useEffect(() => {
    fetch()
    const interval = setInterval(fetch, 10000)
    return () => clearInterval(interval)
  }, [userId])

  return count
}
