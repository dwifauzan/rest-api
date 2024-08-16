const dataModel = require('../models/setModel')
const response = require('../response')

const getAllData = (req, res) => {
    dataModel.getAllData((error, result) => {
        if(error) response(500, null ,'sorry tecnical problem shooting', res)
        response(200, result, 'Success get all data from rest', res)
    })
}

const getDatabyClass = (res, req) => {
    const kelas = req.params.kelas
    dataModel.getDatabyClass(kelas, (error, result) => {
        if(error) response(500, null ,'sorry tecnical problem shooting', res)
        response(200, result, 'Success get all data from rest', res)
    })
}

const adddata = (req, res) => {
    console.log(req.body)
    const {namaMahasiswa, fakultas, semester, alamat} = req.body
    dataModel.addData(namaMahasiswa, fakultas, semester, alamat, (error, result) => {
        if(error) response(500, null ,'sorry tecnical problem shooting', res)
        if (result?.affectedRows) {
            response(201, {id: result.insertId}, 'Success add New Data', res)
        }
    })
}

const updateData = (req, res) => {
    const { id, namaMahasiswa, fakultas, semester, alamat } = req.body;

    // Validate if `id` and other fields are present
    if (!id || !namaMahasiswa || !fakultas || !semester || !alamat) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Call the `updateData` function from the model
    dataModel.updateData(id, namaMahasiswa, fakultas, semester, alamat, (error, result) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).json({ error: 'Technical problem' });
        }

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Update successful' });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    });
};


const deleteData = (req, res) => {
    const { id } = req.body; // Ensure 'id' is included
    dataModel.delData(id, (error, result) => {
        if (error) return response(500, null, 'Technical problem', res);
        if (result?.affectedRows) {
            return response(200, { message: 'Delete successfully' }, 'Data deleted successfully', res);
        } else {
            return response(404, null, 'User not found', res);
        }
    });
};

module.exports = {getAllData, getDatabyClass, adddata, updateData, deleteData}