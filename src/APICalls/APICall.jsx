import { getDoc } from 'firebase/firestore';

const getThread = async (id, docRef) => {
  const threadData = await getDoc(docRef).then((res) => res.data()[id]);
  return threadData;
};

export default getThread;
