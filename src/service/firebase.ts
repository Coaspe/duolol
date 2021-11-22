import { Firebase, firestore, FieldValue } from "../lib/firebase";
import { firebaseMatchInfo } from "../types";
  
export async function uploadUserInfo(matchesInfo : firebaseMatchInfo[], username: string, postsNum: Number) {
    await firestore.collection("userInfo").doc(username).set({
        mostInfo: matchesInfo,
        username:username,
        postsNum: postsNum,
        date: Date.now()
    }).catch(error => console.log(error))
}

export async function uploadPost(comment: string, lane: string, password: Number, username: string) {
    try {
        await firestore.collection("posts").doc(username).get()
            .then(async () => {
            await firestore.collection("posts").doc(username).update({
                posts : FieldValue.arrayUnion({
                    comment: comment,
                    lane: lane,
                    password: password,
                    date: Date.now()
                }),
            })
            await firestore.collection("userInfo").doc(username).update({
                postsNum: FieldValue.increment(1)
            })
        })
    } catch (error) {
        await firestore.collection("posts").doc(username).set({
            posts: [{comment: comment, lane:lane, password:password, date: Date.now()}]
        })
        await firestore.collection("userInfo").doc(username).update({
                postsNum: FieldValue.increment(1)
        })
    }
}

export async function getUserInfo(username: string) {
    await firestore.collection("userInfo").doc(username).get().then((res) => {
        return res
    })
}