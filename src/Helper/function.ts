import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
  doc,
  setDoc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../Services/firebase';
import supabase from '../Services/supabaseClient';
import { COMMON_TEXT } from './constant';
import { ProductDetail } from './interface';

//  convert ISO date string to days from now
function getDaysFromNow(isoDateString: string): string {
  const now = new Date();
  const target = new Date(isoDateString);
  const todayUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const targetUTC = Date.UTC(
    target.getFullYear(),
    target.getMonth(),
    target.getDate()
  );
  const diffInDays = Math.round((targetUTC - todayUTC) / (1000 * 60 * 60 * 24));
  if (diffInDays === 0) return 'today';
  if (diffInDays === -1) return 'yesterday';
  return target.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Capitalise the first letter of a string
const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// save image in supaBase and return publicurl
const getURLfromSupabase = async (file: File) => {
  const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filePath = `${Date.now()}_${cleanFileName}`;
  const { error } = await supabase.storage
    .from('image')
    .upload(filePath, file, {
      upsert: true,
    });
  if (error) {
    console.error(error);
  } else {
    const { data: publicUrlData } = supabase.storage
      .from('image')
      .getPublicUrl(filePath);
    return publicUrlData;
  }
};

// add product to firebase
const uploadAds = async (productDetail: ProductDetail) => {
  try {
    // Remove undefined fields from the object
    const filteredDetail = Object.fromEntries(
      Object.entries(productDetail).filter(([_, value]) => value !== undefined)
    );

    const docRef = await addDoc(collection(db, 'ads'), filteredDetail);
    await setDoc(doc(db, 'ads', docRef.id), {
      ...filteredDetail,
      pid: docRef.id,
    });
    toast.success(COMMON_TEXT.POSTED_SUCCESSFULLY);
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : String(e));
    toast.error(COMMON_TEXT.ERROR);
  }
};

// render first page product to dashboard
const dashboardFirstPage = async () => {
  const q = query(
    collection(db, 'ads'),
    orderBy('createdAt', 'desc'),
    limit(3)
  );
  const snapshot = await getDocs(q);
  const adsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  // Save last document for pagination
  const lastVisible = snapshot.docs[snapshot.docs.length - 1];
  return { adsData, lastVisible };
};

// render next page product to dashboard
const dashboardNextPage = async (
  lastVisible: QueryDocumentSnapshot<DocumentData>
) => {
  const q = query(
    collection(db, 'ads'),
    orderBy('createdAt', 'desc'),
    startAfter(lastVisible),
    limit(3)
  );
  const snapshot = await getDocs(q);
  const adsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const newLastVisible = snapshot.docs[snapshot.docs.length - 1];

  return { adsData, lastVisible: newLastVisible };
};

export {
  getDaysFromNow,
  capitalizeFirstLetter,
  getURLfromSupabase,
  uploadAds,
  dashboardFirstPage,
  dashboardNextPage,
};
