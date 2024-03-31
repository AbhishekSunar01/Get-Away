const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getProperties = async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      include: {
        Image: true, // Include related Image records
        User: true, // Include related User records
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

const getPropertiesByOwner = async (req, res) => {
  console.log("getPropertiesByOwner called");

  const ownerId = req.user.id;
  console.log("ownerId:", ownerId);

  try {
    const properties = await prisma.property.findMany({
      where: {
        userId: ownerId,
      },
      include: {
        Image: true,
      },
    });

    console.log("properties:", properties);
    res.json(properties);
  } catch (error) {
    console.error("Error in getPropertiesByOwner:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the properties." });
  }
};

const deleteProperty = async (req, res) => {
  const propertyId = req.params.id;
  console.log(propertyId);

  try {
    await prisma.image.deleteMany({
      where: {
        propertyId: parseInt(propertyId),
      },
    });

    await prisma.bookings.deleteMany({
      where: {
        propertyId: parseInt(propertyId),
      },
    });

    await prisma.property.delete({
      where: {
        id: parseInt(propertyId),
      },
    });

    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property: ", error);
    res.status(500).json({
      error: `An error occurred while deleting the property: ${error.message}`,
    });
  }
};

const updateProperty = async (req, res) => {
  const propertyId = req.params.id;
  const propertyData = {
    title: req.body.title,
    address: req.body.address,
    description: req.body.description,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    extraInfo: req.body.extraInfo,
    price: req.body.price,
  };

  try {
    const updatedProperty = await prisma.property.update({
      where: {
        id: parseInt(propertyId),
      },
      data: {
        title: propertyData.title,
        address: propertyData.address,
        description: propertyData.description,
        extraInfo: propertyData.extraInfo,
        price: propertyData.price,
        checkIn: propertyData.checkIn,
        checkOut: propertyData.checkOut,
      },
    });

    const response = {
      message: "Property updated successfully",
      property: updatedProperty,
    };
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProperties,
  addProperties,
  getPropertiesByOwner,
  deleteProperty,
  updateProperty,
};
