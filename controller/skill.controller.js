const pool = require("../database/index");
const skillController = {
  getAll: async (req, res) => {
    try {
      const query = "SELECT * FROM skill"; // Sử dụng "SELECT" thay vì "Select"
      const [rows] = await pool.query(query);
      res.send({
        message: "Successfully got list of skill",
        data: rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error",
      });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const query = "select * from skill where id = ?";
      const [rows] = await pool.query(query, [id]);
      res.json({
        data: rows,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
      });
    }
  },
  create: async (req, res, next) => {
    try {
      const id = Math.floor(Math.random() * 900) + 100;
      const postData = {
        id: id,
        name: req.body.name,
        image: req.file.filename,
        // created_at: new Date(),
      };
      console.log(postData);
      const query = "INSERT INTO skill SET ?";

      await pool.query(query, postData);

      res.status(201).json({
        message: `Successfully created post with id ${id}`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An error occurred",
      });
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const updateData = {};
      if (data.name) {
        updateData.name = data.name;
      }
      if (req.file) {
        updateData.image = req.file.filename;
      }

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          message: "No fields provided for update",
        });
      }

      const query = "UPDATE skill SET ? WHERE id = ?";
      await pool.query(query, [updateData, id]);

      res.status(200).json({
        message: `Successfully updated post with id ${id}`,
        data: updateData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An error occurred",
      });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "delete from skill where id = ?",
        [id]
      );
      res.json({
        // data: rows,
        message: "đã xoá thành công",
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
      });
    }
  },
};

module.exports = skillController;
