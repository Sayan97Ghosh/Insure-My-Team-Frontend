import { useRouter } from 'next/router'
import { useEffect } from 'react'
export default function withAuth(WrappedComponent) {
return (props) => {
const router = useRouter()
useEffect(() => {
// Check if the user is authenticated and authorized to access the page
const isAuthenticated = true // replace with your authentication logic
const userRole = 'admin' // replace with your authorization logic
if (!isAuthenticated ) {
router.push('/')
}
}, [])
return <WrappedComponent {...props} />
}
}
