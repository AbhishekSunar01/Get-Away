const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addProperties = async (req, res) => {
  const userID = req.user.id;
  const { title, address, description, extraInfo, price, checkIn, checkOut } =
    req.body;

  async function createProperty(
    title,
    address,
    description,
    extraInfo,
    price,
    checkIn,
    checkOut,
    userID
  ) {
    const property = await prisma.property.create({
      data: {
        title: title,
        address: address,
        description: description,
        extraInfo: extraInfo,
        price: price,
        checkIn: checkIn,
        checkOut: checkOut,
        userId: userID,
      },
    });
    return property;
  }

  createProperty(
    title,
    address,
    description,
    extraInfo,
    price,
    checkIn,
    checkOut,
    userID
  )
    .then((property) => {
      res
        .status(201)
        .send({ message: "Property added successfully", property });
    })
    .catch((e) => {
      res.status(500).send({ error: e.message });
    });
};

module.exports = { addProperties };
