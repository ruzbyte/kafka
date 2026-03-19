import { db, storage } from "./firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import type { SubjectNote, SubjectFile } from "@/types/types";

// Note Functions
export const getSubjectNotes = async (
  userId: string,
  subjectId: string
): Promise<SubjectNote[]> => {
  const notesRef = collection(db, "users", userId, "subjects", subjectId, "notes");
  const q = query(notesRef, orderBy("updatedAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as SubjectNote[];
};

export const createSubjectNote = async (
  userId: string,
  subjectId: string,
  title: string,
  content: string = ""
): Promise<SubjectNote> => {
  const noteId = Math.random().toString(36).substring(2, 15);
  const noteRef = doc(db, "users", userId, "subjects", subjectId, "notes", noteId);
  const noteData = {
    title,
    content,
    updatedAt: new Date().toISOString(),
  };
  await setDoc(noteRef, noteData);
  return { id: noteId, ...noteData };
};

export const updateSubjectNote = async (
  userId: string,
  subjectId: string,
  noteId: string,
  updates: Partial<Omit<SubjectNote, "id">>
): Promise<void> => {
  const noteRef = doc(db, "users", userId, "subjects", subjectId, "notes", noteId);
  await updateDoc(noteRef, {
    ...updates,
    updatedAt: new Date().toISOString(),
  });
};

export const deleteSubjectNote = async (
  userId: string,
  subjectId: string,
  noteId: string
): Promise<void> => {
  const noteRef = doc(db, "users", userId, "subjects", subjectId, "notes", noteId);
  await deleteDoc(noteRef);
};

// File Functions
export const getSubjectFiles = async (
  userId: string,
  subjectId: string
): Promise<SubjectFile[]> => {
  const filesRef = collection(db, "users", userId, "subjects", subjectId, "files");
  const q = query(filesRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as SubjectFile[];
};

export const uploadSubjectFile = async (
  userId: string,
  subjectId: string,
  file: File
): Promise<SubjectFile> => {
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("File size exceeds 10MB limit");
  }

  const fileId = Math.random().toString(36).substring(2, 15);
  const storageRef = ref(storage, `users/${userId}/subjects/${subjectId}/${fileId}_${file.name}`);
  
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  const fileData: Omit<SubjectFile, "id"> = {
    name: file.name,
    url,
    size: file.size,
    type: file.type,
    createdAt: new Date().toISOString(),
  };

  const fileDocRef = doc(db, "users", userId, "subjects", subjectId, "files", fileId);
  await setDoc(fileDocRef, fileData);

  return { id: fileId, ...fileData };
};

export const deleteSubjectFile = async (
  userId: string,
  subjectId: string,
  fileId: string,
  fileName: string
): Promise<void> => {
  // Delete from Storage
  const storageRef = ref(storage, `users/${userId}/subjects/${subjectId}/${fileId}_${fileName}`);
  await deleteObject(storageRef).catch(err => console.warn("Storage deletion failed", err));

  // Delete from Firestore
  const fileDocRef = doc(db, "users", userId, "subjects", subjectId, "files", fileId);
  await deleteDoc(fileDocRef);
};
