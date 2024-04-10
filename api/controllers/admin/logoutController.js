const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const logout = async (req, res) => {
  const { email } = req;

  try {
    await prisma.admin.update({
      where: {
        email: email,
      },
      data: {
        token: null,
      },
    });

    //res.clearCookie("token").
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while logging out." });
  }
};

module.exports = { logout };
