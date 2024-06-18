import { User } from "@supabase/auth-helpers-nextjs";
import { UserDetails, Subscription } from "../../types";
import { createContext, useContext, useEffect, useState } from "react";
import { Props } from "next/script";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";

type UserContextTypes = {
    accessToken: string | null;
    user: User;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null
}

export const UserContext = createContext<UserContextTypes | undefined>(undefined)


export interface IProps {
    [propName: string]: any
}

export const MyUserContextProvider = (props: IProps) => {
    const { session, isLoading: isLoadingUser, supabaseClient: supabase } = useSessionContext()

    const user = useSupaUser

    const accesstoken = session?.access_token ?? null;
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    const getUserDetails = () => supabase.from("users").select("*").single()
    const getSubscripton = () => supabase.from("subscriptions").select("*, prices(*, products(*))").in('status', ['trialing', 'active']).single()

    useEffect(() => {
        if (!user && !subscription && !userDetails && !isLoadingData) {
            setIsLoadingData(true)

            Promise.allSettled([getUserDetails(), getSubscripton()]).then(result => {
                const userDetailsPromise = result[0];
                const subscriptionPromise = result[1]

                if (userDetailsPromise.status === "fulfilled") {
                    setUserDetails(userDetailsPromise.value.data as UserDetails)

                }

                if (subscriptionPromise.status === "fulfilled") {
                    setSubscription(subscriptionPromise.value.data as Subscription)
                }
                setIsLoadingData(false)

            })
        } else if (!user && !isLoadingUser && !isLoadingData) {
            setUserDetails(null)
            setSubscription(null)
        }

    }, [user, isLoadingUser])

    const value: any = {
        accesstoken,
        user,
        userDetails,
        isLoading: isLoadingData || isLoadingUser,
        subscription
    }

    return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
    const context = useContext(UserContext)

    if (!context) {
        throw new Error("useUser must be user within a MyUserContextProvider")
    }

    return context


}