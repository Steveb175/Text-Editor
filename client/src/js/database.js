import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  const db = await openDB("jate", 1);
  const tx = db.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const req = store.put({ content: content, id: 1 });
  const res = await req;
};

export const getDb = async () => {
  const jateDB = await openDB("jate", 1);
  const tx = jateDB.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  // Retrieve all the objects in the store
  const objects = await store.getAll();
  objects.sort((a, b) => (a.id > b.id ? 1 : -1));

  // Return the value of the latest object, or an empty string if there are no objects
  const latestObject =
    objects.length > 0 ? objects[objects.length - 1] : { value: "" };
  return latestObject.value;
};

initdb();
