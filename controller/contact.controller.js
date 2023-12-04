const pool = require("../database/index");
const contactController = {
  getAll: async (req, res) => {
    try {
      const query = "SELECT * FROM contact"; // Sử dụng "SELECT" thay vì "Select"
      const [rows] = await pool.query(query);
      res.send({
        message: "Successfully got list of contact",
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
      const query = "select * from contact where id = ?";
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

      const contentData = {
        id: id,
        // content: req.body.content,
        fullname: req.body.fullname,
        phone: req.body.phone,
        email: req.body.email,
        content: req.body.content,
        type: 0,
        created_at: new Date(),
      };
      console.log(contentData);
      const query = "INSERT INTO contact SET ?";
      const selectQuery = "SELECT * FROM contact";

      await pool.query(query, contentData);

      res.status(201).json({
        message: `Successfully created post with id ${id}`,
        data: contentData,
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

      if (data.fullname) {
        updateData.fullname = data.fullname;
      }
      if (data.phone) {
        updateData.phone = data.phone;
      }
      if (data.email) {
        updateData.email = data.email;
      }
      if (data.content) {
        updateData.content = data.content;
      }
      if (data.type) {
        updateData.type = data.type;
      }
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          message: "No fields provided for update",
        });
      }

      const query = "UPDATE contact SET ? WHERE id = ?";
      await pool.query(query, [updateData, id]);

      res.status(200).json({
        message: `Successfully updated contact with id ${id}`,
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
        "delete from contact where id = ?",
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

module.exports = contactController;
