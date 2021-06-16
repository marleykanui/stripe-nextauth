// Mongo-DB
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

if (!MONGODB_DB) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  );
}

// @ts-ignore
let cached = global.mongo;

if (!cached) {
  // @ts-ignore
  cached = global.mongo = { conn: null, promise: null };
}

// Connect
export const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
      return {
        client,
        db: client.db(MONGODB_DB),
      };
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

// List
// export const listDatabase = async () => {
//   const { db } = await connectToDatabase();
//   const databasesList = await db.admin().listDatabases();
//   databasesList.databases.forEach((dbs) => {
//     console.log(`- ${dbs.name}`);
//   });
// };

// Create
// export const create = async (newEntry: object) => {
//   const { db } = await connectToDatabase();
//   const result = await db.collection('shipwrecks').insertOne(newEntry);

//   console.log(`New Entry: ${result}`);
// };

// Create Multiple
// export const creatMultiple = async (newEntries: object[]) => {
//   const { db } = await connectToDatabase();
//   const result = await db.collection('shipwrecks').insertMany(newEntries);
//   console.log(result);
// };

// Find Specific Entry

// export const findSpecificEntry = async (entryId: string) => {
//   const { db } = await connectToDatabase();
//   const foundEntry = await db
//     .collection('shipwrecks')
//     .findOne({ feature_type: entryId });

//   foundEntry ? console.log(foundEntry) : console.log('Listing not Found');
// };

// create({
//   recrd: '',
//   vesslterms: '',
//   feature_type: 'Marley Kanui',
//   chart: 'US,U1,graph,DNC H1409860',
//   latdec: 9.3547792,
//   londec: -79.9081268,
//   gp_quality: '',
//   depth: '',
//   sounding_type: '',
//   history: '',
//   quasou: '',
//   watlev: 'always dry',
//   coordinates: [-79.9081268, 9.3547792],
// });

// creatMultiple([
//   {
//     recrd: '',
//     vesslterms: '',
//     feature_type: 'Gooey Kanui',
//     chart: 'US,U1,graph,DNC H1409860',
//     latdec: 9.3547792,
//     londec: -79.9081268,
//     gp_quality: '',
//     depth: '',
//     sounding_type: '',
//     history: '',
//     quasou: '',
//     watlev: 'always dry',
//     coordinates: [-79.9081268, 9.3547792],
//   },
//   {
//     recrd: '',
//     vesslterms: '',
//     feature_type: 'Kanibal Kanui',
//     chart: 'US,U1,graph,DNC H1409860',
//     latdec: 9.3547792,
//     londec: -79.9081268,
//     gp_quality: '',
//     depth: '',
//     sounding_type: '',
//     history: '',
//     quasou: '',
//     watlev: 'always dry',
//     coordinates: [-79.9081268, 9.3547792],
//   },
// ]);

// listDatabase();

// findSpecificEntry('Gooey Kanui');
