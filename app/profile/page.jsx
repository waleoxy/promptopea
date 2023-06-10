'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Profile from "@components/Profile"

const ProfilePage = () => {
    const [posts, setPosts] = useState([])
    const router = useRouter()
    const { data: session } = useSession()

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm('Sure you want to delete this prompt?')
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                })

                const filteredPost = posts.filter((data) => data._id !== post._id)
                setPosts(filteredPost)
            } catch (error) {

            }
        }
    }

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`)

            const data = await response.json()
            setPosts(data)
        }

        if (session?.user.id) fetchPost()
    }, [])


    return (
        <Profile
            name='My'
            desc='Welcome to your page'
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}
export default ProfilePage