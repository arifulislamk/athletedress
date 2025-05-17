import React from 'react';
import { useQuery } from "@tanstack/react-query";
import useAuthFire from './useAuthFire';
import useCommonAxios from './useCommonAxios';

const useAdmin = () => {
    const {user,loading} = useAuthFire() ;
    const commonAxios = useCommonAxios() ;
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        enabled: !loading,
        queryKey : [user?.email, 'isAdmin'],
        queryFn : async () => {
            const res = await commonAxios(`user/admin/${user?.email}`)
            console.log(res.data,"admin check")
            return res.data.admin
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;