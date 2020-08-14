import { useCallback, useState, useRef, useEffect } from 'react'

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const abortRef = useRef([])

    const sendRequest = useCallback(async(url, method='GET', body=null, headers={})=>{
        setIsLoading(true)
        const AbortController = window.AbortController
        const abortController = new AbortController()
        abortRef.current.push(abortController)
        try {
            const response = await fetch(url, {
                method, body, headers
            })
            const resData = await response.json()
            abortRef.current = abortRef.current.filter(abrt=> abrt!==abortController)
            if(!response.ok) {
                throw new Error('Failed! Try again')
            }
            setIsLoading(false)
            return resData
        } catch (error) {
            setIsLoading(false)
            setError(error.message)
            throw error
        }
    },[])
    const clearError = () => {
        setError(null)
    }
    useEffect(()=>{
        return () => {
            abortRef.current.forEach(abrn=>abrn.abort())
        }
    },[])
    return { isLoading, error, sendRequest, clearError }
}