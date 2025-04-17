// PostgreSQL va Knex uchun userDb adapter
const knex = require('./knex') // Knex ulanish fayli yo'li

const userDb = Object.freeze({
  insert,
  findAll,
  findById,
  findOne,
  remove,
  update,
  upsert
})

async function insert({ id, ...info }) {
  const result = await knex('pending_users')
    .insert(info)
    .returning('*');

  return result
}

async function upsert(info, conflictColumn = 'email') {
  const result = await knex('pending_users')
    .insert(info)
    .onConflict(conflictColumn)
    .merge()
    .returning('*');

  return result;
}

async function findAll({ filters = {}, q, page, sort }) {
  let query = knex('pending_users')

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
  const result = await knex('pending_users')
    .where({ id })
    .first()

  return result || null
}

async function findOne(filter) {
  const result = await knex('pending_users')
    .where(filter)
    .first()

  return result || null
}

async function remove({ id }) {
  const result = await knex('pending_users')
    .where({ id })
    .delete()

  return { deleted: result > 0 }
}

async function update({ id, ...data }) {
  const [result] = await knex('pending_users')
    .where({ id })
    .update(data)
    .returning(['id', ...Object.keys(data)])

  return result
}

module.exports = userDb