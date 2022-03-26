const db = require('../helpers/query');
const emptyOrRowsHelpers = require('../helpers/emptyOrRows');

const UNSERVE = 'unserve';
const SERVED = 'served';
const RESOLVED = 'resolved';

async function getAllCustomers(){
  const rows = await db.query(
    `SELECT id, name, email, agent_id, status FROM customers`
  );
  return emptyOrRowsHelpers.emptyOrRows(rows);
}

async function getUnserveCustomers(){
  const rows = await db.query(
    `SELECT id, name, email, agent_id, status FROM customers
    WHERE status == '${UNSERVE}'`
  );
  return emptyOrRowsHelpers.emptyOrRows(rows);
}

async function getResolvedCustomers(){
  const rows = await db.query(
    `SELECT id, name, email, agent_id, status FROM customers
    WHERE status == '${RESOLVED}'`
  );
  return emptyOrRowsHelpers.emptyOrRows(rows);
}

async function getServedCustomers(){
  const rows = await db.query(
    `SELECT id, name, email, agent_id, status FROM customers
    WHERE status == '${SERVED}'`
  );
  return emptyOrRowsHelpers.emptyOrRows(rows);
}

async function getDetailCustomer(customerId){
  const rows = await db.query(
    `SELECT id, name, email, agent_id, status 
    FROM customers WHERE id == ${customerId}`
  );
  return emptyOrRowsHelpers.emptyOrRows(rows);
}

async function addCustomer(name, email){
  const rows = await db.query(
    `INSERT INTO customer (name, email, status) VALUES ('${name}', '${email}', '${UNSERVE}' );`
  );
  return emptyOrRowsHelpers.emptyOrRows(rows);
}

async function changeStatus(customerId, status){
  const rows = await db.query(
    `UPDATE customer SET status = ${status} WHERE id = ${customerId};`
  );
  return emptyOrRowsHelpers.emptyOrRows(rows);
}



module.exports = {
  getAllCustomers,
  getDetailCustomer,
  getResolvedCustomers,
  getServedCustomers,
  getUnserveCustomers,
  changeStatus,
  addCustomer,

  UNSERVE,
  SERVED,
  RESOLVED,
}