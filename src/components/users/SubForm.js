import { useEffect, useState } from "react"
import { addSub, deleteSub, getSubsForFollower } from "./SubManager"
import { getCurrentUser } from "./UserManager"


export const SubForm = ({ author }) => {
    const [subbed, setSubbed] = useState(false)
    const [subs, setSubs] = useState([])
    const [currentSub, setCurrentSub] = useState({})
    const [currentUser, setCurrentUser] = useState()


    useEffect(() => {
            getCurrentUser()
                .then(setCurrentUser)
    }, [])

    useEffect(
        () => {
            if (currentUser) {
                getSubsForFollower(currentUser.id)
                    .then(setSubs)
            }
        }, [currentUser]
    )

    useEffect(() => {
        if (subs && subs.length > 0) {
            let isSubbed = false
            for (const sub of subs) {
                if (sub.author.id === author.id) {
                    isSubbed = true
                    setCurrentSub(sub)
                }
            }
            setSubbed(isSubbed)
        }
    }, [subs, currentUser])

    const handleSub = (e) => {
        if (subbed) {
            deleteSub(currentSub.id)
                .then(setSubbed(false))
        } else {
            let userId = currentUser.id
            if (userId != author.id) {
                let new_subscription = {
                    follower_id: currentUser.id,
                    author_id: author.id,
                    created_on: (new Date()).toISOString().split('T')[0],
                    ended_on: (new Date()).toISOString().split('T')[0]
                }
                addSub(new_subscription)
                    .then(returnedSub => {
                        setCurrentSub(returnedSub)
                    })
                    .then(setSubbed(true))
            } else {
                window.alert("You can't subscribe to yourself.")
            }
        }
    }

    return <div>
        {
            currentUser?.id !== author.id
                ? <button
                    className="subButton"
                    onClick={(e) => {
                        handleSub(e)
                    }}>
                    {subbed ? "Unsubscribe" : "Subscribe"}
                </button>
                : null
        }

    </div>
}