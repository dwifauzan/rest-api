const db = require('../config/campus')

const getAllData = (callback) => {
    const query = 'SELECT * FROM mahasiswa'
    db.query(query, callback)
}

const getDatabyClass = (kelas, callback) => {
    const query = 'SELECT * FROM mahasiswa WHERE kelas = ?'
    db.query(query, [kelas], callback)
}

const addData = (namaMahasiswa,fakultas, semester,alamat,callback) => {
    const query = 'INSERT INTO mahasiswa (nama_mahasiswa, fakultas,semester, alamat) VALUES (?,?,?,?) '
    db.query(query, [namaMahasiswa, fakultas, semester, alamat], callback)
}

const updateData = (id, namaMahasiswa, fakultas, semester, alamat, callback) => {
    const query = 'UPDATE mahasiswa SET nama_mahasiswa = ?, fakultas = ?, semester = ?, alamat = ? WHERE id = ?';
    db.query(query, [namaMahasiswa, fakultas, semester, alamat, id], callback);
};


const delData = (id, callback) => {
    const query = 'DELETE FROM mahasiswa WHERE id = ?'
    db.query(query, [id], callback)
}

module.exports = {getAllData, getDatabyClass, addData, updateData, delData}