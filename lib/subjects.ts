import type { UserSubject } from "@/types/subjects";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const getUserCourseOfStudy = async (
  userId: string,
): Promise<string | null> => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const userData = userSnap.data();
    return userData.studyField || null;
  }
  return null;
};

export const getUserEnrolledClasses = async (
  userId: string,
): Promise<string[] | null> => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const userData = userSnap.data();
    return userData.enrolledClasses || null;
  }
  return null;
};

export const getUserSubjects = async (
  userId: string,
): Promise<UserSubject[]> => {
  const userSubjectRef = collection(db, "users", userId, "subjects");
  const snapshot = await getDocs(userSubjectRef);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      enrolledAt: data.enrolledAt?.toDate
        ? data.enrolledAt.toDate()
        : new Date(data.enrolledAt),
    } as UserSubject;
  });
};

export const getEnrolledAndUncompletedSubjects = async (
  userId: string,
): Promise<UserSubject[]> => {
  const subjects = await getUserSubjects(userId);
  return subjects.filter((subject) => !subject.completed);
};

export const addUserSubject = async (
  subject: any,
  userId: string,
): Promise<void> => {
  const userSubjectRef = doc(
    collection(db, "users", userId, "subjects"),
    subject.id.toString(),
  );
  const newUserSubject: UserSubject = {
    ...subject,
    enrolledAt: new Date(),
    completed: false,
  };
  await setDoc(userSubjectRef, {
    ...newUserSubject,
    enrolledAt: newUserSubject.enrolledAt,
  });
};

export const removeUserSubject = async (
  subjectId: number,
  userId: string,
): Promise<void> => {
  const userSubjectRef = doc(
    collection(db, "users", userId, "subjects"),
    subjectId.toString(),
  );
  await deleteDoc(userSubjectRef);
};

export const updateSubjectGrade = async (
  subjectId: number,
  userId: string,
  grade: number,
): Promise<void> => {
  const userSubjectRef = doc(
    collection(db, "users", userId, "subjects"),
    subjectId.toString(),
  );
  await updateDoc(userSubjectRef, {
    grade,
    completed: true,
  });
};
