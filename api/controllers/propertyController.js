const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getProperties = async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      include: {
        Image: true, // Include related Image records
      },
    });

    res.json(properties); // Send the properties as a response
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the properties." });
  }
};

const addProperties = async (req, res) => {
  const files = req.files;
  const fileUrls = [];
  const userID = req.user.id;

  console.log(userID);
  try {
    for (const file of files) {
      const fileUrl = file.path;
      fileUrls.push(fileUrl);
    }
    const propertyData = {
      title: req.body.title,
      address: req.body.address,
      description: req.body.description,
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      extraInfo: req.body.extraInfo,
      price: req.body.price,
      images: fileUrls,
    };

    let createdProperty;
    try {
      createdProperty = await prisma.property.create({
        data: {
          userId: userID,
          title: propertyData.title,
          address: propertyData.address,
          description: propertyData.description,
          extraInfo: propertyData.extraInfo,
          price: propertyData.price,
          checkIn: propertyData.checkIn,
          checkOut: propertyData.checkOut,
          Image: {
            create: propertyData.images.map((image) => {
              return {
                url: `http://localhost:4000/${image.replace(/\\/g, "/")}`,
              };
            }),
          },
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
      return;
    }

    const response = {
      message: "Property added successfully",
      property: createdProperty,
    };
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProperties, addProperties };
