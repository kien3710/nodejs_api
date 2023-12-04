const pool = require("../database/index");
const postsController = {
  getAll: async (req, res) => {
    try {
      const query = "SELECT * FROM posts"; // Sử dụng "SELECT" thay vì "Select"
      const [rows] = await pool.query(query);
      res.send({
        message: "Successfully got list of posts",
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
      const query = "select * from posts where id = ?";
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
        content: req.body.content,
        name: req.body.name,
        image: req.file.filename,
        created_at: new Date(),
      };
      console.log(postData);
      const query = "INSERT INTO posts SET ?";

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
  update: async (req, res) => {
    try {
      const { id } = req.params;

      const data = {
        id: id,
        title: req.body.title,
        content: req.body.content,
      };
      const query = "update posts set title = ?, content = ? where id = ?";
      const [rows, fields] = await pool.query(query, data);
      res.json({
        message: "Dữ liệu đã được thêm thành công.",

        data: rows,
        status: "success",
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
        message: "Đã xảy ra lỗi khi thêm dữ liệu.",
      });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "delete from posts where id = ?",
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

module.exports = postsController;
