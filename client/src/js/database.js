import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// adds content to the database
export const putDb = async (content) => {
  const db = await openDB('jate', 1);
	const tx = db.transaction('jate', 'readwrite');
	const store = tx.objectStore('jate');
	await store.put({ id: 1, value: content });
}

// lgets all the content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate')
	const value = await store.get(1)
	return value?.value;
}

initdb();
