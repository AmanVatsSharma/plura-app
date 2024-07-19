import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/queries'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
    const authUser = await currentUser()
    if (!authUser) return redirect('agency/sign-in')

    // const agencyId = await verifyAndAcceptInvitation();

    // get user details 
    // const user = await getAuthUserDetails();

    return (
        <div>agency page</div>
    )
}

export default page