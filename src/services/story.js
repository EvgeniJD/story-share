import firebase from 'firebase/app';

const storiesCollection = firebase.firestore().collection('stories');

export async function saveStory(story) {
    return storiesCollection.add(story);
}

export async function getStory(storyID) {
    return storiesCollection.doc(storyID).get();
}

export async function deleteStory(storyID) {
    return storiesCollection.doc(storyID).delete();
}

export async function updateStory(storyID, dataToUpdate) {
    return storiesCollection.doc(storyID).update(dataToUpdate);
}

export async function likeStory(storyID) {
    return storiesCollection.doc(storyID).update({
        likes: firebase.firestore.FieldValue.increment(1)
    });
}

export async function unlikeStory(storyID) {
    return storiesCollection.doc(storyID).update({
        likes: firebase.firestore.FieldValue.increment(-1)
    });
}

export function addProposalToStory(storyID, proposal) {
    const storyRef = storiesCollection.doc(storyID);

    return storyRef.update({
        proposals: firebase.firestore.FieldValue.arrayUnion(proposal)
    })
}

export function removeProposalFromStory(storyID, proposal) {
    const storyRef = storiesCollection.doc(storyID);

    return storyRef.update({
        proposals: firebase.firestore.FieldValue.arrayRemove(proposal)
    })
}

export function addContributer(storyID, contributorEmail) {
    const storyRef = storiesCollection.doc(storyID);

    return storyRef.update({
        contributors: firebase.firestore.FieldValue.arrayUnion(contributorEmail)
    })
}



