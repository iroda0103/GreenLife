const knex = require('./knex')

const TABLE_NAME = 'verifications'

const verificationDb = Object.freeze({
    insert,
    remove,
    findLatestOne,
    upsert
})

async function insert({ id, ...info }) {
    const inserted = await knex(TABLE_NAME)
        .insert({ ...info })
        .returning(['id', 'email', 'code', 'created_at']) 
    return inserted
}
// async function upsert(info, conflictColumn = 'email') {
//     const result = await knex(TABLE_NAME)
//       .insert(info)
//       .onConflict(conflictColumn)
//       .merge()
//       .returning('*');
  
//     return result;
//   }
async function upsert(info, conflictColumn = 'email') {
    const result = await knex('verifications')
      .insert(info)
      .onConflict(conflictColumn)
      .merge({
        ...info,
        updated_at: knex.fn.now(), 
      })
      .returning('*');
  
    return result;
  }
  
async function remove({ id }) {
    await knex(TABLE_NAME).where({ id }).del()
    return true
}

// async function findLatestOne(info) {
//         const result=await knex(TABLE_NAME)
//         .insert(info)
//         .orderBy('created_at', 'desc')
//         .limit(1)
//         .returning('*');
//       console.log('rrrrrr',result);

//     return result
// }
async function findLatestOne({email,...info}) {
    const result = await knex(TABLE_NAME)
      .where({ email })
      .orderBy('created_at', 'desc')
      .first(); 
  
    return result;
  }
  

module.exports = verificationDb
