import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

interface SignupFormData {
  name?: string;
  email: string;
  concernLevel: number;
  paymentWillingness: string;
  betaTester: string;
}

export async function submitSignupForm(formData: SignupFormData) {
  try {
    // Add a timestamp to the data
    const dataWithTimestamp = {
      ...formData,
      submittedAt: serverTimestamp()
    };
    
    // Add the document to the "signups" collection
    const docRef = await addDoc(collection(db, 'signups'), dataWithTimestamp);
    
    return {
      success: true,
      id: docRef.id
    };
  } catch (error) {
    console.error('Error submitting form:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}