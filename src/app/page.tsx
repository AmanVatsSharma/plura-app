import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
    const authUser = await currentUser()
    if (!authUser) return redirect('site')
        if (authUser) return redirect('agency')
  return (
    <div>main page</div>
  )
}

export default page