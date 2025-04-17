// PostgreSQL va Knex uchun userDb adapter
const knex = require('./knex') // Knex ulanish fayli yo'li

const userDb = Object.freeze({
  insert,
  findAll,
  findById,
  findOne,
  remove,
  update
})

async function insert({id,...info}) {
  // PostgreSQL da id maydonini avtomatik generatsiya qilish mumkin
  console.log('nfoo',info);
  // let result=info
  // const [result] = await knex('users')
  //   .insert({ ...info, id })
  //   .returning(['id', ...Object.keys(info)])
    const result=await knex('users')
    .insert(info)
    .returning('*');
  console.log('rrrrrr',result);
  
  return result
}


async function findAll({ filters = {}, q, page, sort }) {
  let query = knex('users')
  
  // Filterlarni qo'llash
  if (filters) {
    query = query.where(filters)
  }
  
  // Qidiruv so'rovi uchun
  if (q) {
    query = query.where((builder) => {
      builder
        .whereILike('first_name', `%${q}%`)
        .orWhereILike('last_name', `%${q}%`)
        .orWhereILike('username', `%${q}%`)
    })
  }
  
  // Jami qatorlar sonini olish
  const countQuery = query.clone().count('id as count').first()
  
  // Saralash
  if (sort) {
    query = query.orderBy(sort.by, sort.order)
  }
  
  // Sahifalash
  if (page) {
    query = query.limit(page.limit).offset(page.offset)
  }
  
  // Natijalar va umumiy soni
  const [results, countResult] = await Promise.all([
    query,
    countQuery
  ])
  
  return { 
    data: results, 
    total: parseInt(countResult?.count || 0)
  }
}

async function findById({ id }) {
  const result = await knex('users')
    .where({ id })
    .first()
  
  return result || null
}

async function findOne(filter) {
  const result = await knex('users')
    .where(filter)
    .first()
  
  return result || null
}

async function remove({ id }) {
  const result = await knex('users')
    .where({ id })
    .delete()
  
  return { deleted: result > 0 }
}

async function update({ id, ...data }) {
  const [result] = await knex('users')
    .where({ id })
    .update(data)
    .returning(['id', ...Object.keys(data)])
  
  return result
}

module.exports = userDb