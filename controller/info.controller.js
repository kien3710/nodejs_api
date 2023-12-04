const pool = require("../database/index");
const { parserBodyFromData } = require("../utils/request.util");
const infoController = {
  getAll: async (req, res) => {
    try {
      const query = "SELECT * FROM info"; // Sử dụng "SELECT" thay vì "Select"
      const [rows] = await pool.query(query);
      res.send({
        message: "Successfully got list of info",
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
      const query = "select * from info where id = ?";
      const [rows] = await pool.query(query, [id]);
      res.json({
        dataUpdate: rows,
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
      console.log(req.body);
      // const data = parserBodyFromData(req.body);
      const data = req.body;
      const id = Math.floor(Math.random() * 900) + 100;
      const jsonSocialMedia = JSON.stringify(data.link);
      const postData = {
        id: id,
        name: data.name,
        des: data.des,
        email: data.email,
        address: data.address,
        image: req.file.filename,
        link: jsonSocialMedia,
      };
      const query = "INSERT INTO info SET ?";
      await pool.query(query, postData);
      res.status(201).json({
        message: `Successfully created post with id ${id}`,
        data: postData,
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
      if (data.des) {
        updateData.des = data.des;
      }
      if (data.email) {
        updateData.email = data.email;
      }
      if (data.address) {
        updateData.address = data.address;
      }

      if (req.file) {
        updateData.image = req.file.filename;
      }

      if (data.link) {
        updateData.link = JSON.stringify(data.link);
      }

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          message: "No fields provided for update",
        });
      }

      const query = "UPDATE info SET ? WHERE id = ?";
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
      const [rows, fields] = await pool.query("delete from info where id = ?", [
        id,
      ]);
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

module.exports = infoController;
