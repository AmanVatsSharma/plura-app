"use server";

import { currentUser, EmailAddress } from "@clerk/nextjs/server";
import { db } from "./db";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";
import { User } from "lucide-react";

export const getAuthUserDetails = async () => {
    const user = await currentUser();
    if (!user) {
        return;
    }

    const userData = await db.user.findUnique({
        where: {
            email: user.emailAddresses[0].emailAddress,
        },
        include: {
            Agency: {
                include: {
                    SidebarOption: true,
                    SubAccount: {
                        include: {
                            SidebarOption: true,
                        },
                    },
                },
            },
            Permissions: true,
        },
    });
    return userData;
};

export const saveActivityLogsNotifications = async (
    { agencyId, desciption, subAccountId: { agencyId?: String, desciption: String, subAccountId?: String } }
) => {
    const authUser = await currentUser();

    if (!authUser) {
        const response = await db.user.findFirst({
            where: {
                Agency: {
                    SubAccount: {
                        some: { id: subAccountId }
                    }
                }
            }
        })
        if (response) {
            userData = response
        }
    }
}
else {
    userData = await db.user.findUnique({
        where:{
            email: ser.EmailAddresses[0].EmailAddress
        }
    })
}


export const createTeamUser = async (agencyId: String, user: User) => {
    if (user.role === 'AGENCY_OWNER') return null;
    const response = await db.user.create({
        data: { ...user }
    })
    return response
}


export const verifyAndAcceptInvitation = async () => {
    const user = await currentUser;

    if (!user) return redirect("/agency/signin");

    const invitationExists = await db.invitation.findUnique({
        where: {
            email: user.EmailAddress[0].EmailAddress,
            status: "PENDING",
        },
    });

    if (invitationExists) {

        const userDetails = await createTeamUser(invitationExists.agencyId, {
            email: invitationExists.email,
            agencyId: invitationExists.agencyId,
            avatarUrl: user.imagUrl,
            id: user.id,
            name: '${user.firstName} ${user.lastName}'
            role: invitationExists.role,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

    }

};


