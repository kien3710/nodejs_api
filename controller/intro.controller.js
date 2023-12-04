const pool = require("../database/index");
const introController = {
  getAll: async (req, res) => {
    try {
      const query = "SELECT * FROM intro"; // Sử dụng "SELECT" thay vì "Select"
      const [rows] = await pool.query(query);
      res.send({
        message: "Successfully got list of intro",
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
      const query = "select * from intro where id = ?";
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
        introduce: req.body.introduce,
        des: req.body.des,
        experience: req.body.experience,
        intro_experience: req.body.intro_experience,
        project: req.body.project,
        intro_project: req.body.intro_project,

        created_at: new Date(),
      };
      console.log(postData);
      const query = "INSERT INTO intro SET ?";

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
      console.log("data");
      const updateData = {
        ...data,
        created_at: new Date(),
      };
      if (data.introduce) {
        updateData.introduce = data.introduce;
      }
      if (data.des) {
        updateData.des = data.des;
      }
      if (data.experience) {
        updateData.experience = data.experience;
      }
      if (data.intro_experience) {
        updateData.intro_experience = data.intro_experience;
      }
      if (data.project) {
        updateData.project = data.project;
      }
      if (data.intro_project) {
        updateData.intro_project = data.intro_project;
      }

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          message: "No fields provided for update",
        });
      }

      const query = "UPDATE intro SET ? WHERE id = ?";
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
        "delete from intro where id = ?",
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

module.exports = introController;
