import firebase from 'firebase/app';

export async function registerUser(email, password) {

    return firebase
        .auth()
        .createUserWithEmailAndPassword(
            email,
            password
        );
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
    return firebase.auth().currentUser;
}

export async function setUserToDB(user) {
    return firebase
        .firestore()
        .collection("users")
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

export async function logoutUser() {
    return firebase
        .auth()
        .signOut()
        .then(() => {
            alert("You are successfully logged out!");
        })
        .catch((e) => {
            console.log(e);
            alert(e.message);
        });
}

export async function addStoryToUser(userID, story) {
    const userRef = firebase.firestore().collection("users").doc(userID);

    return userRef.update({
        stories: firebase.firestore.FieldValue.arrayUnion(story)
    });
}

export async function deleteStoryFromUser(userID, objToDelete) {
    const userRef = firebase.firestore().collection("users").doc(userID);

    return userRef.update({
        stories: firebase.firestore.FieldValue.arrayRemove(objToDelete)
    })
    
}

export async function addLikedStoryToUser(userID, storyID) {
    const userRef = firebase.firestore().collection("users").doc(userID);

    return userRef.update({
        storiesLiked: firebase.firestore.FieldValue.arrayUnion(storyID)
    });
}

export async function removeLikedStoryFromUser(userID, storyID) {
    const userRef = firebase.firestore().collection("users").doc(userID);

    return userRef.update({
        storiesLiked: firebase.firestore.FieldValue.arrayRemove(storyID)
    });
}

export async function getUserData(userID) {
    const userRef = firebase.firestore().collection("users").doc(userID);

   return userRef.get().then((doc) => {
       console.log(doc.data());
       return doc.data();
   })
   .catch((e) => {
       console.log(e);
       alert(e.message);
   })
}

export function addProposalToUser(userID, proposal) {
    const userRef = firebase.firestore().collection("users").doc(userID);

    return userRef.update({
        proposals: firebase.firestore.FieldValue.arrayUnion(proposal)
    });
}

export function removeProposalFromUser(userID, proposal) {
    const userRef = firebase.firestore().collection("users").doc(userID);

    return userRef.update({
        proposals: firebase.firestore.FieldValue.arrayRemove(proposal)
    });
}

