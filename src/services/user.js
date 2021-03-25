import firebase from 'firebase/app';
import { auth, usersCollection } from '../firebase';

export async function registerUser(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
}

export async function loginUser(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

export async function logoutUser() {
    return auth
        .signOut()
        .catch((e) => {
            console.log(e);
            alert(e.message);
        });
}

export async function updateUserInfo(username, imageURL) {
    var user = firebase.auth().currentUser;

    return user.updateProfile({
        displayName: username,
        photoURL: imageURL
    }).then(function (res) {
        console.log('Update user successful.', res);
    }).catch(function (e) {
        console.log(e);
        alert(e.message);
    });
}

export function getCurrentAuthUser() {
    return auth.currentUser;
}



export async function setUserToDB(user) {
    return usersCollection
        .doc(user.uid)
        .set(user)
        .then((doc) => {
            console.log("SUCCESS:", doc);
        })
        .catch((e) => {
            console.log("Oops: ", e);
            alert(e.message);
        });
}

export async function getUserData(userID) {
    const userRef = usersCollection.doc(userID);

   return userRef.get().then((doc) => {
       return doc.data();
   })
   .catch((e) => {
       console.log(e);
       alert(e.message);
   })
}



export async function addStoryToUser(userID, story) {
    const userRef = usersCollection.doc(userID);

    return userRef.update({
        stories: firebase.firestore.FieldValue.arrayUnion(story)
    });
}

export async function deleteStoryFromUser(userID, objToDelete) {
    const userRef = usersCollection.doc(userID);

    return userRef.update({
        stories: firebase.firestore.FieldValue.arrayRemove(objToDelete)
    })
    
}



export async function addLikedStoryToUser(userID, storyID) {
    const userRef = usersCollection.doc(userID);

    return userRef.update({
        storiesLiked: firebase.firestore.FieldValue.arrayUnion(storyID)
    });
}

export async function removeLikedStoryFromUser(userID, storyID) {
    const userRef = usersCollection.doc(userID);

    return userRef.update({
        storiesLiked: firebase.firestore.FieldValue.arrayRemove(storyID)
    });
}



export function addProposalToUser(userID, proposal) {
    const userRef = usersCollection.doc(userID);

    return userRef.update({
        proposals: firebase.firestore.FieldValue.arrayUnion(proposal)
    });
}

export function removeProposalFromUser(userID, proposal) {
    const userRef = usersCollection.doc(userID);

    return userRef.update({
        proposals: firebase.firestore.FieldValue.arrayRemove(proposal)
    });
}


export function addInspirationToUser(userID, inspirationURL) {
    const userRef = usersCollection.doc(userID);

    return userRef.update({
        inspirations: firebase.firestore.FieldValue.arrayUnion(inspirationURL)
    });
}
