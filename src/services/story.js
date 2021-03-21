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

