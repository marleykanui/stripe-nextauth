export async function fetchGetJSON(url: string) {
  try {
    const data = await fetch(url).then((res) => res.json());
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

// {
//   $jsonSchema: {
//     bsonType: 'object',
//     required: [
//       'customerId'
//     ],
//     properties: {
//       customerId: {
//         bsonType: 'string',
//         description: 'Must be of string Type'
//       }
//     }
//   }
// }
